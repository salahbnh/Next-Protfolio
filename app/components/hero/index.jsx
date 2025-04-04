'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useAnimation } from 'framer-motion';

const GeometricBackground = dynamic(
  () => import('./GeometricBackground'),
  { ssr: false }
);

const QuantumParticles = dynamic(
  () => import('./QuantumParticles'),
  { ssr: false }
);

export default function Hero() {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section className="h-screen relative overflow-hidden">
    
      <GeometricBackground />
      <QuantumParticles />

      <motion.div
        initial="hidden"
        animate={controls}
        className="relative z-10 h-full flex items-center justify-center text-center px-4"
      >
        <div className="max-w-4xl mx-auto mt-20 space-y-6">
          {/* Main Heading */}
          <motion.h1
            variants={textVariants}
            className="text-2xl"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
             {"Hello, I'm Salah Bounouh".split('').map((char, i) => {
                const displayChar = char === ' ' ? '\u00A0' : char;
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="inline-block whitespace-pre"
                  >
                    {displayChar}
                  </motion.span>);
             })}
            <motion.span
              variants={textVariants}
              className="block mt-1 text-3xl md:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Full-Stack Developer & Software Engineer
            </motion.span>
          </motion.h1>

          {/* Personalized Description */}
          <motion.p
            variants={textVariants}
            className="text-md md:text-md text-light/80 font-space max-w-3xl mx-auto leading-relaxed"
          >
            I build full-stack web apps with a focus on clean architecture and user-centric design. With over 3 years
            of experience, I've delivered production-ready solutions using modern stacks like React, Node.js,
            cloud platforms and other tools and framworks.
            <br/>
            When I'm not coding web applications, you'll find me developing 2D/3D game prototypes in Unity, contributing to open-source DevOps, 
            <motion.span
              className="block mt-2 text-primary"
              animate={{ opacity: [0.8, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              "Solving complex problems with elegant code"
            </motion.span>
          </motion.p>

          {/* Technical Focus Areas */}
          <motion.div
            variants={textVariants}
            className="flex flex-wrap justify-center gap-4 mt-2"
          >
            {['Web Development', 'Software Architecture', 'Game Prototyping', 'Cloud Solutions'].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-dark/50 backdrop-blur-lg border border-primary/20 text-sm"
              >
                #{tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={textVariants} >
          <a href="#projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 rounded-full bg-dark/50 backdrop-blur-lg border border-primary/30 group"
            >
              <span className="text-xl font-orbitron bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                See My Work
              </span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}