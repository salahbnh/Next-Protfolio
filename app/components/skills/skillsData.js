// Shared skill data — consumed by the 3D SolarSystem scene and the static fallback.
export const FRONTEND = [
  { name: 'React',      icon: '/reactsjs.png' },
  { name: 'Next.js',    icon: '/nextjs.png' },
  { name: 'TypeScript', icon: '/typescript.png' },
  { name: 'JavaScript', icon: '/js.png' },
];

export const BACKEND = [
  { name: 'Node.js',    icon: '/nodejs.png' },
  { name: 'Java',       icon: '/java.png' },
  { name: 'SpringBoot', icon: '/springboot.png' },
  { name: 'Firebase',   icon: '/firebase.png' },
];

export const TOOLS = [
  { name: 'MongoDB', icon: '/mongodb.png' },
  { name: 'SQL',     icon: '/sql.png' },
  { name: 'Git',     icon: '/git.png' },
  { name: 'Unity',   icon: '/unity.png' },
  { name: 'C',       icon: '/c.png' },
  { name: 'C#',      icon: '/c-sharp.png' },
  { name: 'C++',     icon: '/c++.png' },
];

export const CATEGORIES = [
  { label: 'FRONTEND', skills: FRONTEND },
  { label: 'BACKEND',  skills: BACKEND },
  { label: 'TOOLS',    skills: TOOLS },
];

export const ALL_ICONS = [...FRONTEND, ...BACKEND, ...TOOLS].map((s) => s.icon);
