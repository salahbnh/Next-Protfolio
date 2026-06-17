'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GlowSprite } from './SkillsBackground';
import './materials';

export default function SolarCore() {
  const coreMatRef = useRef(null);
  const groupRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const shellRef = useRef(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (coreMatRef.current) coreMatRef.current.uTime = t;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      ring1Ref.current.rotation.z += delta * 0.42;
      ring2Ref.current.rotation.x += delta * 0.22;
    }
    // Gentle breathing of the rim shell.
    if (shellRef.current) {
      shellRef.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.03);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Animated energy body */}
      <mesh>
        <sphereGeometry args={[1.15, 48, 48]} />
        <coreMaterial ref={coreMatRef} />
      </mesh>

      {/* Fresnel rim shell */}
      <mesh ref={shellRef}>
        <sphereGeometry args={[1.32, 48, 48]} />
        <fresnelMaterial
          uColor={new THREE.Color('#7dd3fc')}
          uPower={2.6}
          uIntensity={1.1}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Bloom halo (fake bloom, no postprocessing) */}
      <GlowSprite color="#3b82f6" size={7.5} intensity={0.9} />

      {/* Core light */}
      <pointLight color="#60a5fa" intensity={9} distance={26} decay={2} />

      {/* Accent rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.72, 96]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.55} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <ringGeometry args={[2.05, 2.13, 96]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0.3} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}
