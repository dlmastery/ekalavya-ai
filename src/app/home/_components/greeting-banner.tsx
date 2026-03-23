'use client'

import { useLearnerStore } from '@/lib/stores/learner-store'
import { Mascot } from '@/components/ekalavya/mascot'
import { Card } from '@/components/ui/card'

function getTimeGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function GreetingBanner() {
  const profile = useLearnerStore((s) => s.profile)
  const name = profile?.name ?? 'Learner'
  const greeting = getTimeGreeting()

  return (
    <Card className="rounded-2xl border-0 bg-primary/5 p-4">
      <div className="flex items-center gap-4">
        <Mascot state="curious" size="sm" />
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-foreground truncate">
            {greeting}, {name}!
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5" aria-label="streak count">
            {'\uD83D\uDD25'} 12 day streak!
          </p>
        </div>
      </div>
    </Card>
  )
}
