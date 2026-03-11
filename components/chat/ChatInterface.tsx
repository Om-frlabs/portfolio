'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@/hooks/useChat'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import SuggestedQuestions from './SuggestedQuestions'
import { Send, Square, Trash2 } from 'lucide-react'

export default function ChatInterface() {
  const { messages, isLoading, sendMessage, clearMessages, stopGenerating } = useChat()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    sendMessage(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question)
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-2rem)] max-w-7xl mx-auto gap-4">
      {/* Sidebar */}
      <aside className="lg:w-[30%] glass-panel p-6 overflow-y-auto shrink-0">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse" />
          <h2 className="font-mono text-sm uppercase tracking-widest-custom text-neon-cyan">
            About This AI
          </h2>
        </div>

        <p className="text-sm text-text-secondary mb-6 leading-relaxed">
          This AI is trained on Om&apos;s portfolio data — his projects, skills,
          experience, and background. Ask anything about his work.
        </p>

        <div className="border-t border-glass-border pt-4 mb-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-3">
            Suggested Questions
          </p>
          <SuggestedQuestions
            onSelect={handleSuggestedQuestion}
            disabled={isLoading}
          />
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="flex items-center gap-2 mt-4 font-mono text-xs text-text-muted hover:text-neon-red transition-colors"
          >
            <Trash2 size={12} />
            Clear conversation
          </button>
        )}
      </aside>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col glass-panel overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-void">◈</span>
              </div>
              <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-2">
                Om&apos;s AI Assistant
              </h3>
              <p className="text-sm text-text-secondary max-w-sm">
                Ask me anything about Om&apos;s projects, skills, or experience.
                I&apos;ll answer based on his portfolio data.
              </p>
            </div>
          )}

          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-glass-border p-4">
          <div className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Om's projects, skills, or experience..."
              className="flex-1 bg-transparent border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted resize-none font-display focus:outline-none focus:border-neon-cyan-dim transition-colors min-h-[48px] max-h-32"
              rows={1}
              disabled={isLoading}
              aria-label="Chat message input"
            />

            {isLoading ? (
              <button
                onClick={stopGenerating}
                className="shrink-0 w-12 h-12 rounded-xl border border-neon-red/30 flex items-center justify-center text-neon-red hover:bg-neon-red/10 transition-colors"
                aria-label="Stop generating"
              >
                <Square size={16} />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-void hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
