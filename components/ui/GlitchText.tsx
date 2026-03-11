'use client'

import { useGlitch } from '@/hooks/useGlitch'
import { useState } from 'react'

interface GlitchTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
  className?: string
  hoverTrigger?: boolean
}

export default function GlitchText({
  text,
  as: Tag = 'span',
  className = '',
  hoverTrigger = true,
}: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { displayText, startGlitch } = useGlitch(text, {
    trigger: isHovered,
    iterations: 3,
    speed: 30,
  })

  return (
    <Tag
      className={className}
      onMouseEnter={() => {
        if (hoverTrigger) {
          setIsHovered(true)
          setTimeout(() => setIsHovered(false), 100)
        }
      }}
      onClick={() => {
        if (!hoverTrigger) startGlitch()
      }}
    >
      {displayText}
    </Tag>
  )
}
