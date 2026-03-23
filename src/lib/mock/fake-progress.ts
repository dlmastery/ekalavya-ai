import type {
  ProgressData,
  TopicMastery,
  StreakData,
  Achievement,
  RoadmapNode,
} from '@/lib/types'
import { colors } from '@/lib/constants/theme-tokens'

// ---------------------------------------------------------------------------
// Helper: generate date strings for the past N days
// ---------------------------------------------------------------------------
function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

// ---------------------------------------------------------------------------
// Topic mastery (8 topics)
// ---------------------------------------------------------------------------
export const MOCK_TOPIC_MASTERY: TopicMastery[] = [
  {
    topic: 'Math',
    level: 'intermediate',
    progress: 58,
    subjectColor: colors.subject.math,
    lastPracticed: new Date('2026-03-21'),
  },
  {
    topic: 'Science',
    level: 'beginner',
    progress: 32,
    subjectColor: colors.subject.science,
    lastPracticed: new Date('2026-03-22'),
  },
  {
    topic: 'Language',
    level: 'advanced',
    progress: 78,
    subjectColor: colors.subject.language,
    lastPracticed: new Date('2026-03-20'),
  },
  {
    topic: 'History',
    level: 'beginner',
    progress: 25,
    subjectColor: colors.subject.history,
    lastPracticed: new Date('2026-03-18'),
  },
  {
    topic: 'Arts',
    level: 'novice',
    progress: 10,
    subjectColor: colors.subject.arts,
    lastPracticed: new Date('2026-03-10'),
  },
  {
    topic: 'Technology',
    level: 'intermediate',
    progress: 52,
    subjectColor: colors.subject.tech,
    lastPracticed: new Date('2026-03-19'),
  },
  {
    topic: 'Health',
    level: 'beginner',
    progress: 35,
    subjectColor: colors.subject.health,
    lastPracticed: new Date('2026-03-17'),
  },
  {
    topic: 'Life Skills',
    level: 'intermediate',
    progress: 45,
    subjectColor: colors.subject.lifeSkills,
    lastPracticed: new Date('2026-03-16'),
  },
]

// ---------------------------------------------------------------------------
// Streak data (30 days)
// ---------------------------------------------------------------------------
export const MOCK_STREAK: StreakData = {
  currentStreak: 12,
  longestStreak: 18,
  todayCompleted: true,
  history: Array.from({ length: 90 }, (_, i) => ({
    date: daysAgo(89 - i),
    // Simulate realistic pattern: some zeros, varying activity
    activityLevel:
      i < 20
        ? Math.floor(Math.random() * 2) // sparse early on
        : i >= 78
          ? Math.min(3, 1 + Math.floor(Math.random() * 3)) // consistent recent streak
          : Math.floor(Math.random() * 4), // middle period: mixed
  })),
}

// ---------------------------------------------------------------------------
// XP history (30 days)
// ---------------------------------------------------------------------------
function generateXpHistory(): Array<{ date: string; xp: number }> {
  const history: Array<{ date: string; xp: number }> = []
  let cumulativeXp = 1800 // starting 30 days ago
  for (let i = 29; i >= 0; i--) {
    const dailyXp = i < 18 ? Math.floor(Math.random() * 30) + 10 : Math.floor(Math.random() * 50) + 30
    cumulativeXp += dailyXp
    history.push({ date: daysAgo(i), xp: cumulativeXp })
  }
  // Ensure the final entry matches our target total
  history[history.length - 1].xp = 2500
  return history
}

export const MOCK_XP_HISTORY = generateXpHistory()

// ---------------------------------------------------------------------------
// Achievements (3 earned, 3 locked)
// ---------------------------------------------------------------------------
export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-lesson',
    title: 'First Steps',
    description: 'Complete your very first lesson.',
    icon: '\u{1F476}',
    earned: true,
    earnedAt: new Date('2026-03-01'),
    criteria: 'Complete 1 lesson',
  },
  {
    id: 'ach-streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak.',
    icon: '\u{1F525}',
    earned: true,
    earnedAt: new Date('2026-03-12'),
    criteria: 'Achieve a 7-day streak',
  },
  {
    id: 'ach-quiz-ace',
    title: 'Quiz Ace',
    description: 'Score 100% on any quiz.',
    icon: '\u{1F3AF}',
    earned: true,
    earnedAt: new Date('2026-03-15'),
    criteria: 'Get a perfect score on a quiz',
  },
  {
    id: 'ach-streak-30',
    title: 'Monthly Master',
    description: 'Maintain a 30-day learning streak.',
    icon: '\u{1F451}',
    earned: false,
    criteria: 'Achieve a 30-day streak',
  },
  {
    id: 'ach-topics-5',
    title: 'Explorer',
    description: 'Study at least 5 different topics.',
    icon: '\u{1F30D}',
    earned: false,
    criteria: 'Study 5 different topics',
  },
  {
    id: 'ach-xp-5000',
    title: 'XP Legend',
    description: 'Earn 5000 total XP.',
    icon: '\u{1F48E}',
    earned: false,
    criteria: 'Accumulate 5000 XP',
  },
]

// ---------------------------------------------------------------------------
// Learning roadmap (8 nodes)
// ---------------------------------------------------------------------------
export const MOCK_ROADMAP: RoadmapNode[] = [
  { id: 'road-1', topic: 'Numbers & Counting', status: 'completed', mastery: 'master', order: 1 },
  { id: 'road-2', topic: 'Addition & Subtraction', status: 'completed', mastery: 'advanced', order: 2 },
  { id: 'road-3', topic: 'Fractions', status: 'completed', mastery: 'intermediate', order: 3 },
  { id: 'road-4', topic: 'Decimals', status: 'current', mastery: 'beginner', order: 4 },
  { id: 'road-5', topic: 'Multiplication', status: 'upcoming', mastery: 'novice', order: 5 },
  { id: 'road-6', topic: 'Division', status: 'upcoming', mastery: 'novice', order: 6 },
  { id: 'road-7', topic: 'Percentages', status: 'upcoming', mastery: 'novice', order: 7 },
  { id: 'road-8', topic: 'Ratios & Proportions', status: 'upcoming', mastery: 'novice', order: 8 },
]

// ---------------------------------------------------------------------------
// Complete progress data
// ---------------------------------------------------------------------------
export const MOCK_PROGRESS: ProgressData = {
  totalXP: 2500,
  xpHistory: MOCK_XP_HISTORY,
  topicMastery: MOCK_TOPIC_MASTERY,
  streak: MOCK_STREAK,
  achievements: MOCK_ACHIEVEMENTS,
  roadmap: MOCK_ROADMAP,
  learningStyleInsight:
    'You learn best through visual examples and hands-on activities. Consider using diagrams and interactive simulations when tackling new topics.',
}
