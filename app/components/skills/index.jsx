'use client';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

const SkillsScene = dynamic(() => import('./SkillsScene'), { ssr: false });

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.06, triggerOnce: false });

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--background)',
      }}
    >
      {/* Section header — CSS transitions only, no Framer Motion on absolute elements */}
      <div
        style={{
          position: 'absolute',
          top: '2.5rem',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'none',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
          // 002 &nbsp;&nbsp; TECH STACK
        </p>
        <h2 className="text-3xl md:text-4xl font-orbitron text-gradient">
          Skills &amp; Technologies
        </h2>
      </div>

      {/* Solar System canvas — CSS opacity, no Framer Motion */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: inView ? 1 : 0,
          transition: 'opacity 1.2s ease 0.2s',
        }}
      >
        <SkillsScene />
      </div>
    </section>
  );
}
