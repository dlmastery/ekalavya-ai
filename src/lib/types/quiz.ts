export type QuestionType = 'mcq' | 'fill' | 'short'

export interface QuizOption {
  id: string
  text: string
}

export interface Question {
  id: string
  type: QuestionType
  text: string
  options?: QuizOption[]  // for mcq
  correctAnswer: string
  explanation: string
  difficulty: number  // 1-10
}

export interface Quiz {
  id: string
  topic: string
  questions: Question[]
  timeLimit?: number  // seconds
  difficulty: number
}

export interface GradeResult {
  questionId: string
  correct: boolean
  userAnswer: string
  correctAnswer: string
  explanation: string
  score: number  // 0-100
  knowledgeGaps: string[]
}
