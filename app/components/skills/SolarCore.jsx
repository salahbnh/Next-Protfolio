'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SolarCore() {
  const coreRef  = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);

  useFrame((state, delta) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.y += delta * 0.28;
    ring1Ref.current.rotation.z += delta * 0.42;
    ring2Ref.current.rotation.x += delta * 0.22;
    // Pulse emissive
    coreRef.current.material.emissiveIntensity =
      0.75 + Math.sin(state.clock.elapsedTime * 1.6) * 0.18;
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial
          color="#2563eb"
          emissive="#2563eb"
          emissiveIntensity={0.75}
          metalness={0.25}
          roughness={0.45}
        />
      </mesh>

      {/* Point light emanating from core */}
      <pointLight color="#3b82f6" intensity={8} distance={22} decay={2} />

      {/* Inner ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.55, 1.68, 64]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>

      {/* Outer ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <ringGeometry args={[2.0, 2.1, 64]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
