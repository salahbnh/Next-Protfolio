import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/hero/index';
import Projects from './components/Project';
import ScrollReveal from './components/ScrollReveal';
import Skills from './components/skills';

function Home() {
  return (
    <main>
      <Navbar />
      <section id="home">
        <ScrollReveal>
          <Hero />
        </ScrollReveal>
      </section>
      <section id="projects">
        <ScrollReveal>
          <Projects />
        </ScrollReveal>
      </section>
      <section id="skills">
        <ScrollReveal>
          <Skills />
        </ScrollReveal>
      </section>
    </main>
  );
}

export default Home;
