# Ekalavya AI — MVP Mock Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete, interactive, CEO-demo-ready Next.js web app for Ekalavya AI with fake data across all 11 screens and 37 features.

**Architecture:** Modular Monolith with Next.js App Router. Every screen talks to a DataProvider interface backed by MockDataProvider (fake data). SSE streaming simulated with ReadableStream for chat/classroom. Zustand for global state, localStorage for persistence. Review-Critic-Improve cycle on every task.

**Tech Stack:** Next.js 15 + React 19 + TypeScript 5 (strict) + Tailwind CSS 4 + shadcn/ui + Zustand + Framer Motion + Recharts + ReactFlow + KaTeX + Vitest + Playwright

**Design Doc:** `docs/plans/2026-03-21-ekalavya-ai-design.md`
**UX Reference:** `docs/research/12-EDUCATION-UX-DESIGN-DIRECTION.md`

---

## Phase 0: Project Scaffolding (Tasks 1-4)

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `.env.example`, `.gitignore`

**Step 1: Create Next.js app with TypeScript and Tailwind**

```bash
cd /c/Users/abhir/drona
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --skip-install
```

If directory not empty, confirm overwrite for config files only.

**Step 2: Install dependencies**

```bash
pnpm install
pnpm add zustand @tanstack/react-query framer-motion recharts reactflow katex
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react playwright @playwright/test
```

**Step 3: Configure Vitest**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Create `tests/setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

**Step 4: Verify app starts**

```bash
pnpm dev
```
Expected: Next.js dev server running on localhost:3000

**Step 5: Commit**

```bash
git init
git add -A
git commit -m "feat: initialize Next.js 15 project with TypeScript, Tailwind, testing setup"
```

---

### Task 2: Install and Configure shadcn/ui

**Files:**
- Create: `components.json`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/dialog.tsx`
- Create: `src/components/ui/slider.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/avatar.tsx`
- Create: `src/components/ui/progress.tsx`
- Create: `src/components/ui/tabs.tsx`
- Create: `src/components/ui/toggle.tsx`
- Create: `src/components/ui/tooltip.tsx`
- Create: `src/components/ui/scroll-area.tsx`
- Create: `src/components/ui/separator.tsx`
- Create: `src/lib/utils/cn.ts`

**Step 1: Initialize shadcn/ui**

```bash
pnpm dlx shadcn@latest init
```
Choose: TypeScript, New York style, CSS variables, `@/components` path, `@/lib/utils` utils path.

**Step 2: Add core components**

```bash
pnpm dlx shadcn@latest add button card input dialog slider badge avatar progress tabs toggle tooltip scroll-area separator
```

**Step 3: Verify components exist**

```bash
ls src/components/ui/
```
Expected: All 14 component files present

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add shadcn/ui with 14 core components"
```

---

### Task 3: Design System — Theme Tokens & Custom CSS

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/lib/constants/theme-tokens.ts`
- Modify: `tailwind.config.ts`

**Step 1: Write test for theme tokens**

Create `tests/unit/theme-tokens.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { colors, typography, spacing } from '@/lib/constants/theme-tokens'

describe('Theme Tokens', () => {
  it('has primary saffron color', () => {
    expect(colors.primary.DEFAULT).toBe('#FF9933')
  })

  it('has all 8 subject colors', () => {
    expect(Object.keys(colors.subject)).toHaveLength(8)
  })

  it('has light and dark surface colors', () => {
    expect(colors.surface.light).toBeDefined()
    expect(colors.surface.dark).toBeDefined()
  })

  it('has 6 typography levels', () => {
    expect(Object.keys(typography)).toHaveLength(6)
  })
})
```

**Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/unit/theme-tokens.test.ts
```
Expected: FAIL — module not found

**Step 3: Implement theme tokens**

Create `src/lib/constants/theme-tokens.ts`:
```typescript
export const colors = {
  primary: {
    DEFAULT: '#FF9933',
    light: '#FFB74D',
    dark: '#E65100',
  },
  secondary: {
    DEFAULT: '#2196F3',
  },
  accent: {
    red: '#E53935',
    green: '#4CAF50',
    amber: '#FFC107',
  },
  surface: {
    light: '#FFF8F0',
    dark: '#1E1E2E',
  },
  background: {
    light: '#FAFAFA',
    dark: '#121212',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    dark: '#F5F5F5',
  },
  border: '#E0E0E0',
  subject: {
    math: '#FF7043',
    science: '#66BB6A',
    language: '#42A5F5',
    history: '#AB47BC',
    arts: '#EC407A',
    tech: '#26C6DA',
    health: '#EF5350',
    lifeSkills: '#FFA726',
  },
} as const

export const typography = {
  h1: { size: '32px', lineHeight: '40px', weight: '700' },
  h2: { size: '24px', lineHeight: '32px', weight: '600' },
  h3: { size: '20px', lineHeight: '28px', weight: '600' },
  body: { size: '16px', lineHeight: '24px', weight: '400' },
  small: { size: '14px', lineHeight: '20px', weight: '400' },
  caption: { size: '12px', lineHeight: '16px', weight: '400' },
} as const

