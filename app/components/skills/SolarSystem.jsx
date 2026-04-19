'use client';
import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import SolarCore from './SolarCore';
import { OrbitRing } from './OrbitRing';
import AmbientDust from './AmbientDust';

const FRONTEND = [
  { name: 'React',      icon: '/reactsjs.png' },
  { name: 'Next.js',    icon: '/nextjs.png' },
  { name: 'TypeScript', icon: '/typescript.png' },
  { name: 'JavaScript', icon: '/js.png' },
];

const BACKEND = [
  { name: 'Node.js',    icon: '/nodejs.png' },
  { name: 'Java',       icon: '/java.png' },
  { name: 'SpringBoot', icon: '/springboot.png' },
  { name: 'Firebase',   icon: '/firebase.png' },
];

const TOOLS = [
  { name: 'MongoDB', icon: '/mongodb.png' },
  { name: 'SQL',     icon: '/sql.png' },
  { name: 'Git',     icon: '/git.png' },
  { name: 'Unity',   icon: '/unity.png' },
  { name: 'C',       icon: '/c.png' },
  { name: 'C#',      icon: '/c-sharp.png' },
  { name: 'C++',     icon: '/c++.png' },
];

const CATEGORIES = ['ALL', 'FRONTEND', 'BACKEND', 'TOOLS'];

function AutoCamera({ scrollRef }) {
  const azimuthRef = useRef(0);
  const { camera } = useThree();

  useFrame((_, delta) => {
    azimuthRef.current += delta * 0.1;
    const scrollFactor = (scrollRef.current || 0) * 0.00025;
    const elevation = 0.38 + scrollFactor;

    const dist = 22;
    camera.position.x = Math.sin(azimuthRef.current) * dist;
    camera.position.z = Math.cos(azimuthRef.current) * dist;
    camera.position.y = elevation * dist * 0.55;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function SolarSystem() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const scrollRef = useRef(0);
  const scrollAttachedRef = useRef(false);

  // Attach scroll listener once
  if (typeof window !== 'undefined' && !scrollAttachedRef.current) {
    window.addEventListener('scroll', () => { scrollRef.current = window.scrollY; }, { passive: true });
    scrollAttachedRef.current = true;
  }

  const dimmed = (cat) => activeCategory !== 'ALL' && activeCategory !== cat;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 9, 22], fov: 44 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[18, 18, 18]} intensity={2.5} color="#e0f2fe" />

        <Suspense fallback={null}>
          <SolarCore />
          <OrbitRing radius={5}  speed={0.38} skills={FRONTEND} dimmed={dimmed('FRONTEND')} />
          <OrbitRing radius={9}  speed={0.22} skills={BACKEND}  dimmed={dimmed('BACKEND')} />
          <OrbitRing radius={13} speed={0.13} skills={TOOLS}    dimmed={dimmed('TOOLS')} />
          <AmbientDust />
        </Suspense>

        <AutoCamera scrollRef={scrollRef} />
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
        {CATEGORIES.map((cat) => {
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
