// CameraController.jsx
'use client';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraController() {
  useFrame(({ camera }) => {
    camera.position.lerp(new THREE.Vector3(0, 10, 12), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}
