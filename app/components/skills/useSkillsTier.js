'use client';
import { useState, useEffect } from 'react';

// Probes device capability ONCE on the client and picks a render tier so the
// scene scales from weak phones to desktop GPUs. Runs synchronously-ish in an
// effect (needs window/navigator), defaulting to a safe 'mid' until resolved.
//
//   high → desktop / strong GPU: full effects, dpr 1.5, antialias, all particles
//   mid  → laptops / capable phones: dpr 1, no AA, fewer particles, lines on hover
//   low  → no WebGL / software renderer / save-data / very weak → static fallback
//
// `reducedMotion` is reported separately so the scene can freeze auto-motion
// while still rendering the rich visuals for users who allow some motion.

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    if (!gl) return { ok: false, renderer: '' };
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : '';
    return { ok: true, renderer };
  } catch {
    return { ok: false, renderer: '' };
  }
}

export function useSkillsTier() {
  const [state, setState] = useState({ tier: 'mid', reducedMotion: false, ready: false });

  useEffect(() => {
    const nav = navigator;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const saveData = nav.connection?.saveData === true;
    const { ok: hasWebGL, renderer } = detectWebGL();

    const cores = nav.hardwareConcurrency || 4;
    const mem = nav.deviceMemory || 4; // GB, Chrome-only; assume 4 elsewhere
    const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 600;
    const software = /swiftshader|llvmpipe|software|microsoft basic/i.test(renderer);

    let tier;
    if (!hasWebGL || software || saveData || mem <= 2 || cores <= 2) {
      tier = 'low';
    } else if (coarse || smallScreen || mem <= 4 || cores <= 4) {
      tier = 'mid';
    } else {
      tier = 'high';
    }

    setState({ tier, reducedMotion, ready: true });
  }, []);

  return state;
}
