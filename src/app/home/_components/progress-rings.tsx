'use client'

import { useEffect, useState } from 'react'

interface RingProps {
  value: number
  max: number
  color: string
  label: string
  displayText: string
}

function Ring({ value, max, color, label, displayText }: RingProps) {
  const [animated, setAnimated] = useState(false)
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const progress = (value / max) * circumference
  const offset = circumference - progress

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width={80}
        height={80}
        viewBox="0 0 80 80"
        className="transform -rotate-90"
        role="img"
        aria-label={`${label}: ${displayText}`}
      >
        {/* Background ring */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-muted/20"
        />
        {/* Progress ring */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      {/* Center text - positioned over SVG */}
      <div className="flex flex-col items-center -mt-[58px] mb-[14px]">
        <span className="text-sm font-bold text-foreground">{displayText}</span>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

export function ProgressRings() {
  return (
    <div className="flex items-center justify-around py-2">
      <Ring
        value={3}
        max={8}
        color="#4CAF50"
        label="Topics Mastered"
        displayText="3/8"
      />
      <Ring
        value={12}
        max={30}
        color="#FFC107"
        label="Streak Days"
        displayText={`\uD83D\uDD25 12`}
      />
      <Ring
        value={2500}
        max={5000}
        color="#FF9933"
        label="XP"
        displayText="2,500"
      />
    </div>
  )
}
