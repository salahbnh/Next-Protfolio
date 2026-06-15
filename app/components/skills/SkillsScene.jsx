'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import SolarSystem from './SolarSystem';
import StaticSkillsFallback from './StaticSkillsFallback';
import SkillsErrorBoundary from './SkillsErrorBoundary';

// How long to wait for the 3D scene before falling back to the static grid.
const LOAD_TIMEOUT_MS = 12000;

function CanvasSpinner() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          border: '2px solid var(--primary)',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-rajdhani)',
          fontSize: '0.7rem',
          letterSpacing: '0.16em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}
      >
        Initializing tech stack…
      </span>
    </div>
  );
}

export default function SkillsScene() {
  const [ready, setReady] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const readyRef = useRef(false);

  // Safety net: if the scene never signals ready (hung request, slow GPU),
  // swap in the usable static grid instead of spinning forever.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!readyRef.current) setTimedOut(true);
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, []);

  const handleReady = useCallback(() => {
    readyRef.current = true;
    setReady(true);
  }, []);

  if (timedOut && !ready) {
    return (
      <StaticSkillsFallback note="Showing the lightweight version — the interactive scene took too long to load." />
    );
  }

  return (
    <SkillsErrorBoundary
      fallback={<StaticSkillsFallback note="Interactive 3D view isn't supported on this device." />}
    >
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <SolarSystem onReady={handleReady} />
        {!ready && <CanvasSpinner />}
      </div>
    </SkillsErrorBoundary>
  );
}
