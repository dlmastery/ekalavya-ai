import type { Quiz, GradeResult } from '@/lib/types'

// ---------------------------------------------------------------------------
// Quiz 1: Water Cycle (Science, easy — difficulty 3)
// ---------------------------------------------------------------------------
export const WATER_CYCLE_QUIZ: Quiz = {
  id: 'quiz-water-cycle-1',
  topic: 'The Water Cycle',
  difficulty: 3,
  timeLimit: 300,
  questions: [
    {
      id: 'wc-q1',
      type: 'mcq',
      text: 'What is the process called when the sun heats water and it turns into vapor?',
      options: [
        { id: 'wc-q1-a', text: 'Condensation' },
        { id: 'wc-q1-b', text: 'Evaporation' },
        { id: 'wc-q1-c', text: 'Precipitation' },
        { id: 'wc-q1-d', text: 'Filtration' },
      ],
      correctAnswer: 'wc-q1-b',
      explanation:
        'Evaporation is the process where heat from the sun turns liquid water into water vapor that rises into the atmosphere.',
      difficulty: 2,
    },
    {
      id: 'wc-q2',
      type: 'mcq',
      text: 'What happens during condensation?',
      options: [
        { id: 'wc-q2-a', text: 'Water vapor turns back into liquid droplets' },
        { id: 'wc-q2-b', text: 'Rain falls from clouds' },
        { id: 'wc-q2-c', text: 'Water seeps into the ground' },
        { id: 'wc-q2-d', text: 'Rivers flow into the ocean' },
      ],
      correctAnswer: 'wc-q2-a',
      explanation:
        'Condensation occurs when water vapor cools and changes back into tiny liquid water droplets, forming clouds.',
      difficulty: 2,
    },
    {
      id: 'wc-q3',
      type: 'fill',
      text: 'When clouds become too heavy with water droplets, water falls back to Earth as rain, snow, or hail. This process is called _______.',
      correctAnswer: 'precipitation',
      explanation:
        'Precipitation is any form of water — liquid or frozen — that falls from clouds to the Earth\'s surface.',
      difficulty: 3,
    },
    {
      id: 'wc-q4',
      type: 'mcq',
      text: 'Where does groundwater come from?',
      options: [
        { id: 'wc-q4-a', text: 'Factories pump it underground' },
        { id: 'wc-q4-b', text: 'Rain and surface water seep through soil and rock' },
        { id: 'wc-q4-c', text: 'It has always been there since Earth formed' },
        { id: 'wc-q4-d', text: 'Rivers push water underground through tunnels' },
      ],
      correctAnswer: 'wc-q4-b',
      explanation:
        'Groundwater forms when precipitation and surface water seep through soil and rock layers, collecting in underground aquifers.',
      difficulty: 3,
    },
    {
      id: 'wc-q5',
      type: 'short',
      text: 'Explain in one sentence why the water cycle is called a "cycle."',
      correctAnswer: 'Because the same water continuously moves through evaporation, condensation, precipitation, and collection in a repeating loop.',
      explanation:
        'A cycle means there is no beginning or end — water keeps moving through the same stages over and over again.',
      difficulty: 4,
    },
  ],
}

