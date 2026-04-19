'use client';
import { useRef } from 'react';
import { useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const barRef = useRef(null);

  useMotionValueEvent(scaleX, 'change', (v) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${v})`;
  });

  return (
    <div
      ref={barRef}
      style={{
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(to right, #2563eb, #7c3aed)',
        zIndex: 9999,
        transform: 'scaleX(0)',
      }}
    />
  );
}
