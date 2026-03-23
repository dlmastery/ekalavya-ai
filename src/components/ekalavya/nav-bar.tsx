'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, MessageCircle, GraduationCap, BarChart3, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Home', href: '/home', icon: Home },
  { label: 'Chat', href: '/chat', icon: MessageCircle },
  { label: 'Classroom', href: '/classroom', icon: GraduationCap },
  { label: 'Progress', href: '/progress', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
] as const

/**
 * Bottom navigation bar with 5 tabs.
 * Reads current path via `usePathname()` and highlights the active tab.
 */
export function NavBar() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 border-t bg-card"
      role="navigation"
      aria-label="Main navigation"
    >
      <ul className="flex items-center justify-around max-w-md mx-auto">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 min-h-[48px] min-w-[48px] px-2 py-1.5 text-xs transition-colors',
                  isActive
                    ? 'text-[#FF9933] border-b-2 border-[#FF9933]'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
