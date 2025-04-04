// TextReveal.jsx
'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function TextReveal({ reveal }) {
  const SKILLS = [
    { name: 'TypeScript', icon: '/typescript.png' },
    { name: 'Javascript', icon: '/js.png' },
    { name: 'Java', icon: '/java.png' },
    { name: 'C', icon: '/c.png' },
    { name: 'C#', icon: '/c-sharp.png' },
    { name: 'C++', icon: '/c++.png' },
    { name: 'Node.js', icon: '/nodejs.png' },
    { name: 'SpringBoot', icon: '/springboot.png' },
    { name: 'React', icon: '/reactsjs.png' },
    { name: 'Next.js', icon: '/nextjs.png' },
    { name: 'Firebase', icon: '/firebase.png' },
    { name: 'MongoDB', icon: '/mongodb.png' },
    { name: 'SQL', icon: '/sql.png' },
    { name: 'Unity', icon: '/unity.png' },
    { name: 'Git', icon: '/git.png' },
  ];

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reveal) {
      setShow(true);
    } else {
      // Delay reset to allow exit animation
      const timeout = setTimeout(() => setShow(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [reveal]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 5, ease: 'easeInOut' }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="skill-text-reveal p-8 rounded-2xl text-center">
        <h2 className="text-4xl md:text-5xl font-orbitron text-gradient">
          Technical Expertise
        </h2>
        <p className="mt-4 text-light/80 font-space max-w-xl">
          Mastery across modern development stacks, cutting-edge technologies and programing languages
        </p>

        {/* Skill Icons Grid */}
        <div className="mt-6 grid sm:grid-cols-5 grid-cols-4 gap-4">
          {SKILLS.map((skill, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
              <p className="mt-2 text-sm  text-white">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
