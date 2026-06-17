'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import * as THREE from 'three';
import './materials';

// Reusable soft additive glow disc — core bloom, node halos, nebula blobs.
export function GlowSprite({ color = '#3b82f6', size = 4, intensity = 1, position = [0, 0, 0] }) {
  return (
    <Billboard position={position}>
      <mesh>
        <planeGeometry args={[size, size]} />
        <glowMaterial
          uColor={new THREE.Color(color)}
          uIntensity={intensity}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Billboard>
  );
}

function Starfield({ count }) {
  const matRef = useRef(null);

  const { positions, scales, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute on a shell so stars sit behind the system, with depth variety.
      const r = 26 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 2] = r * Math.cos(phi);
      scales[i] = 0.5 + Math.random() * 2.2;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, scales, phases };
  }, [count]);

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uTime = state.clock.elapsedTime;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aScale" count={count} array={scales} itemSize={1} />
        <bufferAttribute attach="attributes-aPhase" count={count} array={phases} itemSize={1} />
      </bufferGeometry>
      <starMaterial
        ref={matRef}
        uSize={2.2}
        uColor={new THREE.Color('#bae6fd')}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SkillsBackground({ tier = 'high' }) {
  const starCount = tier === 'high' ? 900 : tier === 'mid' ? 450 : 200;
  return (
    <group>
      <Starfield count={starCount} />
      {/* Distant nebula blobs for colored depth (additive, never written to depth). */}
      <GlowSprite color="#1d4ed8" size={36} intensity={0.18} position={[-20, 6, -26]} />
      <GlowSprite color="#7c3aed" size={30} intensity={0.16} position={[24, -8, -22]} />
      {tier === 'high' && (
        <GlowSprite color="#0ea5e9" size={26} intensity={0.12} position={[6, 14, -30]} />
      )}
    </group>
  );
}
