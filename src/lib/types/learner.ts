export type LearningStyle = 'visual' | 'verbal' | 'active' | 'reflective'

export type AgeGroup = 'child' | 'teen' | 'adult'

export type Depth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type CommunicationTone = 'encouraging' | 'neutral' | 'friendly' | 'humorous' | 'formal'

export type ReasoningFramework = 'deductive' | 'inductive' | 'analogical' | 'causal'

export interface OnboardingConfig {
  ageGroup: AgeGroup
  language: string
  topics: string[]
  learningStyle: LearningStyle
}

export interface StyleResponse {
  questionId: string
  answer: string
}

export interface LearningConfig {
  depth: Depth
  learningStyle: LearningStyle
  tone: CommunicationTone
  reasoning: ReasoningFramework
  language: string
  voiceSpeed: number  // 0.5 - 2.0
  voiceAccent: string
}

export interface LearnerProfile {
  id: string
  name: string
  ageGroup: AgeGroup
  avatar: string
  config: LearningConfig
  topics: string[]
  onboardedAt: Date
  lastActiveAt: Date
}
