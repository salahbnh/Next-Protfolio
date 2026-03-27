'use client';
import { useState, useEffect, useMemo } from 'react';

export default function QuantumParticles() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const particles = useMemo(() =>
    Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      size: Math.random() > 0.5 ? '4px' : '8px',
    })),
  []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {particles.map((pos, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: pos.size,
            height: pos.size,
            animation: `particle-pulse ${pos.duration}s ${pos.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
