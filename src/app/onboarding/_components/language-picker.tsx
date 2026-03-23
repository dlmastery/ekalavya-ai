'use client'

import { useState } from 'react'
import { Mascot } from '@/components/ekalavya/mascot'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LanguagePickerProps {
  value: string
  onNext: (language: string) => void
}

const LANGUAGES = [
  { name: 'English', flag: '\u{1F1EC}\u{1F1E7}' },
  { name: 'Hindi', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Tamil', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Telugu', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Bengali', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Marathi', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Gujarati', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Kannada', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Malayalam', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Punjabi', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Urdu', flag: '\u{1F1F5}\u{1F1F0}' },
  { name: 'Spanish', flag: '\u{1F1EA}\u{1F1F8}' },
  { name: 'French', flag: '\u{1F1EB}\u{1F1F7}' },
  { name: 'Swahili', flag: '\u{1F1F0}\u{1F1EA}' },
  { name: 'Arabic', flag: '\u{1F1F8}\u{1F1E6}' },
  { name: 'Portuguese', flag: '\u{1F1E7}\u{1F1F7}' },
  { name: 'Mandarin', flag: '\u{1F1E8}\u{1F1F3}' },
  { name: 'Japanese', flag: '\u{1F1EF}\u{1F1F5}' },
  { name: 'Korean', flag: '\u{1F1F0}\u{1F1F7}' },
  { name: 'Indonesian', flag: '\u{1F1EE}\u{1F1E9}' },
]

export function LanguagePicker({ value, onNext }: LanguagePickerProps) {
  const [selected, setSelected] = useState(value)

  return (
    <div className="flex flex-col items-center gap-6">
      <Mascot state="excited" size="lg" />
      <p className="text-lg font-medium text-foreground">What language do you speak?</p>

      <div className="grid w-full grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.name}
            type="button"
            onClick={() => setSelected(lang.name)}
            className={cn(
              'flex items-center gap-3 rounded-xl p-4 text-left transition-all duration-200 hover:scale-105',
              'bg-card ring-1 ring-border',
              selected === lang.name && 'ring-2 ring-primary shadow-md bg-primary/5',
            )}
          >
            <span className="text-2xl" role="img" aria-hidden="true">
              {lang.flag}
            </span>
            <span className="text-sm font-medium">{lang.name}</span>
          </button>
        ))}
      </div>

      <Button
        size="lg"
        className="w-full rounded-xl"
        disabled={!selected}
        onClick={() => onNext(selected)}
      >
        Continue
      </Button>
    </div>
  )
}
