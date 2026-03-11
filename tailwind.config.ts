import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'void': '#020408',
        'deep': '#050a12',
        'panel': 'rgba(8,16,32,0.8)',
        'glass': 'rgba(12,24,48,0.6)',
        'glass-border': 'rgba(0,240,255,0.15)',
        'glass-hover': 'rgba(0,240,255,0.08)',
        'neon-cyan': '#00f0ff',
        'neon-cyan-dim': 'rgba(0,240,255,0.6)',
        'neon-cyan-glow': 'rgba(0,240,255,0.15)',
        'neon-purple': '#bf00ff',
        'neon-purple-dim': 'rgba(191,0,255,0.6)',
        'neon-green': '#00ff88',
        'neon-red': '#ff0055',
        'text-primary': '#e8f4ff',
        'text-secondary': '#7ab8d4',
        'text-muted': '#3a6080',
        'text-code': '#00f0ff',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'heartbeat': 'heartbeat 2s ease-in-out infinite',
        'bounce-down': 'bounceDown 2s ease-in-out infinite',
        'typing-dots': 'typingDots 1.4s ease-in-out infinite',
        'scroll-up': 'scrollUp 20s linear infinite',
      },
      letterSpacing: {
        'widest-custom': '0.3em',
      },
    },
  },
  plugins: [],
}
export default config
