'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import NeonButton from '@/components/ui/NeonButton'
import { MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

const SAMPLE_MESSAGES = [
  { role: 'user' as const, text: "What's Om's AI stack?" },
  {
    role: 'ai' as const,
    text: 'Om works with OpenAI, Claude, Gemini, and Cohere — primarily building RAG systems with pgvector on Supabase.',
  },
  { role: 'user' as const, text: 'Tell me about PageForge' },
  {
    role: 'ai' as const,
    text: 'PageForge is an AI-powered SaaS that generates production-ready landing pages from a product description using Claude.',
  },
]

export default function ChatCTA() {
  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <p className="section-label mb-4">{'// AI ASSISTANT'}</p>

          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
              <MessageSquare size={28} className="text-void" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-4 neon-text">
            Ask My AI
          </h2>

          <p className="text-lg text-text-primary mb-2">
            Don&apos;t read my resume. <span className="text-neon-cyan">Talk to it.</span>
          </p>

          <p className="text-base text-text-secondary max-w-xl mx-auto mb-12 leading-relaxed">
            My portfolio has a built-in AI trained on everything about me — my projects, skills, experience, and thinking.
          </p>
        </ScrollReveal>

        {/* Animated Chat Preview */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-lg mx-auto mb-12 space-y-3">
            {SAMPLE_MESSAGES.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 text-sm text-left ${
                    msg.role === 'user'
                      ? 'chat-message-user'
                      : 'chat-message-ai'
                  }`}
                >
                  {msg.role === 'ai' && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neon-purple-dim block mb-1">
                      OM AI
                    </span>
                  )}
                  <span className="text-text-secondary">{msg.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <NeonButton href="/chat" size="lg">
            Start Conversation →
          </NeonButton>
        </ScrollReveal>
      </div>
    </section>
  )
}
