'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import TerminalBlock from '@/components/ui/TerminalBlock'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useState, useEffect } from 'react'
import type { Skill } from '@/types'

const SKILLS: Skill[] = [
  { category: 'AI / LLM', technologies: 'OpenAI · Claude · Gemini', level: 85, label: '████████░░ 85%' },
  { category: 'Vector Search', technologies: 'pgvector · Supabase', level: 82, label: '████████░░ 82%' },
  { category: 'Full-Stack', technologies: 'Next.js · Express · Prisma', level: 90, label: '█████████░ 90%' },
  { category: 'Databases', technologies: 'PostgreSQL · SQLite · Supabase', level: 85, label: '████████░░ 85%' },
  { category: 'Security', technologies: 'OWASP · CWE · Pentesting', level: 70, label: '███████░░░ 70%' },
  { category: 'Languages', technologies: 'TypeScript · Python · SQL', level: 88, label: '█████████░ 88%' },
]

const CURRENTLY_BUILDING = [
  '> git status',
  'On branch: main',
  'Building: AXIOM Protocol v0.9',
  'Focus:    AI Agent Identity Layer',
  'Status:   Seed round prep',
  '',
  '> cat currently_learning.txt',
  '- ZK Proofs (PLONK/BN254)',
  '- Graph Neural Networks',
  '- Autonomous Agent Architectures',
]

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const { ref, isVisible } = useScrollReveal()
  const [width, setWidth] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isVisible && mounted) {
      const timer = setTimeout(() => setWidth(skill.level), 200 + delay * 150)
      return () => clearTimeout(timer)
    }
  }, [isVisible, skill.level, delay, mounted])

  return (
    <div ref={ref} className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-neon-cyan w-28 shrink-0">
            {skill.category}
          </span>
          <span className="font-mono text-xs text-text-muted hidden sm:inline">
            {skill.technologies}
          </span>
        </div>
        <span className="font-mono text-xs text-text-muted">
          {mounted && isVisible ? `${skill.level}%` : '0%'}
        </span>
      </div>
      <div className="skill-bar-bg">
        <div
          className="skill-bar-fill"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="section-label mb-4 text-center">{'// SKILLS'}</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-center mb-16 neon-text">
            Tech Stack
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Skill Bars */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-2">
              <div className="font-mono text-xs text-text-muted mb-4 hidden md:flex items-center gap-4">
                <span className="w-28 shrink-0">CATEGORY</span>
                <span className="flex-1">TECHNOLOGIES</span>
                <span>LEVEL</span>
              </div>
              <div className="border-t border-glass-border pt-4">
                {SKILLS.map((skill, i) => (
                  <SkillBar key={skill.category} skill={skill} delay={i} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Currently Building Terminal */}
          <ScrollReveal delay={0.3}>
            <TerminalBlock
              lines={CURRENTLY_BUILDING}
              typingSpeed={20}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
