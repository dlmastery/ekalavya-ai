import { create } from 'zustand'
import type { ClassroomSession, AgentAction } from '@/lib/types'

interface ClassroomState {
  session: ClassroomSession | null
  discussionMessages: AgentAction[]
  activeAgentId: string | null
  isActive: boolean
  startSession: (session: ClassroomSession) => void
  stopSession: () => void
  addMessage: (message: AgentAction) => void
  setActiveAgent: (agentId: string | null) => void
  setCurrentScene: (sceneIndex: number) => void
}

export const useClassroomStore = create<ClassroomState>((set, get) => ({
  session: null,
  discussionMessages: [],
  activeAgentId: null,
  isActive: false,
  startSession: (session) => set({ session, isActive: true, discussionMessages: [], activeAgentId: null }),
  stopSession: () => set({ session: null, isActive: false, discussionMessages: [], activeAgentId: null }),
  addMessage: (message) => set((state) => ({ discussionMessages: [...state.discussionMessages, message] })),
  setActiveAgent: (agentId) => set({ activeAgentId: agentId }),
  setCurrentScene: (sceneIndex) => {
    const s = get().session
    if (s) set({ session: { ...s, currentScene: sceneIndex } })
  },
}))