export const spacing = {
  touch: '48px',
  cardRadius: '16px',
  buttonRadius: '12px',
} as const
```

**Step 4: Update globals.css with CSS variables**

Replace contents of `src/app/globals.css` with Ekalavya theme tokens as CSS custom properties mapped to shadcn's variable system. Include light and dark mode definitions, Noto Sans font family, and the 3D button bottom-border effect class.

**Step 5: Update tailwind.config.ts**

Extend Tailwind config to reference the CSS variables for colors, add Noto Sans to fontFamily, and include the subject color palette.

**Step 6: Run test to verify it passes**

```bash
pnpm vitest run tests/unit/theme-tokens.test.ts
```
Expected: PASS

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Ekalavya design system — Warm Earth & Bright Sky palette, Noto Sans typography"
```

---

### Task 4: TypeScript Types & DataProvider Interface

**Files:**
- Create: `src/lib/types/chat.ts`
- Create: `src/lib/types/classroom.ts`
- Create: `src/lib/types/lesson.ts`
- Create: `src/lib/types/quiz.ts`
- Create: `src/lib/types/whiteboard.ts`
- Create: `src/lib/types/learner.ts`
- Create: `src/lib/types/progress.ts`
- Create: `src/lib/types/village.ts`
- Create: `src/lib/types/mascot.ts`
- Create: `src/lib/providers/data-provider.ts`

**Step 1: Write test for DataProvider interface**

Create `tests/unit/data-provider.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import type { DataProvider } from '@/lib/providers/data-provider'

describe('DataProvider Interface', () => {
  it('defines all required method signatures', () => {
    // Type-level test: if this file compiles, the interface is correctly defined
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
    expect(methods).toHaveLength(32)
  })
})
```

**Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/unit/data-provider.test.ts
```
Expected: FAIL — module not found

**Step 3: Implement all type files**

Create each type file with complete TypeScript interfaces matching the design doc. The `data-provider.ts` file exports the `DataProvider` interface with all 32 methods.

Key types to define:
- `chat.ts`: Message, ChatChunk, HintLevel, Hint, TutoringMode (story|practical|literacy|socratic|interview)
- `classroom.ts`: ClassroomSession, Agent, AgentAction, AgentRole, DebateSession
- `lesson.ts`: Lesson, Scene, SceneType (slide|quiz|simulation|pbl), SlideContent
- `quiz.ts`: Quiz, Question, QuestionType (mcq|fill|short), GradeResult
- `whiteboard.ts`: DrawingStep, MathStep, MindmapData, MindmapNode
- `learner.ts`: LearnerProfile, LearningStyle, OnboardingConfig, StyleResponse, Depth (1-10), LearningConfig
- `progress.ts`: ProgressData, Achievement, StreakData, MasteryLevel
- `village.ts`: GroupSession, GroupConfig, GroupState
- `mascot.ts`: MascotEmotion (8 states), InteractionContext

**Step 4: Run test to verify it passes**

```bash
pnpm vitest run tests/unit/data-provider.test.ts
```
Expected: PASS

**Step 5: Run TypeScript compiler to check all types**

```bash
pnpm tsc --noEmit
```
Expected: No errors

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add TypeScript types and DataProvider interface (32 methods, 9 type modules)"
```

---

## Phase 1: Core Infrastructure (Tasks 5-8)

### Task 5: Mock Data Provider

**Files:**
- Create: `src/lib/mock/provider.ts`
- Create: `src/lib/mock/fake-conversations.ts`
- Create: `src/lib/mock/fake-lessons.ts`
- Create: `src/lib/mock/fake-quiz.ts`
- Create: `src/lib/mock/fake-classroom.ts`
- Create: `src/lib/mock/fake-progress.ts`
- Create: `src/lib/mock/fake-whiteboard.ts`
- Create: `src/lib/mock/fake-profiles.ts`
- Test: `tests/unit/mock-provider.test.ts`

**Step 1: Write failing tests**

Test that MockDataProvider implements DataProvider, returns valid typed data for each method. Test streaming methods yield chunks with realistic delays.

**Step 2: Run tests — expect FAIL**

**Step 3: Implement MockDataProvider**

The mock provider implements every DataProvider method. Key fake data:
- `fake-conversations.ts`: 3 sample Socratic dialogues (math, science, life skills) with 10+ turns each, including Ekalavya's questioning style, hint progressions, and inline image placeholders
- `fake-lessons.ts`: 1 complete lesson ("Water Cycle") with 5 scenes (2 slides, 1 quiz, 1 simulation, 1 PBL)
- `fake-quiz.ts`: 2 sample quizzes (5 questions each) with grade results and feedback
- `fake-classroom.ts`: 1 classroom session with teacher + 4 classmates, 15 scripted turns
- `fake-progress.ts`: Sample mastery grid (8 topics × 5 levels), 30-day streak, 2500 XP, 6 achievements
- `fake-whiteboard.ts`: 3 drawing sequences (triangle, quadratic function, water cycle diagram), 1 mindmap, 1 math construction
- `fake-profiles.ts`: 3 learner profiles (child/teen/adult) with different configs

Streaming methods (`sendMessage`, `getAgentResponse`) use `async function*` generators that yield chunks with 30-50ms delays.

**Step 4: Run tests — expect PASS**

**Step 5: Commit**

```bash
git commit -m "feat: add MockDataProvider with rich fake data for all 37 features"
```

---

### Task 6: Zustand Stores

