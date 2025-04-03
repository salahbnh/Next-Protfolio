'use client';
import { motion } from 'framer-motion';

export default function ScrollReveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}  // Start 50px below with zero opacity
      whileInView={{ opacity: 1, y: 0 }} // Animate to full opacity and original position
      viewport={{ once: false, amount: 0.3 }} // Trigger when 30% is visible, animate only once
      transition={{ duration: 1.5, ease: 'easeOut' }} // Smooth animation
    >
      {children}
    </motion.div>
  );
}
