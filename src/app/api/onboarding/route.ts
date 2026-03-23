import { NextResponse } from 'next/server'
import type { OnboardingConfig, LearnerProfile, Depth } from '@/lib/types'

export async function POST(request: Request) {
  const config: OnboardingConfig = await request.json()

  const depthMap: Record<string, Depth> = {
    child: 3,
    teen: 5,
    adult: 7,
  }

  const profile: LearnerProfile = {
    id: `user-${Date.now()}`,
    name:
      config.ageGroup === 'child'
        ? 'Explorer'
        : config.ageGroup === 'teen'
          ? 'Discoverer'
          : 'Learner',
    ageGroup: config.ageGroup,
    avatar:
      config.ageGroup === 'child'
        ? '\u{1F9D2}'
        : config.ageGroup === 'teen'
          ? '\u{1F466}'
          : '\u{1F469}',
    config: {
      depth: depthMap[config.ageGroup],
      learningStyle: config.learningStyle,
      tone: 'encouraging',
      reasoning: 'analogical',
      language: config.language,
      voiceSpeed: 1.0,
      voiceAccent: 'default',
    },
    topics: config.topics,
    onboardedAt: new Date(),
    lastActiveAt: new Date(),
  }

  return NextResponse.json(profile)
}
