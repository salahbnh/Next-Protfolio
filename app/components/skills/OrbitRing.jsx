'use client';
import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function SkillIcon({ skill, baseAngle, radius, angleRef, dimmed }) {
  const meshRef = useRef(null);
  const glowRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  const texture = useTexture(skill.icon);

  // Composite PNG onto transparent canvas — keeps actual logo transparency
  const finalTexture = useMemo(() => {
    if (typeof window === 'undefined' || !texture.image) return texture;
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width  = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(texture.image, 10, 10, size - 20, size - 20);
    const ct = new THREE.CanvasTexture(canvas);
    ct.colorSpace = THREE.SRGBColorSpace;
    return ct;
  }, [texture]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const θ = baseAngle + angleRef.current;
    const x = Math.cos(θ) * radius;
    const z = Math.sin(θ) * radius;
    const y = Math.sin(θ * 0.7) * 0.35; // gentle wave

    meshRef.current.position.set(x, y, z);
    meshRef.current.lookAt(camera.position);

    if (glowRef.current) {
      glowRef.current.position.set(x, y, z);
      glowRef.current.lookAt(camera.position);
      glowRef.current.material.opacity = hovered ? 0.38 : dimmed ? 0.04 : 0.14;
    }

    const target = hovered ? 1.4 : dimmed ? 0.65 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(target, target, target),
      delta * 9
    );
  });

  return (
    <>
      {/* Glow halo behind icon */}
      <mesh ref={glowRef}>
        <circleGeometry args={[1.05, 32]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0.14} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Icon plane */}
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
      >
        <planeGeometry args={[1.45, 1.45]} />
        <meshBasicMaterial
          map={finalTexture}
          transparent
          opacity={dimmed ? 0.18 : 1}
          side={THREE.DoubleSide}
          alphaTest={0.04}
          depthWrite={false}
        />
        {hovered && (
          <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
            <div style={{
              background: 'rgba(5,7,15,0.93)',
              border: '1px solid rgba(37,99,235,0.5)',
              color: '#7dd3fc',
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.12em',
              fontSize: '10px',
              textTransform: 'uppercase',
              padding: '3px 9px',
              borderRadius: '2px',
              whiteSpace: 'nowrap',
              marginTop: '2.4rem',
              boxShadow: '0 0 12px rgba(37,99,235,0.3)',
            }}>
              {skill.name}
            </div>
          </Html>
        )}
      </mesh>
    </>
  );
}

export function OrbitRing({ radius, speed, skills, dimmed = false }) {
  const angleRef = useRef(0);

  useFrame((_, delta) => {
    angleRef.current += speed * delta;
  });

  const baseAngles = useMemo(
    () => skills.map((_, i) => (i / skills.length) * Math.PI * 2),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [skills.length]
  );

  return (
    <group>
      {/* Orbit trail ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.05, radius + 0.05, 128]} />
        <meshBasicMaterial
          color="#2563eb"
          transparent
          opacity={dimmed ? 0.04 : 0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {skills.map((skill, i) => (
        <SkillIcon
          key={skill.name}
          skill={skill}
          baseAngle={baseAngles[i]}
          radius={radius}
          angleRef={angleRef}
          dimmed={dimmed}
        />
      ))}
    </group>
  );
}
