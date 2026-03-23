import { cn } from '@/lib/utils'
import { NavBar } from './nav-bar'

export interface ResponsiveLayoutProps {
  children: React.ReactNode
  hideNav?: boolean
}

/**
 * Page-level layout wrapper.
 * Centers content at max-w-md on desktop, full-width on mobile.
 * Includes the bottom NavBar unless `hideNav` is set.
 */
export function ResponsiveLayout({ children, hideNav = false }: ResponsiveLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div
        className={cn(
          'mx-auto w-full max-w-md',
          !hideNav && 'pb-16', // space for fixed bottom nav
        )}
      >
        {children}
      </div>
      {!hideNav && <NavBar />}
    </div>
  )
}
