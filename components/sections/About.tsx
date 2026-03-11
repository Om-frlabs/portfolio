'use client'

import { useEffect, useState } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import TerminalBlock from '@/components/ui/TerminalBlock'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const TERMINAL_LINES = [
  '> whoami',
  'Om Mishra — AI Engineer, Mumbai',
  '',
  '> cat skills.txt',
  'Languages:    TypeScript · Python · SQL',
  'Frameworks:   Next.js · Express · Prisma',
  'AI Stack:     OpenAI · Claude · Gemini · Cohere',
  'Databases:    PostgreSQL · Supabase · SQLite',
  'Vector DB:    pgvector',
  'DevOps:       Vercel · Railway · GitHub Actions',
  '',
  '> cat interests.txt',
  'Cybersecurity · NLP · AI Infrastructure ·',
  'Autonomous Agents · Full-Stack Architecture',
  '',
  '> ls fr-labs/',
  'AXIOM-Protocol/   RAGChat/',
  'PageForge/        AI-Code-Review/',
  'Axiom-Feed/',
]

interface StatCardProps {
  value: string
  label: string
  delay: number
  isInfinity?: boolean
}

function StatCard({ value, label, delay, isInfinity = false }: StatCardProps) {
  const { ref, isVisible } = useScrollReveal()
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const numValue = parseInt(value)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isVisible || isInfinity || !mounted) return

    const duration = 1200
    const steps = 30
    const stepDuration = duration / steps
    const increment = numValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numValue) {
        setCount(numValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, numValue, isInfinity, mounted])

  return (
    <ScrollReveal delay={delay}>
      <div ref={ref}>
        <GlassCard hover className="text-center">
          <div className="text-4xl md:text-5xl font-mono font-bold text-neon-cyan neon-text mb-2">
            {isInfinity ? '∞' : (mounted && isVisible ? count : 0)}
          </div>
          <div className="font-mono text-xs uppercase tracking-widest-custom text-text-secondary">
            {label}
          </div>
        </GlassCard>
      </div>
    </ScrollReveal>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="section-label mb-12 text-center">{'// ABOUT'}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Terminal Bio */}
          <ScrollReveal delay={0.1}>
            <TerminalBlock
              lines={TERMINAL_LINES}
              typingSpeed={15}
            />
          </ScrollReveal>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 content-start">
            <StatCard value="5" label="AI Projects Shipped" delay={0.2} />
            <StatCard value="4" label="LLM Providers Integrated" delay={0.3} />
            <StatCard value="1" label="Protocol in Development" delay={0.4} />
            <StatCard value="∞" label="Problems to Solve" delay={0.5} isInfinity />
          </div>
        </div>
      </div>
    </section>
  )
}
