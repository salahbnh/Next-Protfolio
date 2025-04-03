'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function QuantumParticles() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Generate stable particle positions
  const particles = Array.from({ length: 50 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100
  }));

  return (
    <div className="absolute inset-0 z-1 pointer-events-none">
      {particles.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
}