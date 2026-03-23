'use client'

import { cn } from '@/lib/utils'

export interface StepIndicatorProps {
  currentStep: number // 0-3
  totalSteps: number // 4
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-3" role="navigation" aria-label="Onboarding progress">
      {Array.from({ length: totalSteps }, (_, i) => {
        const isCompleted = i < currentStep
        const isCurrent = i === currentStep
        const isFuture = i > currentStep

        return (
          <div
            key={i}
            role="img"
            aria-label={
              isCompleted
                ? `Step ${i + 1}: completed`
                : isCurrent
                  ? `Step ${i + 1}: current`
                  : `Step ${i + 1}: upcoming`
            }
            className={cn(
              'h-3 w-3 rounded-full transition-all duration-300',
              isCompleted && 'bg-primary',
              isCurrent && 'bg-primary ring-4 ring-primary/30 animate-pulse',
              isFuture && 'border-2 border-muted-foreground/40 bg-transparent',
            )}
          />
        )
      })}
    </div>
  )
}
