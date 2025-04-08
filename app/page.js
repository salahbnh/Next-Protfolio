import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/hero/index';
import Projects from './components/Project';
import ScrollReveal from './components/ScrollReveal';
import Skills from './components/skills';
import ServicesSection from './components/services';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/footer';
import GeometricBackground from './components/hero/GeometricBackground';
import QuantumParticles from './components/hero/QuantumParticles';


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
