export type MasteryLevel = 'novice' | 'beginner' | 'intermediate' | 'advanced' | 'master'

export interface TopicMastery {
  topic: string
  level: MasteryLevel
  progress: number  // 0-100
  subjectColor: string
  lastPracticed: Date
}

export interface StreakData {
  currentStreak: number
  longestStreak: number
  todayCompleted: boolean
  history: Array<{ date: string; activityLevel: number }>  // 90 days
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedAt?: Date
  criteria: string
}

export interface RoadmapNode {
  id: string
  topic: string
  status: 'completed' | 'current' | 'upcoming' | 'locked'
  mastery: MasteryLevel
  order: number
}

export interface ProgressData {
  totalXP: number
  xpHistory: Array<{ date: string; xp: number }>  // 30 days
  topicMastery: TopicMastery[]
  streak: StreakData
  achievements: Achievement[]
  roadmap: RoadmapNode[]
  learningStyleInsight: string
}
