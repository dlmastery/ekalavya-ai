export type AgentRole = 'teacher' | 'ta' | 'curious' | 'skeptic' | 'beginner' | 'advanced'

export interface Agent {
  id: string
  name: string
  role: AgentRole
  avatar: string
  personality: string
}

export type AgentActionType = 'speak' | 'whiteboard-draw' | 'whiteboard-text' | 'spotlight' | 'laser' | 'pose-question' | 'call-on-student' | 'transition-scene'

export interface AgentAction {
  agentId: string
  type: AgentActionType
  content: string
  timestamp: Date
  metadata?: Record<string, unknown>
}

export interface ClassroomSession {
  id: string
  topic: string
  agents: Agent[]
  currentScene: number
  totalScenes: number
  isActive: boolean
}

export interface DebateSession {
  id: string
  topic: string
  proposition: string
  agents: Agent[]
  turns: AgentAction[]
}
