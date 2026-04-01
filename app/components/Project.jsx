'use client';
import { useState, memo } from 'react';
import { XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: "Imaginify : AI Images Platform",
    gif: "/Imaginfy.gif",
    description: "Imaginify is a website for generating Images from input text with multiple model choices : SDXL(v1.0 pro, v0.9 prp, v1.6) and DallE. It include also AI Image modifications with an Input Image and a text prompt to describe the modifications. Add to this, users can upscale any giving image. The website also includes a comunity section 'Explore' to view the other user's generated images that they generated and choose to post it, with the name of the publisher , the prompt of the images and other configuration details of the Image prompt to inspire others. and users cn interract by liking each other's images.",
    tools: ["NextJs", "Firebase", "Stripe", "Stable Diffusion APIs","DallE API"],
    link: "#"
  },
  {
    title: "Spicy Barbershop",
    image: "/barber.png",
    description: "A modern and stylish website for a barbershop, allowing users to browse services, check availability, and book appointments online. Built with Next.js and deployed on Vercel.",
    tools: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    link: "https://spicy-barbershop.vercel.app/"
  },
  {
    title: "MedVR",
    image: "/medvr.png",
    description: "A modern clinic management platform that connects patients and doctors. It supports appointment booking, medical folder management, real-time notifications, and online payments. Built with React, Node.js, MongoDB, and Socket.IO.",
    tools: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
    link: "https://my-app-kappa-gules-18.vercel.app/"
  },
  {
    title: "AI parking with ML agent",
    gif: "/Ai_Parking.gif",
    description: "An AI-powered Unity project utilizing reinforcement learning with Unity ML-Agents to train a virtual car to master parking skills. The agent learns optimal parking strategies through trial and error, improving its performance over time while avoiding collisions and adhering to realistic driving behavior.",
    tools: ["Unity Engine", "Unity ML-Agents Toolkit", "TensorFlow", "Python", "C#", "ONNX", "Pytoarch", "TensorBoard"],
    link:"#"
  },
  {
    title: "Triple Pendulum simulation",
    gif: "/TripplePendulum.gif",
    description: "A Unity 3D project simulating a triple pendulum system using custom-built physics in C#. The simulation is based on mathematical models and scientific papers, bypassing Unity's built-in physics. Spheres represent the pendulum masses, and the system demonstrates chaotic behavior with sensitive dependence on initial conditions, leading to unpredictable motion dynamics.",
    tools: ["Unity 3D", "C#", "Research-Driven Mathematical Physics"],
    link:"#"
  },
  {
    title: "E-commerce Dashboard",
    video: "/ecommerce-aymen.mp4",
    description: "This project is an e-commerce platform currently under development. The backend and dashboard is already complete and production-ready: all CRUD operations and REST APIs required for both admin and client flows are implemented using Node.js (TypeScript) following a 3-layer hexagonal architecture. Key backend features include Stripe payment integration, admin statistics/metrics for inventory monitoring, and Redis-based caching to accelerate requests and reduce database load. The admin dashboard (demo video available) is built with React.js and lets the administrator add/update products and categories, manage stock, and view sales/stock metrics. Everything is fully containerized with Docker, so the whole stack is ready to deploy.",
    tools: ['Node.js (TypeScript)', 'Express.js', 'MongoDB', 'React.js', 'Redis', 'Stripe', 'Docker'],
    link: "#"
  }
];

// GIF card — thumbnail is first-frame static image (Next.js strips animation for the card, fast to load).
// Full animated GIF only loads in the modal.
const ProjectCard = memo(function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative bg-dark/50 backdrop-blur-lg rounded-xl p-4 border border-primary/30 hover:border-primary/50 transition-all">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          {/* No unoptimized — Next.js serves only the first frame as lightweight WebP/AVIF */}
          <Image
            src={project.gif}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
          {/* GIF badge + play overlay */}
          <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/10 transition-colors rounded-lg" />
          <div className="absolute bottom-2 left-2 bg-dark/70 backdrop-blur-sm text-primary text-[10px] font-space px-2 py-0.5 rounded-full border border-primary/30">
            GIF preview
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-dark/70 border border-primary/50 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-orbitron text-primary">{project.title}</h3>
      </div>
    </motion.div>
  );
});

