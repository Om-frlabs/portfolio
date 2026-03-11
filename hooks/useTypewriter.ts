'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const GLITCH_CHARS = '!@#$%^&*<>?/\\|{}[]~`ABCDEFabcdef0123456789'

export function useTypewriter(
  text: string,
  options: {
    speed?: number
    glitchDuration?: number
    startDelay?: number
    enabled?: boolean
  } = {}
) {
  const {
    speed = 50,
    glitchDuration = 60,
    startDelay = 0,
    enabled = true,
  } = options

  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [mounted, setMounted] = useState(false)
  const indexRef = useRef(0)
  const glitchTimerRef = useRef<NodeJS.Timeout | null>(null)
  const mainTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cleanup = useCallback(() => {
    if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current)
    if (mainTimerRef.current) clearTimeout(mainTimerRef.current)
  }, [])

  useEffect(() => {
    if (!mounted || !enabled) return

    indexRef.current = 0
    setDisplayText('')
    setIsComplete(false)

    const startTimer = setTimeout(() => {
      const typeNext = () => {
        if (indexRef.current >= text.length) {
          setIsComplete(true)
          return
        }

        const currentChar = text[indexRef.current]

        // Show a random glitch character first
        const glitchChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        setDisplayText(text.slice(0, indexRef.current) + glitchChar)

        // Then settle on the real character
        glitchTimerRef.current = setTimeout(() => {
          indexRef.current++
          setDisplayText(text.slice(0, indexRef.current))
          mainTimerRef.current = setTimeout(typeNext, speed)
        }, glitchDuration)
      }

      typeNext()
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      cleanup()
    }
  }, [text, speed, glitchDuration, startDelay, mounted, enabled, cleanup])

  useEffect(() => {
    return cleanup
  }, [cleanup])

  return { displayText: mounted ? displayText : '', isComplete, mounted }
}
