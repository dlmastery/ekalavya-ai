import type { AgeGroup, LearnerProfile } from '@/lib/types'

export const MOCK_PROFILES: Record<AgeGroup, LearnerProfile> = {
  child: {
    id: 'child-1',
    name: 'Priya',
    ageGroup: 'child',
    avatar: '\u{1F9D2}',
    config: {
      depth: 3,
      learningStyle: 'visual',
      tone: 'encouraging',
      reasoning: 'analogical',
      language: 'English',
      voiceSpeed: 1.0,
      voiceAccent: 'default',
    },
    topics: ['Math', 'Science', 'Stories'],
    onboardedAt: new Date('2026-03-01'),
    lastActiveAt: new Date('2026-03-22'),
  },
  teen: {
    id: 'teen-1',
    name: 'Arjun',
    ageGroup: 'teen',
    avatar: '\u{1F466}',
    config: {
      depth: 5,
      learningStyle: 'active',
      tone: 'friendly',
      reasoning: 'deductive',
      language: 'English',
      voiceSpeed: 1.2,
      voiceAccent: 'default',
    },
    topics: ['Math', 'Science', 'Technology', 'History'],
    onboardedAt: new Date('2026-02-15'),
    lastActiveAt: new Date('2026-03-22'),
  },
  adult: {
    id: 'adult-1',
    name: 'Lakshmi',
    ageGroup: 'adult',
    avatar: '\u{1F469}',
    config: {
      depth: 7,
      learningStyle: 'verbal',
      tone: 'neutral',
      reasoning: 'causal',
      language: 'Hindi',
      voiceSpeed: 1.0,
      voiceAccent: 'default',
    },
    topics: ['Health', 'Life Skills', 'Language'],
    onboardedAt: new Date('2026-01-10'),
    lastActiveAt: new Date('2026-03-22'),
  },
}

/** Default profile used by MockDataProvider */
export const DEFAULT_PROFILE = MOCK_PROFILES.child
