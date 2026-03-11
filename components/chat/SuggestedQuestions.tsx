interface SuggestedQuestionsProps {
  onSelect: (question: string) => void
  disabled?: boolean
}

const QUESTIONS = [
  "What projects has Om built?",
  "What's his AI stack?",
  "Tell me about RAGChat",
  "What is AXIOM Protocol?",
  "What makes him different?",
  "Is he available for work?",
]

export default function SuggestedQuestions({
  onSelect,
  disabled = false,
}: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {QUESTIONS.map(question => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          disabled={disabled}
          className="text-xs font-mono px-3 py-2 rounded-lg border border-glass-border text-text-secondary hover:text-neon-cyan hover:border-neon-cyan-dim hover:bg-glass-hover transition-all disabled:opacity-40 disabled:cursor-not-allowed text-left"
        >
          {question}
        </button>
      ))}
    </div>
  )
}
