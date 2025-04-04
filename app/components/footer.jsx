// components/Footer.js
"use client"
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaRegEnvelope, FaRocket, FaTwitter, FaDiscord} from 'react-icons/fa';
import { RiShieldStarLine } from 'react-icons/ri';

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800 mt-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0ea5e911] to-transparent opacity-30 animate-waves" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16 relative">
        {/* Floating logo */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 group">
            <RiShieldStarLine className="text-4xl text-primary neon-pulse" />
            <span className="font-orbitron text-2xl text-gradient">PORTFOLIO OS</span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary to-transparent ml-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Contact block */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="font-orbitron text-lg text-primary mb-4">Transmission Hub</h3>
            <div className="space-y-3">
              <a href="mailto:salah.bounouh420@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                <FaRegEnvelope className="flex-shrink-0" />
                <span className="truncate">salah.bounouh420@gmail.com</span>
              </a>
              <div className="flex items-center gap-3">
                <FaRocket className="flex-shrink-0 text-accent" />
                <span>Based in Digital Space</span>
              </div>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-orbitron text-lg text-primary mb-4">Quantum Links</h3>
            <div className="flex gap-6">
              <SocialIcon href="https://github.com" icon={<FaGithub />} />
              <SocialIcon href="https://linkedin.com" icon={<FaLinkedin />} />
              <SocialIcon href="https://twitter.com" icon={<FaTwitter />} />
              <SocialIcon href="https://discord.com" icon={<FaDiscord />} />
            </div>
          </motion.div>

          {/* Security badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-6 rounded-lg flex items-center gap-4"
          >
            <RiShieldStarLine className="text-3xl text-primary flex-shrink-0" />
            <div>
              <p className="font-orbitron text-sm">System Secure</p>
              <p className="text-xs opacity-75">256-bit Encryption Active</p>
            </div>
          </motion.div>
        </div>

        {/* Copyright + Animated border */}
        <div className="border-t border-slate-800 pt-8 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <p className="text-sm opacity-75">
            &copy; {new Date().getFullYear()} Quantum Portfolio OS. All systems nominal.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      className="p-3 rounded-lg glass-panel hover:border-primary transition-all"
    >
      {icon}
    </motion.a>
  );
}