**Files:**
- Create: `src/lib/stores/learner-store.ts`
- Create: `src/lib/stores/theme-store.ts`
- Create: `src/lib/stores/voice-store.ts`
- Create: `src/lib/stores/classroom-store.ts`
- Test: `tests/unit/stores.test.ts`

**Step 1: Write failing tests**

Test each store's initial state, actions, and localStorage persistence (for learner and theme stores).

**Step 2: Implement stores**

- `learner-store.ts`: profile, onboarding status, learning config, ToM state. Persists to localStorage. Hydrates on mount.
- `theme-store.ts`: theme mode (light/dark/auto), resolved theme. Persists to localStorage.
- `voice-store.ts`: recording state (idle|recording|processing|playing), permissions.
- `classroom-store.ts`: session state, active agents, current scene, discussion messages.

**Step 3: Run tests — expect PASS**

**Step 4: Commit**

```bash
git commit -m "feat: add Zustand stores (learner, theme, voice, classroom) with localStorage persistence"
```

---

### Task 7: Provider Components & Root Layout

**Files:**
- Create: `src/lib/providers/theme-provider.tsx`
- Create: `src/lib/providers/learner-model-provider.tsx`
- Create: `src/lib/providers/voice-provider.tsx`
- Create: `src/lib/providers/mock-data-context.tsx`
- Modify: `src/app/layout.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/app/error.tsx`

**Step 1: Write tests for providers**

Test that providers render children, provide context values, and that the theme provider applies correct CSS class to body.

**Step 2: Implement providers**

Each provider wraps children with React Context. `mock-data-context.tsx` provides a singleton MockDataProvider instance accessible via `useData()` hook.

**Step 3: Update root layout**

`layout.tsx` wraps the entire app in the provider stack:
```tsx
<ThemeProvider>
  <MockDataProvider>
    <LearnerModelProvider>
      <VoiceProvider>
        <QueryClientProvider>
          {children}
        </QueryClientProvider>
      </VoiceProvider>
    </LearnerModelProvider>
  </MockDataProvider>
</ThemeProvider>
```

Add Noto Sans font import, metadata with "Ekalavya AI" title, viewport for mobile.

**Step 4: Add not-found.tsx and error.tsx**

Simple branded pages with Ekalavya mascot in appropriate state.

**Step 5: Run tests — expect PASS**

**Step 6: Commit**

```bash
git commit -m "feat: add provider stack (theme, data, learner, voice) and root layout"
```

---

### Task 8: Ekalavya Brand Components

**Files:**
- Create: `src/components/ekalavya/mascot.tsx`
- Create: `src/components/ekalavya/logo.tsx`
- Create: `src/components/ekalavya/loading-skeleton.tsx`
- Create: `src/components/ekalavya/nav-bar.tsx`
- Create: `src/components/ekalavya/page-header.tsx`
- Create: `src/components/ekalavya/responsive-layout.tsx`
- Create: `src/assets/mascot/` (8 inline SVGs)
- Test: `tests/unit/brand-components.test.ts`

**Step 1: Write tests**

Test mascot renders correct SVG for each of 8 states. Test nav-bar renders 5 tabs. Test loading-skeleton renders shimmer animation.

**Step 2: Implement brand components**

- `mascot.tsx`: Accepts `state: MascotEmotion` prop, renders appropriate inline SVG. Simple geometric character (circle head, dot eyes, curved mouth) with 8 emotional variations. Wraps in Framer Motion for entrance animation.
- `logo.tsx`: "Ekalavya AI" text logo with saffron accent. Accept `size` prop.
- `loading-skeleton.tsx`: Shimmer skeleton matching each screen's layout. Accept `variant` prop for different screen types.
- `nav-bar.tsx`: Bottom tab bar with 5 tabs: Home, Chat, Classroom, Progress, Settings. Uses Lucide icons. Active state with saffron indicator.
- `page-header.tsx`: Consistent header with back button, title, optional actions.
- `responsive-layout.tsx`: Wrapper that applies mobile-first layout. `<main>` with max-w-md center on desktop, full-width on mobile. Includes nav-bar at bottom.

**Step 3: Run tests — expect PASS**

**Step 4: Visual verification**

```bash
pnpm dev
```
Navigate to localhost:3000, verify mascot renders, nav-bar visible, theme toggles.

**Step 5: Commit**

```bash
git commit -m "feat: add Ekalavya brand components — mascot (8 states), nav-bar, logo, skeleton, layout"
```

---

## Phase 2: Screens — Onboarding & Home (Tasks 9-11)

### Task 9: Splash / Landing Page

**Files:**
- Modify: `src/app/page.tsx`
- Test: `tests/e2e/splash.spec.ts`

**Step 1: Write E2E test**

```typescript
import { test, expect } from '@playwright/test'

test('splash page shows Ekalavya greeting and start button', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Ekalavya AI')).toBeVisible()
  await expect(page.getByRole('button', { name: /start learning/i })).toBeVisible()
})

test('clicking start navigates to onboarding', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /start learning/i }).click()
  await expect(page).toHaveURL('/onboarding')
})
```

**Step 2: Implement splash page**

Full-screen hero with:
- Ekalavya mascot (greeting state) with entrance animation (scale + fade)
- "Ekalavya AI" logo
- Tagline: "Your curious learning companion"
- "Start Learning" CTA button (3D pushable, saffron)
- Subtle background gradient (saffron → cream)

