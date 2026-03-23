'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export function ContinueCard() {
  const topic = 'The Water Cycle'
  const progressValue = 65

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Continue where you left off</p>
            <p className="font-semibold text-foreground truncate">{topic}</p>
            <div className="mt-2 flex items-center gap-3">
              <Progress value={progressValue} className="flex-1" />
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                {progressValue}%
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button asChild size="sm" className="rounded-xl">
            <Link href="/chat?topic=water-cycle">Continue</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
