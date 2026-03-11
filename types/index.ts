export interface Project {
  id: string
  number: string
  category: string[]
  name: string
  tagline: string
  description: string
  stack: string[]
  liveUrl?: string
  githubUrl: string
  terminalLines: string[]
}

export interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'warning' | 'error' | 'accent'
  text: string
  delay?: number
}

export interface KnowledgeChunk {
  id: string
  content: string
  embedding: number[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface Stat {
  value: string
  label: string
  isInfinity?: boolean
}

export interface Skill {
  category: string
  technologies: string
  level: number
  label: string
}
