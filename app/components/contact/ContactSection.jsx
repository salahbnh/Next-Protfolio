"use client"
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from 'react-icons/fa';
import ContactForm from './ContactForm';
import Socials from './Socials';
import { motion } from 'framer-motion';


export default function ContactSection() {
  return (
    <section id="contact" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 glass-effect">
      <div className="max-w-7xl mx-auto">
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron text-gradient mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-light/80 font-space max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Drop me a message and I'll get back to you faster than a quantum particle!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Social Links */}
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-xl shadow-neon">
              <h3 className="text-2xl font-orbitron mb-6 text-primary">Find Me in the Metaverse</h3>
              <div className="grid grid-cols-2 gap-4">
                <Socials
                  icon={<FaGithub />} 
                  label="GitHub" 
                  href="https://github.com/salahbnh" 
                />
                <Socials
                  icon={<FaLinkedin />} 
                  label="LinkedIn" 
                  href="https://www.linkedin.com/in/salah-bounouh-1426ba27b/" 
                />
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

