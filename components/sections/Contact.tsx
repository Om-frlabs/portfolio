'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import NeonButton from '@/components/ui/NeonButton'
import { Download, Mail, Github, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="section-label mb-4 text-center">{'// CONTACT'}</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-center mb-16 neon-text">
            Get In Touch
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resume Download */}
          <ScrollReveal delay={0.1}>
            <GlassCard hover className="text-center py-12 h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center mb-6">
                <Download size={28} className="text-void" />
              </div>
              <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-3">
                Resume
              </h3>
              <p className="text-sm text-text-secondary mb-8 max-w-xs leading-relaxed">
                Download my resume to see my full experience, education, and project details.
              </p>
              <NeonButton href="/resume.pdf" external size="lg">
                <Download size={16} />
                Download Resume
              </NeonButton>
            </GlassCard>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.2}>
            <GlassCard hover className="py-12 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center mb-6">
                  <Mail size={28} className="text-void" />
                </div>
                <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-6">
                  Let&apos;s Connect
                </h3>
              </div>

              <div className="space-y-4 px-4">
                <a
                  href="mailto:omsmishra2015@gmail.com"
                  className="flex items-center gap-4 p-3 rounded-lg border border-glass-border hover:border-neon-cyan-dim hover:bg-glass-hover transition-all group"
                >
                  <Mail size={18} className="text-neon-cyan shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Email</p>
                    <p className="text-sm text-text-secondary group-hover:text-neon-cyan transition-colors">
                      omsmishra2015@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com/Om-frlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg border border-glass-border hover:border-neon-cyan-dim hover:bg-glass-hover transition-all group"
                >
                  <Github size={18} className="text-neon-cyan shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">GitHub</p>
                    <p className="text-sm text-text-secondary group-hover:text-neon-cyan transition-colors">
                      github.com/Om-frlabs
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3 rounded-lg border border-glass-border">
                  <MapPin size={18} className="text-neon-cyan shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Location</p>
                    <p className="text-sm text-text-secondary">
                      Mumbai, India
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
