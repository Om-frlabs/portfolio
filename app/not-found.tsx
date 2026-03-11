import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="font-mono text-sm text-neon-green mb-4">{'> 404'}</div>
      <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4 neon-text">
        Page Not Found
      </h1>
      <p className="text-text-secondary mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="neon-button px-6 py-3 font-mono text-sm inline-flex items-center gap-2 no-underline"
      >
        ← Back to Home
      </Link>
    </div>
  )
}
