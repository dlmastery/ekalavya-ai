'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLearnerStore } from '@/lib/stores/learner-store'
import { useData } from '@/lib/providers/mock-data-context'
import type { AgeGroup, LearningStyle } from '@/lib/types'

import { StepIndicator } from './step-indicator'
import { AgeSelector } from './age-selector'
import { LanguagePicker } from './language-picker'
import { TopicChooser } from './topic-chooser'
import { StyleSelector } from './style-selector'

const TOTAL_STEPS = 4

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

export function OnboardingWizard() {
  const router = useRouter()
  const data = useData()
  const setProfile = useLearnerStore((s) => s.setProfile)

  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null)
  const [language, setLanguage] = useState('English')
  const [topics, setTopics] = useState<string[]>([])
  const [style, setStyle] = useState<LearningStyle | null>(null)

  const goNext = useCallback(() => {
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  }, [])

  const goBack = useCallback(() => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }, [])

  const handleAgeSelect = useCallback(
    (age: AgeGroup) => {
      setAgeGroup(age)
      goNext()
    },
    [goNext],
  )

  const handleLanguageSelect = useCallback(
    (lang: string) => {
      setLanguage(lang)
      goNext()
    },
    [goNext],
  )

  const handleTopicsSelect = useCallback(
    (selected: string[]) => {
      setTopics(selected)
      goNext()
    },
    [goNext],
  )

  const handleStyleSelect = useCallback(
    async (selectedStyle: LearningStyle) => {
      setStyle(selectedStyle)

      if (!ageGroup) return

      try {
        const profile = await data.initProfile({
          ageGroup,
          language,
          topics,
          learningStyle: selectedStyle,
        })
        setProfile(profile)
        document.cookie = 'ekalavya-onboarded=true; path=/; max-age=31536000'
        router.push('/home')
      } catch {
        // Fallback: still navigate on error
        router.push('/home')
      }
    },
    [ageGroup, language, topics, data, setProfile, router],
  )

  const steps = [
    <AgeSelector key="age" value={ageGroup} onNext={handleAgeSelect} />,
    <LanguagePicker key="language" value={language} onNext={handleLanguageSelect} />,
    <TopicChooser key="topics" value={topics} onNext={handleTopicsSelect} />,
    <StyleSelector key="style" value={style} onNext={handleStyleSelect} />,
  ]

  return (
    <div className="flex min-h-dvh flex-col items-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        {/* Step indicator */}
        <div className="mb-8">
          <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Back button */}
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="mb-4 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Go back"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
        )}

        {/* Step content with slide animation */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
