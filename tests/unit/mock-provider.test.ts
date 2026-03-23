import { describe, it, expect, beforeEach } from 'vitest'
import { MockDataProvider } from '@/lib/mock/provider'
import type { DataProvider } from '@/lib/providers/data-provider'
import type {
  LearnerProfile,
  ProgressData,
  Message,
  Quiz,
  ChatChunk,
  DrawingStep,
  MascotEmotion,
  InteractionContext,
  MathStep,
  MindmapData,
  ClassroomSession,
  DebateSession,
  Hint,
  Achievement,
  StreakData,
  GroupSession,
  AgentAction,
} from '@/lib/types'

describe('MockDataProvider', () => {
  let provider: MockDataProvider

  beforeEach(() => {
    provider = new MockDataProvider()
  })

  // =========================================================================
  // Interface conformance
  // =========================================================================
  it('implements the DataProvider interface', () => {
    // TypeScript compile-time check: assigning to DataProvider type
    const dp: DataProvider = provider
    expect(dp).toBeDefined()

    // Verify all 33 methods exist
    const expectedMethods: Array<keyof DataProvider> = [
      'initProfile', 'detectLearningStyle',
      'sendMessage', 'getConversationHistory', 'getHint', 'getCurrentMode', 'switchMode', 'generateImage',
      'synthesizeSpeech', 'transcribeSpeech',
      'startClassroom', 'getAgentResponse', 'raiseHand', 'startDebate',
      'generateLesson', 'getScenes', 'exportLesson',
      'generateQuiz', 'gradeAnswer',
      'getDrawingSteps', 'getMathConstruction', 'getMindmap',
      'getProfile', 'updateProfile',
      'getProgress', 'getAchievements', 'getStreak',
      'createGroup', 'joinGroup', 'getGroupState',
      'updateConfig', 'getAvailableCommands',
      'getMascotState',
    ]

    for (const method of expectedMethods) {
      expect(typeof (provider as unknown as Record<string, unknown>)[method]).toBe('function')
    }

    expect(expectedMethods).toHaveLength(33)
  })

  // =========================================================================
  // Onboarding
  // =========================================================================
  describe('Onboarding', () => {
    it('initProfile returns a valid LearnerProfile', async () => {
      const profile = await provider.initProfile({
        ageGroup: 'teen',
        language: 'Hindi',
        topics: ['Math', 'Science'],
        learningStyle: 'active',
      })
      expect(profile.id).toBeTruthy()
      expect(profile.name).toBeTruthy()
      expect(profile.ageGroup).toBe('teen')
      expect(profile.config.language).toBe('Hindi')
      expect(profile.config.learningStyle).toBe('active')
      expect(profile.topics).toEqual(['Math', 'Science'])
      expect(profile.onboardedAt).toBeInstanceOf(Date)
      expect(profile.lastActiveAt).toBeInstanceOf(Date)
    })

    it('detectLearningStyle returns a valid LearningStyle', async () => {
      const style = await provider.detectLearningStyle([
        { questionId: 'q1', answer: 'a' },
        { questionId: 'q2', answer: 'b' },
      ])
      expect(['visual', 'verbal', 'active', 'reflective']).toContain(style)
    })
  })

  // =========================================================================
  // Profile
  // =========================================================================
  describe('getProfile', () => {
    it('returns a valid LearnerProfile', async () => {
      const profile: LearnerProfile = await provider.getProfile()

      expect(profile.id).toBeTruthy()
      expect(profile.name).toBeTruthy()
      expect(['child', 'teen', 'adult']).toContain(profile.ageGroup)
      expect(profile.avatar).toBeTruthy()
      expect(profile.config).toBeDefined()
      expect(profile.config.depth).toBeGreaterThanOrEqual(1)
      expect(profile.config.depth).toBeLessThanOrEqual(10)
      expect(['visual', 'verbal', 'active', 'reflective']).toContain(profile.config.learningStyle)
      expect(['encouraging', 'neutral', 'friendly', 'humorous', 'formal']).toContain(profile.config.tone)
      expect(['deductive', 'inductive', 'analogical', 'causal']).toContain(profile.config.reasoning)
      expect(profile.topics.length).toBeGreaterThan(0)
      expect(profile.onboardedAt).toBeInstanceOf(Date)
      expect(profile.lastActiveAt).toBeInstanceOf(Date)
    })

    it('updateProfile modifies the stored profile', async () => {
      await provider.updateProfile({ name: 'Updated Name' })
      const profile = await provider.getProfile()
      expect(profile.name).toBe('Updated Name')
    })
  })

  // =========================================================================
  // Progress
  // =========================================================================
  describe('getProgress', () => {
    it('returns ProgressData with 8 topic masteries', async () => {
      const progress: ProgressData = await provider.getProgress()

      expect(progress.topicMastery).toHaveLength(8)
      expect(progress.totalXP).toBe(2500)
      expect(progress.xpHistory.length).toBeGreaterThan(0)
      expect(progress.streak).toBeDefined()
      expect(progress.streak.currentStreak).toBe(12)
      expect(progress.streak.longestStreak).toBe(18)
      expect(progress.achievements.length).toBeGreaterThan(0)
      expect(progress.roadmap.length).toBe(8)
      expect(progress.learningStyleInsight).toBeTruthy()

      // Verify each topic mastery has required fields
      for (const tm of progress.topicMastery) {
        expect(tm.topic).toBeTruthy()
        expect(['novice', 'beginner', 'intermediate', 'advanced', 'master']).toContain(tm.level)
        expect(tm.progress).toBeGreaterThanOrEqual(0)
        expect(tm.progress).toBeLessThanOrEqual(100)
        expect(tm.subjectColor).toBeTruthy()
        expect(tm.lastPracticed).toBeInstanceOf(Date)
      }
    })

    it('getAchievements returns achievements with 3 earned and 3 locked', async () => {
      const achievements: Achievement[] = await provider.getAchievements()
      expect(achievements).toHaveLength(6)
      const earned = achievements.filter((a) => a.earned)
      const locked = achievements.filter((a) => !a.earned)
      expect(earned).toHaveLength(3)
      expect(locked).toHaveLength(3)
      for (const a of earned) {
        expect(a.earnedAt).toBeInstanceOf(Date)
      }
    })

    it('getStreak returns valid streak data', async () => {
      const streak: StreakData = await provider.getStreak()
      expect(streak.currentStreak).toBe(12)
      expect(streak.longestStreak).toBe(18)
      expect(streak.todayCompleted).toBe(true)
      expect(streak.history.length).toBe(90)
    })
  })

  // =========================================================================
  // Conversation
  // =========================================================================
  describe('getConversationHistory', () => {
    it('returns a non-empty messages array', async () => {
      const messages: Message[] = await provider.getConversationHistory()

      expect(messages.length).toBeGreaterThan(0)
      for (const msg of messages) {
        expect(msg.id).toBeTruthy()
        expect(['user', 'assistant']).toContain(msg.role)
        expect(msg.content).toBeTruthy()
        expect(msg.timestamp).toBeInstanceOf(Date)
      }
    })

    it('includes both user and assistant messages', async () => {
      const messages = await provider.getConversationHistory()
      const roles = new Set(messages.map((m) => m.role))
      expect(roles.has('user')).toBe(true)
      expect(roles.has('assistant')).toBe(true)
    })
  })

  // =========================================================================
  // Quiz
  // =========================================================================
  describe('generateQuiz', () => {
    it('returns a Quiz with questions', async () => {
      const quiz: Quiz = await provider.generateQuiz('The Water Cycle', 3)

      expect(quiz.id).toBeTruthy()
      expect(quiz.topic).toBeTruthy()
      expect(quiz.difficulty).toBeGreaterThan(0)
      expect(quiz.questions.length).toBeGreaterThan(0)

      for (const q of quiz.questions) {
        expect(q.id).toBeTruthy()
        expect(['mcq', 'fill', 'short']).toContain(q.type)
        expect(q.text).toBeTruthy()
        expect(q.correctAnswer).toBeTruthy()
        expect(q.explanation).toBeTruthy()
        expect(q.difficulty).toBeGreaterThanOrEqual(1)
        if (q.type === 'mcq') {
          expect(q.options).toBeDefined()
          expect(q.options!.length).toBeGreaterThan(1)
        }
      }
    })

    it('returns fractions quiz when requesting fractions topic', async () => {
      const quiz = await provider.generateQuiz('Fractions', 5)
      expect(quiz.topic).toBe('Fractions')
      expect(quiz.questions).toHaveLength(5)
    })

    it('gradeAnswer returns a GradeResult', async () => {
      const result = await provider.gradeAnswer('wc-q1', 'wc-q1-b')
      expect(result.questionId).toBe('wc-q1')
      expect(result.correct).toBe(true)
      expect(result.score).toBe(100)
      expect(result.explanation).toBeTruthy()
      expect(Array.isArray(result.knowledgeGaps)).toBe(true)
    })

    it('gradeAnswer returns knowledge gaps for wrong answers', async () => {
      const result = await provider.gradeAnswer('wc-q3', 'condensation')
      expect(result.correct).toBe(false)
      expect(result.knowledgeGaps.length).toBeGreaterThan(0)
    })
  })

  // =========================================================================
  // Streaming: sendMessage
  // =========================================================================
  describe('sendMessage', () => {
    it('yields ChatChunk objects via async generator', async () => {
      const chunks: ChatChunk[] = []

      for await (const chunk of provider.sendMessage('Tell me about fractions')) {
        chunks.push(chunk)
      }

      expect(chunks.length).toBeGreaterThan(1)

      // All non-final chunks should have text
      const nonFinalChunks = chunks.filter((c) => !c.done)
      for (const chunk of nonFinalChunks) {
        expect(chunk.text).toBeTruthy()
        expect(chunk.done).toBe(false)
      }

      // Last chunk should be done
      const lastChunk = chunks[chunks.length - 1]
      expect(lastChunk.done).toBe(true)
    })

    it('adds messages to conversation history after streaming', async () => {
      const historyBefore = await provider.getConversationHistory()
      const lengthBefore = historyBefore.length

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _chunk of provider.sendMessage('Hello there')) {
        // consume all chunks
      }

      const historyAfter = await provider.getConversationHistory()
      // Should have 2 new messages: user + assistant
      expect(historyAfter.length).toBe(lengthBefore + 2)
      expect(historyAfter[historyAfter.length - 2].role).toBe('user')
      expect(historyAfter[historyAfter.length - 1].role).toBe('assistant')
    })

    it('respects the mode parameter', async () => {
      expect(provider.getCurrentMode()).toBe('socratic')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _chunk of provider.sendMessage('test', 'story')) {
        // consume
      }
      expect(provider.getCurrentMode()).toBe('story')
    })
  }, 15000)

  // =========================================================================
  // Whiteboard
  // =========================================================================
  describe('getDrawingSteps', () => {
    it('returns a DrawingStep array', async () => {
      const steps: DrawingStep[] = await provider.getDrawingSteps('triangle')

      expect(steps.length).toBeGreaterThan(0)
      for (const step of steps) {
        expect(step.id).toBeTruthy()
        expect(step.order).toBeGreaterThan(0)
        expect(['line', 'circle', 'rect', 'path', 'text', 'arrow']).toContain(step.type)
        expect(step.stroke).toBeTruthy()
        expect(step.animationDuration).toBeGreaterThan(0)
      }
    })

    it('returns water cycle diagram steps', async () => {
      const steps = await provider.getDrawingSteps('water-cycle')
      expect(steps.length).toBe(8)
    })
  })

  describe('getMathConstruction', () => {
    it('returns MathStep array for quadratic', async () => {
      const steps: MathStep[] = await provider.getMathConstruction('quadratic')
      expect(steps.length).toBe(5)
      for (const step of steps) {
        expect(step.expression).toBeTruthy()
        expect(step.color).toBeTruthy()
        expect(step.label).toBeTruthy()
      }
    })
  })

  describe('getMindmap', () => {
    it('returns MindmapData with branches', async () => {
      const mindmap: MindmapData = await provider.getMindmap('water-cycle')
      expect(mindmap.topic).toBe('Water Cycle')
      expect(mindmap.root.children.length).toBe(4)
      expect(mindmap.root.label).toBe('Water Cycle')
      for (const branch of mindmap.root.children) {
        expect(branch.label).toBeTruthy()
        expect(branch.children.length).toBeGreaterThan(0)
      }
    })
  })

  // =========================================================================
  // Mascot
  // =========================================================================
  describe('getMascotState', () => {
    it('returns valid MascotEmotion', () => {
      const validEmotions: MascotEmotion[] = [
        'curious', 'celebrating', 'thinking', 'encouraging',
        'excited', 'sleeping', 'teaching', 'listening',
      ]

      const context: InteractionContext = {
        lastUserAction: 'asked-question',
        currentScreen: 'chat',
        streakCount: 5,
        sessionDuration: 120,
      }
      const emotion = provider.getMascotState(context)
      expect(validEmotions).toContain(emotion)
    })

    it('returns "curious" when user asks a question', () => {
      const emotion = provider.getMascotState({
        lastUserAction: 'asked-question',
        currentScreen: 'chat',
        streakCount: 0,
        sessionDuration: 60,
      })
      expect(emotion).toBe('curious')
    })

    it('returns "celebrating" for correct answer with streak >= 3', () => {
      const emotion = provider.getMascotState({
        lastUserAction: 'answered-correctly',
        currentScreen: 'quiz',
        streakCount: 5,
        sessionDuration: 60,
      })
      expect(emotion).toBe('celebrating')
    })

    it('returns "excited" for correct answer with streak < 3', () => {
      const emotion = provider.getMascotState({
        lastUserAction: 'answered-correctly',
        currentScreen: 'quiz',
        streakCount: 1,
        sessionDuration: 60,
      })
      expect(emotion).toBe('excited')
    })

    it('returns "encouraging" for incorrect answer', () => {
      const emotion = provider.getMascotState({
        lastUserAction: 'answered-incorrectly',
        currentScreen: 'quiz',
        streakCount: 0,
        sessionDuration: 60,
      })
      expect(emotion).toBe('encouraging')
    })

    it('returns "sleeping" when idle for > 30 seconds', () => {
      const emotion = provider.getMascotState({
        lastUserAction: 'idle',
        currentScreen: 'chat',
        streakCount: 0,
        sessionDuration: 45,
      })
      expect(emotion).toBe('sleeping')
    })

    it('returns "listening" when user is speaking', () => {
      const emotion = provider.getMascotState({
        lastUserAction: 'speaking',
        currentScreen: 'chat',
        streakCount: 0,
        sessionDuration: 10,
      })
      expect(emotion).toBe('listening')
    })

    it('returns "teaching" when explaining', () => {
      const emotion = provider.getMascotState({
        lastUserAction: 'explaining',
        currentScreen: 'lesson',
        streakCount: 0,
        sessionDuration: 120,
      })
      expect(emotion).toBe('teaching')
    })

    it('returns "excited" for new topic', () => {
      const emotion = provider.getMascotState({
        lastUserAction: 'new-topic',
        currentScreen: 'chat',
        streakCount: 0,
        sessionDuration: 5,
      })
      expect(emotion).toBe('excited')
    })

    it('returns "celebrating" for milestone', () => {
      const emotion = provider.getMascotState({
        lastUserAction: 'milestone',
        currentScreen: 'progress',
        streakCount: 10,
        sessionDuration: 300,
      })
      expect(emotion).toBe('celebrating')
    })
  })

  // =========================================================================
  // Chat helpers
  // =========================================================================
  describe('Chat helpers', () => {
    it('getCurrentMode returns socratic by default', () => {
      expect(provider.getCurrentMode()).toBe('socratic')
    })

    it('switchMode changes current mode', () => {
      provider.switchMode('story')
      expect(provider.getCurrentMode()).toBe('story')
      provider.switchMode('practical')
      expect(provider.getCurrentMode()).toBe('practical')
    })

    it('getHint returns appropriate hint for each level', async () => {
      for (const level of [1, 2, 3, 4, 5] as const) {
        const hint: Hint = await provider.getHint(level)
        expect(hint.level).toBe(level)
        expect(hint.content).toBeTruthy()
        expect(['observation', 'pattern', 'approach', 'technique', 'pseudocode']).toContain(hint.type)
      }
    })

    it('generateImage returns an ImageResult', async () => {
      const result = await provider.generateImage('a triangle')
      expect(result.url).toBeTruthy()
      expect(result.alt).toBe('a triangle')
      expect(result.width).toBeGreaterThan(0)
      expect(result.height).toBeGreaterThan(0)
    })
  })

  // =========================================================================
  // Classroom
  // =========================================================================
  describe('Classroom', () => {
    it('startClassroom returns a valid ClassroomSession', async () => {
      const session: ClassroomSession = await provider.startClassroom('Fractions')
      expect(session.id).toBeTruthy()
      expect(session.topic).toBe('Fractions')
      expect(session.agents.length).toBeGreaterThan(0)
      expect(session.isActive).toBe(true)
    })

    it('getAgentResponse yields AgentAction objects', async () => {
      const actions: AgentAction[] = []
      for await (const action of provider.getAgentResponse('agent-teacher')) {
        actions.push(action)
        if (actions.length >= 5) break // limit to avoid long tests
      }
      expect(actions.length).toBeGreaterThan(0)
      for (const action of actions) {
        expect(action.agentId).toBeTruthy()
        expect(action.content).toBeTruthy()
        expect(action.timestamp).toBeInstanceOf(Date)
      }
    }, 15000)

    it('raiseHand resolves without error', async () => {
      await expect(provider.raiseHand()).resolves.toBeUndefined()
    })

    it('startDebate returns a DebateSession', async () => {
      const debate: DebateSession = await provider.startDebate('Climate Change')
      expect(debate.id).toBeTruthy()
      expect(debate.topic).toBe('Climate Change')
      expect(debate.agents.length).toBeGreaterThan(0)
      expect(debate.turns.length).toBeGreaterThan(0)
    })
  })

  // =========================================================================
  // Lessons
  // =========================================================================
  describe('Lessons', () => {
    it('generateLesson returns a Lesson with scenes', async () => {
      const lesson = await provider.generateLesson('The Water Cycle')
      expect(lesson.id).toBeTruthy()
      expect(lesson.topic).toBe('The Water Cycle')
      expect(lesson.scenes.length).toBe(5)
      expect(lesson.totalDuration).toBeGreaterThan(0)
      expect(lesson.subjectColor).toBeTruthy()

      // Verify scene types
      const types = lesson.scenes.map((s) => s.type)
      expect(types).toContain('slide')
      expect(types).toContain('quiz')
      expect(types).toContain('simulation')
      expect(types).toContain('pbl')
    })

    it('getScenes returns scenes for a known lesson', async () => {
      const scenes = await provider.getScenes('lesson-water-cycle-1')
      expect(scenes.length).toBe(5)
      for (const scene of scenes) {
        expect(scene.id).toBeTruthy()
        expect(scene.order).toBeGreaterThan(0)
        expect(scene.duration).toBeGreaterThan(0)
      }
    })

    it('exportLesson returns a Blob', async () => {
      const blob = await provider.exportLesson('lesson-water-cycle-1', 'html')
      expect(blob).toBeInstanceOf(Blob)
    })
  })

  // =========================================================================
  // Voice (mock)
  // =========================================================================
  describe('Voice', () => {
    it('synthesizeSpeech returns an ArrayBuffer', async () => {
      const buffer = await provider.synthesizeSpeech('Hello world')
      expect(buffer).toBeInstanceOf(ArrayBuffer)
      expect(buffer.byteLength).toBeGreaterThan(0)
    })

    it('transcribeSpeech returns a string', async () => {
      const blob = new Blob(['mock audio'], { type: 'audio/wav' })
      const text = await provider.transcribeSpeech(blob)
      expect(typeof text).toBe('string')
      expect(text.length).toBeGreaterThan(0)
    })
  })

  // =========================================================================
  // Group (Village Mode)
  // =========================================================================
  describe('Group Mode', () => {
    it('createGroup returns a GroupSession', async () => {
      const session: GroupSession = await provider.createGroup({
        topic: 'Math Practice',
        maxParticipants: 5,
        hostName: 'Priya',
      })
      expect(session.id).toBeTruthy()
      expect(session.code).toMatch(/^\d{6}$/)
      expect(session.topic).toBe('Math Practice')
      expect(session.host.name).toBe('Priya')
      expect(session.host.isHost).toBe(true)
      expect(session.isActive).toBe(true)
    })

    it('joinGroup returns a GroupSession', async () => {
      const created = await provider.createGroup({
        topic: 'Science',
        maxParticipants: 4,
        hostName: 'Teacher',
      })
      const joined = await provider.joinGroup(created.id)
      expect(joined.id).toBe(created.id)
      expect(joined.participants.length).toBeGreaterThan(1)
    })

    it('getGroupState returns GroupState', async () => {
      await provider.createGroup({
        topic: 'History',
        maxParticipants: 4,
        hostName: 'Ms. Vidya',
      })
      const state = await provider.getGroupState()
      expect(state.session).toBeDefined()
      expect(state.currentScreen).toBe('lobby')
      expect(state.discussionMessages.length).toBeGreaterThan(0)
    })
  })

  // =========================================================================
  // Settings
  // =========================================================================
  describe('Settings', () => {
    it('updateConfig updates the profile config', async () => {
      await provider.updateConfig({
        depth: 7,
        learningStyle: 'verbal',
        tone: 'formal',
        reasoning: 'causal',
        language: 'Hindi',
        voiceSpeed: 1.5,
        voiceAccent: 'hindi',
      })
      const profile = await provider.getProfile()
      expect(profile.config.depth).toBe(7)
      expect(profile.config.tone).toBe('formal')
      expect(profile.config.language).toBe('Hindi')
    })

    it('getAvailableCommands returns non-empty array', async () => {
      const commands = await provider.getAvailableCommands()
      expect(commands.length).toBeGreaterThan(0)
      for (const cmd of commands) {
        expect(cmd.name).toBeTruthy()
        expect(cmd.description).toBeTruthy()
      }
    })
  })
})
