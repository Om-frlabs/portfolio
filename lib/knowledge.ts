import type { KnowledgeChunk } from '@/types'

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'bio',
    content: `Om Mishra is the founder of Fr Labs, an AI infrastructure venture based in Mumbai, India. He is a full-stack AI engineer specializing in RAG systems, LLM integration, vector databases, and AI-powered web applications. He works on an Asus TUF F17 (i5 11th gen, RTX 3050) and has deep interests in cybersecurity, NLP, and autonomous agent architectures.`,
    embedding: [],
  },
  {
    id: 'pageforge',
    content: `PageForge is an AI-powered SaaS landing page builder. Users describe their product and Claude generates a complete, conversion-optimized landing page instantly. Built with Next.js and deployed on GitHub Pages. Live at: https://om-frlabs.github.io/pageforge`,
    embedding: [],
  },
  {
    id: 'ragchat',
    content: `RAGChat is a production RAG-powered documentation chatbot supporting 4 AI providers: OpenAI (text-embedding-3-small + GPT-4o), Gemini (text-embedding-004 + gemini-2.0-flash), Mistral (mistral-embed + mistral-large-latest), and Cohere (embed-english-v3.0 + command-r-plus). Features multi-file PDF upload, URL scraping via Cheerio, SSE streaming, source citations, and a resizable sidebar. Built on Next.js 14 and Supabase pgvector. Live at: https://ragchat-xi.vercel.app`,
    embedding: [],
  },
  {
    id: 'codereview',
    content: `AI Code Review Dashboard is a full-stack security audit tool. Paste code or import a GitHub PR to get deep analysis including: 30+ CWE vulnerability checks, OWASP Top 10 mapping, CVSS 3.1 base scores, exploit scenarios, before/after code comparisons, 4 code quality metrics, and a complete AI-rewritten version. Supports OpenAI, Claude, Gemini, and Grok. Built with React/Vite frontend and Express/SQLite backend with SSE streaming. GitHub: https://github.com/Om-frlabs/AI-code-review`,
    embedding: [],
  },
  {
    id: 'axiomfeed',
    content: `Axiom Feed is a personalized AI content intelligence platform. It ingests RSS feeds, embeds articles using OpenAI text-embedding-3-small, and builds a personal 1536-dimensional interest vector for each user using EWMA (exponentially weighted moving average) learning from reading behavior. Articles are scored by cosine similarity to the user's interest vector combined with recency decay. Built with Next.js 14, PostgreSQL + pgvector, Prisma, and NextAuth. GitHub: https://github.com/Om-frlabs/axiom-feed`,
    embedding: [],
  },
  {
    id: 'axiom_protocol',
    content: `AXIOM Protocol is Om's most ambitious project — a Global Agent Identity and Trust Protocol for autonomous AI agents. It's a four-layer architecture: Identity/Registry (Ed25519 signatures), Behavioral Telemetry, Reputation Oracle (graph neural networks), and Policy Federation Gateway. Technical specs include PLONK/BN254 ZK proofs, a custom Anchor Policy Language (APL), and Python SDK. Currently in development under Fr Labs Research Division, targeting technical co-founders, enterprise design partners, and seed investors. Website: https://fr-labs-dev.github.io/axiom/`,
    embedding: [],
  },
  {
    id: 'skills',
    content: `Om's technical skills: TypeScript, Python, SQL (expert). Next.js 14 App Router, Express.js, Prisma ORM (expert). OpenAI API, Anthropic Claude API, Google Gemini API, Mistral API, Cohere API (advanced). PostgreSQL, Supabase, SQLite, pgvector (advanced). RAG systems, vector embeddings, semantic search (advanced). Cybersecurity, OWASP, CWE, penetration testing (intermediate). React, Vite, Tailwind CSS, Framer Motion (advanced). Git, GitHub Actions, Vercel, Railway deployment (advanced). Kali Linux, VMware (intermediate).`,
    embedding: [],
  },
  {
    id: 'frlabs',
    content: `Fr Labs is Om Mishra's AI infrastructure venture based in Mumbai, India. The GitHub organization is Om-frlabs (https://github.com/Om-frlabs). Fr Labs focuses on building AI-powered web applications and infrastructure, with the flagship project being AXIOM Protocol — a trust and identity layer for autonomous AI agents.`,
    embedding: [],
  },
  {
    id: 'availability',
    content: `Om Mishra is the founder of Fr Labs and is focused on building AI infrastructure products. He is open to connecting with technical co-founders, enterprise design partners for AXIOM Protocol, and interesting collaboration opportunities in the AI space. Contact via GitHub: https://github.com/Om-frlabs`,
    embedding: [],
  },
]
