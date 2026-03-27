'use client';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

export default function GeometricBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const positions = useMemo(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotate: Math.random() * 360,
      size: Math.random() * 40 + 20,
      duration: Math.random() * 10 + 10,
    })),
  []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[size:50px_50px] opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, var(--primary) 1px, transparent 1px),
                            linear-gradient(to bottom, var(--primary) 1px, transparent 1px)`,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute bg-primary/10 clip-path-triangle"
          style={{
            width: `${pos.size}px`,
            height: `${pos.size}px`,
            left: `${pos.x}%`,
            top: `${pos.y}%`
          }}
          initial={{ rotate: pos.rotate }}
          animate={{
            rotate: pos.rotate + 360,
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: pos.duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