**Step 3: Run E2E — expect PASS**

**Step 4: Commit**

```bash
git commit -m "feat: add splash/landing page with Ekalavya mascot and CTA"
```

---

### Task 10: Onboarding Flow (F01-F03)

**Files:**
- Create: `src/app/onboarding/page.tsx`
- Create: `src/app/onboarding/components/age-selector.tsx`
- Create: `src/app/onboarding/components/language-picker.tsx`
- Create: `src/app/onboarding/components/topic-chooser.tsx`
- Create: `src/app/onboarding/components/style-selector.tsx`
- Create: `src/app/api/onboarding/route.ts`
- Test: `tests/e2e/onboarding.spec.ts`

**Step 1: Write E2E tests**

Test full onboarding flow: select age → select language → pick topic → choose style → lands on home. Test back navigation between steps. Test progress indicator shows correct step.

**Step 2: Implement 4-step onboarding**

Step-based flow with Framer Motion page transitions:
- **Age Selector**: 3 large illustrated cards (Child 6-12, Teen 13-18, Adult 19+). Each card has a friendly illustration and brief description.
- **Language Picker**: Grid of 20 language options with flag icons. Search bar at top. English and Hindi highlighted. Others available.
- **Topic Chooser**: Grid of subject cards (color-coded per subject palette) + free text input "Or type any topic..."
- **Style Selector**: 4 illustrated cards for learning styles (Visual, Verbal, Active, Reflective) with 1-sentence descriptions.

Progress bar at top (4 dots). Back button on each step. Ekalavya mascot (curious state) in corner giving tips.

On completion, saves profile to learner store → redirects to /home.

**Step 3: API route**

`/api/onboarding/route.ts` — POST handler that accepts OnboardingConfig, returns a LearnerProfile. Mock implementation returns pre-built profile matching the selected age group.

**Step 4: Run E2E — expect PASS**

**Step 5: Commit**

```bash
git commit -m "feat: add 4-step onboarding flow (age, language, topic, style) with F01-F03"
```

---

### Task 11: Home Dashboard (F09, F22-F24, F32, F36)

**Files:**
- Create: `src/app/home/page.tsx`
- Create: `src/app/home/components/greeting-banner.tsx`
- Create: `src/app/home/components/continue-card.tsx`
- Create: `src/app/home/components/quick-actions.tsx`
- Create: `src/app/home/components/progress-rings.tsx`
- Create: `src/app/home/components/topic-grid.tsx`
- Create: `src/middleware.ts`
- Test: `tests/e2e/home.spec.ts`

**Step 1: Write E2E tests**

Test that home page shows personalized greeting with user's name. Test progress rings display. Test quick action buttons navigate correctly. Test topic grid renders subject-colored cards. Test middleware redirects to /onboarding if no profile.

**Step 2: Implement middleware**

`middleware.ts` checks learner store (via cookie/header). If no profile exists, redirect to `/onboarding`. Exclude `/onboarding` and `/` from the check.

**Step 3: Implement home dashboard**

- **GreetingBanner**: "Good morning, [Name]!" with mascot (greeting state). Time-aware greeting.
- **ContinueCard**: Shows last session topic, progress percentage, "Continue" button. Pulls from mock data.
- **QuickActions**: 3 buttons — "New Topic" (→ /chat), "Upload PDF" (→ modal, placeholder), "Join Village" (→ /village).
- **ProgressRings**: 3 animated SVG rings — Topics Mastered (green), Streak Days (amber), XP (saffron). Animate on mount.
- **TopicGrid**: 2×4 grid of subject cards, color-coded per subject palette. Each card shows topic name, mastery level bar, lesson count. Tap → /chat?topic=X.

**Step 4: Run E2E — expect PASS**

**Step 5: Commit**

```bash
git commit -m "feat: add home dashboard with greeting, progress rings, topic grid, quick actions"
```

---

## Phase 3: Chat & Core Learning (Tasks 12-15)

### Task 12: Socratic Chat — Core UI (F04, F06, F27, F32)

**Files:**
- Create: `src/app/chat/page.tsx`
- Create: `src/app/chat/components/message-list.tsx`
- Create: `src/app/chat/components/ekalavya-bubble.tsx`
- Create: `src/app/chat/components/user-bubble.tsx`
- Create: `src/app/chat/components/mode-badge.tsx`
- Create: `src/app/chat/components/text-input.tsx`
- Create: `src/app/api/chat/route.ts`
- Test: `tests/e2e/chat.spec.ts`

**Step 1: Write E2E tests**

Test chat page renders. Test sending message shows user bubble then Ekalavya response (streamed). Test mode badge displays current mode. Test Ekalavya bubble has mascot avatar. Test /commands trigger mode changes.

**Step 2: Implement SSE streaming API route**

`/api/chat/route.ts`: POST handler that accepts message + mode, returns a ReadableStream with SSE format. Pulls from fake-conversations, yields word-by-word with 30-50ms random delays. Includes inline image URLs from mock data.

**Step 3: Implement chat UI**

