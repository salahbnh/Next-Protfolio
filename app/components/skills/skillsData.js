// Shared skill data — consumed by the 3D SolarSystem scene and the static fallback.
//
// `level` (0..1) drives node size/glow in the 3D scene; `years` and `projects`
// feed the hover info card. Figures are reasonable estimates inferred from the
// portfolio's project set (React/Next-heavy full-stack + AI + some Unity work).
export const FRONTEND = [
  { name: 'React',      icon: '/reactsjs.png',  level: 0.95, years: 4, projects: 9 },
  { name: 'Next.js',    icon: '/nextjs.png',    level: 0.9,  years: 3, projects: 7 },
  { name: 'TypeScript', icon: '/typescript.png',level: 0.8,  years: 3, projects: 6 },
  { name: 'JavaScript', icon: '/js.png',        level: 0.95, years: 5, projects: 12 },
];

export const BACKEND = [
  { name: 'Node.js',    icon: '/nodejs.png',    level: 0.85, years: 4, projects: 8 },
  { name: 'Java',       icon: '/java.png',      level: 0.75, years: 3, projects: 4 },
  { name: 'SpringBoot', icon: '/springboot.png',level: 0.7,  years: 2, projects: 3 },
  { name: 'Firebase',   icon: '/firebase.png',  level: 0.8,  years: 3, projects: 6 },
];

export const TOOLS = [
  { name: 'MongoDB', icon: '/mongodb.png', level: 0.8,  years: 3, projects: 6 },
  { name: 'SQL',     icon: '/sql.png',     level: 0.8,  years: 4, projects: 7 },
  { name: 'Git',     icon: '/git.png',     level: 0.9,  years: 5, projects: 14 },
  { name: 'Unity',   icon: '/unity.png',   level: 0.7,  years: 2, projects: 3 },
  { name: 'C',       icon: '/c.png',       level: 0.65, years: 3, projects: 3 },
  { name: 'C#',      icon: '/c-sharp.png', level: 0.7,  years: 2, projects: 4 },
  { name: 'C++',     icon: '/c++.png',     level: 0.65, years: 2, projects: 3 },
];

export const CATEGORIES = [
  { label: 'FRONTEND', skills: FRONTEND },
  { label: 'BACKEND',  skills: BACKEND },
  { label: 'TOOLS',    skills: TOOLS },
];

export const ALL_ICONS = [...FRONTEND, ...BACKEND, ...TOOLS].map((s) => s.icon);
