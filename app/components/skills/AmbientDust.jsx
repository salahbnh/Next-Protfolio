'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function AmbientDust() {
  const ref = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 44;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 44;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.018;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={400} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#7dd3fc" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}
