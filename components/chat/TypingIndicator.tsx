export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <span className="font-mono text-[10px] uppercase tracking-wider text-neon-purple-dim mr-2">
        OM AI
      </span>
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-neon-purple-dim"
            style={{
              animation: `typingDots 1.4s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
