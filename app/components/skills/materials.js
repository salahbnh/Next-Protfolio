'use client';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// ---------------------------------------------------------------------------
// All custom GLSL lives here. Bloom/glow is faked with fresnel + additive
// blending instead of a postprocessing pass, keeping the bundle lean.
// ---------------------------------------------------------------------------

// Energy core: animated value-noise body + fresnel rim. Reads as a glowing reactor.
const CoreMaterial = shaderMaterial(
  { uTime: 0, uColorA: new THREE.Color('#1e3a8a'), uColorB: new THREE.Color('#60a5fa') },
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    varying vec3 vPos;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vView = normalize(-mv.xyz);
      vPos = position;
      gl_Position = projectionMatrix * mv;
    }
  `,
  /* glsl */ `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec3 vNormal;
    varying vec3 vView;
    varying vec3 vPos;
    void main() {
      float n = sin(vPos.x * 3.5 + uTime * 1.1)
              * sin(vPos.y * 3.5 - uTime * 0.9)
              * sin(vPos.z * 3.5 + uTime * 0.6);
      n = n * 0.5 + 0.5;
      vec3 base = mix(uColorA, uColorB, n);
      float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.5);
      vec3 col = base + uColorB * fres * 1.8;
      gl_FragColor = vec4(col, 1.0);
    }
  `
);

// Transparent rim shell sitting just outside the core for an atmospheric halo.
const FresnelMaterial = shaderMaterial(
  { uColor: new THREE.Color('#60a5fa'), uPower: 3.0, uIntensity: 1.0 },
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vView = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }
  `,
  /* glsl */ `
    uniform vec3 uColor;
    uniform float uPower;
    uniform float uIntensity;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), uPower);
      gl_FragColor = vec4(uColor, fres * uIntensity);
    }
  `
);

// Soft radial glow billboard — used for core bloom, node halos and nebula blobs.
const GlowMaterial = shaderMaterial(
  { uColor: new THREE.Color('#3b82f6'), uIntensity: 1.0 },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform vec3 uColor;
    uniform float uIntensity;
    varying vec2 vUv;
    void main() {
      float d = distance(vUv, vec2(0.5));
      float a = smoothstep(0.5, 0.0, d);
      gl_FragColor = vec4(uColor, a * a * uIntensity);
    }
  `
);

// Twinkling starfield points. Per-point scale + phase drive subtle brightness pulse.
const StarMaterial = shaderMaterial(
  { uTime: 0, uSize: 1.0, uColor: new THREE.Color('#bae6fd') },
  /* glsl */ `
    uniform float uTime;
    uniform float uSize;
    attribute float aScale;
    attribute float aPhase;
    varying float vTw;
    void main() {
      vTw = 0.55 + 0.45 * sin(uTime * 1.5 + aPhase);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aScale * uSize * (300.0 / -mv.z);
      gl_Position = projectionMatrix * mv;
    }
  `,
  /* glsl */ `
    uniform vec3 uColor;
    varying float vTw;
    void main() {
      float d = distance(gl_PointCoord, vec2(0.5));
      if (d > 0.5) discard;
      float a = smoothstep(0.5, 0.05, d) * vTw;
      gl_FragColor = vec4(uColor, a);
    }
  `
);

extend({ CoreMaterial, FresnelMaterial, GlowMaterial, StarMaterial });
