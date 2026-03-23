export type TutoringMode = 'story' | 'practical' | 'literacy' | 'socratic' | 'interview'

export type HintLevel = 1 | 2 | 3 | 4 | 5

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  mode?: TutoringMode
  imageUrl?: string
  imageAlt?: string
}

export interface ChatChunk {
  text?: string
  imageUrl?: string
  imageAlt?: string
  done: boolean
}

export interface Hint {
  level: HintLevel
  content: string
  type: 'observation' | 'pattern' | 'approach' | 'technique' | 'pseudocode'
}

export interface ImageResult {
  url: string
  alt: string
  width: number
  height: number
}
