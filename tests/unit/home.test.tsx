import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/home',
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

// Mock zustand store with a profile
const mockProfile = {
  id: 'user-1',
  name: 'Arjun',
  ageGroup: 'child' as const,
  avatar: '\uD83E\uDDD2',
  config: {
    depth: 3 as const,
    learningStyle: 'visual' as const,
    tone: 'encouraging' as const,
    reasoning: 'analogical' as const,
    language: 'English',
    voiceSpeed: 1.0,
    voiceAccent: 'default',
  },
  topics: ['Math', 'Science'],
  onboardedAt: new Date(),
  lastActiveAt: new Date(),
}

vi.mock('@/lib/stores/learner-store', () => ({
  useLearnerStore: (selector: any) =>
    selector({
      profile: mockProfile,
      isOnboarded: true,
      setProfile: vi.fn(),
      clearProfile: vi.fn(),
      updateConfig: vi.fn(),
    }),
}))

// Import components after mocks
import { GreetingBanner } from '@/app/home/_components/greeting-banner'
import { ContinueCard } from '@/app/home/_components/continue-card'
import { QuickActions } from '@/app/home/_components/quick-actions'
import { ProgressRings } from '@/app/home/_components/progress-rings'
import { TopicGrid } from '@/app/home/_components/topic-grid'

describe('GreetingBanner', () => {
  it('shows personalized name', () => {
    render(<GreetingBanner />)
    expect(screen.getByText(/Arjun/)).toBeInTheDocument()
  })

  it('shows time-aware greeting', () => {
    render(<GreetingBanner />)
    const text = screen.getByRole('heading', { level: 1 }).textContent ?? ''
    expect(
      text.includes('Good morning') ||
        text.includes('Good afternoon') ||
        text.includes('Good evening'),
    ).toBe(true)
  })

  it('shows streak count', () => {
    render(<GreetingBanner />)
    expect(screen.getByLabelText('streak count')).toBeInTheDocument()
  })
})

describe('ContinueCard', () => {
  it('renders with topic name', () => {
    render(<ContinueCard />)
    expect(screen.getByText('The Water Cycle')).toBeInTheDocument()
  })

  it('renders progress bar', () => {
    render(<ContinueCard />)
    expect(screen.getByText('65%')).toBeInTheDocument()
  })

  it('renders Continue button linking to chat', () => {
    render(<ContinueCard />)
    const link = screen.getByRole('link', { name: /continue/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/chat?topic=water-cycle')
  })
})

describe('QuickActions', () => {
  it('shows 3 action buttons', () => {
    render(<QuickActions />)
    expect(screen.getByText('New Topic')).toBeInTheDocument()
    expect(screen.getByText('Upload PDF')).toBeInTheDocument()
    expect(screen.getByText('Join Village')).toBeInTheDocument()
  })
})

describe('ProgressRings', () => {
  it('renders 3 rings with labels', () => {
    render(<ProgressRings />)
    expect(screen.getByText('Topics Mastered')).toBeInTheDocument()
    expect(screen.getByText('Streak Days')).toBeInTheDocument()
    expect(screen.getByText('XP')).toBeInTheDocument()
  })

  it('renders correct display values', () => {
    render(<ProgressRings />)
    expect(screen.getByText('3/8')).toBeInTheDocument()
    expect(screen.getByText('2,500')).toBeInTheDocument()
  })
})

describe('TopicGrid', () => {
  it('renders 8 topic cards', () => {
    render(<TopicGrid />)
    expect(screen.getByText('Math')).toBeInTheDocument()
    expect(screen.getByText('Science')).toBeInTheDocument()
    expect(screen.getByText('Language')).toBeInTheDocument()
    expect(screen.getByText('History')).toBeInTheDocument()
    expect(screen.getByText('Arts')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('Health')).toBeInTheDocument()
    expect(screen.getByText('Life Skills')).toBeInTheDocument()
  })

  it('renders mastery badges', () => {
    render(<TopicGrid />)
    // Check some mastery badges exist
    expect(screen.getAllByText('Intermediate').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Beginner').length).toBeGreaterThanOrEqual(1)
  })

  it('links each topic card to /chat', () => {
    render(<TopicGrid />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(8)
    links.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^\/chat\?topic=/)
    })
  })
})