- Full-screen chat with scroll-area
- Ekalavya bubbles: saffron-tinted, left-aligned, with mascot avatar (thinking → speaking transition)
- User bubbles: teal-tinted, right-aligned
- Mode badge: top-right pill showing current mode (Story/Practical/Literacy)
- Text input: bottom-fixed, with send button + voice button (placeholder)
- Auto-scroll on new messages
- Typing indicator (3 dots animation) while streaming

**Step 4: Implement /commands**

Detect messages starting with `/`: /plan, /test, /config, /start, /continue, /example. Show command palette when user types `/`. Each command triggers appropriate mock response.

**Step 5: Run E2E — expect PASS**

**Step 6: Commit**

```bash
git commit -m "feat: add Socratic chat with SSE streaming, mode badge, /commands system"
```

---

### Task 13: Chat — Progressive Hints & Voice UI (F05, F07)

**Files:**
- Create: `src/app/chat/components/hint-progress.tsx`
- Create: `src/app/chat/components/voice-input-button.tsx`
- Modify: `src/app/chat/page.tsx`
- Test: `tests/e2e/chat-hints.spec.ts`

**Step 1: Write tests**

Test hint progress shows 5 dots, fills progressively. Test "I'm stuck" triggers hint. Test voice button shows pulsing animation when recording. Test voice button toggles states.

**Step 2: Implement hint progress**

`hint-progress.tsx`: 5 circular dots at bottom of chat. Each dot fills (saffron) as hints are consumed. When user says "I'm stuck" or "help" or "hint", next hint level is triggered and dot fills. After all 5, show "Would you like me to just explain?"

**Step 3: Implement voice input button**

`voice-input-button.tsx`: Large circular button (64px) at center-bottom. States:
- idle: microphone icon, saffron border
- recording: pulsing animation (scale 1.0→1.1→1.0), red dot, waveform visualization
- processing: spinning indicator
- playing: speaker icon with sound waves

Mock phase: clicking toggles visual states but does not actually record. Shows toast "Voice coming soon — type your question instead."

**Step 4: Run tests — expect PASS**

**Step 5: Commit**

```bash
git commit -m "feat: add progressive 5-level hints and voice input button UI"
```

---

### Task 14: Chat — Dynamic Images & Mode Switching (F06, F08)

**Files:**
- Modify: `src/app/chat/components/ekalavya-bubble.tsx`
- Modify: `src/app/chat/components/mode-badge.tsx`
- Modify: `src/lib/mock/fake-conversations.ts`
- Test: `tests/e2e/chat-modes.spec.ts`

**Step 1: Write tests**

Test that messages containing images render inline. Test mode auto-switches on keywords ("I'm stuck" → hint mode indicator). Test mode badge updates. Test image placeholder renders with alt text.

**Step 2: Add image rendering to Ekalavya bubbles**

When a ChatChunk contains an imageUrl, render it inline within the bubble:
- Rounded-xl image with subtle border
- Alt text caption below
- Mock images: use placeholder SVGs with subject colors (e.g., a simple diagram of the water cycle, a geometric shape)

**Step 3: Implement mode auto-detection**

In the chat page, detect keywords in user messages:
- "I'm stuck" / "help" / "hint" → mode = "hint" (badge updates)
- "review my code" / "check this" → mode = "review"
- "interview me" / "mock interview" → mode = "interview"
- "what pattern" / "which approach" → mode = "pattern"
- Default: "socratic"

Mode badge animates on change (scale bounce).

**Step 4: Run tests — expect PASS**

**Step 5: Commit**

```bash
git commit -m "feat: add inline image rendering and mode auto-switching in chat"
```

---

### Task 15: Chat — Complete Integration Test

**Files:**
- Test: `tests/e2e/chat-full.spec.ts`

**Step 1: Write comprehensive E2E test**

Test complete chat flow:
1. Navigate to /chat
2. Send a message
3. See streamed Ekalavya response with mascot avatar
4. Send "I'm stuck"
5. See hint dot fill + mode badge change
6. Type "/test"
7. See quiz-style response
8. Verify voice button renders in all states
9. Verify inline images render

**Step 2: Run full E2E test**

```bash
pnpm playwright test tests/e2e/chat-full.spec.ts
```
Expected: All assertions PASS

**Step 3: Visual review**

Manual inspection: verify chat looks polished, animations smooth, colors correct.

**Step 4: Review-Critic-Improve cycle**

- REVIEW: Check all chat components against design doc
- CRITIC: Look for missing states (empty chat, error, network timeout simulation)
- IMPROVE: Add empty state ("Ask Ekalavya anything!"), error toast, retry button

**Step 5: Commit**

```bash
git commit -m "feat: complete Socratic chat integration — all F04-F08 features working"
```

---

## Phase 4: Classroom & Whiteboard (Tasks 16-19)

### Task 16: Live Classroom — Multi-Agent UI (F10, F12)

**Files:**
- Create: `src/app/classroom/page.tsx`
- Create: `src/app/classroom/components/stage-area.tsx`
- Create: `src/app/classroom/components/teacher-avatar.tsx`
- Create: `src/app/classroom/components/classmate-row.tsx`
- Create: `src/app/classroom/components/discussion-panel.tsx`
- Create: `src/app/classroom/components/raise-hand-button.tsx`
- Create: `src/app/classroom/components/scene-nav.tsx`
- Create: `src/app/api/classroom/route.ts`
- Test: `tests/e2e/classroom.spec.ts`

