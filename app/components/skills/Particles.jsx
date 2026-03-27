// Particles.jsx
'use client';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 100;

export default function Particles() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => [
      Math.sin(i * 2.399) * 7.5,
      (i / PARTICLE_COUNT) * 10,
      Math.cos(i * 2.399) * 7.5,
    ]),
  []);

  useEffect(() => {
    if (!meshRef.current) return;
    positions.forEach((pos, i) => {
      dummy.position.set(pos[0], pos[1], pos[2]);
      dummy.scale.setScalar(0.05 + (i % 3) * 0.025);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.08, 4, 4]} />
      <meshStandardMaterial
        color="#0ea5e9"
        emissive="#0ea5e9"
        emissiveIntensity={0.5}
      />
    </instancedMesh>
  );
}
