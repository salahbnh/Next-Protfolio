import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/hero/index'
import Projects from './components/Projects'

function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects/>
    </main>
  )
}

export default Home