**Step 1: Write E2E tests**

Test classroom page renders with stage area + classmate row + discussion panel. Test teacher avatar speaks (text appears). Test classmates respond in sequence. Test raise hand button triggers user turn. Test scene nav shows slide indicators.

**Step 2: Implement SSE API route**

`/api/classroom/route.ts`: POST handler that streams scripted classroom turns. Each turn includes: agentId, agentName, agentRole, text, optional whiteboardAction. Yields with 500ms-2s delays between turns to simulate real discussion pacing.

**Step 3: Implement classroom UI**

- **StageArea**: Top 60% of screen. Shows teacher avatar (left) + slide/whiteboard content (right). Teacher "speaks" with text appearing below avatar.
- **TeacherAvatar**: Circular avatar with name label. Pulsing border when speaking. Uses subject color.
- **ClassmateRow**: Horizontal scroll of 4 classmate avatars below stage. Each has name + personality badge (Curious, Skeptic, Beginner, Advanced). Active speaker highlighted.
- **DiscussionPanel**: Bottom 40%. Scrollable chat-style view of all agent and user messages. Each message shows avatar + name + role badge + text.
- **RaiseHandButton**: Floating action button (bottom-right). Animated hand icon. On click, inserts user turn into discussion stream.
- **SceneNav**: Horizontal dots/pills at very top showing current scene in lesson sequence. Clickable to jump.

**Step 4: Run E2E — expect PASS**

**Step 5: Commit**

```bash
git commit -m "feat: add multi-agent classroom with teacher, 4 classmates, discussion panel, raise hand"
```

---

### Task 17: Whiteboard — SVG Canvas (F13)

**Files:**
- Create: `src/app/whiteboard/page.tsx`
- Create: `src/app/whiteboard/components/svg-canvas.tsx`
- Create: `src/app/whiteboard/components/tool-palette.tsx`
- Create: `src/app/api/whiteboard/route.ts`
- Test: `tests/e2e/whiteboard.spec.ts`

**Step 1: Write tests**

Test SVG canvas renders. Test drawing steps animate sequentially. Test tool palette shows drawing tools. Test canvas is interactive (user can draw).

**Step 2: Implement SVG whiteboard**

- `svg-canvas.tsx`: Full-screen SVG element. Renders DrawingStep[] sequentially with animation (each step fades in over 500ms). Steps include: line, circle, rect, path, text, with stroke color and width.
- `tool-palette.tsx`: Vertical toolbar (left side). Tools: pen, line, circle, text, eraser, clear. Each tool updates a cursor mode. User drawing stored as additional SVG elements.
- AI drawing mode: when viewing a lesson/chat whiteboard, steps auto-play. User can pause/replay.

**Step 3: API route**

Returns fake drawing steps for a concept (triangle construction: 3 lines + labels + angle marks).

**Step 4: Run tests — expect PASS**

**Step 5: Commit**

```bash
git commit -m "feat: add SVG whiteboard with animated drawing steps and user drawing tools"
```

---

### Task 18: Whiteboard — Math Canvas & Mindmap (F14, F15)

**Files:**
- Create: `src/app/whiteboard/components/math-canvas.tsx`
- Create: `src/app/whiteboard/components/mindmap-view.tsx`
- Create: `src/app/api/whiteboard/math/route.ts`
- Create: `src/app/api/whiteboard/mindmap/route.ts`
- Modify: `src/app/whiteboard/page.tsx`
- Test: `tests/e2e/whiteboard-math.spec.ts`

**Step 1: Write tests**

Test math canvas renders a function graph. Test mindmap renders nodes with connections. Test tab switching between SVG/Math/Mindmap modes.

**Step 2: Implement math canvas**

`math-canvas.tsx`: Renders mathematical graphs using SVG (no GeoGebra dependency in mock phase). Draw axes, grid lines, and plot function curves (quadratic y=x², sine wave, linear). Animated drawing of curve left-to-right. KaTeX renders equation labels.

**Step 3: Implement mindmap view**

`mindmap-view.tsx`: Uses ReactFlow to render a tree of MindmapNode objects. Center node = topic, branches = subtopics, leaves = details. Auto-layout. Nodes are color-coded by depth level. Expandable/collapsible.

**Step 4: Add tab navigation**

Whiteboard page has 3 tabs at top: Canvas | Math | Mindmap. Tabs switch content area. Active tab has saffron underline.

**Step 5: Run tests — expect PASS**

**Step 6: Commit**

```bash
git commit -m "feat: add math canvas (SVG graphs) and mindmap view (ReactFlow) to whiteboard"
```

---

### Task 19: Classroom + Whiteboard Integration Test

**Files:**
- Test: `tests/e2e/classroom-full.spec.ts`

**Step 1: Write integration test**

Test navigating from home → classroom → see teacher lecture → see whiteboard drawing → classmate asks question → user raises hand → scene transitions.

**Step 2: Run test — expect PASS**

**Step 3: Review-Critic-Improve**

- REVIEW: Check classroom and whiteboard against design doc
- CRITIC: Check transitions between classroom and whiteboard are smooth, check mobile responsiveness
- IMPROVE: Fix any layout issues, add missing transitions

**Step 4: Commit**

