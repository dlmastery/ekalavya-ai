import { cn } from '@/lib/utils'

export interface SkeletonProps {
  variant?: 'card' | 'chat-bubble' | 'avatar' | 'line' | 'paragraph'
  className?: string
}

/**
 * Shimmer skeleton placeholders for various content types.
 * Uses Tailwind `animate-pulse` with a muted card background.
 */
export function LoadingSkeleton({ variant = 'line', className }: SkeletonProps) {
  switch (variant) {
    case 'card':
      return (
        <div
          className={cn(
            'animate-pulse rounded-2xl bg-muted p-4 space-y-3',
            className,
          )}
        >
          <div className="h-4 w-3/4 rounded bg-muted-foreground/20" />
          <div className="h-3 w-full rounded bg-muted-foreground/20" />
          <div className="h-3 w-5/6 rounded bg-muted-foreground/20" />
        </div>
      )

    case 'chat-bubble':
      return (
        <div
          className={cn(
            'animate-pulse flex items-start gap-2',
            className,
          )}
        >
          <div className="h-8 w-8 shrink-0 rounded-full bg-muted-foreground/20" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-4/5 rounded bg-muted-foreground/20" />
            <div className="h-3 w-3/5 rounded bg-muted-foreground/20" />
          </div>
        </div>
      )

    case 'avatar':
      return (
        <div
          className={cn(
            'animate-pulse h-12 w-12 rounded-full bg-muted-foreground/20',
            className,
          )}
        />
      )

    case 'paragraph':
      return (
        <div className={cn('animate-pulse space-y-2', className)}>
          <div className="h-3 w-full rounded bg-muted-foreground/20" />
          <div className="h-3 w-full rounded bg-muted-foreground/20" />
          <div className="h-3 w-4/5 rounded bg-muted-foreground/20" />
          <div className="h-3 w-3/4 rounded bg-muted-foreground/20" />
        </div>
      )

    case 'line':
    default:
      return (
        <div
          className={cn(
            'animate-pulse h-3 w-full rounded bg-muted-foreground/20',
            className,
          )}
        />
      )
  }
}
