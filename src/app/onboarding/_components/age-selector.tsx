'use client'

import { useState } from 'react'
import { Mascot } from '@/components/ekalavya/mascot'
import { cn } from '@/lib/utils'
import type { AgeGroup } from '@/lib/types'

interface AgeSelectorProps {
  value: AgeGroup | null
  onNext: (age: AgeGroup) => void
}

const AGE_OPTIONS: { value: AgeGroup; emoji: string; label: string; description: string; color: string }[] = [
  {
    value: 'child',
    emoji: '\u{1F9D2}',
    label: 'Child (6-12)',
    description: "I'm a young explorer!",
    color: 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/50',
  },
  {
    value: 'teen',
    emoji: '\u{1F466}',
    label: 'Teen (13-18)',
    description: "I'm ready to discover!",
    color: 'bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/30 dark:hover:bg-sky-950/50',
  },
  {
    value: 'adult',
    emoji: '\u{1F469}',
    label: 'Adult (19+)',
    description: 'I want to grow!',
    color: 'bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/30 dark:hover:bg-orange-950/50',
  },
]

export function AgeSelector({ value, onNext }: AgeSelectorProps) {
  const [selected, setSelected] = useState<AgeGroup | null>(value)

  function handleSelect(age: AgeGroup) {
    setSelected(age)
    setTimeout(() => onNext(age), 300)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <Mascot state="curious" size="lg" />
      <p className="text-lg font-medium text-foreground">Who are you?</p>

      <div className="flex w-full flex-col gap-4">
        {AGE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            className={cn(
              'flex min-h-[120px] items-center gap-4 rounded-2xl p-6 text-left transition-all duration-200 hover:scale-105',
              option.color,
              selected === option.value
                ? 'ring-2 ring-primary shadow-lg'
                : 'ring-1 ring-border',
            )}
          >
            <span className="text-4xl" role="img" aria-hidden="true">
              {option.emoji}
            </span>
            <div>
              <p className="text-lg font-semibold">{option.label}</p>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
