'use client'

import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface TerminalBlockProps {
  lines: string[]
  typingSpeed?: number
  className?: string
  autoStart?: boolean
  triggerOnScroll?: boolean
}

export default function TerminalBlock({
  lines,
  typingSpeed = 25,
  className = '',
  autoStart = false,
  triggerOnScroll = true,
}: TerminalBlockProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [mounted, setMounted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const shouldStart = autoStart || (triggerOnScroll && isVisible)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !shouldStart || isComplete) return
    if (currentLineIndex >= lines.length) {
      setIsComplete(true)
      return
    }

    const currentLine = lines[currentLineIndex]

    if (currentCharIndex < currentLine.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedLines(prev => {
          const updated = [...prev]
          updated[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
          return updated
        })
        setCurrentCharIndex(prev => prev + 1)
      }, typingSpeed)
    } else {
      timerRef.current = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
        setDisplayedLines(prev => [...prev, ''])
      }, 200)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [mounted, shouldStart, currentLineIndex, currentCharIndex, lines, typingSpeed, isComplete])

  const colorLine = (line: string) => {
    if (line.startsWith('> ')) {
      return (
        <>
          <span className="prompt">{`> `}</span>
          <span className="command">{line.slice(2)}</span>
        </>
      )
    }
    if (line.startsWith('✓ ') || line.startsWith('✓')) {
      return <span className="success">{line}</span>
    }
    if (line.startsWith('⚠ ') || line.startsWith('⚠')) {
      return <span className="warning">{line}</span>
    }
    if (line.startsWith('✦ ') || line.startsWith('◈')) {
      return <span className="accent">{line}</span>
    }
    if (line.startsWith('$ ')) {
      return (
        <>
          <span className="prompt">{'$ '}</span>
          <span className="command">{line.slice(2)}</span>
        </>
      )
    }
    return <span className="output">{line}</span>
  }

  return (
    <div ref={ref} className={`terminal-block ${className}`}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[rgba(0,240,255,0.1)]">
        <div className="w-3 h-3 rounded-full bg-neon-red opacity-80" />
        <div className="w-3 h-3 rounded-full bg-[#ffaa00] opacity-80" />
        <div className="w-3 h-3 rounded-full bg-neon-green opacity-80" />
        <span className="ml-2 text-text-muted text-xs font-mono">terminal</span>
      </div>
      <pre className="whitespace-pre-wrap">
        {displayedLines.map((line, i) => (
          <div key={i}>{colorLine(line)}</div>
        ))}
        {!isComplete && mounted && shouldStart && (
          <span className="terminal-cursor" />
        )}
      </pre>
    </div>
  )
}
