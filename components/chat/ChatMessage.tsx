import type { ChatMessage as ChatMessageType } from '@/types'

interface ChatMessageProps {
  message: ChatMessageType
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] px-5 py-4 ${
          isUser ? 'chat-message-user' : 'chat-message-ai'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-neon-purple-dim">
              OM AI
            </span>
          </div>
        )}

        <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>

        <div className={`mt-2 font-mono text-[10px] ${isUser ? 'text-right' : ''} text-text-muted`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  )
}
