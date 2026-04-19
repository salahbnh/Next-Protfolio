'use client';
import { useState, useRef, memo, useCallback } from 'react';
import { XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// ─── Data ──────────────────────────────────────────────────────────────────────
const projects = [
  {
    title: "NexusAI — AI SaaS Template",
    image: "/ai-saas.png",
    description: "A commercial-grade SaaS template that gives developers a complete AI-powered web application out of the box. Includes a marketing site, authentication, subscription billing, admin panel, and multiple AI tools — all wired together and ready to deploy. Features multi-model AI chat with conversation history, AI Writer with 8 content templates, AI Image generator (DALL-E 3) with gallery, subscription billing with 3 tiers via Stripe, rate limiting, usage quotas, plan-based model access, and an admin panel with user management.",
    tools: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "Neon Postgres", "Clerk", "Stripe", "Vercel AI SDK", "OpenAI", "Groq", "Anthropic", "Upstash Redis", "shadcn/ui"],
    link: "https://ai-saas-chi-wheat.vercel.app/",
  },
  {
    title: "Imaginify : AI Images Platform",
    gif: "/Imaginfy.gif",
    description: "Imaginify is a website for generating Images from input text with multiple model choices : SDXL(v1.0 pro, v0.9 prp, v1.6) and DallE. It include also AI Image modifications with an Input Image and a text prompt to describe the modifications. Add to this, users can upscale any giving image. The website also includes a community section 'Explore' to view the other user's generated images that they generated and choose to post it, with the name of the publisher, the prompt of the images and other configuration details of the Image prompt to inspire others. and users can interact by liking each other's images.",
    tools: ["NextJs", "Firebase", "Stripe", "Stable Diffusion APIs", "DallE API"],
    link: "#",
  },
  {
    title: "Spicy Barbershop",
    image: "/barber.png",
    description: "A modern and stylish website for a barbershop, allowing users to browse services, check availability, and book appointments online. Built with Next.js and deployed on Vercel.",
    tools: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    link: "https://spicy-barbershop.vercel.app/",
  },
  {
    title: "MedVR",
    image: "/medvr.png",
    description: "A modern clinic management platform that connects patients and doctors. It supports appointment booking, medical folder management, real-time notifications, and online payments. Built with React, Node.js, MongoDB, and Socket.IO.",
    tools: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
    link: "https://my-app-kappa-gules-18.vercel.app/",
  },
  {
    title: "AI parking with ML agent",
    gif: "/Ai_Parking.gif",
    description: "An AI-powered Unity project utilizing reinforcement learning with Unity ML-Agents to train a virtual car to master parking skills. The agent learns optimal parking strategies through trial and error, improving its performance over time while avoiding collisions and adhering to realistic driving behavior.",
    tools: ["Unity Engine", "Unity ML-Agents Toolkit", "TensorFlow", "Python", "C#", "ONNX", "PyTorch", "TensorBoard"],
    link: "#",
  },
  {
    title: "Triple Pendulum simulation",
    gif: "/TripplePendulum.gif",
    description: "A Unity 3D project simulating a triple pendulum system using custom-built physics in C#. The simulation is based on mathematical models and scientific papers, bypassing Unity's built-in physics. Spheres represent the pendulum masses, and the system demonstrates chaotic behavior with sensitive dependence on initial conditions, leading to unpredictable motion dynamics.",
    tools: ["Unity 3D", "C#", "Research-Driven Mathematical Physics"],
    link: "#",
  },
  {
    title: "E-commerce Dashboard",
    video: "/ecommerce-aymen.mp4",
    description: "An e-commerce platform with a production-ready backend: all CRUD operations and REST APIs for admin and client flows using Node.js (TypeScript) following a 3-layer hexagonal architecture. Features Stripe payment integration, admin statistics/metrics for inventory monitoring, and Redis-based caching. The admin dashboard is built with React.js. Everything is fully containerized with Docker.",
    tools: ["Node.js (TypeScript)", "Express.js", "MongoDB", "React.js", "Redis", "Stripe", "Docker"],
    link: "#",
  },
];

