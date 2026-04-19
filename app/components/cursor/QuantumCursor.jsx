'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function QuantumCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 120, damping: 20, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const ringRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-magnetic]') && ringRef.current) {
        ringRef.current.style.width = '52px';
        ringRef.current.style.height = '52px';
        ringRef.current.style.marginTop = '-26px';
        ringRef.current.style.marginLeft = '-26px';
        ringRef.current.style.backgroundColor = 'rgba(37,99,235,0.1)';
        ringRef.current.style.borderColor = 'rgba(37,99,235,0.9)';
      }
    };

    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-magnetic]') && ringRef.current) {
        ringRef.current.style.width = '32px';
        ringRef.current.style.height = '32px';
        ringRef.current.style.marginTop = '-16px';
        ringRef.current.style.marginLeft = '-16px';
        ringRef.current.style.backgroundColor = 'transparent';
        ringRef.current.style.borderColor = 'rgba(37,99,235,0.6)';
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer ring — lagged spring */}
      <motion.div
        ref={ringRef}
        style={{
          position: 'fixed',
          marginTop: '-16px',
          marginLeft: '-16px',
          x: ringX,
          y: ringY,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(37,99,235,0.6)',
          pointerEvents: 'none',
          zIndex: 10000,
          backgroundColor: 'transparent',
          transition: 'width 0.2s, height 0.2s, margin 0.2s, background-color 0.2s, border-color 0.2s',
        }}
      />
      {/* Inner dot — exact */}
      <motion.div
        style={{
          position: 'fixed',
          marginTop: '-4px',
          marginLeft: '-4px',
          x: cursorX,
          y: cursorY,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#2563eb',
          pointerEvents: 'none',
          zIndex: 10001,
        }}
      />
    </>
  );
}
