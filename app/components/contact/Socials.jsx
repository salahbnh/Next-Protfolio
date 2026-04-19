'use client';

export default function Socials({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-panel p-6 rounded-lg flex items-center space-x-4 cursor-pointer"
      style={{ transition: 'transform 0.2s ease, border-color 0.2s', textDecoration: 'none' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.borderColor = 'var(--primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.borderColor = '';
      }}
    >
      <span className="text-2xl text-primary">{icon}</span>
      <span className="font-orbitron text-lg">{label}</span>
    </a>
  );
}
