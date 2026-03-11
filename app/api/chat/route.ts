import { GoogleGenerativeAI } from '@google/generative-ai'
import { retrieveRelevantChunks } from '@/lib/rag'

const SYSTEM_PROMPT = `You are Om Mishra's portfolio AI assistant. You answer questions about Om's projects, skills, and background based only on the provided context. Be concise, technically precise, and match Om's tone — direct, knowledgeable, no fluff.

If asked something not in context, say you don't have that information but suggest they check his GitHub at https://github.com/Om-frlabs.

Rules:
- Keep answers under 150 words unless the question demands detail
- Use technical terminology naturally
- Be conversational but professional
- Never make up information not in the context
- If asked about availability, mention he's open to connecting via GitHub`

function buildFallbackResponse(query: string): string {
  const chunks = retrieveRelevantChunks(query, 3)
  const q = query.toLowerCase()

  // Direct answers based on common questions
  if (q.includes('project') || q.includes('built') || q.includes('work')) {
    return `Om has built 5 AI-powered projects:\n\n**PageForge** — AI SaaS that generates landing pages from product descriptions using Claude. Live at om-frlabs.github.io/pageforge\n\n**RAGChat** — Production RAG chatbot supporting 4 AI providers (OpenAI, Gemini, Mistral, Cohere) with pgvector. Live at ragchat-xi.vercel.app\n\n**AI Code Review** — Security audit platform with 30+ CWE checks, CVSS scoring, and AI-powered code rewrites.\n\n**Axiom Feed** — Personalized content intelligence using embedding-based interest vectors with EWMA learning.\n\n**AXIOM Protocol** — Currently in development. Global agent identity and trust layer for autonomous AI.`
  }

  if (q.includes('stack') || q.includes('skill') || q.includes('tech')) {
    return `Om's stack:\n\n**Languages:** TypeScript, Python, SQL\n**Frameworks:** Next.js 14, Express.js, Prisma\n**AI/LLM:** OpenAI, Claude, Gemini, Mistral, Cohere\n**Databases:** PostgreSQL, Supabase, SQLite, pgvector\n**Frontend:** React, Vite, Tailwind CSS, Framer Motion\n**DevOps:** Vercel, Railway, GitHub Actions\n**Security:** OWASP, CWE, penetration testing`
  }

  if (q.includes('ragchat') || q.includes('rag chat')) {
    return `**RAGChat** is a production RAG-powered documentation chatbot. Upload PDFs, scrape URLs, and get streaming AI answers with source citations.\n\nSupports 4 AI providers: OpenAI, Gemini, Mistral, and Cohere. Built on Next.js 14 + Supabase pgvector with SSE streaming.\n\nLive: https://ragchat-xi.vercel.app\nGitHub: https://github.com/Om-frlabs/ragchat`
  }

  if (q.includes('pageforge') || q.includes('landing page')) {
    return `**PageForge** is an AI-powered SaaS landing page builder. Describe your product, and Claude generates a complete, conversion-optimized landing page instantly. No design skills required.\n\nBuilt with Next.js + Claude API.\nLive: https://om-frlabs.github.io/pageforge\nGitHub: https://github.com/Om-frlabs/pageforge`
  }

  if (q.includes('axiom') && (q.includes('protocol') || q.includes('trust') || q.includes('agent'))) {
    return `**AXIOM Protocol** is Om's most ambitious project — a Global Agent Identity and Trust Protocol for autonomous AI agents.\n\nFour-layer architecture: Identity/Registry (Ed25519), Behavioral Telemetry, Reputation Oracle (graph neural networks), and Policy Federation Gateway.\n\nTech: PLONK/BN254 ZK proofs, custom Anchor Policy Language, Python SDK.\n\nCurrently in development under Fr Labs Research Division.`
  }

  if (q.includes('code review') || q.includes('security') || q.includes('audit')) {
    return `**AI Code Review Dashboard** — a full-stack security audit platform.\n\nPaste code or import a GitHub PR and get deep analysis: 30+ CWE vulnerability checks, OWASP Top 10 mapping, CVSS 3.1 scores, exploit scenarios, and a complete AI-rewritten version.\n\nSupports OpenAI, Claude, Gemini, and Grok. Built with React/Vite + Express/SQLite.\n\nGitHub: https://github.com/Om-frlabs/AI-code-review`
  }

  if (q.includes('axiom feed') || q.includes('feed') || q.includes('rss')) {
    return `**Axiom Feed** is a personalized content intelligence platform.\n\nIt ingests RSS feeds, embeds articles with OpenAI, and builds a personal 1536-dim interest vector using EWMA learning from reading behavior. Articles scored by cosine similarity to your taste profile.\n\nBuilt with Next.js 14, PostgreSQL + pgvector, Prisma, NextAuth.\n\nGitHub: https://github.com/Om-frlabs/axiom-feed`
  }

  if (q.includes('who') || q.includes('about') || q.includes('om') || q.includes('mishra')) {
    return `**Om Mishra** is the founder of Fr Labs, an AI infrastructure venture based in Mumbai, India. He's a full-stack AI engineer specializing in RAG systems, LLM integration, vector databases, and AI-powered web applications.\n\nHe's shipped 5 AI projects, integrated 4 LLM providers, and is currently building AXIOM Protocol — a trust layer for autonomous AI agents.\n\nGitHub: https://github.com/Om-frlabs`
  }

  if (q.includes('hire') || q.includes('available') || q.includes('work') || q.includes('contact') || q.includes('connect')) {
    return `Om is open to connecting with technical co-founders, enterprise design partners for AXIOM Protocol, and interesting collaboration opportunities in the AI space.\n\nBest way to reach him: https://github.com/Om-frlabs`
  }

  if (q.includes('fr labs') || q.includes('frlabs')) {
    return `**Fr Labs** is Om Mishra's AI infrastructure venture based in Mumbai, India. The GitHub org is Om-frlabs (https://github.com/Om-frlabs).\n\nFr Labs focuses on AI-powered web applications and infrastructure, with the flagship project being AXIOM Protocol — a trust and identity layer for autonomous AI agents.`
  }

  if (q.includes('different') || q.includes('unique') || q.includes('stand out') || q.includes('special')) {
    return `What sets Om apart: he doesn't just use AI APIs — he builds infrastructure around them. RAGChat supports 4 AI providers with unified embeddings. Axiom Feed uses EWMA learning on embedding vectors for personalization. AXIOM Protocol tackles AI agent trust at the protocol level with ZK proofs.\n\nHe ships production systems, not demos.`
  }

  // Default: return the most relevant chunks as a summary
  if (chunks.length > 0) {
    return chunks.map(c => c.content).join('\n\n')
  }

  return `I can answer questions about Om's projects, skills, and background. Try asking about:\n- His projects (PageForge, RAGChat, AI Code Review, Axiom Feed)\n- His tech stack\n- AXIOM Protocol\n- Fr Labs\n- His availability`
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const latestMessage = messages[messages.length - 1].content
    const relevantChunks = retrieveRelevantChunks(latestMessage, 3)
    const context = relevantChunks.map(c => c.content).join('\n\n---\n\n')

    const encoder = new TextEncoder()

    // Try Gemini first if API key is set
    const apiKey = process.env.GEMINI_API_KEY
    if (apiKey && apiKey.length > 5) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey)

        const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }))

        const model = genAI.getGenerativeModel({
          model: 'gemini-2.0-flash',
          systemInstruction: SYSTEM_PROMPT,
        })

        const chat = model.startChat({ history })
        const augmentedMessage = `Context from Om's portfolio:\n${context}\n\n---\n\nQuestion: ${latestMessage}`
        const result = await chat.sendMessageStream(augmentedMessage)

        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of result.stream) {
                const text = chunk.text()
                if (text) {
                  const data = JSON.stringify({ content: text })
                  controller.enqueue(encoder.encode(`data: ${data}\n\n`))
                }
              }
              controller.enqueue(encoder.encode('data: [DONE]\n\n'))
              controller.close()
            } catch (streamError) {
              // If streaming fails mid-way, close gracefully
              console.error('Stream error, falling back:', streamError)
              const fallback = buildFallbackResponse(latestMessage)
              const data = JSON.stringify({ content: fallback })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
              controller.enqueue(encoder.encode('data: [DONE]\n\n'))
              controller.close()
            }
          },
        })

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          },
        })
      } catch (apiError) {
        console.warn('Gemini API failed, using fallback:', apiError instanceof Error ? apiError.message : 'Unknown')
        // Fall through to offline fallback
      }
    }

    // Offline fallback — no API needed
    const fallbackResponse = buildFallbackResponse(latestMessage)
    const stream = new ReadableStream({
      start(controller) {
        // Simulate streaming by sending word by word
        const words = fallbackResponse.split(' ')
        let i = 0
        const interval = setInterval(() => {
          if (i >= words.length) {
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
            clearInterval(interval)
            return
          }
          const chunk = (i === 0 ? '' : ' ') + words[i]
          const data = JSON.stringify({ content: chunk })
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          i++
        }, 20)
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
