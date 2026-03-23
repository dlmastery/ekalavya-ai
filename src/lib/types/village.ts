export interface GroupParticipant {
  id: string
  name: string
  avatar: string
  isHost: boolean
  joinedAt: Date
}

export interface GroupConfig {
  topic: string
  maxParticipants: number
  hostName: string
}

export interface GroupSession {
  id: string
  code: string  // 6-digit shareable code
  topic: string
  host: GroupParticipant
  participants: GroupParticipant[]
  isActive: boolean
  createdAt: Date
}

export interface GroupState {
  session: GroupSession
  currentScreen: 'lobby' | 'lesson' | 'quiz' | 'discussion'
  sharedContent?: string
  discussionMessages: Array<{
    participantId: string
    content: string
    timestamp: Date
  }>
}