```bash
git commit -m "feat: classroom + whiteboard integration complete — F10-F15 working"
```

---

## Phase 5: Quiz, Lessons, Progress (Tasks 20-23)

### Task 20: Quiz Engine (F16, F17)

**Files:**
- Create: `src/app/quiz/page.tsx`
- Create: `src/app/quiz/components/question-card.tsx`
- Create: `src/app/quiz/components/timer-bar.tsx`
- Create: `src/app/quiz/components/feedback-panel.tsx`
- Create: `src/app/quiz/components/score-summary.tsx`
- Create: `src/app/api/quiz/generate/route.ts`
- Create: `src/app/api/quiz/grade/route.ts`
- Test: `tests/e2e/quiz.spec.ts`

**Step 1-6:** Standard TDD cycle. Build quiz with:
- Question card supporting MCQ (radio buttons), fill-in-blank (text input), short answer (textarea)
- Timer bar (optional, animated countdown)
- Instant feedback panel (correct/incorrect with explanation + "Ask Ekalavya" button)
- Score summary at end (percentage, mastery level, knowledge gaps, next steps)
- Celebration animation (mascot celebrating) on high scores

**Commit:**
```bash
git commit -m "feat: add quiz engine with MCQ/fill/short, auto-grading, feedback, score summary"
```

---

### Task 21: Lesson Viewer (F18-F21, F29, F33)

**Files:**
- Create: `src/app/lessons/page.tsx`
- Create: `src/app/lessons/components/slides-deck.tsx`
- Create: `src/app/lessons/components/scene-indicator.tsx`
- Create: `src/app/lessons/components/simulation-embed.tsx`
- Create: `src/app/lessons/components/export-button.tsx`
- Create: `src/app/api/lessons/generate/route.ts`
- Test: `tests/e2e/lessons.spec.ts`

**Step 1-6:** Standard TDD cycle. Build lesson viewer with:
- Slides deck: horizontal swipe/arrow navigation, slide content with title + bullets + image
- Scene indicator: pills at top showing scene types (slide/quiz/sim/pbl) with icons
- Simulation embed: iframe-like container showing 1 sample HTML simulation (pendulum or water cycle)
- PBL placeholder: "Project-Based Learning — Coming Soon" card with description
- Export button: "Download" dropdown with PPTX/HTML options (mock: shows toast "Export coming soon")
- PDF upload: button that opens file picker (mock: shows sample parsed content)

**Commit:**
```bash
git commit -m "feat: add lesson viewer with slides, scene navigation, simulation embed, export placeholder"
```

---

### Task 22: Progress Dashboard (F22-F24, F36)

**Files:**
- Create: `src/app/progress/page.tsx`
- Create: `src/app/progress/components/mastery-grid.tsx`
- Create: `src/app/progress/components/streak-calendar.tsx`
- Create: `src/app/progress/components/xp-chart.tsx`
- Create: `src/app/progress/components/style-insights.tsx`
- Create: `src/app/progress/components/achievements.tsx`
- Create: `src/app/api/progress/route.ts`
- Test: `tests/e2e/progress.spec.ts`

**Step 1-6:** Standard TDD cycle. Build:
- Mastery grid: 8 topics × 5 levels (Novice/Beginner/Intermediate/Advanced/Master). Color intensity indicates mastery. Tap a cell → see topic details.
- Streak calendar: GitHub-style heatmap showing 90 days. Green intensity = activity level. Current streak count with fire icon.
- XP chart: Line graph (Recharts) showing XP over 30 days. Animated draw-in.
- Style insights: Card showing detected learning style with brief description + recommendation.
- Achievements: Grid of badge cards (6 achievements). Earned = full color + check. Unearned = grayscale + lock. Tap → see criteria.
- Adaptive roadmap: Visual learning path (vertical node graph) showing completed → current → upcoming topics.

**Commit:**
```bash
git commit -m "feat: add progress dashboard with mastery grid, streak calendar, XP chart, achievements, roadmap"
```

---

### Task 23: Phase 5 Integration Test

**Files:**
- Test: `tests/e2e/learning-flow.spec.ts`

**Step 1: Write end-to-end learning flow test**

Test: Home → start topic → chat with Ekalavya → navigate to lesson → complete quiz → see progress update → check achievements.

**Step 2: Review-Critic-Improve**

**Step 3: Commit**

```bash
git commit -m "feat: complete learning flow integration — quiz, lessons, progress all connected"
```

---

## Phase 6: Village, Settings, Polish (Tasks 24-27)

### Task 24: Village Group Mode (F25)

**Files:**
- Create: `src/app/village/page.tsx`
- Create: `src/app/village/components/start-session.tsx`
- Create: `src/app/village/components/participant-list.tsx`
- Create: `src/app/village/components/shared-screen.tsx`
- Create: `src/app/village/components/group-discussion.tsx`
- Create: `src/app/api/village/create/route.ts`
- Create: `src/app/api/village/join/route.ts`
- Test: `tests/e2e/village.spec.ts`

**Step 1-6:** Standard TDD cycle. Build:
- Start session: "Start Village Session" hero button + topic selector + participant count slider (2-10)
- Participant list: Avatar circles with names. Mock: 4 pre-defined participants.
- Shared screen: Central area showing current lesson/whiteboard (reuses existing components)
- Group discussion: Chat panel where multiple "participants" speak (mock: scripted turns from different names)
- Session code: Display a shareable 6-digit code (mock: always "123456")

