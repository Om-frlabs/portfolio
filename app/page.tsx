'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import AxiomTeaser from '@/components/sections/AxiomTeaser'
import Skills from '@/components/sections/Skills'
import ChatCTA from '@/components/sections/ChatCTA'
import Footer from '@/components/sections/Footer'

const ParticleField = dynamic(
  () => import('@/components/canvas/ParticleField'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <ParticleField />
      <div className="grid-overlay" />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <AxiomTeaser />
        <Skills />
        <ChatCTA />
      </main>

      <Footer />
    </>
  )
}
