interface TechBadgeProps {
  label: string
  className?: string
}

export default function TechBadge({ label, className = '' }: TechBadgeProps) {
  return (
    <span className={`tech-badge ${className}`}>
      {label}
    </span>
  )
}
