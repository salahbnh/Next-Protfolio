// IconSphere.jsx
'use client';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { RigidBody } from '@react-three/rapier';
import { useEffect, useRef, useMemo } from 'react';

export default function IconSphere({ position, icon, drop }) {
  const texture = useLoader(TextureLoader, icon);
  const rigidBodyRef = useRef();
  const geometry = useMemo(() => new THREE.BoxGeometry(1.5, 1.5, 1.5), []);

  // Composite the logo onto a white canvas so:
  // 1. Transparent PNG areas become white (no see-through faces)
  // 2. All cubes have a uniform base — no emissive brightness variance
  const compositeTexture = useMemo(() => {
    const size = 256;
    const padding = 32;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Clean white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Draw logo centered with padding so it doesn't bleed to the edges
    if (texture.image) {
      ctx.drawImage(
        texture.image,
        padding,
        padding,
        size - padding * 2,
        size - padding * 2
      );
    }

    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    return canvasTexture;
  }, [texture]);

  useEffect(() => {
    if (rigidBodyRef.current && !drop) {
      rigidBodyRef.current.setTranslation(
        { x: position[0], y: position[1], z: position[2] },
        true
      );
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  }, [drop, position]);

  return (
    <RigidBody
      ref={rigidBodyRef}
      type={drop ? 'dynamic' : 'fixed'}
      position={position}
      colliders="ball"
      restitution={0.8}
      friction={0.8}
      angularDamping={0.9}
      linearDamping={0.9}
    >
      <mesh castShadow receiveShadow geometry={geometry}>
        <meshStandardMaterial
          map={compositeTexture}
          metalness={0.05}
          roughness={0.25}
        />
      </mesh>
    </RigidBody>
  );
}
