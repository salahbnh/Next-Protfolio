// Socials.jsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Socials({ icon, label, href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      className="glass-panel p-6 rounded-lg flex items-center space-x-4 transition-all hover:border-primary"
    >
      <span className="text-2xl text-primary">{icon}</span>
      <span className="font-orbitron text-lg">{label}</span>
    </motion.a>
  );
}
