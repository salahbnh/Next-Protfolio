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

  // Instead of importing sRGBEncoding, we use its typical numeric value (3001)
  texture.encoding = 3001;

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
      // When drop is false, use a fixed body so the sphere stays in place.
      // Once drop is true, switch to dynamic so gravity will act on it.
      ref={rigidBodyRef}
      type={drop ? "dynamic" : "fixed"}
      position={position}
      colliders="ball"
      restitution={0.8}      // Lower bounce
      friction={0.8}         // Increase friction for better ground adhesion
      angularDamping={0.9}   // Slow down rotation
      linearDamping={0.9}    // Slow down falling speed
    >
      <mesh castShadow receiveShadow geometry={geometry}>
        <meshStandardMaterial
          map={texture}
          emissive="white"
          emissiveMap={texture}
          opacity={1}
          metalness={0.4}
          roughness={0.5}
        />
      </mesh>
    </RigidBody>
  );
}