// Video card — preload="metadata" makes the browser load just the first frame for the thumbnail.
const ProjectVideoCard = memo(function ProjectVideoCard({ project, onClick }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative bg-dark/50 backdrop-blur-lg rounded-xl p-4 border border-primary/30 hover:border-primary/50 transition-all">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <video
            src={project.video}
            className="w-full h-full object-cover rounded-lg"
            preload="metadata"
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/10 transition-colors rounded-lg" />
          <div className="absolute bottom-2 left-2 bg-dark/70 backdrop-blur-sm text-primary text-[10px] font-space px-2 py-0.5 rounded-full border border-primary/30">
            Video demo
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-dark/70 border border-primary/50 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-orbitron text-primary">{project.title}</h3>
      </div>
    </motion.div>
  );
});

// Image card — click opens detail modal. External link icon in corner for direct access.
const ProjectLinkCard = memo(function ProjectLinkCard({ project, onClick }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative bg-dark/50 backdrop-blur-lg rounded-xl p-4 border border-primary/30 hover:border-primary/50 transition-all h-full">
        {/* External link shortcut — stops propagation so it doesn't also open the modal */}
        {project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-dark/80 border border-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-primary hover:bg-primary/10"
          >
            <ArrowTopRightOnSquareIcon className="w-4 h-4 text-primary" />
          </a>
        )}
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-dark/10 group-hover:bg-dark/0 transition-colors rounded-lg" />
        </div>
        <h3 className="mt-4 text-xl font-orbitron text-primary">{project.title}</h3>
      </div>
    </motion.div>
  );
});

// Modal for GIF projects
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-background rounded-2xl border border-primary/30 max-h-[95vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 p-4 sm:p-6 pb-0">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-orbitron text-primary leading-snug">
            {project.title}
          </h2>
          <button onClick={onClose} className="shrink-0 text-primary hover:text-accent transition-colors mt-0.5">
            <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4 sm:p-6 pt-4">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-start">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              {/* Full animated GIF only loads when modal is open */}
              <Image
                src={project.gif}
                alt={project.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <p className="text-light/80 font-space leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
              <div className="space-y-2">
                <h3 className="text-primary font-orbitron text-sm sm:text-base">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-primary text-sm font-space hover:bg-primary/10 hover:border-primary transition-all"
                >
                  Visit Project <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Modal for video projects
function ProjectVideoModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-background rounded-2xl border border-primary/30 max-h-[95vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 p-4 sm:p-6 pb-0">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-orbitron text-primary leading-snug">
            {project.title}
          </h2>
          <button onClick={onClose} className="shrink-0 text-primary hover:text-accent transition-colors mt-0.5">
            <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4 sm:p-6 pt-4">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-start">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <video
                src={project.video}
                className="w-full h-full object-contain rounded-xl"
                controls
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <p className="text-light/80 font-space leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
              <div className="space-y-2">
                <h3 className="text-primary font-orbitron text-sm sm:text-base">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-primary text-sm font-space hover:bg-primary/10 hover:border-primary transition-all"
                >
                  Visit Project <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Modal for image/link projects
function ProjectImageModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-background rounded-2xl border border-primary/30 max-h-[95vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 p-4 sm:p-6 pb-0">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-orbitron text-primary leading-snug">
            {project.title}
          </h2>
          <button onClick={onClose} className="shrink-0 text-primary hover:text-accent transition-colors mt-0.5">
            <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4 sm:p-6 pt-4">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-start">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <p className="text-light/80 font-space leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
              <div className="space-y-2">
                <h3 className="text-primary font-orbitron text-sm sm:text-base">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-primary text-sm font-space hover:bg-primary/10 hover:border-primary transition-all"
                >
                  Visit Project <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 h-full py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron text-gradient mb-4">
            My Projects
          </h2>
          <p className="text-light/80 font-space max-w-2xl mx-auto">
            Exploring the intersection of design and technology through impactful solutions
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => {
            if (project.image) {
              return (
                <ProjectLinkCard
                  key={project.title}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              );
            } else if (project.gif) {
              return (
                <ProjectCard
                  key={project.title}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              );
            } else {
              return (
                <ProjectVideoCard
                  key={project.title}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              );
            }
          })}
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            selectedProject.gif ? (
              <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            ) : selectedProject.video ? (
              <ProjectVideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            ) : (
              <ProjectImageModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
