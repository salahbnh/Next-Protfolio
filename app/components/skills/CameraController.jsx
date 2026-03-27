// CameraController.jsx
'use client';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TARGET = new THREE.Vector3(0, 10, 12);

export default function CameraController() {
  useFrame(({ camera }) => {
    camera.position.lerp(TARGET, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}
