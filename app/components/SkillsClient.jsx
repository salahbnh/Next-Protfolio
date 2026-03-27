'use client';

import dynamic from 'next/dynamic';

const Spinner = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Skills = dynamic(() => import('./skills'), {
  loading: () => <Spinner />,
  ssr: false,
});

export default function SkillsClient() {
  return <Skills />;
}