**Commit:**
```bash
git commit -m "feat: add village group mode with session creation, participants, shared screen, group discussion"
```

---

### Task 25: Settings (F26, F28, F31)

**Files:**
- Create: `src/app/settings/page.tsx`
- Create: `src/app/settings/components/profile-editor.tsx`
- Create: `src/app/settings/components/depth-slider.tsx`
- Create: `src/app/settings/components/style-picker.tsx`
- Create: `src/app/settings/components/language-selector.tsx`
- Create: `src/app/settings/components/voice-config.tsx`
- Create: `src/app/settings/components/theme-toggle.tsx`
- Create: `src/app/api/settings/route.ts`
- Test: `tests/e2e/settings.spec.ts`

**Step 1-6:** Standard TDD cycle. Build:
- Profile editor: Name input + avatar selector (6 preset avatars) + age group display
- Depth slider: shadcn Slider 1-10 with labels (Elementary → Ph.D). Current value highlighted. Description updates as slider moves.
- Style picker: 4 toggle cards (Visual/Verbal/Active/Reflective) — multi-select
- Language selector: Dropdown with 20 languages (English + Hindi fully "supported", rest show "Coming soon")
- Voice config: Speed slider (0.5x-2x) + accent dropdown (mock: 3 options)
- Theme toggle: 3-way toggle (Light/Dark/Auto) with instant preview

All changes persist to learner store → localStorage.

**Commit:**
```bash
git commit -m "feat: add settings with depth slider (1-10), style picker, language, voice, theme"
```

---

### Task 26: Navigation & Middleware Polish

**Files:**
- Modify: `src/components/ekalavya/nav-bar.tsx`
- Modify: `src/middleware.ts`
- Modify: All page.tsx files (add page transitions)
- Test: `tests/e2e/navigation.spec.ts`

**Step 1: Write navigation test**

Test all nav-bar tabs navigate correctly. Test active state highlights. Test back button works on all screens. Test deep links work (e.g., /chat?topic=math). Test onboarding gate redirects unauthenticated users.

**Step 2: Add page transitions**

Wrap each page's content in Framer Motion `<motion.div>` with slide-in animation. Use `AnimatePresence` in layout for exit animations.

**Step 3: Polish nav-bar**

Add active indicator animation (saffron underline slides to active tab). Add haptic-style scale animation on tap. Ensure nav-bar is fixed at bottom on all screens except splash and onboarding.

**Step 4: Run full navigation test — expect PASS**

**Step 5: Commit**

```bash
git commit -m "feat: polish navigation — page transitions, nav-bar animations, middleware, deep links"
```

---

### Task 27: Full App E2E Test Suite & Visual Polish

**Files:**
- Create: `tests/e2e/full-app.spec.ts`
- Modify: Various components for visual polish

**Step 1: Write comprehensive E2E test**

Test the complete user journey:
1. Land on splash → click Start
2. Complete onboarding (4 steps)
3. See home dashboard with greeting
4. Navigate to chat → send message → see response
5. Navigate to classroom → see agents interact
6. Navigate to whiteboard → see drawing
7. Navigate to quiz → answer questions → see score
8. Navigate to lessons → browse slides
9. Navigate to progress → see mastery grid + streak
10. Navigate to village → start session
11. Navigate to settings → change theme → verify theme changes
12. Navigate back to home → verify consistency

**Step 2: Run full E2E suite**

```bash
pnpm playwright test
```
Expected: All tests PASS

**Step 3: Visual polish pass**

Review every screen for:
- Consistent spacing and typography
- Correct colors (verify against theme tokens)
- Smooth animations (no jank)
- Mobile responsiveness (test at 375px width)
- Loading states (skeletons on every screen)
- Empty states (meaningful messages, not blank screens)
- Mascot appears in appropriate states on each screen

**Step 4: Review-Critic-Improve (Final)**

- REVIEW: Walk through entire app as CEO would
- CRITIC: List every visual issue, UX friction, missing polish
- IMPROVE: Fix all issues

**Step 5: Commit**

```bash
git commit -m "feat: complete Ekalavya AI MVP mock — all 11 screens, 37 features, full E2E tests"
```

---

## Summary

| Phase | Tasks | Features Covered | Key Deliverable |
|-------|-------|-----------------|-----------------|
| Phase 0 | 1-4 | Infrastructure | Project + shadcn + design system + types |
| Phase 1 | 5-8 | F09, F32 | Mock data + stores + providers + brand components |
| Phase 2 | 9-11 | F01-F03, F22-F24, F36 | Splash + onboarding + home dashboard |
| Phase 3 | 12-15 | F04-F08, F27 | Socratic chat (streaming, hints, voice, images, modes) |
| Phase 4 | 16-19 | F10-F15 | Multi-agent classroom + whiteboard (SVG, math, mindmap) |
| Phase 5 | 20-23 | F16-F21, F29, F33 | Quiz + lessons + progress dashboard |
| Phase 6 | 24-27 | F25, F26, F28, F31 | Village + settings + navigation + final polish |

**Total: 27 tasks, ~100 files, 37 features, complete E2E test coverage**

**Estimated commits: 27 (one per task)**
