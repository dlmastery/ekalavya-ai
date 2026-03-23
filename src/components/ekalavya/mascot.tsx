'use client'

import { type MascotEmotion } from '@/lib/types/mascot'
import { cn } from '@/lib/utils'

export interface MascotProps {
  state: MascotEmotion
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animate?: boolean
}

const sizeMap = {
  sm: 48,
  md: 96,
  lg: 192,
} as const

/**
 * Geometric mascot character representing Ekalavya — the self-taught learner.
 * A warm, friendly, circular-faced character with saffron palette and
 * expressive face states driven by `MascotEmotion`.
 */
export function Mascot({ state, size = 'md', className, animate = true }: MascotProps) {
  const px = sizeMap[size]

  return (
    <svg
      role="img"
      aria-label={`Ekalavya mascot — ${state}`}
      width={px}
      height={px}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        animate && 'transition-all duration-500 ease-in-out',
        className,
      )}
    >
      {/* Head (circle) */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="#FF9933"
        className={cn(
          animate && state === 'excited' && 'animate-bounce',
          animate && state === 'encouraging' && 'animate-pulse',
        )}
      />

      {/* Inner head highlight */}
      <circle cx="50" cy="46" r="36" fill="#FFB74D" opacity="0.35" />

      {/* State-specific face */}
      <FaceExpression state={state} animate={animate} />
    </svg>
  )
}

/* --------------------------------------------------------------------- */
/*  Per-state face expressions                                           */
/* --------------------------------------------------------------------- */

