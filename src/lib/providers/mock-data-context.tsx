'use client'

import { createContext, useContext, useMemo } from 'react'
import { MockDataProvider } from '@/lib/mock/provider'
import type { DataProvider } from '@/lib/providers/data-provider'

const DataContext = createContext<DataProvider | null>(null)

export function MockDataContextProvider({ children }: { children: React.ReactNode }) {
  const provider = useMemo(() => new MockDataProvider(), [])
  return <DataContext.Provider value={provider}>{children}</DataContext.Provider>
}

export function useData(): DataProvider {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within MockDataContextProvider')
  return ctx
}
