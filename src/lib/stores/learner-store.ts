import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LearnerProfile, LearningConfig } from '@/lib/types'

interface LearnerState {
  profile: LearnerProfile | null
  isOnboarded: boolean
  setProfile: (profile: LearnerProfile) => void
  clearProfile: () => void
  updateConfig: (config: Partial<LearningConfig>) => void
}

export const useLearnerStore = create<LearnerState>()(
  persist(
    (set, get) => ({
      profile: null,
      isOnboarded: false,
      setProfile: (profile) => set({ profile, isOnboarded: true }),
      clearProfile: () => set({ profile: null, isOnboarded: false }),
      updateConfig: (configUpdate) => {
        const current = get().profile
        if (!current) return
        set({
          profile: {
            ...current,
            config: { ...current.config, ...configUpdate },
            lastActiveAt: new Date(),
          },
        })
      },
    }),
    {
      name: 'ekalavya-learner',
      partialize: (state) => ({ profile: state.profile, isOnboarded: state.isOnboarded }),
    }
  )
)
