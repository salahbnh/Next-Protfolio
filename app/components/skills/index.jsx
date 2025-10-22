// Skills.jsx
'use client';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { Suspense, useEffect, useRef, useState, useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';
import IconSphere from './IconSphere';
import CameraController from './CameraController';
import Particles from './Particles';
import TextReveal from './TextReveal';
import { useInView } from 'react-intersection-observer';

// Define your skills with PNG icons for best compatibility.
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
    threshold: 0.25, // When 25% of component is visible
    triggerOnce: false, // Allow multiple triggers
  });
  // New positions calculation with useMemo
  const positions = useMemo(() => 
    SKILLS.map((_, i) => {
      const col = i % 5;
      const row = Math.floor(i / 5);
      const spacing = 2;
      return [(col - 2) * spacing, 5, row * spacing];
    }),
  []);

  // Updated useEffect for animation control
  useEffect(() => {
    let timeout;
    if (inView) {
      timeout = setTimeout(() => {
        setDrop(true);
      }, 500); // Shorten delay to 500ms
    } else {
      setDrop(false);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
      setDrop(false);
    };
  }, [inView]);
  

  // After 2 seconds, trigger the drop by switching the physics type.
  useEffect(() => {
    const timeout = setTimeout(() => setDrop(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section 
      ref={ref} // Add this ref for intersection observer
      className="relative h-screen w-full overflow-hidden bg-dark"
    >      
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={ref} className="w-[80%] h-[70vh] relative">
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

                {/* Ground plane at y=0 */}
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

          {/* Optional text overlay – you can adjust this as needed */}
          <TextReveal reveal={drop} />
        </div>
      </div>
    </section>
  );
}
