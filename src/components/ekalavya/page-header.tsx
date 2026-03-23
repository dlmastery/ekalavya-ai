import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PageHeaderProps {
  title: string
  onBack?: () => void
  actions?: React.ReactNode
}

/**
 * Sticky page header with optional back button and action slots.
 */
export function PageHeader({ title, onBack, actions }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center h-14 px-4',
        'bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        'border-b',
      )}
    >
      {/* Left: back button */}
      <div className="w-12 flex items-center">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center h-12 w-12 -ml-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Center: title */}
      <h1 className="flex-1 text-center text-lg font-semibold truncate">
        {title}
      </h1>

      {/* Right: actions */}
      <div className="w-12 flex items-center justify-end">
        {actions}
      </div>
    </header>
  )
}
