import { KNOWLEDGE_BASE } from './knowledge'
import type { KnowledgeChunk } from '@/types'

export function retrieveRelevantChunks(
  query: string,
  topK: number = 3
): KnowledgeChunk[] {
  const queryLower = query.toLowerCase()

  // Score each chunk by keyword relevance
  const scored = KNOWLEDGE_BASE.map(chunk => {
    const contentLower = chunk.content.toLowerCase()
    let score = 0

    // Split query into words and check presence
    const words = queryLower.split(/\s+/).filter(w => w.length > 2)
    for (const word of words) {
      if (contentLower.includes(word)) score += 1
    }

    // Boost for ID match (e.g. "pageforge", "ragchat", "skills")
    if (contentLower.includes(queryLower) || chunk.id.includes(queryLower)) {
      score += 5
    }

    // Boost for key terms
    const boostTerms: Record<string, string[]> = {
      'bio': ['who', 'about', 'background', 'om', 'mishra', 'founder'],
      'skills': ['skill', 'stack', 'tech', 'language', 'framework', 'tool'],
      'pageforge': ['pageforge', 'landing', 'page', 'saas'],
      'ragchat': ['ragchat', 'rag', 'chat', 'document', 'upload', 'pdf'],
      'codereview': ['code', 'review', 'security', 'audit', 'cwe', 'vulnerability'],
      'axiomfeed': ['axiom feed', 'feed', 'rss', 'personali', 'content'],
      'axiom_protocol': ['axiom', 'protocol', 'agent', 'trust', 'identity'],
      'frlabs': ['fr labs', 'frlabs', 'organization', 'company', 'venture'],
      'availability': ['available', 'hire', 'work', 'contact', 'connect', 'collaborate'],
    }

    for (const [id, terms] of Object.entries(boostTerms)) {
      if (chunk.id === id) {
        for (const term of terms) {
          if (queryLower.includes(term)) score += 3
        }
      }
    }

    return { chunk, score }
  })

  scored.sort((a, b) => b.score - a.score)

  // If no strong match, return bio + skills + most relevant
  if (scored[0].score === 0) {
    return KNOWLEDGE_BASE.filter(c => ['bio', 'skills', 'frlabs'].includes(c.id))
  }

  return scored.slice(0, topK).map(s => s.chunk)
}