function FaceExpression({ state, animate }: { state: MascotEmotion; animate: boolean }) {
  switch (state) {
    /* ── curious ─────────────────────────────────────────────────────── */
    case 'curious':
      return (
        <g transform="rotate(-8 50 50)">
          {/* Left eye normal */}
          <circle cx="38" cy="44" r="4" fill="#3E2723" />
          {/* Right eye bigger (raised eyebrow) */}
          <circle cx="62" cy="42" r="5" fill="#3E2723" />
          {/* Raised eyebrow */}
          <path d="M56 34 Q62 30 68 34" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Slight smile */}
          <path d="M38 60 Q50 68 62 60" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )

    /* ── celebrating ─────────────────────────────────────────────────── */
    case 'celebrating':
      return (
        <g>
          {/* Wide eyes */}
          <circle cx="38" cy="44" r="5" fill="#3E2723" />
          <circle cx="62" cy="44" r="5" fill="#3E2723" />
          {/* Eye shine */}
          <circle cx="40" cy="42" r="1.5" fill="white" />
          <circle cx="64" cy="42" r="1.5" fill="white" />
          {/* Big smile */}
          <path d="M32 58 Q50 74 68 58" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Sparkle top-right */}
          <SparkleEffect cx={78} cy={22} />
          {/* Sparkle top-left */}
          <SparkleEffect cx={22} cy={24} />
        </g>
      )

    /* ── thinking ─────────────────────────────────────────────────────── */
    case 'thinking':
      return (
        <g>
          {/* Eyes looking up-right */}
          <circle cx="40" cy="44" r="4" fill="#3E2723" />
          <circle cx="62" cy="44" r="4" fill="#3E2723" />
          {/* Pupils shifted up-right */}
          <circle cx="42" cy="42" r="2" fill="white" />
          <circle cx="64" cy="42" r="2" fill="white" />
          {/* Slight frown / neutral */}
          <path d="M40 62 Q50 58 60 62" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Hand-on-chin dot */}
          <circle cx="58" cy="70" r="3" fill="#E65100" opacity="0.6" />
        </g>
      )

    /* ── encouraging ──────────────────────────────────────────────────── */
    case 'encouraging':
      return (
        <g>
          {/* Soft eyes (slightly closed) */}
          <path d="M34 44 Q38 40 42 44" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M58 44 Q62 40 66 44" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Warm smile */}
          <path d="M36 58 Q50 70 64 58" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Blush marks */}
          <circle cx="30" cy="54" r="4" fill="#E65100" opacity="0.2" />
          <circle cx="70" cy="54" r="4" fill="#E65100" opacity="0.2" />
        </g>
      )

    /* ── excited ──────────────────────────────────────────────────────── */
    case 'excited':
      return (
        <g>
          {/* Wide eyes */}
          <circle cx="38" cy="44" r="6" fill="#3E2723" />
          <circle cx="62" cy="44" r="6" fill="#3E2723" />
          {/* Eye shine */}
          <circle cx="40" cy="42" r="2" fill="white" />
          <circle cx="64" cy="42" r="2" fill="white" />
          {/* Open mouth (O shape) */}
          <ellipse cx="50" cy="62" rx="8" ry="6" fill="#3E2723" />
          <ellipse cx="50" cy="62" rx="5" ry="3.5" fill="#E65100" />
        </g>
      )

    /* ── sleeping ─────────────────────────────────────────────────────── */
    case 'sleeping':
      return (
        <g>
          {/* Closed eyes (curved lines) */}
          <path d="M32 44 Q38 48 44 44" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M56 44 Q62 48 68 44" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Neutral/relaxed mouth */}
          <path d="M42 62 Q50 64 58 62" stroke="#3E2723" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Zzz text */}
          <text
            x="72"
            y="28"
            fontSize="10"
            fontWeight="bold"
            fill="#3E2723"
            opacity="0.6"
            className={cn(animate && 'animate-pulse')}
          >
            z
          </text>
          <text x="78" y="20" fontSize="8" fontWeight="bold" fill="#3E2723" opacity="0.4">
            z
          </text>
          <text x="83" y="14" fontSize="6" fontWeight="bold" fill="#3E2723" opacity="0.25">
            z
          </text>
        </g>
      )

    /* ── teaching ─────────────────────────────────────────────────────── */
    case 'teaching':
      return (
        <g>
          {/* Left eye open */}
          <circle cx="38" cy="44" r="4" fill="#3E2723" />
          {/* Right eye winking (curved line) */}
          <path d="M58 44 Q62 40 66 44" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Confident smile */}
          <path d="M36 58 Q50 70 64 58" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Pointing gesture (small arrow/hand) */}
          <circle cx="80" cy="50" r="3" fill="#E65100" />
          <line x1="74" y1="52" x2="80" y2="50" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
        </g>
      )

    /* ── listening ────────────────────────────────────────────────────── */
    case 'listening':
      return (
        <g transform="rotate(5 50 50)">
          {/* Wide attentive eyes */}
          <circle cx="38" cy="44" r="5" fill="#3E2723" />
          <circle cx="62" cy="44" r="5" fill="#3E2723" />
          {/* Eye shine */}
          <circle cx="40" cy="42" r="1.5" fill="white" />
          <circle cx="64" cy="42" r="1.5" fill="white" />
          {/* Small neutral-to-slight smile */}
          <path d="M40 60 Q50 66 60 60" stroke="#3E2723" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Ear highlight (right side) */}
          <path d="M86 44 Q92 50 86 56" stroke="#E65100" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M82 42 Q90 50 82 58" stroke="#E65100" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35" />
        </g>
      )

    default: {
      const _exhaustive: never = state
      return null
    }
  }
}

/* --------------------------------------------------------------------- */
/*  Small sparkle effect used for celebrating                            */
/* --------------------------------------------------------------------- */
function SparkleEffect({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} stroke="#FFC107" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} stroke="#FFC107" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx - 3} y1={cy - 3} x2={cx + 3} y2={cy + 3} stroke="#FFC107" strokeWidth="1" strokeLinecap="round" />
      <line x1={cx + 3} y1={cy - 3} x2={cx - 3} y2={cy + 3} stroke="#FFC107" strokeWidth="1" strokeLinecap="round" />
    </g>
  )
}
