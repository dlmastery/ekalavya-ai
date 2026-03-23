import type {
  OnboardingConfig, LearnerProfile, StyleResponse, LearningStyle,
  Message, ChatChunk, TutoringMode, Hint, HintLevel, ImageResult,
  ClassroomSession, AgentAction, DebateSession,
  Lesson, Scene,
  Quiz, GradeResult,
  DrawingStep, MathStep, MindmapData,
  ProgressData, Achievement, StreakData,
  GroupConfig, GroupSession, GroupState,
  LearningConfig,
  MascotEmotion, InteractionContext,
} from '@/lib/types'

export interface DataProvider {
  // Onboarding (F01-F03)
  initProfile(config: OnboardingConfig): Promise<LearnerProfile>
  detectLearningStyle(responses: StyleResponse[]): Promise<LearningStyle>

  // Chat (F04-F08)
  sendMessage(msg: string, mode?: TutoringMode): AsyncGenerator<ChatChunk>
  getConversationHistory(): Promise<Message[]>
  getHint(level: HintLevel): Promise<Hint>
  getCurrentMode(): TutoringMode
  switchMode(mode: TutoringMode): void
  generateImage(prompt: string): Promise<ImageResult>

  // Voice (F07)
  synthesizeSpeech(text: string): Promise<ArrayBuffer>
  transcribeSpeech(audio: Blob): Promise<string>

  // Classroom (F10-F12)
  startClassroom(topic: string): Promise<ClassroomSession>
  getAgentResponse(agentId: string): AsyncGenerator<AgentAction>
  raiseHand(): Promise<void>
  startDebate(topic: string): Promise<DebateSession>

  // Lessons (F18-F21, F29)
  generateLesson(topic: string): Promise<Lesson>
  getScenes(lessonId: string): Promise<Scene[]>
  exportLesson(lessonId: string, format: 'pptx' | 'html'): Promise<Blob>

  // Quiz (F16-F17)
  generateQuiz(topic: string, difficulty: number): Promise<Quiz>
  gradeAnswer(questionId: string, answer: string): Promise<GradeResult>

  // Whiteboard (F13-F15)
  getDrawingSteps(concept: string): Promise<DrawingStep[]>
  getMathConstruction(expression: string): Promise<MathStep[]>
  getMindmap(topic: string): Promise<MindmapData>

  // Learner Model (F09)
  getProfile(): Promise<LearnerProfile>
  updateProfile(delta: Partial<LearnerProfile>): Promise<void>

  // Progress (F22-F24)
  getProgress(): Promise<ProgressData>
  getAchievements(): Promise<Achievement[]>
  getStreak(): Promise<StreakData>

  // Village Group Mode (F25)
  createGroup(config: GroupConfig): Promise<GroupSession>
  joinGroup(groupId: string): Promise<GroupSession>
  getGroupState(): Promise<GroupState>

  // Settings (F26-F28)
  updateConfig(config: LearningConfig): Promise<void>
  getAvailableCommands(): Promise<Array<{ name: string; description: string }>>

  // Mascot (F32)
  getMascotState(context: InteractionContext): MascotEmotion
}
