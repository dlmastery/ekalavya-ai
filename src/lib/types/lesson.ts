export type SceneType = 'slide' | 'quiz' | 'simulation' | 'pbl'

export interface SlideContent {
  title: string
  bullets: string[]
  imageUrl?: string
  imageAlt?: string
  speakerNotes: string
}

export interface Scene {
  id: string
  type: SceneType
  title: string
  order: number
  content: SlideContent | null  // null for non-slide types
  duration: number  // seconds
}

export interface Lesson {
  id: string
  topic: string
  description: string
  scenes: Scene[]
  totalDuration: number
  createdAt: Date
  subjectColor: string
}
