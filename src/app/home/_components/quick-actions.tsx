'use client'

import Link from 'next/link'
import { Plus, FileUp, Users } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface QuickAction {
  label: string
  icon: React.ElementType
  href?: string
  onClick?: () => void
}

const actions: QuickAction[] = [
  { label: 'New Topic', icon: Plus, href: '/chat' },
  {
    label: 'Upload PDF',
    icon: FileUp,
    onClick: () => {
      alert('Coming soon')
    },
  },
  { label: 'Join Village', icon: Users, href: '/village' },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map((action) => {
        const Icon = action.icon
        const content = (
          <>
            <Icon className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium text-foreground">{action.label}</span>
          </>
        )

        if (action.href) {
          return (
            <Link key={action.label} href={action.href}>
              <Card className="flex flex-col items-center justify-center gap-2 rounded-2xl p-4 transition-transform hover:scale-105 cursor-pointer">
                {content}
              </Card>
            </Link>
          )
        }

        return (
          <Card
            key={action.label}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl p-4 transition-transform hover:scale-105 cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={action.onClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                action.onClick?.()
              }
            }}
          >
            {content}
          </Card>
        )
      })}
    </div>
  )
}
