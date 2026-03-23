import type {
  OnboardingConfig,
  LearnerProfile,
  StyleResponse,
  LearningStyle,
  Message,
  ChatChunk,
  TutoringMode,
  Hint,
  HintLevel,
  ImageResult,
  ClassroomSession,
  AgentAction,
  DebateSession,
  Lesson,
  Scene,
  Quiz,
  GradeResult,
  DrawingStep,
  MathStep,
  MindmapData,
  ProgressData,
  Achievement,
  StreakData,
  GroupConfig,
  GroupSession,
  GroupState,
  GroupParticipant,
  LearningConfig,
  MascotEmotion,
  InteractionContext,
} from '@/lib/types'
import type { DataProvider } from '@/lib/providers/data-provider'

import { MOCK_PROFILES, DEFAULT_PROFILE } from './fake-profiles'
import { DEFAULT_CONVERSATION, MOCK_CONVERSATIONS } from './fake-conversations'
import { MOCK_LESSONS, WATER_CYCLE_LESSON } from './fake-lessons'
import { MOCK_QUIZZES, MOCK_GRADE_RESULTS, WATER_CYCLE_QUIZ, FRACTIONS_QUIZ } from './fake-quiz'
import {
  CLASSROOM_AGENTS,
  CLASSROOM_TURNS,
  MOCK_CLASSROOM_SESSION,
  MOCK_DEBATE_SESSION,
} from './fake-classroom'
import {
  MOCK_PROGRESS,
  MOCK_STREAK,
  MOCK_ACHIEVEMENTS,
} from './fake-progress'
import {
  MOCK_DRAWING_STEPS,
  MOCK_MATH_STEPS,
  MOCK_MINDMAPS,
  TRIANGLE_STEPS,
  QUADRATIC_STEPS,
  WATER_CYCLE_MINDMAP,
} from './fake-whiteboard'

// ---------------------------------------------------------------------------
// Utility: random delay between min and max ms
// ---------------------------------------------------------------------------
function delay(min: number, max: number): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ---------------------------------------------------------------------------
// Socratic responses for sendMessage
// ---------------------------------------------------------------------------
const SOCRATIC_RESPONSES: Record<string, string> = {
  default:
    'That\'s an interesting thought! Can you tell me more about why you think that? What evidence or experience leads you to that conclusion?',
  math:
    'Great question about math! Let me ask you this — if you had to explain this concept to a friend using a real-world example, what would you use? Sometimes the best way to understand something is to find it in everyday life.',
  science:
    'Fascinating! Science is all about asking "why" and "how." Before I share more, what do you already know about this topic? And what made you curious about it?',
  general:
    'I love that you\'re thinking about this! Here\'s what I want you to consider — what would happen if we looked at this from a completely different angle? What assumptions are we making?',
}

// ---------------------------------------------------------------------------
// MockDataProvider
// ---------------------------------------------------------------------------
export class MockDataProvider implements DataProvider {
  private currentMode: TutoringMode = 'socratic'
  private profile: LearnerProfile = { ...DEFAULT_PROFILE }
  private conversationHistory: Message[] = [...DEFAULT_CONVERSATION]
  private groupSession: GroupSession | null = null

  // =========================================================================
  // Onboarding (F01-F03)
  // =========================================================================

  async initProfile(config: OnboardingConfig): Promise<LearnerProfile> {
    const base = MOCK_PROFILES[config.ageGroup] ?? DEFAULT_PROFILE
    this.profile = {
      ...base,
      config: {
        ...base.config,
        learningStyle: config.learningStyle,
        language: config.language,
      },
      topics: config.topics,
      onboardedAt: new Date(),
      lastActiveAt: new Date(),
    }
    return this.profile
  }

  async detectLearningStyle(responses: StyleResponse[]): Promise<LearningStyle> {
    // Simple mock logic: pick style based on number of responses
    const styles: LearningStyle[] = ['visual', 'verbal', 'active', 'reflective']
    return styles[responses.length % styles.length]
  }

