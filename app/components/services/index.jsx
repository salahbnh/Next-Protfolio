'use client';
import { motion } from 'framer-motion';
import { 
    ServerStackIcon, 
    GlobeAmericasIcon,
    ServerIcon,
    CommandLineIcon,
    RocketLaunchIcon,
    CubeIcon
  } from '@heroicons/react/24/outline';
import GeometricBackground from '../hero/GeometricBackground';
import QuantumParticles from '../hero/QuantumParticles';

const services = [
    {
      title: "Backend Development",
      description: "Architecting high-performance server solutions with Node.js, Spring Boot, and real-time database systems",
      icon: <ServerStackIcon className="h-12 w-12 text-primary" />
    },
    {
      title: "Frontend Engineering",
      description: "Building immersive web experiences with responsive layouts, fluid animations, and Three.js 3D integrations",
      icon: <GlobeAmericasIcon className="h-12 w-12 text-primary" />
    },
    {
      title: "Game Development",
      description: "Creating 3D game environments and complex gameplay mechanics using Unity Engine and C# scripting",
      icon: <CubeIcon className="h-12 w-12 text-primary" />
    },
    {
      title: "API Architecture",
      description: "Enterprise-grade API development with REST/GraphQL standards, JWT authentication, and Redis caching",
      icon: <ServerIcon className="h-12 w-12 text-primary" />
    },
    {
      title: "DevOps Automation",
      description: "Implementing CI/CD pipelines with Docker, Kubernetes, and GitHub Actions for zero-downtime deployments",
      icon: <CommandLineIcon className="h-12 w-12 text-primary" />
    },
    {
      title: "Technical Leadership",
      description: "Leading cross-functional teams in Agile environments with architectural decision ownership and code reviews",
      icon: <RocketLaunchIcon className="h-12 w-12 text-primary" />
    },
  ];
export default function ServicesSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-dark py-20">
    <GeometricBackground/>
    <QuantumParticles/>
      {/* Wavy Background Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(14,165,233,0.1)_50%,transparent_75%)] bg-[length:400%_400%] animate-waves" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron text-gradient mb-4">
            Technical Services
          </h2>
          <p className="text-xl text-light/80 font-space max-w-2xl mx-auto">
            Transforming complex requirements into elegant technical solutions
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group"
            >
              {/* Glowing Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/30 to-accent/30 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
              
              {/* Card Content */}
              <div className="relative h-full bg-dark/50 backdrop-blur-lg rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all">
                <div className="mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="inline-block p-4 rounded-xl bg-primary/10"
                  >
                    {service.icon}
                  </motion.div>
                </div>
                <h3 className="text-2xl font-orbitron text-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-light/80 font-space leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}