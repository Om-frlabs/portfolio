'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
}

export default function NeonButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = '',
  ...props
}: NeonButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const baseClass = variant === 'primary' ? 'neon-button' : 'ghost-button'
  const classes = `${baseClass} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`${classes} inline-flex items-center gap-2 no-underline`}
        role="link"
        aria-label={typeof children === 'string' ? children : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={`${classes} inline-flex items-center gap-2`} {...props}>
      {children}
    </button>
  )
}
