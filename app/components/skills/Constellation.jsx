'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Draws glowing lines from the core to every "active" node. Only meaningful
// when a category filter is engaged (otherwise all nodes are active and it
// would be visual noise), so the parent gates it via `visible`.
const MAX_NODES = 16;

export default function Constellation({ nodesRef, visible }) {
  const lineRef = useRef(null);
  const matRef = useRef(null);
  const positions = useMemo(() => new Float32Array(MAX_NODES * 2 * 3), []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const geo = lineRef.current.geometry;
    let pairs = 0;
    if (visible) {
      for (const node of nodesRef.current.values()) {
        if (!node.active || pairs >= MAX_NODES) continue;
        const base = pairs * 6;
        // segment: core (origin) -> node
        positions[base] = 0; positions[base + 1] = 0; positions[base + 2] = 0;
        positions[base + 3] = node.position.x;
        positions[base + 4] = node.position.y;
        positions[base + 5] = node.position.z;
        pairs++;
      }
    }
    geo.attributes.position.needsUpdate = true;
    geo.setDrawRange(0, pairs * 2);

    if (matRef.current) {
      const target = visible ? 0.5 : 0;
      matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, target, 0.12);
      // subtle energy pulse along the links
      matRef.current.opacity *= 0.85 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={MAX_NODES * 2} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial
        ref={matRef}
        color="#60a5fa"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}
