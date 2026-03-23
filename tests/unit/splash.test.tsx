import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SplashHero } from '@/app/_components/splash-hero'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}))

describe('SplashHero', () => {
  it('renders Ekalavya AI text', () => {
    render(<SplashHero />)
    expect(screen.getByText(/ekalavya/i)).toBeInTheDocument()
  })

  it('renders Start Learning button', () => {
    render(<SplashHero />)
    expect(screen.getByRole('button', { name: /start learning/i })).toBeInTheDocument()
  })

  it('renders tagline', () => {
    render(<SplashHero />)
    expect(screen.getByText(/curious learning companion/i)).toBeInTheDocument()
  })

  it('renders mission statement', () => {
    render(<SplashHero />)
    expect(screen.getByText(/no child.*no teen.*no adult/i)).toBeInTheDocument()
  })
})
