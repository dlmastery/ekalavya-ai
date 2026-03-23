import { cn } from '@/lib/utils'

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
} as const

/**
 * Ekalavya AI brand logo — "Ekalavya" in bold + "AI" in saffron accent.
 */
export function Logo({ size = 'md', className }: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-1 font-sans tracking-tight select-none',
        sizeClasses[size],
        className,
      )}
    >
      <span className="font-bold text-foreground">Ekalavya</span>
      <span className="font-semibold" style={{ color: '#FF9933' }}>
        AI
      </span>
    </span>
  )
}