// ---------------------------------------------------------------------------
// Quiz 2: Fractions (Math, medium — difficulty 5)
// ---------------------------------------------------------------------------
export const FRACTIONS_QUIZ: Quiz = {
  id: 'quiz-fractions-1',
  topic: 'Fractions',
  difficulty: 5,
  timeLimit: 420,
  questions: [
    {
      id: 'fr-q1',
      type: 'mcq',
      text: 'Which of the following fractions is equivalent to 1/2?',
      options: [
        { id: 'fr-q1-a', text: '2/3' },
        { id: 'fr-q1-b', text: '3/6' },
        { id: 'fr-q1-c', text: '2/5' },
        { id: 'fr-q1-d', text: '4/6' },
      ],
      correctAnswer: 'fr-q1-b',
      explanation:
        '3/6 is equivalent to 1/2 because both the numerator and denominator of 1/2 are multiplied by 3 (1\u00D73=3, 2\u00D73=6).',
      difficulty: 4,
    },
    {
      id: 'fr-q2',
      type: 'mcq',
      text: 'What is 2/5 + 1/5?',
      options: [
        { id: 'fr-q2-a', text: '3/10' },
        { id: 'fr-q2-b', text: '3/5' },
        { id: 'fr-q2-c', text: '1/5' },
        { id: 'fr-q2-d', text: '2/10' },
      ],
      correctAnswer: 'fr-q2-b',
      explanation:
        'When fractions have the same denominator, simply add the numerators: 2/5 + 1/5 = (2+1)/5 = 3/5.',
      difficulty: 4,
    },
    {
      id: 'fr-q3',
      type: 'fill',
      text: 'In the fraction 7/9, the number 7 is called the _______ and 9 is called the _______.',
      correctAnswer: 'numerator, denominator',
      explanation:
        'The numerator (top number) tells how many parts we have. The denominator (bottom number) tells how many equal parts the whole is divided into.',
      difficulty: 3,
    },
    {
      id: 'fr-q4',
      type: 'mcq',
      text: 'Which fraction is the largest?',
      options: [
        { id: 'fr-q4-a', text: '1/4' },
        { id: 'fr-q4-b', text: '1/8' },
        { id: 'fr-q4-c', text: '1/3' },
        { id: 'fr-q4-d', text: '1/6' },
      ],
      correctAnswer: 'fr-q4-c',
      explanation:
        'When the numerator is the same, the fraction with the smallest denominator is the largest. 1/3 > 1/4 > 1/6 > 1/8 because dividing into fewer pieces gives bigger pieces.',
      difficulty: 5,
    },
    {
      id: 'fr-q5',
      type: 'short',
      text: 'If you eat 3 slices of a pizza that was cut into 8 equal slices, what fraction of the pizza is left? Explain your reasoning.',
      correctAnswer: '5/8 of the pizza is left because 8/8 - 3/8 = 5/8.',
      explanation:
        'The whole pizza is 8/8. You ate 3/8, so the remaining pizza is 8/8 - 3/8 = 5/8.',
      difficulty: 6,
    },
  ],
}

// ---------------------------------------------------------------------------
// Sample grade results (used by the provider)
// ---------------------------------------------------------------------------
export const MOCK_GRADE_RESULTS: Record<string, GradeResult> = {
  'wc-q1': {
    questionId: 'wc-q1',
    correct: true,
    userAnswer: 'wc-q1-b',
    correctAnswer: 'wc-q1-b',
    explanation: 'Correct! Evaporation is when heat turns liquid water into vapor.',
    score: 100,
    knowledgeGaps: [],
  },
  'wc-q3': {
    questionId: 'wc-q3',
    correct: false,
    userAnswer: 'condensation',
    correctAnswer: 'precipitation',
    explanation:
      'Not quite. Condensation is when vapor becomes droplets (forming clouds). Precipitation is when water falls from clouds to Earth.',
    score: 0,
    knowledgeGaps: ['precipitation vs condensation', 'stages of the water cycle'],
  },
  'fr-q1': {
    questionId: 'fr-q1',
    correct: true,
    userAnswer: 'fr-q1-b',
    correctAnswer: 'fr-q1-b',
    explanation: 'Correct! 3/6 simplifies to 1/2.',
    score: 100,
    knowledgeGaps: [],
  },
  'fr-q4': {
    questionId: 'fr-q4',
    correct: false,
    userAnswer: 'fr-q4-a',
    correctAnswer: 'fr-q4-c',
    explanation:
      'When numerators are equal, smaller denominators mean larger fractions. 1/3 is larger than 1/4.',
    score: 0,
    knowledgeGaps: ['comparing fractions', 'relationship between denominator size and fraction value'],
  },
}

/** All mock quizzes indexed by topic key */
export const MOCK_QUIZZES: Record<string, Quiz> = {
  'water-cycle': WATER_CYCLE_QUIZ,
  fractions: FRACTIONS_QUIZ,
}
