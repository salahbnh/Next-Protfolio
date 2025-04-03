'use client';
import { useState } from 'react';
import GeometricBackground from "./hero/GeometricBackground";
import QuantumParticles from "./hero/QuantumParticles";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: "Imaginify : AI Images Platform",
    gif: "/Imaginfy.gif",
    description: "Imaginify is a website for generating Images from input text with multiple model choices : SDXL(v1.0 pro, v0.9 prp, v1.6) and DallE. It include also AI Image modifications with an Input Image and a text prompt to describe the modifications. Add to this, users can upscale any giving image. The website also includes a comunity section 'Explore' to view the other user's generated images that they generated and choose to post it, with the name of the publisher , the prompt of the images and other configuration details of the Image prompt to inspire others. and users cn interract by liking each other's images.",
    tools: ["NextJs", "Firebase", "Stripe", "Stable Diffusion APIs","DallE API"],
    link: "#"
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
    description: "A Unity 3D project simulating a triple pendulum system using custom-built physics in C#. The simulation is based on mathematical models and scientific papers, bypassing Unity’s built-in physics. Spheres represent the pendulum masses, and the system demonstrates chaotic behavior with sensitive dependence on initial conditions, leading to unpredictable motion dynamics.",
    tools: ["Unity 3D", "C#", "Research-Driven Mathematical Physics"],
    link:"#"
  },
];

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative bg-dark/50 backdrop-blur-lg rounded-xl p-4 border border-primary/30 hover:border-primary/50 transition-all">
        <div className="aspect-video rounded-lg overflow-hidden">
          <img 
            src={project.gif} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="mt-4 text-xl font-orbitron text-primary">{project.title}</h3>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-dark/90 backdrop-blur-xl p-8 flex items-center justify-center"
      >
        <div className="relative max-w-4xl w-full bg-dark/80 backdrop-blur-lg rounded-2xl border border-primary/30 p-8">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-primary hover:text-accent transition-colors"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="aspect-video rounded-xl overflow-hidden">
              <img 
                src={project.gif} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-orbitron text-primary">{project.title}</h2>
              <p className="text-light/80 font-space leading-relaxed">{project.description}</p>
              
              <div className="space-y-2">
                <h3 className="text-primary font-orbitron">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span 
                      key={tool}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="h-screen relative overflow-hidden">
      <GeometricBackground />
      <QuantumParticles />

      <div className="relative z-10 container mx-auto px-4 h-full py-16">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron text-primary mb-4">
            My Projects
          </h2>
          <p className="text-light/80 font-space max-w-2xl mx-auto">
            Exploring the intersection of design and technology through impactful solutions
          </p>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>


        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}