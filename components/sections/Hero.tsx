'use client'

import { useTypewriter } from '@/hooks/useTypewriter'
import NeonButton from '@/components/ui/NeonButton'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const BOOT_LINES = [
  '> LOADING IDENTITY MODULE...',
  '> AUTHENTICATING CREDENTIALS...',
  '> INITIALIZING PROFILE...',
]

const CODE_SNIPPET = `const engineer = {
  name: "Om Mishra",
  focus: ["AI/ML", "RAG", "Full-Stack"],
  building: "Fr Labs",
  status: "shipping"
}`

export default function Hero() {
  const { displayText: nameText, isComplete: nameComplete } = useTypewriter('Om Mishra', {
    speed: 60,
    glitchDuration: 80,
    startDelay: 2000,
  })

  const [bootIndex, setBootIndex] = useState(-1)
  const [bootLines, setBootLines] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Boot sequence
  useEffect(() => {
    if (!mounted) return

    const timers: NodeJS.Timeout[] = []
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setBootIndex(i)
          setBootLines(prev => [...prev, line])
        }, 400 + i * 500)
      )
    })

    return () => timers.forEach(t => clearTimeout(t))
  }, [mounted])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center"
    >
      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center gap-4 mb-8 flex-wrap justify-center"
      >
        <span className="flex items-center gap-2 font-mono text-xs text-text-secondary">
          <span className="status-dot" />
          ONLINE
        </span>
        <span className="font-mono text-xs text-text-muted">|</span>
        <span className="font-mono text-xs text-neon-cyan">Fr Labs</span>
        <span className="font-mono text-xs text-text-muted">|</span>
        <span className="font-mono text-xs text-text-secondary">Mumbai, IN</span>
      </motion.div>

      {/* Boot Sequence */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-6 min-h-[80px]"
      >
        {mounted && bootLines.map((line, i) => (
          <div
            key={i}
            className="font-mono text-xs text-text-muted tracking-wide"
          >
            {line}
          </div>
        ))}
        {bootIndex >= BOOT_LINES.length - 1 && mounted && (
          <div className="font-mono text-sm text-neon-cyan mt-2">
            {'< PROFILE INITIALIZED >'}
          </div>
        )}
      </motion.div>

      {/* Name — Typewriter Glitch */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tight mb-4 neon-text min-h-[1.2em]">
        {mounted ? nameText : 'Om Mishra'}
        {mounted && !nameComplete && (
          <span className="terminal-cursor ml-1" />
        )}
      </h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: nameComplete ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-sm md:text-base uppercase tracking-widest-custom text-text-secondary mb-8"
      >
        AI ENGINEER & FULL-STACK DEVELOPER
      </motion.p>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: nameComplete ? 1 : 0, y: nameComplete ? 0 : 10 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg md:text-xl text-text-secondary max-w-xl mb-12 leading-relaxed"
      >
        Building AI infrastructure that doesn&apos;t just work —
        <br className="hidden sm:block" />
        <span className="text-text-primary font-medium">it thinks.</span>
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: nameComplete ? 1 : 0, y: nameComplete ? 0 : 10 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <NeonButton
          onClick={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Explore Work ↓
        </NeonButton>
        <NeonButton variant="ghost" href="/chat">
          Talk to my AI ↗
        </NeonButton>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: nameComplete ? 0.6 : 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown
          size={24}
          className="text-text-muted animate-bounce-down"
        />
      </motion.div>

      {/* Floating Code Snippet */}
      <div className="hidden lg:block absolute bottom-20 right-8 w-72 overflow-hidden h-64 opacity-20 pointer-events-none">
        <pre className="floating-code font-mono text-xs text-neon-cyan leading-relaxed whitespace-pre">
          {CODE_SNIPPET}
        </pre>
      </div>
    </section>
  )
}
