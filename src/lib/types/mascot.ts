export type MascotEmotion =
  | 'curious'
  | 'celebrating'
  | 'thinking'
  | 'encouraging'
  | 'excited'
  | 'sleeping'
  | 'teaching'
  | 'listening'

export interface InteractionContext {
  lastUserAction: 'asked-question' | 'answered-correctly' | 'answered-incorrectly' | 'idle' | 'speaking' | 'new-topic' | 'milestone' | 'explaining'
  currentScreen: string
  streakCount: number
  sessionDuration: number  // seconds
}

export const MASCOT_TRIGGERS: Record<MascotEmotion, string> = {
  curious: 'user asks a question',
  celebrating: 'correct answer or milestone',
  thinking: 'processing or generating content',
  encouraging: 'wrong answer or user struggles',
  excited: 'new topic or breakthrough moment',
  sleeping: 'idle for 30+ seconds',
  teaching: 'explaining a concept',
  listening: 'user is speaking (voice mode)',
}
