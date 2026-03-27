import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/hero/index';
import ScrollReveal from './components/ScrollReveal';
import Footer from './components/footer';
import dynamic from 'next/dynamic';
import SkillsClient from './components/SkillsClient';

const Spinner = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Projects = dynamic(() => import('./components/Project'), {
  loading: () => <Spinner />,
});
const ServicesSection = dynamic(() => import('./components/services'), {
  loading: () => <Spinner />,
});
const ContactSection = dynamic(() => import('./components/contact/ContactSection'), {
  loading: () => <Spinner />,
});

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
        <SkillsClient />
      </section>
      <section id="services">
        <ScrollReveal>
          <ServicesSection />
        </ScrollReveal>
      </section>
      <section id="contact">
        <ScrollReveal>
          <ContactSection/>
        </ScrollReveal>
      </section>
      <section id="footer">
        <ScrollReveal>
          <Footer/>
        </ScrollReveal>
      </section>
    </main>
  );
}

export default Home;
