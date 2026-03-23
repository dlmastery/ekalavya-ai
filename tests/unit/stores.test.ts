import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useLearnerStore } from '@/lib/stores/learner-store'
import { useThemeStore } from '@/lib/stores/theme-store'
import { useVoiceStore } from '@/lib/stores/voice-store'
import { useClassroomStore } from '@/lib/stores/classroom-store'
import type { LearnerProfile, ClassroomSession, AgentAction } from '@/lib/types'

// Helper: create a mock LearnerProfile
function makeLearnerProfile(overrides?: Partial<LearnerProfile>): LearnerProfile {
  return {
    id: 'learner-1',
    name: 'Test Learner',
    ageGroup: 'teen',
    avatar: '/avatars/default.png',
    config: {
      depth: 5,
      learningStyle: 'visual',
      tone: 'friendly',
      reasoning: 'deductive',
      language: 'en',
      voiceSpeed: 1.0,
      voiceAccent: 'neutral',
    },
    topics: ['math', 'science'],
    onboardedAt: new Date('2025-01-01'),
    lastActiveAt: new Date('2025-06-01'),
    ...overrides,
  }
}

// Helper: create a mock ClassroomSession
function makeClassroomSession(overrides?: Partial<ClassroomSession>): ClassroomSession {
  return {
    id: 'session-1',
    topic: 'Photosynthesis',
    agents: [
      { id: 'agent-1', name: 'Professor Oak', role: 'teacher', avatar: '/agents/oak.png', personality: 'wise and patient' },
      { id: 'agent-2', name: 'Curious Carl', role: 'curious', avatar: '/agents/carl.png', personality: 'always asking why' },
    ],
    currentScene: 0,
    totalScenes: 5,
    isActive: true,
    ...overrides,
  }
}

