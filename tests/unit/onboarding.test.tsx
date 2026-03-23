import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock the data context
const mockInitProfile = vi.fn().mockResolvedValue({
  id: 'user-1',
  name: 'Explorer',
  ageGroup: 'child',
  avatar: '\u{1F9D2}',
  config: {
    depth: 3,
    learningStyle: 'visual',
    tone: 'encouraging',
    reasoning: 'analogical',
    language: 'English',
    voiceSpeed: 1.0,
    voiceAccent: 'default',
  },
  topics: ['Math'],
  onboardedAt: new Date(),
  lastActiveAt: new Date(),
})

vi.mock('@/lib/providers/mock-data-context', () => ({
  useData: () => ({
    initProfile: mockInitProfile,
  }),
}))

// Mock zustand store
vi.mock('@/lib/stores/learner-store', () => ({
  useLearnerStore: (selector: any) =>
    selector({
      setProfile: vi.fn(),
      profile: null,
      isOnboarded: false,
    }),
}))

import { StepIndicator } from '@/app/onboarding/_components/step-indicator'
import { AgeSelector } from '@/app/onboarding/_components/age-selector'
import { LanguagePicker } from '@/app/onboarding/_components/language-picker'
import { TopicChooser } from '@/app/onboarding/_components/topic-chooser'
import { StyleSelector } from '@/app/onboarding/_components/style-selector'
import { OnboardingWizard } from '@/app/onboarding/_components/onboarding-wizard'

describe('StepIndicator', () => {
  it('renders the correct number of dots', () => {
    render(<StepIndicator currentStep={0} totalSteps={4} />)
    const dots = screen.getAllByRole('img')
    expect(dots).toHaveLength(4)
  })

  it('shows correct current step', () => {
    render(<StepIndicator currentStep={2} totalSteps={4} />)
    const dots = screen.getAllByRole('img')

    // Steps 0 and 1 should be completed
    expect(dots[0]).toHaveAttribute('aria-label', 'Step 1: completed')
    expect(dots[1]).toHaveAttribute('aria-label', 'Step 2: completed')
    // Step 2 should be current
    expect(dots[2]).toHaveAttribute('aria-label', 'Step 3: current')
    // Step 3 should be upcoming
    expect(dots[3]).toHaveAttribute('aria-label', 'Step 4: upcoming')
  })
})

describe('AgeSelector', () => {
  it('renders 3 age group cards', () => {
    const onNext = vi.fn()
    render(<AgeSelector value={null} onNext={onNext} />)

    expect(screen.getByText('Child (6-12)')).toBeInTheDocument()
    expect(screen.getByText('Teen (13-18)')).toBeInTheDocument()
    expect(screen.getByText('Adult (19+)')).toBeInTheDocument()
  })

  it('shows "Who are you?" prompt', () => {
    const onNext = vi.fn()
    render(<AgeSelector value={null} onNext={onNext} />)
    expect(screen.getByText('Who are you?')).toBeInTheDocument()
  })
})

describe('LanguagePicker', () => {
  it('shows language grid with multiple languages', () => {
    const onNext = vi.fn()
    render(<LanguagePicker value="English" onNext={onNext} />)

    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Hindi')).toBeInTheDocument()
    expect(screen.getByText('Spanish')).toBeInTheDocument()
    expect(screen.getByText('French')).toBeInTheDocument()
    expect(screen.getByText('Japanese')).toBeInTheDocument()
  })

  it('shows continue button', () => {
    const onNext = vi.fn()
    render(<LanguagePicker value="English" onNext={onNext} />)
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
  })
})

describe('TopicChooser', () => {
  it('shows 8 subject cards', () => {
    const onNext = vi.fn()
    render(<TopicChooser value={[]} onNext={onNext} />)

    expect(screen.getByText('Math')).toBeInTheDocument()
    expect(screen.getByText('Science')).toBeInTheDocument()
    expect(screen.getByText('Language')).toBeInTheDocument()
    expect(screen.getByText('History')).toBeInTheDocument()
    expect(screen.getByText('Arts')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('Health')).toBeInTheDocument()
    expect(screen.getByText('Life Skills')).toBeInTheDocument()
  })

  it('shows custom topic input', () => {
    const onNext = vi.fn()
    render(<TopicChooser value={[]} onNext={onNext} />)
    expect(screen.getByPlaceholderText(/or type any topic/i)).toBeInTheDocument()
  })
})

describe('StyleSelector', () => {
  it('shows 4 learning style cards', () => {
    const onNext = vi.fn()
    render(<StyleSelector value={null} onNext={onNext} />)

    expect(screen.getByText('Visual')).toBeInTheDocument()
    expect(screen.getByText('Verbal')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Reflective')).toBeInTheDocument()
  })

  it('shows "How do you learn best?" prompt', () => {
    const onNext = vi.fn()
    render(<StyleSelector value={null} onNext={onNext} />)
    expect(screen.getByText('How do you learn best?')).toBeInTheDocument()
  })
})

describe('OnboardingWizard', () => {
  it('renders step indicator with 4 dots', () => {
    render(<OnboardingWizard />)
    const nav = screen.getByRole('navigation', { name: /onboarding progress/i })
    expect(nav).toBeInTheDocument()

    const dots = screen.getAllByRole('img', { name: /step/i })
    expect(dots).toHaveLength(4)
  })

  it('starts on step 0 (age selector)', () => {
    render(<OnboardingWizard />)
    expect(screen.getByText('Who are you?')).toBeInTheDocument()
    expect(screen.getByText('Child (6-12)')).toBeInTheDocument()
  })

  it('does not show back button on step 0', () => {
    render(<OnboardingWizard />)
    expect(screen.queryByLabelText('Go back')).not.toBeInTheDocument()
  })
})
