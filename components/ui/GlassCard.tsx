'use client'

import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: boolean
  as?: 'div' | 'article' | 'section'
}

export default function GlassCard({
  children,
  className = '',
  hover = false,
  padding = true,
  as: Tag = 'div',
}: GlassCardProps) {
  return (
    <Tag
      className={`glass-panel ${hover ? 'glass-panel-hover' : ''} ${
        padding ? 'p-6 md:p-8' : ''
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
