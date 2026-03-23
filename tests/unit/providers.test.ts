import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import React from 'react'
import { ThemeProvider } from '@/lib/providers/theme-provider'
import { MockDataContextProvider, useData } from '@/lib/providers/mock-data-context'
import { useThemeStore } from '@/lib/stores/theme-store'

// ---------------------------------------------------------------------------
// Mock matchMedia for jsdom (not implemented natively)
// ---------------------------------------------------------------------------
function mockMatchMedia(matches = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

// ---------------------------------------------------------------------------
// ThemeProvider
// ---------------------------------------------------------------------------
describe('ThemeProvider', () => {
  beforeEach(() => {
    mockMatchMedia(false)
    useThemeStore.setState({ mode: 'system', resolvedTheme: 'light' })
    document.documentElement.classList.remove('dark')
  })

  it('renders children', () => {
    render(
      React.createElement(ThemeProvider, null,
        React.createElement('div', { 'data-testid': 'child' }, 'hello')
      )
    )
    expect(screen.getByTestId('child')).toHaveTextContent('hello')
  })

  it('applies dark class when resolvedTheme is dark', () => {
    useThemeStore.setState({ mode: 'dark', resolvedTheme: 'dark' })

    render(
      React.createElement(ThemeProvider, null,
        React.createElement('div', null, 'content')
      )
    )

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class when resolvedTheme is light', () => {
    document.documentElement.classList.add('dark')
    useThemeStore.setState({ mode: 'light', resolvedTheme: 'light' })

    render(
      React.createElement(ThemeProvider, null,
        React.createElement('div', null, 'content')
      )
    )

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// MockDataContextProvider & useData
// ---------------------------------------------------------------------------
describe('MockDataContextProvider', () => {
  it('renders children', () => {
    render(
      React.createElement(MockDataContextProvider, null,
        React.createElement('div', { 'data-testid': 'child' }, 'hello')
      )
    )
    expect(screen.getByTestId('child')).toHaveTextContent('hello')
  })
})

describe('useData', () => {
  it('throws when used outside provider', () => {
    // Suppress console.error for expected error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      renderHook(() => useData())
    }).toThrow('useData must be used within MockDataContextProvider')

    spy.mockRestore()
  })

  it('returns a DataProvider instance inside provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(MockDataContextProvider, null, children)

    const { result } = renderHook(() => useData(), { wrapper })

    // Verify it has DataProvider methods
    expect(result.current).toBeDefined()
    expect(typeof result.current.sendMessage).toBe('function')
    expect(typeof result.current.getConversationHistory).toBe('function')
    expect(typeof result.current.initProfile).toBe('function')
    expect(typeof result.current.getProfile).toBe('function')
    expect(typeof result.current.generateQuiz).toBe('function')
    expect(typeof result.current.getProgress).toBe('function')
    expect(typeof result.current.getMascotState).toBe('function')
  })
})
