// Skills.jsx
'use client';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import IconSphere from './IconSphere';
import CameraController from './CameraController';
import Particles from './Particles';
import TextReveal from './TextReveal';
import { useInView } from 'react-intersection-observer';

const SKILLS = [
  { name: 'Node.js', icon: '/nodejs.png' },
  { name: 'React', icon: '/reactsjs.png' },
  { name: 'TypeScript', icon: '/typescript.png' },
  { name: 'JS', icon: '/js.png' },
  { name: 'Java', icon: '/java.png' },
  { name: 'Next.js', icon: '/nextjs.png' },
  { name: 'SpringBoot', icon: '/springboot.png' },
  { name: 'Firebase', icon: '/firebase.png' },
  { name: 'MongoDB', icon: '/mongodb.png' },
  { name: 'SQL', icon: '/sql.png' },
  { name: 'Unity', icon: '/unity.png' },
  { name: 'C', icon: '/c.png' },
  { name: 'C#', icon: '/c-sharp.png' },
  { name: 'C++', icon: '/c++.png' },
  { name: 'Git', icon: '/git.png' },
];

export default function Skills() {
  const [drop, setDrop] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  const positions = useMemo(() =>
    SKILLS.map((_, i) => {
      const col = i % 5;
      const row = Math.floor(i / 5);
      const spacing = 2;
      return [(col - 2) * spacing, 5, row * spacing];
    }),
  []);

  useEffect(() => {
    let timeout;
    if (inView) {
      timeout = setTimeout(() => setDrop(true), 500);
    } else {
      setDrop(false);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
      setDrop(false);
    };
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-dark"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80%] h-[70vh] relative">
          <Canvas
            shadows
            camera={{ position: [0, 15, 20], fov: 50 }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 1.5]}
          >
            <ambientLight intensity={4} />
            <pointLight position={[10, 10, 10]} intensity={10} />

            <Suspense fallback={null}>
              <Physics gravity={[0, -9.81, 0]} interpolate>
                {positions.map((pos, i) => (
                  <IconSphere
                    key={SKILLS[i].name}
                    position={pos}
                    icon={SKILLS[i].icon}
                    drop={drop}
                  />
                ))}

                <RigidBody type="fixed">
                  <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[30, 30]} />
                    <meshStandardMaterial
                      color="#334155"
                      metalness={0.3}
                      roughness={0.6}
                    />
                  </mesh>
                </RigidBody>
              </Physics>

              <CameraController />
              <Particles />
              <OrbitControls enableZoom={false} />
            </Suspense>
          </Canvas>

          <TextReveal reveal={drop} />
        </div>
      </div>
    </section>
  );
}