// ─── Tilt hook ─────────────────────────────────────────────────────────────────
function useTilt() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    const y = ((e.clientX - rect.left) / rect.width  - 0.5) *  10;
    setTilt({ x, y });
  }, []);

  const onMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return { ref, tilt, onMouseMove, onMouseLeave };
}

// ─── Shared card shell ─────────────────────────────────────────────────────────
function CardShell({ tilt, onMouseMove, onMouseLeave, cardRef, children, onClick }) {
  return (
    <motion.div
      ref={cardRef}
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          className="card-scan relative rounded-xl p-4 h-full overflow-hidden"
          style={{
            background: 'rgba(13,17,23,0.8)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(12px)',
            transition: 'border-color 0.25s, box-shadow 0.25s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-active)';
            e.currentTarget.style.boxShadow   = '0 0 28px var(--glow-blue), 0 8px 32px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.boxShadow   = 'none';
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tech tag ──────────────────────────────────────────────────────────────────
function TechTag({ tool }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-rajdhani)',
        fontSize: '0.7rem',
        letterSpacing: '0.08em',
        padding: '3px 10px',
        border: '1px solid var(--border)',
        background: 'rgba(37,99,235,0.07)',
        color: 'var(--text-secondary)',
        clipPath: 'polygon(6px 0%, calc(100% - 6px) 0%, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0% 50%)',
        display: 'inline-block',
      }}
    >
      {tool}
    </span>
  );
}

// ─── Media badge ───────────────────────────────────────────────────────────────
function MediaBadge({ label }) {
  return (
    <span
      className="absolute bottom-2 left-2"
      style={{
        fontFamily: 'var(--font-rajdhani)',
        fontSize: '0.65rem',
        letterSpacing: '0.12em',
        padding: '3px 8px',
        background: 'rgba(5,7,15,0.85)',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        backdropFilter: 'blur(6px)',
      }}
    >
      {label}
    </span>
  );
}

// ─── Play overlay ──────────────────────────────────────────────────────────────
function PlayOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(5,7,15,0.75)',
          border: '1px solid var(--border-active)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <svg className="w-5 h-5 ml-0.5" fill="var(--primary)" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

// ─── Card variants ─────────────────────────────────────────────────────────────
const ProjectCard = memo(function ProjectCard({ project, onClick }) {
  const { ref, tilt, onMouseMove, onMouseLeave } = useTilt();
  return (
    <CardShell tilt={tilt} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} cardRef={ref} onClick={onClick}>
      <div className="relative aspect-video rounded-lg overflow-hidden group">
        <Image src={project.gif} alt={project.title} fill sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw" style={{ objectFit: 'cover' }} className="rounded-lg" />
        <div className="absolute inset-0 rounded-lg" style={{ background: 'rgba(5,7,15,0.15)', transition: 'background 0.2s' }} />
        <MediaBadge label="GIF PREVIEW" />
        <PlayOverlay />
      </div>
      <h3 className="mt-4 text-lg font-orbitron" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
    </CardShell>
  );
});

const ProjectVideoCard = memo(function ProjectVideoCard({ project, onClick }) {
  const { ref, tilt, onMouseMove, onMouseLeave } = useTilt();
  return (
    <CardShell tilt={tilt} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} cardRef={ref} onClick={onClick}>
      <div className="relative aspect-video rounded-lg overflow-hidden group">
        <video src={project.video} className="w-full h-full object-cover rounded-lg" preload="metadata" muted playsInline />
        <div className="absolute inset-0 rounded-lg" style={{ background: 'rgba(5,7,15,0.2)', transition: 'background 0.2s' }} />
        <MediaBadge label="VIDEO DEMO" />
        <PlayOverlay />
      </div>
      <h3 className="mt-4 text-lg font-orbitron" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
    </CardShell>
  );
});

