import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <div className="text-6xl" role="img" aria-label="Thinking face">&#x1F914;</div>
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground">Ekalavya couldn&apos;t find what you&apos;re looking for.</p>
      <Link href="/" className="text-primary underline hover:no-underline">
        Go back home
      </Link>
    </div>
  )
}
