'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import GlitchText from '@/components/ui/GlitchText'
import TechBadge from '@/components/ui/TechBadge'
import NeonButton from '@/components/ui/NeonButton'
import TerminalBlock from '@/components/ui/TerminalBlock'
import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/types'

const PROJECTS: Project[] = [
  {
    id: 'pageforge',
    number: '01',
    category: ['SaaS', 'AI', 'Landing Pages'],
    name: 'PageForge',
    tagline: 'Describe your product. Get a production-ready landing page.',
    description:
      'AI-powered SaaS landing page builder that transforms a simple product description into a fully designed, conversion-optimized landing page in seconds. Combines Claude\'s copywriting intelligence with dynamic layout generation — no design skills required.',
    stack: ['Next.js', 'Claude API', 'TypeScript', 'GitHub Pages'],
    liveUrl: 'https://om-frlabs.github.io/pageforge',
    githubUrl: 'https://github.com/Om-frlabs/pageforge',
    terminalLines: [
      '> pageforge generate',
      '✦ Analyzing product description...',
      '✦ Generating copy with Claude...',
      '✦ Building layout...',
      '✓ Landing page ready in 3.2s',
    ],
  },
  {
    id: 'ragchat',
    number: '02',
    category: ['RAG', 'Vector DB', 'Chatbot'],
    name: 'RAGChat',
    tagline: 'Upload any document. Talk to it.',
    description:
      'Production RAG chatbot supporting 4 AI providers (OpenAI, Gemini, Mistral, Cohere). Upload PDFs, scrape URLs, and get streaming AI answers with source citations. Built on Supabase pgvector with multi-provider embedding columns and SSE streaming.',
    stack: ['Next.js 14', 'Supabase pgvector', 'OpenAI', 'Gemini', 'Mistral', 'Cohere'],
    liveUrl: 'https://ragchat-xi.vercel.app',
    githubUrl: 'https://github.com/Om-frlabs/ragchat',
    terminalLines: [
      '> ragchat upload resume.pdf',
      '✦ Extracting text... 1,847 words',
      '✦ Chunking → 12 segments',
      '✦ Embedding with Cohere...',
      '✓ Indexed. Ask anything.',
      '> what are his skills?',
      '◈ Streaming response...',
    ],
  },
  {
    id: 'codereview',
    number: '03',
    category: ['Security', 'DevTools', 'LLM'],
    name: 'AI Code Review',
    tagline: '30+ CWE checks. CVSS scoring. Production rewrite. One click.',
    description:
      'Full-stack AI security audit platform. Paste code or import a GitHub PR and get deep vulnerability detection across 30+ CWE categories with OWASP mapping, CVSS 3.1 scores, exploit scenarios, and a complete AI-rewritten version of your code.',
    stack: ['React', 'Vite', 'Express', 'SQLite', 'OpenAI', 'Claude', 'Gemini', 'Grok'],
    githubUrl: 'https://github.com/Om-frlabs/AI-code-review',
    terminalLines: [
      '> review auth.js --provider claude',
      '✦ Scanning 847 lines...',
      '⚠ CWE-798: Hardcoded credentials L:42',
      '⚠ CWE-89: SQL injection L:91',
      '✦ CVSS Score: 8.4 (HIGH)',
      '✓ Generating secure rewrite...',
    ],
  },
  {
    id: 'axiomfeed',
    number: '04',
    category: ['AI Curation', 'Embeddings', 'RSS'],
    name: 'Axiom Feed',
    tagline: 'A feed that learns you. Not an algorithm — a model.',
    description:
      'Personalized content intelligence platform. Ingests RSS feeds, embeds articles with pgvector, and builds a personal interest vector from your reading behavior using EWMA learning. Every article is scored by cosine similarity to your evolving taste profile.',
    stack: ['Next.js 14', 'PostgreSQL', 'pgvector', 'OpenAI', 'Prisma', 'NextAuth'],
    githubUrl: 'https://github.com/Om-frlabs/axiom-feed',
    terminalLines: [
      '> axiom-feed analyze --user om',
      '✦ Interest vector: 1536 dims',
      '✦ Top topics: AI/ML (94%) Security (87%)',
      '✦ Ranking 847 articles...',
      '✓ Feed personalized. Score: 9.2/10',
    ],
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <ScrollReveal delay={index * 0.15}>
      <GlassCard
        hover
        as="article"
        className="group relative overflow-hidden"
        padding={false}
      >
        <div
          className="p-6 md:p-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <span className="font-mono text-xs text-text-muted">{project.number}</span>
            <div className="flex gap-2 flex-wrap justify-end">
              {project.category.map(cat => (
                <span
                  key={cat}
                  className="font-mono text-[10px] uppercase tracking-wider text-neon-cyan border border-glass-border px-2 py-0.5 rounded"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Name */}
          <GlitchText
            text={project.name}
            as="h3"
            className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-text-primary mb-2 cursor-pointer"
          />

          {/* Tagline */}
          <p className="font-mono text-sm text-neon-cyan-dim mb-3">
            {project.tagline}
          </p>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map(tech => (
              <TechBadge key={tech} label={tech} />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {project.liveUrl && (
              <NeonButton href={project.liveUrl} external size="sm">
                <ExternalLink size={14} />
                View Live
              </NeonButton>
            )}
            <NeonButton href={project.githubUrl} external variant="ghost" size="sm">
              <Github size={14} />
              GitHub
            </NeonButton>
          </div>

          {/* Terminal Preview — shown on hover */}
          <div
            className={`mt-6 transition-all duration-300 ${
              isHovered ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'
            } overflow-hidden`}
          >
            <TerminalBlock
              lines={project.terminalLines}
              typingSpeed={30}
              autoStart={isHovered}
              triggerOnScroll={false}
            />
          </div>
        </div>
      </GlassCard>
    </ScrollReveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="section-label mb-4 text-center">{'// PROJECTS'}</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-center mb-16 neon-text">
            What I&apos;ve Built
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
