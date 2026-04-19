'use client';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

// Only import Three.js bundle when the skills section scrolls into view
const Skills = dynamic(() => import('./skills'), { ssr: false });

export default function SkillsClient() {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,   // once loaded, stays loaded
    rootMargin: '200px', // start loading 200px before reaching the section
  });

  return (
    <div ref={ref} style={{ height: '100vh', background: 'var(--background)' }}>
      {inView && <Skills />}
    </div>
  );
}
