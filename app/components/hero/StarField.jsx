'use client';
import { useEffect, useRef } from 'react';

// Canvas 2D starfield — loads instantly, no Three.js overhead on hero
export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width  = (canvas.width  = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId;

    const stars = Array.from({ length: 220 }, () => ({
      x:       Math.random() * width,
      y:       Math.random() * height,
      r:       Math.random() * 1.4 + 0.2,
      speed:   Math.random() * 0.12 + 0.03,
      opacity: Math.random() * 0.55 + 0.18,
      // slight colour variation: mostly ice-blue, some warmer
      hue:     Math.random() > 0.7 ? 210 : 200,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 85%, ${s.opacity})`;
        ctx.fill();

        s.y -= s.speed;
        if (s.y + s.r < 0) {
          s.y = height + s.r;
          s.x = Math.random() * width;
        }
      }
      animId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      width  = canvas.width  = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize, { passive: true });
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
