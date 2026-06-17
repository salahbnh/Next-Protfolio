'use client';
import { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, OrbitControls, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import SolarCore from './SolarCore';
import { OrbitRing } from './OrbitRing';
import SkillsBackground from './SkillsBackground';
import Constellation from './Constellation';
import { ATLAS_TEXTURE } from './atlasMap';
import { FRONTEND, BACKEND, TOOLS } from './skillsData';

// Warm the single atlas request as soon as this module loads.
useTexture.preload(ATLAS_TEXTURE);

const FILTERS = ['ALL', 'FRONTEND', 'BACKEND', 'TOOLS'];

// Camera flies in once, then hands control to a damped, auto-rotating OrbitControls.
function CameraRig({ reducedMotion }) {
  const { camera } = useThree();
  const start = useMemo(() => new THREE.Vector3(0, 14, 40), []);
  const target = useMemo(() => new THREE.Vector3(0, 8, 21), []);
  const [introDone, setIntroDone] = useState(reducedMotion);
  const t0 = useRef(null);

  useEffect(() => {
    if (reducedMotion) {
      camera.position.copy(target);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.copy(start);
    }
  }, [camera, start, target, reducedMotion]);

  useFrame((state) => {
    if (introDone) return;
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const p = Math.min((state.clock.elapsedTime - t0.current) / 1.8, 1);
    const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
    camera.position.lerpVectors(start, target, e);
    camera.lookAt(0, 0, 0);
    if (p >= 1) setIntroDone(true);
  });

  if (!introDone) return null;
  return (
    <OrbitControls
      makeDefault
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.06}
      autoRotate
      autoRotateSpeed={0.5}
      minPolarAngle={Math.PI * 0.28}
      maxPolarAngle={Math.PI * 0.62}
    />
  );
}

// Suspends only on the atlas, so the core/background paint immediately while
// the icons stream in and fade up once the single texture resolves.
function IconLayer({ activeCategory, nodesRef }) {
  const atlas = useTexture(ATLAS_TEXTURE);
  atlas.colorSpace = THREE.SRGBColorSpace;
  atlas.anisotropy = 4;
  atlas.minFilter = THREE.LinearMipmapLinearFilter;

  const dimmed = (cat) => activeCategory !== 'ALL' && activeCategory !== cat;

  return (
    <>
      <OrbitRing radius={5}  speed={0.40} inclination={0.10}  skills={FRONTEND} dimmed={dimmed('FRONTEND')} atlas={atlas} nodesRef={nodesRef} />
      <OrbitRing radius={9}  speed={0.24} inclination={-0.16} skills={BACKEND}  dimmed={dimmed('BACKEND')}  atlas={atlas} nodesRef={nodesRef} />
      <OrbitRing radius={13} speed={0.15} inclination={0.26}  skills={TOOLS}    dimmed={dimmed('TOOLS')}    atlas={atlas} nodesRef={nodesRef} />
    </>
  );
}

export default function SolarSystem({ onReady, tier = 'high', reducedMotion = false }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [dpr, setDpr] = useState(tier === 'high' ? 1.5 : 1);
  const nodesRef = useRef(new Map());

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 14, 40], fov: 44 }}
        gl={{ alpha: true, antialias: tier === 'high', powerPreference: 'high-performance' }}
        dpr={dpr}
        onCreated={() => onReady?.()}
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Live guard: drop resolution if the frame rate sags on weak GPUs. */}
        <PerformanceMonitor
          onDecline={() => setDpr((d) => Math.max(0.75, d - 0.25))}
          onIncline={() => setDpr((d) => Math.min(tier === 'high' ? 1.5 : 1, d + 0.25))}
        />

        <ambientLight intensity={0.4} />
        <pointLight position={[18, 18, 18]} intensity={2.2} color="#e0f2fe" />

        {/* Render immediately — no atlas dependency */}
        <SkillsBackground tier={tier} />
        <SolarCore />
        <Constellation nodesRef={nodesRef} visible={activeCategory !== 'ALL'} />

        {/* Icons stream in behind their own Suspense */}
        <Suspense fallback={null}>
          <IconLayer
            activeCategory={activeCategory}
            nodesRef={nodesRef}
          />
        </Suspense>

        <CameraRig reducedMotion={reducedMotion} />
      </Canvas>

      {/* Category filter overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.65rem',
          zIndex: 10,
          pointerEvents: 'auto',
        }}
      >
        {FILTERS.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: 'var(--font-rajdhani)',
                fontSize: '0.72rem',
                letterSpacing: '0.16em',
                padding: '5px 14px',
                border: '1px solid',
                borderColor: isActive ? 'var(--primary)' : 'var(--border)',
                background: isActive ? 'rgba(37,99,235,0.2)' : 'rgba(5,7,15,0.75)',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%)',
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: isActive ? '0 0 14px var(--glow-blue)' : 'none',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
