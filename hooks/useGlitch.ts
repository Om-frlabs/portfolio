'use client'

import { useState, useEffect, useCallback } from 'react'

const GLITCH_CHARS = '!@#$%^&*<>?/\\|{}[]~`0123456789ABCDEFabcdef'

export function useGlitch(
  text: string,
  options: {
    iterations?: number
    speed?: number
    trigger?: boolean
  } = {}
) {
  const { iterations = 3, speed = 30, trigger = false } = options
  const [displayText, setDisplayText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const startGlitch = useCallback(() => {
    if (!mounted || isGlitching) return
    setIsGlitching(true)

    let iteration = 0
    const maxIterations = iterations * text.length

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            if (i < iteration / iterations) return char
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join('')
      )

      iteration++
      if (iteration > maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsGlitching(false)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, iterations, speed, mounted, isGlitching])

  useEffect(() => {
    if (trigger && mounted) {
      startGlitch()
    }
  }, [trigger, mounted, startGlitch])

  return { displayText: mounted ? displayText : text, isGlitching, startGlitch }
}
