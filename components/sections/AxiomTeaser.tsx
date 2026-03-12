'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import NeonButton from '@/components/ui/NeonButton'

export default function AxiomTeaser() {
  return (
    <section id="axiom" className="relative py-24 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <GlassCard
            className="relative overflow-hidden circuit-pattern text-center py-16 md:py-20 border-[rgba(191,0,255,0.2)]"
            hover
          >
            {/* Purple glow accents */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-purple/30 bg-neon-purple/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-neon-purple-dim">
                In Development
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mb-4 neon-text-purple text-neon-purple">
              AXIOM Protocol
            </h2>

            {/* Subtitle */}
            <p className="font-mono text-sm md:text-base text-text-secondary mb-6 max-w-2xl mx-auto">
              Global Agent Identity & Trust Layer for Autonomous AI
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
              Building the trust infrastructure for a world where AI agents operate across organizational boundaries.
            </p>

            {/* Credits */}
            <p className="font-mono text-xs text-text-muted mb-8">
              Fr Labs Research Division · Est. 2025
            </p>

            {/* CTA */}
            <NeonButton
              href="https://fr-labs-dev.github.io/axiom/"
              external
              variant="ghost"
              className="border-neon-purple/30 text-neon-purple-dim hover:border-neon-purple hover:text-neon-purple"
            >
              Explore AXIOM →
            </NeonButton>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  )
}
