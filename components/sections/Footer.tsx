import { Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 border-t border-glass-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight mb-2 text-text-primary">
          Om Mishra
        </h2>
        <p className="font-mono text-sm text-text-secondary mb-8">
          Fr Labs · Mumbai, India
        </p>

        {/* Links */}
        <div className="flex justify-center gap-6 mb-10">
          <a
            href="https://github.com/Om-frlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-neon-cyan transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
            GitHub
          </a>
          <a
            href="mailto:om@frlabs.dev"
            className="flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-neon-cyan transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
            Email
          </a>
        </div>

        {/* Credits */}
        <p className="font-mono text-xs text-text-muted leading-relaxed">
          Built with Next.js · Claude API · Deployed on Vercel
        </p>
        <p className="font-mono text-xs text-text-muted mt-1">
          © 2025 Om Mishra · Fr Labs
        </p>
      </div>
    </footer>
  )
}
