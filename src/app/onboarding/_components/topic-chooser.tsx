'use client'

import { useState } from 'react'
import { Mascot } from '@/components/ekalavya/mascot'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface TopicChooserProps {
  value: string[]
  onNext: (topics: string[]) => void
}

const SUBJECTS = [
  { name: 'Math', emoji: '\u{1F522}', color: '#FF7043' },
  { name: 'Science', emoji: '\u{1F52C}', color: '#66BB6A' },
  { name: 'Language', emoji: '\u{1F4DA}', color: '#42A5F5' },
  { name: 'History', emoji: '\u{1F3DB}\uFE0F', color: '#AB47BC' },
  { name: 'Arts', emoji: '\u{1F3A8}', color: '#EC407A' },
  { name: 'Technology', emoji: '\u{1F4BB}', color: '#26C6DA' },
  { name: 'Health', emoji: '\u2764\uFE0F', color: '#EF5350' },
  { name: 'Life Skills', emoji: '\u{1F331}', color: '#FFA726' },
]

const MAX_TOPICS = 4

export function TopicChooser({ value, onNext }: TopicChooserProps) {
  const [selected, setSelected] = useState<string[]>(value)
  const [customTopic, setCustomTopic] = useState('')

  function toggleTopic(topic: string) {
    setSelected((prev) => {
      if (prev.includes(topic)) {
        return prev.filter((t) => t !== topic)
      }
      if (prev.length >= MAX_TOPICS) return prev
      return [...prev, topic]
    })
  }

  function handleContinue() {
    const topics = [...selected]
    if (customTopic.trim() && !topics.includes(customTopic.trim()) && topics.length < MAX_TOPICS) {
      topics.push(customTopic.trim())
    }
    onNext(topics)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <Mascot state="teaching" size="lg" />
      <p className="text-lg font-medium text-foreground">What do you want to learn?</p>
      <p className="text-sm text-muted-foreground">Pick 1-{MAX_TOPICS} topics</p>

      <div className="grid w-full grid-cols-2 gap-3">
        {SUBJECTS.map((subject) => {
          const isSelected = selected.includes(subject.name)
          return (
            <button
              key={subject.name}
              type="button"
              onClick={() => toggleTopic(subject.name)}
              className={cn(
                'relative flex flex-col items-center gap-2 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105',
                'ring-1 ring-border',
                isSelected && 'ring-2 ring-primary shadow-md',
              )}
              style={{
                backgroundColor: isSelected
                  ? `${subject.color}20`
                  : undefined,
              }}
            >
              {isSelected && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  ✓
                </span>
              )}
              <span className="text-3xl" role="img" aria-hidden="true">
                {subject.emoji}
              </span>
              <span className="text-sm font-medium">{subject.name}</span>
            </button>
          )
        })}
      </div>

      <Input
        placeholder="Or type any topic..."
        value={customTopic}
        onChange={(e) => setCustomTopic(e.target.value)}
        className="rounded-xl"
      />

      <Button
        size="lg"
        className="w-full rounded-xl"
        disabled={selected.length === 0 && !customTopic.trim()}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  )
}
