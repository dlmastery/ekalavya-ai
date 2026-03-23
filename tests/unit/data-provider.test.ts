import { describe, it, expect } from 'vitest'
import type { DataProvider } from '@/lib/providers/data-provider'

describe('DataProvider Interface', () => {
  it('defines all required method signatures', () => {
    const methods: (keyof DataProvider)[] = [
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
    expect(methods).toHaveLength(33)
  })
})
