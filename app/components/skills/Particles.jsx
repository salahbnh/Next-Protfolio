// Particles.jsx
'use client';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function Particles() {
  const particles = useRef();

  useFrame((state, delta) => {
    if (particles.current) {
      particles.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={particles}>
      {Array.from({ length: 100 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            Math.random() * 10,
            (Math.random() - 0.5) * 15
          ]}
        >
          <sphereGeometry args={[0.05 + Math.random() * 0.05]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0ea5e9"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
