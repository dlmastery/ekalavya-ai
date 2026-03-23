'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { MOCK_TOPIC_MASTERY } from '@/lib/mock/fake-progress'
import type { MasteryLevel } from '@/lib/types/progress'

const TOPIC_EMOJIS: Record<string, string> = {
  Math: '\uD83D\uDCCA',
  Science: '\uD83D\uDD2C',
  Language: '\uD83D\uDCDD',
  History: '\uD83C\uDFDB\uFE0F',
  Arts: '\uD83C\uDFA8',
  Technology: '\uD83D\uDCBB',
  Health: '\u2764\uFE0F',
  'Life Skills': '\uD83C\uDF1F',
}

const MASTERY_BADGE: Record<MasteryLevel, { label: string; className: string }> = {
  novice: { label: 'Novice', className: 'bg-gray-100 text-gray-600' },
  beginner: { label: 'Beginner', className: 'bg-blue-100 text-blue-700' },
  intermediate: { label: 'Intermediate', className: 'bg-amber-100 text-amber-700' },
  advanced: { label: 'Advanced', className: 'bg-green-100 text-green-700' },
  master: { label: 'Master', className: 'bg-purple-100 text-purple-700' },
}

export function TopicGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {MOCK_TOPIC_MASTERY.map((topic) => {
        const emoji = TOPIC_EMOJIS[topic.topic] ?? '\uD83D\uDCD6'
        const badge = MASTERY_BADGE[topic.level]
        const topicSlug = topic.topic.toLowerCase().replace(/\s+/g, '-')

        return (
          <Link key={topic.topic} href={`/chat?topic=${topicSlug}`}>
            <Card
              className="rounded-2xl p-3 transition-transform hover:scale-[1.03] cursor-pointer"
              style={{ backgroundColor: `${topic.subjectColor}10` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg" role="img" aria-label={topic.topic}>
                  {emoji}
                </span>
                <span className="text-sm font-semibold text-foreground truncate">
                  {topic.topic}
                </span>
              </div>
              <span
                className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${badge.className}`}
              >
                {badge.label}
              </span>
              <div className="mt-2">
                <Progress
                  value={topic.progress}
                  className="h-1.5"
                  style={
                    {
                      '--progress-color': topic.subjectColor,
                    } as React.CSSProperties
                  }
                />
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
