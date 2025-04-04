// components/ContactForm.js
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
  
    async function handleSubmit(e) {
      e.preventDefault();
      setStatus('loading');
  
      const formData = new FormData(e.target);
  
      try {
        const response = await fetch('/api/sendEmail', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.error || 'Failed to send message.');
        }
  
        setStatus('success');
        e.target.reset();
      } catch (err) {
        setError(err.message);
        setStatus('error');
      }
    }

  return (
    <motion.form 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit}
      className="glass-panel p-8 rounded-xl shadow-neon space-y-6"
    >
        <div className="relative">
          <input
            type="text"
            name="name"
            required
            className="w-full bg-glass border-2 border-slate-700 rounded-lg p-4 focus:border-primary focus:outline-none transition-all"
            placeholder="Your Name"
          />
          <div className="absolute inset-0 border-2 border-primary rounded-lg opacity-0 hover:opacity-30 pointer-events-none transition-opacity" />
          </div>
  
          <div className="relative">
              <input
                type="email"
                name="email"
                required
                className="w-full bg-glass border-2 border-slate-700 rounded-lg p-4 focus:border-primary focus:outline-none transition-all"
                placeholder="your@email.com"
              />
          <div className="absolute inset-0 border-2 border-primary rounded-lg opacity-0 hover:opacity-30 pointer-events-none transition-opacity" />
        </div>

        <div className="relative">
          <textarea
            name="message"
            required
            rows={5}
            className="w-full bg-glass border-2 border-slate-700 rounded-lg p-4 focus:border-primary focus:outline-none transition-all"
            placeholder="Your message..."
          />
          <div className="absolute inset-0 border-2 border-primary rounded-lg opacity-0 hover:opacity-30 pointer-events-none transition-opacity" />
        </div>

        <motion.button
          type="submit"
          disabled={status === 'loading'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-8 py-4 rounded-full bg-dark/50 backdrop-blur-lg w-full  border-2 border-primary/30 group"
        >
            <span className="text-xl font-orbitron bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {status === 'loading' ? (
                <>
                  <span className="animate-spin">🌌</span>
                  Sending...
                </>
              ) : (
                'Transmit Message →'
              )}
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>

        {status === 'success' && (
          <div className="text-green-400 text-center">Message sent successfully!</div>
        )}
        {status === 'error' && (
          <div className="text-red-400 text-center">{error || 'Failed to send message'}</div>
        )}
    </motion.form>
  );
}