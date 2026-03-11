<div align="center">

# ◈ OM MISHRA

### AI Engineer & Full-Stack Developer

**[🔗 Live Site](https://portfolio-om-rose.vercel.app/) · [💬 Talk to My AI](https://portfolio-om-rose.vercel.app/chat) · [🐙 GitHub](https://github.com/Om-frlabs)**

A cyberpunk-aesthetic portfolio site that doesn't just list projects — it lets you **talk to an AI** trained on everything about me.

</div>

---

## ✦ Features

### 🌌 Cyberpunk Design System
- **Glass morphism** cards with neon cyan/purple glows and blur effects
- **Three.js particle field** — 2000 particles with mouse parallax and data-stream connections
- **Scanline overlay** and grid background for cinematic depth
- Fully custom design tokens — zero component libraries

### ⚡ Cinematic Animations
- **Boot sequence** — terminal-style initialization on page load
- **Typewriter glitch** — character-by-character rendering with randomized flicker
- **Scroll-triggered reveals** — every section fades in with staggered timing
- **Animated skill bars** — progress fills on viewport entry
- **Count-up stat cards** — numbers animate from 0

### 🤖 AI-Powered Chatbot
- Ask anything about my projects, skills, or background
- **Gemini 2.0 Flash** for LLM-powered conversational responses
- **Keyword-based RAG retrieval** from a structured knowledge base
- **Offline fallback** — chatbot works without API keys using smart pattern matching
- SSE streaming for real-time response rendering

### 📱 Fully Responsive
- Mobile-first glass navbar with hamburger drawer
- Responsive grid layouts across all sections
- Touch-friendly interactions

---

## ✦ Sections

| Section | Description |
|---------|-------------|
| **Hero** | Particle background, boot sequence, typewriter name, CTAs |
| **About** | Terminal bio with `whoami` / `cat` commands + animated stat cards |
| **Projects** | 4 glass cards with hover-triggered terminal previews |
| **AXIOM Protocol** | Teaser for flagship AI agent trust protocol |
| **Skills** | Animated progress bars + "currently building" terminal |
| **Chat CTA** | Animated chat preview inviting users to talk to the AI |
| **AI Chat** | Full-page chat interface with suggested questions |

---

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Custom CSS Design System |
| **3D** | Three.js (particle field) |
| **Animation** | Framer Motion + CSS keyframes |
| **AI Chat** | Google Gemini 2.0 Flash |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## ✦ Architecture

```
portfolio/
├── app/
│   ├── api/chat/        # Gemini RAG streaming endpoint
│   ├── chat/            # Chat page
│   ├── globals.css      # 330+ line cyberpunk design system
│   ├── layout.tsx       # Root layout with fonts & OG meta
│   ├── page.tsx         # Main page assembly
│   └── not-found.tsx    # Custom 404
├── components/
│   ├── canvas/          # Three.js ParticleField
│   ├── chat/            # ChatInterface, ChatMessage, TypingIndicator
│   ├── layout/          # Navbar with mobile drawer
│   ├── sections/        # Hero, About, Projects, Skills, etc.
│   └── ui/              # GlassCard, NeonButton, TerminalBlock, etc.
├── hooks/               # useTypewriter, useGlitch, useChat, useScrollReveal
├── lib/                 # Knowledge base, RAG retrieval, embeddings
└── types/               # TypeScript interfaces
```

---

## ✦ Getting Started

```bash
# Clone
git clone https://github.com/Om-frlabs/portfolio.git
cd portfolio

# Install
npm install

# Run
npm run dev
```

### Environment Variables (optional)

The chatbot works without API keys using the offline fallback. To enable LLM-powered responses:

```bash
# .env.local
GEMINI_API_KEY=your-gemini-api-key
```

---

## ✦ Projects Featured

| Project | Description | Link |
|---------|------------|------|
| **PageForge** | AI landing page generator powered by Claude | [Live](https://om-frlabs.github.io/pageforge) |
| **RAGChat** | Multi-provider RAG chatbot with pgvector | [Live](https://ragchat-xi.vercel.app) |
| **AI Code Review** | Security audit with 30+ CWE checks & CVSS scoring | [GitHub](https://github.com/Om-frlabs/AI-code-review) |
| **Axiom Feed** | AI content curation with embedding-based interest vectors | [GitHub](https://github.com/Om-frlabs/axiom-feed) |
| **AXIOM Protocol** | Global trust & identity layer for AI agents | *In Development* |

---

<div align="center">

**Built by Om Mishra · Fr Labs · Mumbai, India**

[Live Site](https://portfolio-om-rose.vercel.app/) · [GitHub](https://github.com/Om-frlabs)

</div>
