import type { Metadata } from 'next'
import ChatInterface from '@/components/chat/ChatInterface'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chat with Om\'s AI — Om Mishra Portfolio',
  description: 'Talk to an AI trained on Om Mishra\'s portfolio — projects, skills, and experience.',
}

export default function ChatPage() {
  return (
    <div className="min-h-screen p-4">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-neon-cyan transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Portfolio
        </Link>
      </div>

      <ChatInterface />
    </div>
  )
}
