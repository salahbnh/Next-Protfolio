import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/hero/index';
import ScrollReveal from './components/ScrollReveal';
import Footer from './components/footer';
import dynamic from 'next/dynamic';

const Projects = dynamic(()=> import('./components/Project'));
const Skills = dynamic(() => import('./components/skills'));
const ServicesSection = dynamic(() => import('./components/services'));
const ContactSection = dynamic(() => import('./components/contact/ContactSection'));


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
        {/* <ScrollReveal> */}
          <Skills />
        {/* </ScrollReveal> */}
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
