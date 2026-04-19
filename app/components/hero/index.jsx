'use client';
import { motion } from 'framer-motion';
import StarField from './StarField';
import { useQuantumDecode } from '../../hooks/useQuantumDecode';

const TAGS = ['Web Development', 'Software Architecture', 'Game Prototyping', 'Cloud Solutions'];

function HexTag({ label }) {
  return (
    <span
      className="relative inline-block px-5 py-1.5 text-sm cursor-default select-none"
      style={{ fontFamily: 'var(--font-rajdhani)', letterSpacing: '0.1em', transition: 'transform 0.2s ease', display: 'inline-block' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <span
        className="absolute inset-0"
        style={{
          border: '1px solid rgba(37,99,235,0.35)',
          clipPath: 'polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)',
          background: 'rgba(37,99,235,0.06)',
          transition: 'border-color 0.2s, background 0.2s',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, color: 'var(--text-secondary)' }}>
        {label}
      </span>
    </span>
  );
}

export default function Hero() {
  const headingDecoded  = useQuantumDecode("Hello, I'm Salah Bounouh", { startDelay: 200, charDelay: 55, scrambleDuration: 320 });
  const subtitleDecoded = useQuantumDecode("Full-Stack Developer & Software Engineer",  { startDelay: 1700, charDelay: 28, scrambleDuration: 200 });

  return (
    <section className="h-screen relative overflow-hidden hex-bg">
      {/* Ambient radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(5,15,40,0.82) 0%, rgba(5,7,15,0.65) 55%, transparent 100%)',
        }}
      />

      {/* Canvas 2D starfield */}
      <StarField />

      {/* Content */}
      <div
        className="relative h-full flex items-center justify-center text-center px-4"
        style={{ zIndex: 2 }}
      >
        <div className="max-w-4xl mx-auto mt-16 space-y-6">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="flex justify-center"
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-rajdhani)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: '#4ade80',
                background: 'rgba(74,222,128,0.08)',
                border: '1px solid rgba(74,222,128,0.25)',
                borderRadius: '999px',
                padding: '4px 14px',
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
                animation: 'neon-pulse-green 2s ease-in-out infinite',
                flexShrink: 0,
              }} />
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="eyebrow"
          >
            // 000 &nbsp;&nbsp; WELCOME
          </motion.p>

          {/* Main heading — quantum decoded */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl leading-tight"
            style={{
              fontFamily: 'var(--font-orbitron)',
              color: 'var(--text-primary)',
              minHeight: '3.5rem',
              fontWeight: 700,
            }}
          >
            {headingDecoded}
          </h1>

          {/* Subtitle — decoded after heading */}
          <p
            className="text-xl md:text-2xl text-gradient"
            style={{
              fontFamily: 'var(--font-orbitron)',
              minHeight: '2rem',
              fontWeight: 600,
            }}
          >
            {subtitleDecoded}
          </p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0, duration: 0.9 }}
            className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space)' }}
          >
            I build full-stack web apps with a focus on clean architecture and user-centric design.
            3+ years delivering production-ready solutions across React, Node.js, cloud platforms, and Unity game prototypes.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {TAGS.map((tag) => <HexTag key={tag} label={tag} />)}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="#projects">
              <button
                className="relative px-10 py-4 cursor-pointer"
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.18em',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.14), rgba(124,58,237,0.14))',
                  border: '1px solid rgba(37,99,235,0.4)',
                  clipPath: 'polygon(14px 0%, calc(100% - 14px) 0%, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0% 50%)',
                  color: 'var(--text-primary)',
                  transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37,99,235,0.28), rgba(124,58,237,0.28))';
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.7)';
                  e.currentTarget.style.boxShadow = '0 0 28px rgba(37,99,235,0.3), 0 0 60px rgba(124,58,237,0.15)';
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37,99,235,0.14), rgba(124,58,237,0.14))';
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
              >
                SEE MY WORK
              </button>
            </a>

            <a href="/SalahBounouh_CV.pdf" download>
              <button
                className="relative px-10 py-4 cursor-pointer"
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.18em',
                  background: 'transparent',
                  border: '1px solid rgba(37,99,235,0.3)',
                  clipPath: 'polygon(14px 0%, calc(100% - 14px) 0%, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0% 50%)',
                  color: 'var(--text-secondary)',
                  transition: 'border-color 0.25s, color 0.25s, box-shadow 0.25s, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.6)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.boxShadow = '0 0 18px rgba(37,99,235,0.2)';
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
              >
                DOWNLOAD CV
              </button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 2 }}
      >
        <span className="eyebrow" style={{ fontSize: '0.65rem' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(to bottom, var(--primary), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