const ProjectLinkCard = memo(function ProjectLinkCard({ project, onClick }) {
  const { ref, tilt, onMouseMove, onMouseLeave } = useTilt();
  return (
    <CardShell tilt={tilt} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} cardRef={ref} onClick={onClick}>
      {project.link !== '#' && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          style={{ background: 'rgba(5,7,15,0.8)', border: '1px solid var(--border-active)', backdropFilter: 'blur(4px)' }}
        >
          <ArrowTopRightOnSquareIcon className="w-4 h-4" style={{ color: 'var(--primary)' }} />
        </a>
      )}
      <div className="relative aspect-video rounded-lg overflow-hidden group">
        <Image src={project.image} alt={project.title} fill sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw" style={{ objectFit: 'cover' }} className="rounded-lg" />
        <div className="absolute inset-0 rounded-lg" style={{ background: 'rgba(5,7,15,0.1)', transition: 'background 0.2s' }} />
      </div>
      <h3 className="mt-4 text-lg font-orbitron" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
    </CardShell>
  );
});

// ─── Modal shell ───────────────────────────────────────────────────────────────
function ModalShell({ project, onClose, children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(5,7,15,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[95vh] flex flex-col overflow-hidden rounded-2xl"
        style={{ background: 'var(--surface)', border: '1px solid var(--border-active)', boxShadow: '0 0 60px var(--glow-blue)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between gap-3 p-4 sm:p-6 pb-0">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-orbitron" style={{ color: 'var(--primary)' }}>
            {project.title}
          </h2>
          <button onClick={onClose} className="shrink-0 cursor-pointer" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}>
            <XMarkIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 pt-4">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-start">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              {children}
            </div>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space)' }}>
                {project.description}
              </p>
              <div className="space-y-2">
                <h3 className="text-sm font-orbitron" style={{ color: 'var(--text-secondary)' }}>TECHNOLOGIES USED</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => <TechTag key={tool} tool={tool} />)}
                </div>
              </div>
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-rajdhani)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.14em',
                    padding: '8px 18px',
                    border: '1px solid var(--border-active)',
                    color: 'var(--primary)',
                    background: 'rgba(37,99,235,0.08)',
                    transition: 'background 0.2s, box-shadow 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.16)'; e.currentTarget.style.boxShadow = '0 0 16px var(--glow-blue)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  VISIT PROJECT <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Modal variants ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <ModalShell project={project} onClose={onClose}>
      <Image src={project.gif} alt={project.title} fill unoptimized sizes="(max-width:768px) 100vw,50vw" style={{ objectFit: 'cover' }} className="rounded-xl" />
    </ModalShell>
  );
}

function ProjectVideoModal({ project, onClose }) {
  if (!project) return null;
  return (
    <ModalShell project={project} onClose={onClose}>
      <video src={project.video} className="w-full h-full object-contain rounded-xl" controls autoPlay loop muted playsInline />
    </ModalShell>
  );
}

function ProjectImageModal({ project, onClose }) {
  if (!project) return null;
  return (
    <ModalShell project={project} onClose={onClose}>
      <Image src={project.image} alt={project.title} fill sizes="(max-width:768px) 100vw,50vw" style={{ objectFit: 'cover' }} className="rounded-xl" />
    </ModalShell>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="relative overflow-hidden py-24" style={{ background: 'var(--background)' }}>
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-3">// 001 &nbsp;&nbsp; SELECTED WORK</p>
          <h2 className="text-4xl md:text-5xl font-orbitron text-gradient">My Projects</h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm" style={{ color: 'var(--text-muted)' }}>
            Exploring the intersection of design and technology through impactful solutions
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden:  { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => {
            if (project.gif) {
              return <ProjectCard    key={project.title} project={project} onClick={() => setSelectedProject(project)} />;
            } else if (project.video) {
              return <ProjectVideoCard key={project.title} project={project} onClick={() => setSelectedProject(project)} />;
            } else {
              return <ProjectLinkCard  key={project.title} project={project} onClick={() => setSelectedProject(project)} />;
            }
          })}
        </motion.div>

        {/* Modals */}
        <AnimatePresence>
          {selectedProject && (
            selectedProject.gif   ? <ProjectModal      project={selectedProject} onClose={() => setSelectedProject(null)} /> :
            selectedProject.video ? <ProjectVideoModal project={selectedProject} onClose={() => setSelectedProject(null)} /> :
                                    <ProjectImageModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