  // =========================================================================
  // Chat (F04-F08)
  // =========================================================================

  async *sendMessage(msg: string, mode?: TutoringMode): AsyncGenerator<ChatChunk> {
    if (mode) {
      this.currentMode = mode
    }

    // Pick a response based on keywords in the message
    const lowerMsg = msg.toLowerCase()
    let response: string
    if (lowerMsg.includes('math') || lowerMsg.includes('fraction') || lowerMsg.includes('number')) {
      response = SOCRATIC_RESPONSES.math
    } else if (lowerMsg.includes('science') || lowerMsg.includes('water') || lowerMsg.includes('evapor')) {
      response = SOCRATIC_RESPONSES.science
    } else {
      response = SOCRATIC_RESPONSES.general
    }

    // Add user message to history
    this.conversationHistory.push({
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: msg,
      timestamp: new Date(),
      mode: this.currentMode,
    })

    // Stream response word by word
    const words = response.split(' ')
    let accumulated = ''
    for (let i = 0; i < words.length; i++) {
      await delay(30, 50)
      accumulated += (i === 0 ? '' : ' ') + words[i]
      yield {
        text: words[i] + (i < words.length - 1 ? ' ' : ''),
        done: false,
      }
    }

    // Final chunk
    yield { text: '', done: true }

    // Add assistant message to history
    this.conversationHistory.push({
      id: `msg-assistant-${Date.now()}`,
      role: 'assistant',
      content: accumulated,
      timestamp: new Date(),
      mode: this.currentMode,
    })
  }

  async getConversationHistory(): Promise<Message[]> {
    return this.conversationHistory
  }

  async getHint(level: HintLevel): Promise<Hint> {
    const hints: Record<HintLevel, Hint> = {
      1: { level: 1, content: 'Take a closer look at the question. What is it really asking?', type: 'observation' },
      2: { level: 2, content: 'Do you notice any patterns or similarities with problems you\'ve solved before?', type: 'pattern' },
      3: { level: 3, content: 'Try breaking the problem into smaller steps. What\'s the first thing you need to figure out?', type: 'approach' },
      4: { level: 4, content: 'Consider using the formula we discussed earlier. Which values do you already know?', type: 'technique' },
      5: { level: 5, content: 'Step 1: Identify the given values. Step 2: Choose the right formula. Step 3: Substitute and solve.', type: 'pseudocode' },
    }
    return hints[level]
  }

  getCurrentMode(): TutoringMode {
    return this.currentMode
  }

  switchMode(mode: TutoringMode): void {
    this.currentMode = mode
  }

  async generateImage(prompt: string): Promise<ImageResult> {
    return {
      url: `https://placehold.co/600x400/FF9933/white?text=${encodeURIComponent(prompt.slice(0, 30))}`,
      alt: prompt,
      width: 600,
      height: 400,
    }
  }

  // =========================================================================
  // Voice (F07)
  // =========================================================================

  async synthesizeSpeech(text: string): Promise<ArrayBuffer> {
    // Return mock audio data as a proper ArrayBuffer
    const encoded = new TextEncoder().encode(`[Mock audio for: ${text.slice(0, 50)}]`)
    const buffer = new ArrayBuffer(encoded.byteLength)
    new Uint8Array(buffer).set(encoded)
    return buffer
  }

  async transcribeSpeech(_audio: Blob): Promise<string> {
    return 'This is a mock transcription of the audio input.'
  }

  // =========================================================================
  // Classroom (F10-F12)
  // =========================================================================

  async startClassroom(topic: string): Promise<ClassroomSession> {
    return {
      ...MOCK_CLASSROOM_SESSION,
      topic,
      id: `classroom-${Date.now()}`,
    }
  }

