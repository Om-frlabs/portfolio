import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const embeddingCache: Map<string, number[]> = new Map()

export async function getEmbedding(text: string): Promise<number[]> {
  const cached = embeddingCache.get(text)
  if (cached) return cached

  const model = genAI.getGenerativeModel({ model: 'embedding-001' })
  const result = await model.embedContent(text)
  const embedding = result.embedding.values

  embeddingCache.set(text, embedding)
  return embedding
}

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const results: number[][] = []

  for (const text of texts) {
    const embedding = await getEmbedding(text)
    results.push(embedding)
  }

  return results
}