// Helper: create a mock AgentAction
function makeAgentAction(overrides?: Partial<AgentAction>): AgentAction {
  return {
    agentId: 'agent-1',
    type: 'speak',
    content: 'Hello class!',
    timestamp: new Date(),
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// Learner Store
// ---------------------------------------------------------------------------
describe('useLearnerStore', () => {
  beforeEach(() => {
    useLearnerStore.setState({ profile: null, isOnboarded: false })
  })

  it('has no profile initially', () => {
    const state = useLearnerStore.getState()
    expect(state.profile).toBeNull()
    expect(state.isOnboarded).toBe(false)
  })

  it('setProfile() updates profile and sets isOnboarded to true', () => {
    const profile = makeLearnerProfile()
    useLearnerStore.getState().setProfile(profile)

    const state = useLearnerStore.getState()
    expect(state.profile).toEqual(profile)
    expect(state.isOnboarded).toBe(true)
  })

  it('clearProfile() resets profile to null and isOnboarded to false', () => {
    useLearnerStore.getState().setProfile(makeLearnerProfile())
    useLearnerStore.getState().clearProfile()

    const state = useLearnerStore.getState()
    expect(state.profile).toBeNull()
    expect(state.isOnboarded).toBe(false)
  })

  it('updateConfig() merges config correctly', () => {
    const profile = makeLearnerProfile()
    useLearnerStore.getState().setProfile(profile)

    useLearnerStore.getState().updateConfig({ depth: 8, tone: 'humorous' })

    const updated = useLearnerStore.getState().profile!
    expect(updated.config.depth).toBe(8)
    expect(updated.config.tone).toBe('humorous')
    // Unchanged fields should be preserved
    expect(updated.config.learningStyle).toBe('visual')
    expect(updated.config.language).toBe('en')
    // lastActiveAt should be updated
    expect(updated.lastActiveAt.getTime()).toBeGreaterThanOrEqual(profile.lastActiveAt.getTime())
  })

  it('updateConfig() does nothing when no profile is set', () => {
    useLearnerStore.getState().updateConfig({ depth: 3 })
    expect(useLearnerStore.getState().profile).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Theme Store
// ---------------------------------------------------------------------------
describe('useThemeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ mode: 'system', resolvedTheme: 'light' })
  })

  it('has system as initial theme mode', () => {
    const state = useThemeStore.getState()
    expect(state.mode).toBe('system')
  })

  it('setTheme() changes mode to dark', () => {
    useThemeStore.getState().setTheme('dark')

    const state = useThemeStore.getState()
    expect(state.mode).toBe('dark')
    expect(state.resolvedTheme).toBe('dark')
  })

  it('setTheme() changes mode to light', () => {
    useThemeStore.getState().setTheme('light')

    const state = useThemeStore.getState()
    expect(state.mode).toBe('light')
    expect(state.resolvedTheme).toBe('light')
  })

  it('resolvedTheme computes correctly for system mode', () => {
    // Mock matchMedia for jsdom — simulate light preference
    const originalMatchMedia = window.matchMedia
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    useThemeStore.getState().setTheme('system')
    expect(useThemeStore.getState().mode).toBe('system')
    expect(useThemeStore.getState().resolvedTheme).toBe('light')

    // Now simulate dark preference
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    useThemeStore.getState().setTheme('system')
    expect(useThemeStore.getState().resolvedTheme).toBe('dark')

    window.matchMedia = originalMatchMedia
  })
})

// ---------------------------------------------------------------------------
// Voice Store
// ---------------------------------------------------------------------------
describe('useVoiceStore', () => {
  beforeEach(() => {
    useVoiceStore.setState({ state: 'idle', hasPermission: false })
  })

  it('has idle as initial state', () => {
    expect(useVoiceStore.getState().state).toBe('idle')
  })

  it('transitions idle -> recording -> processing -> playing -> idle', () => {
    const store = useVoiceStore.getState()

    store.startRecording()
    expect(useVoiceStore.getState().state).toBe('recording')

    useVoiceStore.getState().stopRecording()
    expect(useVoiceStore.getState().state).toBe('processing')

    useVoiceStore.getState().setPlaying()
    expect(useVoiceStore.getState().state).toBe('playing')

    useVoiceStore.getState().setIdle()
    expect(useVoiceStore.getState().state).toBe('idle')
  })

  it('setPermission() updates hasPermission', () => {
    useVoiceStore.getState().setPermission(true)
    expect(useVoiceStore.getState().hasPermission).toBe(true)

    useVoiceStore.getState().setPermission(false)
    expect(useVoiceStore.getState().hasPermission).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Classroom Store
// ---------------------------------------------------------------------------
describe('useClassroomStore', () => {
  beforeEach(() => {
    useClassroomStore.setState({
      session: null,
      discussionMessages: [],
      activeAgentId: null,
      isActive: false,
    })
  })

  it('starts with no session', () => {
    const state = useClassroomStore.getState()
    expect(state.session).toBeNull()
    expect(state.isActive).toBe(false)
    expect(state.discussionMessages).toEqual([])
    expect(state.activeAgentId).toBeNull()
  })

  it('startSession() sets session and marks active', () => {
    const session = makeClassroomSession()
    useClassroomStore.getState().startSession(session)

    const state = useClassroomStore.getState()
    expect(state.session).toEqual(session)
    expect(state.isActive).toBe(true)
    expect(state.discussionMessages).toEqual([])
  })

  it('stopSession() clears everything', () => {
    useClassroomStore.getState().startSession(makeClassroomSession())
    useClassroomStore.getState().addMessage(makeAgentAction())
    useClassroomStore.getState().setActiveAgent('agent-1')

    useClassroomStore.getState().stopSession()

    const state = useClassroomStore.getState()
    expect(state.session).toBeNull()
    expect(state.isActive).toBe(false)
    expect(state.discussionMessages).toEqual([])
    expect(state.activeAgentId).toBeNull()
  })

  it('addMessage() appends messages to discussion', () => {
    useClassroomStore.getState().startSession(makeClassroomSession())

    const msg1 = makeAgentAction({ content: 'First message' })
    const msg2 = makeAgentAction({ agentId: 'agent-2', content: 'Second message' })

    useClassroomStore.getState().addMessage(msg1)
    useClassroomStore.getState().addMessage(msg2)

    const messages = useClassroomStore.getState().discussionMessages
    expect(messages).toHaveLength(2)
    expect(messages[0].content).toBe('First message')
    expect(messages[1].content).toBe('Second message')
    expect(messages[1].agentId).toBe('agent-2')
  })

  it('setActiveAgent() sets the active agent id', () => {
    useClassroomStore.getState().setActiveAgent('agent-1')
    expect(useClassroomStore.getState().activeAgentId).toBe('agent-1')

    useClassroomStore.getState().setActiveAgent(null)
    expect(useClassroomStore.getState().activeAgentId).toBeNull()
  })

  it('setCurrentScene() updates scene index on session', () => {
    useClassroomStore.getState().startSession(makeClassroomSession())

    useClassroomStore.getState().setCurrentScene(3)
    expect(useClassroomStore.getState().session!.currentScene).toBe(3)
  })

  it('setCurrentScene() does nothing when no session exists', () => {
    useClassroomStore.getState().setCurrentScene(3)
    expect(useClassroomStore.getState().session).toBeNull()
  })
})