  async *getAgentResponse(agentId: string): AsyncGenerator<AgentAction> {
    const agentTurns = CLASSROOM_TURNS.filter((t) => t.agentId === agentId)
    const turns = agentTurns.length > 0 ? agentTurns : CLASSROOM_TURNS.slice(0, 3)

    for (const turn of turns) {
      await delay(30, 50)

      // Stream speak actions word by word
      if (turn.type === 'speak') {
        const words = turn.content.split(' ')
        for (let i = 0; i < words.length; i++) {
          await delay(30, 50)
          yield {
            agentId: turn.agentId,
            type: turn.type,
            content: words[i] + (i < words.length - 1 ? ' ' : ''),
            timestamp: new Date(),
            metadata: turn.metadata,
          }
        }
      } else {
        yield {
          ...turn,
          timestamp: new Date(),
        }
      }
    }
  }

  async raiseHand(): Promise<void> {
    // Mock: does nothing visible but resolves
  }

  async startDebate(topic: string): Promise<DebateSession> {
    return {
      ...MOCK_DEBATE_SESSION,
      topic,
      id: `debate-${Date.now()}`,
    }
  }

  // =========================================================================
  // Lessons (F18-F21, F29)
  // =========================================================================

  async generateLesson(topic: string): Promise<Lesson> {
    const key = topic.toLowerCase().replace(/\s+/g, '-')
    return MOCK_LESSONS[key] ?? {
      ...WATER_CYCLE_LESSON,
      id: `lesson-${Date.now()}`,
      topic,
    }
  }

  async getScenes(lessonId: string): Promise<Scene[]> {
    const lesson = Object.values(MOCK_LESSONS).find((l) => l.id === lessonId)
    return lesson?.scenes ?? WATER_CYCLE_LESSON.scenes
  }

  async exportLesson(_lessonId: string, _format: 'pptx' | 'html'): Promise<Blob> {
    return new Blob(['Mock exported lesson content'], { type: 'application/octet-stream' })
  }

  // =========================================================================
  // Quiz (F16-F17)
  // =========================================================================

  async generateQuiz(topic: string, _difficulty: number): Promise<Quiz> {
    const key = topic.toLowerCase().replace(/\s+/g, '-')
    if (MOCK_QUIZZES[key]) return MOCK_QUIZZES[key]
    // Default to water cycle quiz with adjusted topic
    return { ...WATER_CYCLE_QUIZ, id: `quiz-${Date.now()}`, topic }
  }

  async gradeAnswer(questionId: string, answer: string): Promise<GradeResult> {
    if (MOCK_GRADE_RESULTS[questionId]) {
      return { ...MOCK_GRADE_RESULTS[questionId], userAnswer: answer }
    }
    // Generate a generic result
    return {
      questionId,
      correct: false,
      userAnswer: answer,
      correctAnswer: 'See explanation',
      explanation: 'This is a mock grade result. In the real system, your answer would be evaluated by the AI.',
      score: 50,
      knowledgeGaps: ['topic understanding'],
    }
  }

  // =========================================================================
  // Whiteboard (F13-F15)
  // =========================================================================

  async getDrawingSteps(concept: string): Promise<DrawingStep[]> {
    const key = concept.toLowerCase().replace(/\s+/g, '-')
    return MOCK_DRAWING_STEPS[key] ?? TRIANGLE_STEPS
  }

  async getMathConstruction(expression: string): Promise<MathStep[]> {
    const key = expression.toLowerCase().replace(/\s+/g, '-')
    return MOCK_MATH_STEPS[key] ?? QUADRATIC_STEPS
  }

  async getMindmap(topic: string): Promise<MindmapData> {
    const key = topic.toLowerCase().replace(/\s+/g, '-')
    return MOCK_MINDMAPS[key] ?? { ...WATER_CYCLE_MINDMAP, topic }
  }

  // =========================================================================
  // Learner Model (F09)
  // =========================================================================

  async getProfile(): Promise<LearnerProfile> {
    return this.profile
  }

  async updateProfile(delta: Partial<LearnerProfile>): Promise<void> {
    this.profile = { ...this.profile, ...delta, lastActiveAt: new Date() }
  }

  // =========================================================================
  // Progress (F22-F24)
  // =========================================================================

