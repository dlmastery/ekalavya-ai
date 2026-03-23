'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/lib/stores/theme-store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, resolvedTheme, setTheme } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setTheme('system')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mode, setTheme])

  return <>{children}</>
}
