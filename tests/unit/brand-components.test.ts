import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

// ---------------------------------------------------------------------------
// Mock next/navigation and next/link
// ---------------------------------------------------------------------------
let mockedPathname = '/home'

vi.mock('next/navigation', () => ({
  usePathname: () => mockedPathname,
}))

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) =>
    React.createElement('a', { href, ...props }, children),
}))

// ---------------------------------------------------------------------------
// Imports (must come after vi.mock calls so module resolution uses the mocks)
// ---------------------------------------------------------------------------
import { Mascot } from '@/components/ekalavya/mascot'
import { Logo } from '@/components/ekalavya/logo'
import { NavBar } from '@/components/ekalavya/nav-bar'
import { PageHeader } from '@/components/ekalavya/page-header'

// ---------------------------------------------------------------------------
// Mascot
// ---------------------------------------------------------------------------
describe('Mascot', () => {
  it('renders an SVG element', () => {
    const { container } = render(React.createElement(Mascot, { state: 'curious' }))
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
  })

  it('renders with curious state (tilted head group)', () => {
    const { container } = render(React.createElement(Mascot, { state: 'curious' }))
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    expect(svg!.getAttribute('aria-label')).toContain('curious')
  })

  it('renders with celebrating state (sparkle effects)', () => {
    const { container } = render(React.createElement(Mascot, { state: 'celebrating' }))
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    expect(svg!.getAttribute('aria-label')).toContain('celebrating')
    // Celebrating has sparkle lines
    const lines = container.querySelectorAll('line')
    expect(lines.length).toBeGreaterThan(0)
  })

  it('renders with thinking state', () => {
    const { container } = render(React.createElement(Mascot, { state: 'thinking' }))
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    expect(svg!.getAttribute('aria-label')).toContain('thinking')
  })

  it('applies sm size (48px)', () => {
    const { container } = render(React.createElement(Mascot, { state: 'curious', size: 'sm' }))
    const svg = container.querySelector('svg')
    expect(svg!.getAttribute('width')).toBe('48')
    expect(svg!.getAttribute('height')).toBe('48')
  })

  it('applies md size (96px) by default', () => {
    const { container } = render(React.createElement(Mascot, { state: 'curious' }))
    const svg = container.querySelector('svg')
    expect(svg!.getAttribute('width')).toBe('96')
    expect(svg!.getAttribute('height')).toBe('96')
  })

  it('applies lg size (192px)', () => {
    const { container } = render(React.createElement(Mascot, { state: 'curious', size: 'lg' }))
    const svg = container.querySelector('svg')
    expect(svg!.getAttribute('width')).toBe('192')
    expect(svg!.getAttribute('height')).toBe('192')
  })
})

// ---------------------------------------------------------------------------
// Logo
// ---------------------------------------------------------------------------
describe('Logo', () => {
  it('renders with text "Ekalavya AI"', () => {
    render(React.createElement(Logo))
    expect(screen.getByText('Ekalavya')).toBeTruthy()
    expect(screen.getByText('AI')).toBeTruthy()
  })

  it('accepts size prop (sm)', () => {
    const { container } = render(React.createElement(Logo, { size: 'sm' }))
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.className).toContain('text-lg')
  })

  it('accepts size prop (lg)', () => {
    const { container } = render(React.createElement(Logo, { size: 'lg' }))
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.className).toContain('text-4xl')
  })

  it('uses md size by default', () => {
    const { container } = render(React.createElement(Logo))
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.className).toContain('text-2xl')
  })
})

// ---------------------------------------------------------------------------
// NavBar
// ---------------------------------------------------------------------------
describe('NavBar', () => {
  beforeEach(() => {
    mockedPathname = '/home'
  })

  it('renders 5 tabs (Home, Chat, Classroom, Progress, Settings)', () => {
    render(React.createElement(NavBar))
    expect(screen.getByText('Home')).toBeTruthy()
    expect(screen.getByText('Chat')).toBeTruthy()
    expect(screen.getByText('Classroom')).toBeTruthy()
    expect(screen.getByText('Progress')).toBeTruthy()
    expect(screen.getByText('Settings')).toBeTruthy()
  })

  it('highlights the active tab', () => {
    mockedPathname = '/chat'
    render(React.createElement(NavBar))

    const chatLink = screen.getByText('Chat').closest('a') as HTMLAnchorElement
    expect(chatLink).toBeTruthy()
    expect(chatLink.getAttribute('aria-current')).toBe('page')

    const homeLink = screen.getByText('Home').closest('a') as HTMLAnchorElement
    expect(homeLink.getAttribute('aria-current')).toBeNull()
  })

  it('renders correct hrefs', () => {
    render(React.createElement(NavBar))
    const links = screen.getAllByRole('link')
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toEqual(['/home', '/chat', '/classroom', '/progress', '/settings'])
  })
})

// ---------------------------------------------------------------------------
// PageHeader
// ---------------------------------------------------------------------------
describe('PageHeader', () => {
  it('renders title', () => {
    render(React.createElement(PageHeader, { title: 'Dashboard' }))
    expect(screen.getByText('Dashboard')).toBeTruthy()
  })

  it('renders back button when onBack provided', () => {
    const onBack = vi.fn()
    render(React.createElement(PageHeader, { title: 'Settings', onBack }))
    const backBtn = screen.getByLabelText('Go back')
    expect(backBtn).toBeTruthy()
  })

  it('does not render back button when onBack is not provided', () => {
    render(React.createElement(PageHeader, { title: 'Home' }))
    expect(screen.queryByLabelText('Go back')).toBeNull()
  })

  it('renders action slot', () => {
    render(
      React.createElement(PageHeader, {
        title: 'Test',
        actions: React.createElement('button', { 'data-testid': 'action' }, 'Action'),
      }),
    )
    expect(screen.getByTestId('action')).toBeTruthy()
  })
})