  async getProgress(): Promise<ProgressData> {
    return MOCK_PROGRESS
  }

  async getAchievements(): Promise<Achievement[]> {
    return MOCK_ACHIEVEMENTS
  }

  async getStreak(): Promise<StreakData> {
    return MOCK_STREAK
  }

  // =========================================================================
  // Village Group Mode (F25)
  // =========================================================================

  async createGroup(config: GroupConfig): Promise<GroupSession> {
    const host: GroupParticipant = {
      id: 'host-1',
      name: config.hostName,
      avatar: '\u{1F468}\u200D\u{1F3EB}',
      isHost: true,
      joinedAt: new Date(),
    }
    this.groupSession = {
      id: `group-${Date.now()}`,
      code: String(Math.floor(100000 + Math.random() * 900000)),
      topic: config.topic,
      host,
      participants: [host],
      isActive: true,
      createdAt: new Date(),
    }
    return this.groupSession
  }

  async joinGroup(groupId: string): Promise<GroupSession> {
    if (this.groupSession && this.groupSession.id === groupId) {
      const newParticipant: GroupParticipant = {
        id: `participant-${Date.now()}`,
        name: 'Guest Learner',
        avatar: '\u{1F9D1}\u200D\u{1F393}',
        isHost: false,
        joinedAt: new Date(),
      }
      this.groupSession.participants.push(newParticipant)
      return this.groupSession
    }
    // Return a default session for any group ID
    return {
      id: groupId,
      code: '123456',
      topic: 'General Discussion',
      host: {
        id: 'host-default',
        name: 'Teacher',
        avatar: '\u{1F468}\u200D\u{1F3EB}',
        isHost: true,
        joinedAt: new Date(),
      },
      participants: [],
      isActive: true,
      createdAt: new Date(),
    }
  }

  async getGroupState(): Promise<GroupState> {
    const session = this.groupSession ?? (await this.joinGroup('default'))
    return {
      session,
      currentScreen: 'lobby',
      discussionMessages: [
        {
          participantId: session.host.id,
          content: 'Welcome everyone! Let\'s get started.',
          timestamp: new Date(),
        },
      ],
    }
  }

  // =========================================================================
  // Settings (F26-F28)
  // =========================================================================

  async updateConfig(config: LearningConfig): Promise<void> {
    this.profile = {
      ...this.profile,
      config,
      lastActiveAt: new Date(),
    }
  }

  async getAvailableCommands(): Promise<Array<{ name: string; description: string }>> {
    return [
      { name: '/quiz', description: 'Start a quiz on the current topic' },
      { name: '/hint', description: 'Get a hint for the current problem' },
      { name: '/lesson', description: 'Generate a lesson on a topic' },
      { name: '/whiteboard', description: 'Open the visual whiteboard' },
      { name: '/classroom', description: 'Start a simulated classroom session' },
      { name: '/debate', description: 'Start a debate on a topic' },
      { name: '/progress', description: 'View your learning progress' },
      { name: '/settings', description: 'Adjust your learning preferences' },
      { name: '/mode', description: 'Switch tutoring mode (socratic, story, practical, etc.)' },
      { name: '/group', description: 'Create or join a group learning session' },
    ]
  }

  // =========================================================================
  // Mascot (F32)
  // =========================================================================

  getMascotState(context: InteractionContext): MascotEmotion {
    // Pure logic mapping interaction context to mascot emotion
    switch (context.lastUserAction) {
      case 'asked-question':
        return 'curious'
      case 'answered-correctly':
        return context.streakCount >= 3 ? 'celebrating' : 'excited'
      case 'answered-incorrectly':
        return 'encouraging'
      case 'idle':
        return context.sessionDuration > 30 ? 'sleeping' : 'thinking'
      case 'speaking':
        return 'listening'
      case 'new-topic':
        return 'excited'
      case 'milestone':
        return 'celebrating'
      case 'explaining':
        return 'teaching'
      default:
        return 'thinking'
    }
  }
}
