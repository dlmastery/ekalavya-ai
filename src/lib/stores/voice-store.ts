import { create } from 'zustand'

type VoiceState = 'idle' | 'recording' | 'processing' | 'playing'

interface VoiceStore {
  state: VoiceState
  hasPermission: boolean
  startRecording: () => void
  stopRecording: () => void
  setProcessing: () => void
  setPlaying: () => void
  setIdle: () => void
  setPermission: (has: boolean) => void
}

export const useVoiceStore = create<VoiceStore>((set) => ({
  state: 'idle',
  hasPermission: false,
  startRecording: () => set({ state: 'recording' }),
  stopRecording: () => set({ state: 'processing' }),
  setProcessing: () => set({ state: 'processing' }),
  setPlaying: () => set({ state: 'playing' }),
  setIdle: () => set({ state: 'idle' }),
  setPermission: (has) => set({ hasPermission: has }),
}))
