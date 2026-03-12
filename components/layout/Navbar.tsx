'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import NeonButton from '@/components/ui/NeonButton'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'AXIOM', href: '#axiom' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 100)

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-4 left-4 right-4 z-50 glass-panel px-6 py-3"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Logo */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-neon-cyan font-mono font-bold text-sm hover:opacity-80 transition-opacity"
                aria-label="Scroll to top"
              >
                <span className="text-lg">◈</span>
                <span>OM</span>
              </button>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-6">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="font-mono text-xs uppercase tracking-widest-custom text-text-secondary hover:text-neon-cyan transition-colors focus-visible:outline-2 focus-visible:outline-neon-cyan focus-visible:outline-offset-2"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:block">
                <NeonButton href="/chat" size="sm">
                  Talk to AI →
                </NeonButton>
              </div>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden text-text-secondary hover:text-neon-cyan transition-colors p-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Scroll Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent">
              <div
                className="h-full bg-neon-cyan transition-none"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-72 z-50 glass-panel border-l border-glass-border md:hidden p-8 flex flex-col gap-6"
            >
              <button
                className="self-end text-text-secondary hover:text-neon-cyan transition-colors p-1"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile navigation">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="font-mono text-sm uppercase tracking-widest-custom text-text-secondary hover:text-neon-cyan transition-colors text-left py-2"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-auto">
                <NeonButton href="/chat" size="md" className="w-full justify-center">
                  Talk to AI →
                </NeonButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
