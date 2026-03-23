'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <div className="text-6xl" role="img" aria-label="Disappointed face">&#x1F613;</div>
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90">
        Try again
      </button>
    </div>
  )
}
