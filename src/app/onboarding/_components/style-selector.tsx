'use client'

import { useState } from 'react'
import { Mascot } from '@/components/ekalavya/mascot'
import { cn } from '@/lib/utils'
import type { LearningStyle } from '@/lib/types'
import type { MascotEmotion } from '@/lib/types/mascot'

interface StyleSelectorProps {
  value: LearningStyle | null
  onNext: (style: LearningStyle) => void
}

const STYLE_OPTIONS: {
  value: LearningStyle
  emoji: string
  label: string
  description: string
}[] = [
  {
    value: 'visual',
    emoji: '\u{1F441}\uFE0F',
    label: 'Visual',
    description: 'I learn best by seeing \u2014 diagrams, charts, pictures',
  },
  {
    value: 'verbal',
    emoji: '\u{1F4D6}',
    label: 'Verbal',
    description: 'I learn best by reading and listening \u2014 words and explanations',
  },
  {
    value: 'active',
    emoji: '\u270B',
    label: 'Active',
    description: 'I learn best by doing \u2014 exercises, experiments, practice',
  },
  {
    value: 'reflective',
    emoji: '\u{1F914}',
    label: 'Reflective',
    description: 'I learn best by thinking \u2014 analyzing, connecting ideas',
  },
]

export function StyleSelector({ value, onNext }: StyleSelectorProps) {
  const [selected, setSelected] = useState<LearningStyle | null>(value)
  const [mascotState, setMascotState] = useState<MascotEmotion>('encouraging')
  const [showMessage, setShowMessage] = useState(false)

  function handleSelect(style: LearningStyle) {
    setSelected(style)
    setMascotState('celebrating')
    setShowMessage(true)
    setTimeout(() => onNext(style), 500)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <Mascot state={mascotState} size="lg" />
      {showMessage ? (
        <p className="text-lg font-medium text-primary">Great choice!</p>
      ) : (
        <p className="text-lg font-medium text-foreground">How do you learn best?</p>
      )}

      <div className="flex w-full flex-col gap-4">
        {STYLE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            className={cn(
              'flex min-h-[80px] items-center gap-4 rounded-2xl p-5 text-left transition-all duration-200 hover:scale-105',
              'bg-card ring-1 ring-border',
              selected === option.value && 'ring-2 ring-primary shadow-lg bg-primary/5',
            )}
          >
            <span className="text-3xl" role="img" aria-hidden="true">
              {option.emoji}
            </span>
            <div>
              <p className="font-semibold">{option.label}</p>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
