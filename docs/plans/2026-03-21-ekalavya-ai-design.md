# Ekalavya AI — Design Document
## "No Child, No Teen, No Adult Left Behind"
### Version 1.0 — 2026-03-21

---

## 1. Executive Summary

Ekalavya AI is an AI-powered tutoring platform that merges the best features from 10+ open-source education repos into a single, dazzling experience powered by Google Gemini models. Named after the self-taught warrior from the Mahabharata who learned despite being denied formal education.

**MVP approach:** Next.js web app with complete UI mocked using fake data. Every screen interactive and testable. Backend and Gemini models connected after CEO approves the UX.

**Tech stack:** Next.js 15 + React 19 + TypeScript + shadcn/ui + Tailwind CSS 4 + Zustand + Framer Motion

**Source repos merged:** OpenMAIC, ChatTutor, Tutor-GPT, SocraticAI, SocratiQ DSA, AlgoMentor, Algo Sensei, DeepTutor, Mr. Ranedeer, Multi-Agent-Study-Assistant

---

## 2. Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Platform | Next.js web first, Android later | Fastest to demo, responsive for mobile |
| Design | Custom blend of top 10 education UX | Researched in 12-EDUCATION-UX-DESIGN-DIRECTION.md |
| MVP scope | All 10 feature groups mocked | CEO wants full product vision visible |
| Brand | Ekalavya AI | Self-taught learner, symbol of overcoming educational inequality |
| UI stack | shadcn/ui + Tailwind | Professional, customizable, fast to build |
| Architecture | Modular Monolith (Approach B) | Clean traceability, mock layer swappable, no license issues |
| Data | Mock first, Gemini later | DataProvider interface abstracts the swap |
| Quality | Review-Critic-Improve cycle on every task | CEO requirement |

---

## 3. Screen Map (11 screens)

1. **Splash / Landing** — Hero with Ekalavya mascot + CTA
2. **Onboarding** (4 steps) — Age, Language, Topic, Learning Style
3. **Home Dashboard** — Greeting, continue learning, progress rings, topics
4. **Socratic Chat** — 1:1 with Child Socrates persona, voice input, hints
5. **Live Classroom** — Multi-agent: teacher + 4 AI classmates, stage + discussion
6. **Whiteboard** — SVG canvas, math canvas, mindmap mode
7. **Quiz / Assessment** — MCQ/fill/short, timer, instant feedback
8. **Lesson Viewer** — Narrated slides, simulations, scene navigation
9. **Progress Dashboard** — Mastery grid, streak calendar, XP chart, achievements
10. **Village Group Mode** — Shared classroom on one device
11. **Settings** — Profile, depth 1-10, style, language, voice, theme

---

## 4. Feature Traceability Matrix (32 Features)

| ID | Feature | Screen | Source | Novel? | Mock Scope |
|----|---------|--------|--------|--------|-----------|
| F01 | Voice-guided onboarding | Onboarding | Ranedeer (/config) | Partial | Full Mock |
| F02 | Age-adaptive persona | Onboarding | Tutor-GPT (ToM) | Partial | Full Mock |
| F03 | Learning style detection | Onboarding | StudyAssist + Ranedeer | No | Full Mock |
| F04 | Socratic chat (Ekalavya persona) | Chat | SocraticAI + Tutor-GPT | YES (persona) | Full Mock |
| F05 | Progressive 5-level hints | Chat | Algo Sensei | No | Full Mock |
| F06 | Mode auto-switching | Chat | Algo Sensei | No | Full Mock |
| F07 | Voice conversation (bidirectional) | Chat | Gemini Live API | YES | Partial — UI + browser SpeechSynthesis |
| F08 | Dynamic image generation | Chat | Gemini image API | YES | Partial — show placeholder images |
| F09 | Persistent learner model | All | Tutor-GPT (Honcho) | No | Full Mock (localStorage) |
| F10 | Multi-agent classroom | Classroom | OpenMAIC | No | Full Mock |
| F11 | Agent orchestration | Infra | OpenMAIC (LangGraph) | No | Full Mock (scripted turns) |
| F12 | Roundtable debate | Classroom | OpenMAIC + SocraticAI | No | Full Mock |
| F13 | SVG whiteboard | Whiteboard | OpenMAIC + ChatTutor | No | Full Mock |
| F14 | Math canvas (GeoGebra-style) | Whiteboard | ChatTutor | No | Full Mock (static graphs) |
| F15 | Mindmap generation | Whiteboard | ChatTutor | No | Full Mock |
| F16 | Quiz generation (dual-mode) | Quiz | DeepTutor | No | Full Mock |
| F17 | Auto-grading + feedback | Quiz | OpenMAIC + DeepTutor | No | Full Mock |
| F18 | Lesson auto-generation | Lessons | OpenMAIC | No | Full Mock |
| F19 | Narrated slides + spotlight | Lessons | OpenMAIC | No | Full Mock |
| F20 | HTML simulations | Lessons | OpenMAIC | No | Partial — 1 sample sim |
| F21 | PBL projects | Lessons | OpenMAIC | No | Placeholder screen |
| F22 | Progress mastery grid | Progress | AlgoMentor | No | Full Mock |
| F23 | Streak/XP system | Progress | Duolingo (UX) | No | Full Mock |
| F24 | Learning analytics | Progress | StudyAssist + DeepTutor | No | Full Mock |
| F25 | Village group mode | Village | — | YES | Full Mock |
| F26 | Depth 1-10 config | Settings | Ranedeer | No | Full Mock |
| F27 | /commands system | Chat | Ranedeer | No | Full Mock |
| F28 | Theme (light/dark/auto) | Settings | UX research | Partial | Full Mock |
| F29 | Export (PPTX/HTML) | Lessons | OpenMAIC | No | Placeholder button |
| F30 | Offline-first architecture | Infra | — | YES | Deferred (Phase 7) |
| F31 | 100+ language support | Infra | — | YES | Partial — English + Hindi |
| F32 | Ekalavya mascot (8 states) | All | Duolingo (UX) | Partial | Full Mock (SVG) |
| F33 | Document/PDF upload | Chat/Lessons | OpenMAIC + DeepTutor | No | Partial — UI only |
| F34 | Knowledge graph / RAG | Infra | DeepTutor (LightRAG) | No | Deferred (Phase 4) |
| F35 | Code evaluation | Chat | SocratiQ + ChatTutor | No | Placeholder |
| F36 | Adaptive learning roadmaps | Progress | StudyAssist + GenMentor | No | Full Mock |
| F37 | Dual-loop reasoning | Infra | DeepTutor | No | Deferred (Phase 4) |

**Totals: 37 features. 6 novel, 4 partial-novel, 27 traced.**
**Mock scope: 24 Full Mock, 6 Partial, 3 Placeholder, 4 Deferred.**

---

## 5. Component Architecture

### Provider Stack
```
<ThemeProvider>           — light/dark/auto, Warm Earth palette
<MockDataProvider>        — swappable for real Gemini later
<LearnerModelProvider>    — persistent profile + ToM state (localStorage)
<VoiceProvider>           — mic capture + TTS playback states
<QueryClientProvider>     — TanStack Query for async data
```

### DataProvider Interface
```typescript
interface DataProvider {
  // Onboarding (F01-F03)
  initProfile(config: OnboardingConfig): LearnerProfile
  detectLearningStyle(responses: StyleResponse[]): LearningStyle

  // Chat (F04-F08)
  sendMessage(msg: string, mode?: TutoringMode): AsyncGenerator<ChatChunk>
  getConversationHistory(): Message[]
  getHint(level: 1|2|3|4|5): Hint                    // F05 progressive hints
  getCurrentMode(): TutoringMode                       // F06 mode detection
  switchMode(mode: TutoringMode): void                 // F06 mode switching
  generateImage(prompt: string): ImageResult           // F08 dynamic images

  // Voice (F07) — mock phase uses browser SpeechSynthesis
  synthesizeSpeech(text: string): AudioBuffer
  transcribeSpeech(audio: Blob): string

  // Classroom (F10-F12)
  startClassroom(topic: string): ClassroomSession
  getAgentResponse(agentId: string): AsyncGenerator<AgentAction>
  raiseHand(): void
  startDebate(topic: string): DebateSession            // F12 roundtable

  // Lessons (F18-F21, F29)
  generateLesson(topic: string): Lesson
  getScenes(lessonId: string): Scene[]
  exportLesson(lessonId: string, format: 'pptx' | 'html'): Blob  // F29

  // Quiz (F16-F17)
  generateQuiz(topic: string, difficulty: number): Quiz
  gradeAnswer(questionId: string, answer: string): GradeResult

  // Whiteboard (F13-F15)
  getDrawingSteps(concept: string): DrawingStep[]      // F13 SVG
  getMathConstruction(expression: string): MathStep[]  // F14 GeoGebra-style
  getMindmap(topic: string): MindmapData               // F15 mindmaps

  // Learner Model (F09)
  getProfile(): LearnerProfile
  updateProfile(delta: Partial<LearnerProfile>): void

  // Progress (F22-F24)
  getProgress(): ProgressData
  getAchievements(): Achievement[]
  getStreak(): StreakData

  // Village Group Mode (F25)
  createGroup(config: GroupConfig): GroupSession
  joinGroup(groupId: string): GroupSession
  getGroupState(): GroupState

  // Settings (F26-F28)
  updateConfig(config: LearningConfig): void           // F26 depth/style
  getAvailableCommands(): Command[]                    // F27 /commands

  // Mascot (F32)
  getMascotState(context: InteractionContext): MascotEmotion
}
```

### Mascot Emotional States (8)
curious, celebrating, thinking, encouraging, excited, sleeping, teaching, listening

Triggers:
- curious: user asks a question
- celebrating: correct answer or milestone
- thinking: processing or generating content
- encouraging: wrong answer or user struggles
- excited: new topic or breakthrough moment
- sleeping: idle for 30+ seconds
- teaching: explaining a concept
- listening: user is speaking (voice mode)

---

## 6. Design System

### Color Palette — "Warm Earth & Bright Sky"
> Canonical source: `docs/research/12-EDUCATION-UX-DESIGN-DIRECTION.md` Section 3.2

```
Primary:       Saffron       #FF9933  (CTAs, brand, active states)
Primary Light: Warm Peach    #FFB74D  (hover states, soft highlights)
Primary Dark:  Deep Saffron  #E65100  (pressed states, emphasis)
Secondary:     Sky Blue      #2196F3  (links, info, secondary actions)
Accent Red:    Warm Red      #E53935  (errors, hearts, incorrect)
Accent Green:  Leaf Green    #4CAF50  (correct, completed, growth)
Accent Amber:  Sun Yellow    #FFC107  (streaks, XP, rewards)
Background:    Cloud White   #FAFAFA  (light mode surface)
Background Dk: Night         #121212  (dark mode surface)
Surface:       Warm White    #FFF8F0  (cards, elevated light)
Surface Dk:    Dark Surface  #1E1E2E  (cards, elevated dark)
Text Primary:  Ink           #212121  (light mode headings/body)
Text Secondary:Warm Gray     #757575  (light mode secondary)
Text Dk:       Snow          #F5F5F5  (dark mode primary)
Border:        Mist          #E0E0E0  (dividers, card borders)
```

Subject colors (for topic cards):
```
Math:      #FF7043   Science:   #66BB6A   Language:  #42A5F5
History:   #AB47BC   Arts:      #EC407A   Tech:      #26C6DA
Health:    #EF5350   Life Skills:#FFA726
```

### Typography — Noto Sans
```
Heading 1:   Noto Sans 32px/40px Bold
Heading 2:   Noto Sans 24px/32px SemiBold
Heading 3:   Noto Sans 20px/28px SemiBold
Body:        Noto Sans 16px/24px Regular
Small:       Noto Sans 14px/20px Regular
Caption:     Noto Sans 12px/16px Regular
```

### Component Patterns
- Buttons: 3D pushable effect (4px bottom border, Duolingo-style)
- Cards: rounded-2xl, subtle shadow, hover lift animation
- Progress bars: rounded-full, gradient fill, smooth animation
- Chat bubbles: rounded-2xl, Ekalavya = saffron tint, User = teal tint
- Touch targets: minimum 48px (WCAG AAA)
- Animations: CSS transforms only, 30fps target, <200KB Lottie budget

---

## 7. File Structure

```
drona/
  docs/research/               # Research findings (12 files)
  docs/plans/                  # This design doc
  src/
    app/
      layout.tsx               # Root layout + providers
      page.tsx                 # Splash / landing
      globals.css              # Tailwind + custom tokens
      middleware.ts            # Onboarding gate
      onboarding/page.tsx      # + 4 step components
      home/page.tsx            # + dashboard components
      chat/page.tsx            # + chat components
      classroom/page.tsx       # + classroom components
      whiteboard/page.tsx      # + canvas components
      quiz/page.tsx            # + quiz components
      lessons/page.tsx         # + lesson components
      progress/page.tsx        # + progress components (mastery, streaks, XP)
      village/page.tsx         # + group mode components
      settings/page.tsx        # + settings components
      not-found.tsx            # Custom 404 page
      error.tsx                # Global error boundary
      api/
        chat/route.ts          # SSE streaming mock
        classroom/route.ts     # SSE agent turns mock
        quiz/generate/route.ts
        quiz/grade/route.ts
        lessons/generate/route.ts
        whiteboard/route.ts
        whiteboard/math/route.ts
        whiteboard/mindmap/route.ts
        onboarding/route.ts
        progress/route.ts
        village/create/route.ts
        village/join/route.ts
        settings/route.ts
        voice/synthesize/route.ts
    components/
      ui/                      # shadcn/ui base
      ekalavya/                # Branded components (mascot, nav, skeleton, error)
    lib/
      mock/                    # MockDataProvider + all fake data files
      providers/               # DataProvider interface + context providers
      stores/                  # Zustand stores (learner, theme, voice, classroom)
      types/                   # TypeScript types (chat, classroom, lesson, quiz, etc.)
      constants/               # Personas, learning config, theme tokens
      utils/                   # cn(), formatters
    assets/
      mascot/                  # 8 SVG emotional states
      icons/                   # Custom branded icons
      images/                  # Sample images for mock data
  tests/
    e2e/                       # Playwright
    unit/                      # Vitest
  package.json
  tsconfig.json
  tailwind.config.ts
  next.config.ts
```

---

## 8. API Routes (Mock Phase)

All routes return fake data with simulated streaming delays.

| Route | Method | Response | Streaming? |
|-------|--------|----------|-----------|
| /api/chat | POST | Socratic chat response | YES (SSE, 30-50ms/word) |
| /api/classroom | POST | Agent actions/turns | YES (SSE) |
| /api/quiz/generate | POST | Quiz with questions | No |
| /api/quiz/grade | POST | Grade + feedback | No |
| /api/lessons/generate | POST | Lesson with scenes | No |
| /api/whiteboard | POST | Drawing steps array | No |
| /api/whiteboard/math | POST | Math construction steps | No |
| /api/whiteboard/mindmap | POST | Mindmap data | No |
| /api/onboarding | POST | Save profile, return learner model | No |
| /api/progress | GET | Progress data + achievements | No |
| /api/village/create | POST | Create group session | No |
| /api/village/join | POST | Join existing session | No |
| /api/settings | PUT | Update learning config | No |
| /api/voice/synthesize | POST | TTS audio (mock: browser API) | No |

Note: TanStack Query used for non-streaming requests. Raw fetch + EventSource
used for SSE streaming (chat, classroom). This is documented to avoid confusion.

---

## 9. Coding Standards

1. TypeScript strict mode — no `any`, all types explicit
2. Server Components by default, `"use client"` only when needed
3. One component per file, named export matching filename
4. Naming: kebab-case files, PascalCase components, camelCase functions
5. State: Zustand global, React state local, TanStack Query async
6. Styling: Tailwind utilities, cn() for conditional, CSS variables for tokens
7. Testing: Vitest units, Playwright E2E, test each screen
8. Every component handles: loading, empty, error, populated states
9. Mobile-first: base = mobile, md: = tablet, lg: = desktop
10. Accessibility: keyboard-navigable, ARIA labels, 48px touch targets
11. Import order: React/Next → external libs → internal components → types → styles
12. Path aliases: `@/` maps to `src/` (e.g., `@/components/ui/button`)
13. Error handling: Error Boundaries at route level, try/catch in API routes, toast for user-facing errors
14. API error format: `{ error: string, code: string, details?: unknown }`
15. Mock data files: named `fake-{domain}.ts`, typed exports, realistic sample data
16. Git: conventional commits (`feat:`, `fix:`, `docs:`), feature branches off `main`
17. Env vars: documented in `.env.example`, prefixed `NEXT_PUBLIC_` for client-side only

---

## 10. Quality Process

Every task follows: **Do → Review → Critic → Improve → Done**

1. Complete the implementation
2. REVIEW: Re-read the code, check against design doc
3. CRITIC: Identify weaknesses, gaps, missing states, accessibility issues
4. IMPROVE: Fix all issues found
5. Mark complete only after improvement pass

---

## 11. Future Phases (Post-MVP Mock)

| Phase | Focus | Key Tech |
|-------|-------|----------|
| Phase 2 | Connect Gemini Flash for real chat | @google/genai SDK, SSE |
| Phase 3 | Gemini Live API for voice | WebSocket, PCM audio, VAD |
| Phase 4 | LangGraph multi-agent orchestration | @langchain/langgraph |
| Phase 5 | Gemini Nano on-device (Android) | ML Kit GenAI APIs, Kotlin |
| Phase 6 | Image generation (Nano Banana Flash) | Gemini image API |
| Phase 7 | Offline-first + PWA | Service workers, IndexedDB |
| Phase 8 | Native Android (Kotlin + Compose) | Android Studio, Gemini Nano |

---

## 12. Research-Backed Design Principles

From `docs/research/11-FINDINGS-RESEARCH-PAPERS.md` — 10 principles from 14 academic papers:

| # | Principle | Applied In | Phase |
|---|-----------|-----------|-------|
| P1 | Multi-agent architecture is essential | F10-F12 (Classroom) | MVP Mock |
| P2 | Ground adaptation in educational theory (Bloom/ZPD/UDL) | F02, F03, F09 | MVP Mock |
| P3 | Socratic over answer-giving (12%+ improvement) | F04, F05, F27 | MVP Mock |
| P4 | Knowledge-aware content structure | F34 (Knowledge Graph) | Phase 4 |
| P5 | Goal-oriented learning paths | F36 (Adaptive Roadmaps) | MVP Mock |
| P6 | Pedagogical reward models | — | Phase 4 |
| P7 | Adversarial collaboration for content quality | — | Phase 4 |
| P8 | Dual memory for agent evolution | — | Phase 4 |
| P9 | Student simulation for testing | — | Phase 5 |
| P10 | Fade scaffolding dynamically | F05 (Progressive hints) | MVP Mock |

---

## 13. Prompt Management (Future Phases)

Adopting DeepTutor's PromptManager pattern for when Gemini is connected:

```
lib/prompts/
  manager.ts                  # Singleton PromptManager (lazy-load YAML)
  config/agents.yaml          # Temperature, max_tokens per module
  templates/
    en/
      socratic-tutor.yaml     # Ekalavya persona prompt
      teacher-agent.yaml      # Classroom teacher prompt
      peer-curious.yaml       # Curious classmate prompt
      peer-skeptic.yaml       # Skeptical classmate prompt
      peer-beginner.yaml      # Struggling classmate prompt
      peer-advanced.yaml      # Advanced classmate prompt
      quiz-generator.yaml     # Quiz generation prompt
      lesson-planner.yaml     # Lesson outline prompt
    hi/                        # Hindi translations
      (same files)
```

---

## 14. Gemini API Technical Notes (for Phase 2+)

> From `docs/research/07-FINDINGS-GEMINI-APIS.md`

### Key Constraints
- Live API WebSocket: `wss://generativelanguage.googleapis.com/ws/...`
- Audio input: 16-bit PCM, 16kHz, little-endian, mono
- Audio output: 24kHz PCM
- Session limit: 128K tokens (~15min audio-only, ~2min audio+video)
- Context compression available for unlimited duration
- SDK: `@google/genai` v1.45.0 — use `ai.live.connect()` for Live API

### Architecture Pattern for Next.js
1. Server API route generates ephemeral token (protects API key)
2. Client connects WebSocket directly to Gemini with token
3. AudioWorklet captures PCM from microphone
4. Float32 → 16-bit PCM → base64 → WebSocket send

### Pricing (relevant models)
- Gemini 3 Flash: $0.50/$3.00 per 1M tokens (best for main AI)
- Gemini 2.5 Flash-Lite: $0.10/$0.40 per 1M tokens (best for bulk tasks)
- Gemini Nano: FREE (on-device, Android only)

### Reference Implementations
- `google-gemini/live-api-web-console` (React)
- `yeyu2/gemini-nextjs` (Next.js)

---

## References

- Research findings: `docs/research/03-11-FINDINGS-*.md`
- UX design direction: `docs/research/12-EDUCATION-UX-DESIGN-DIRECTION.md`
- Competitive feature matrix: `docs/research/01-COMPETITIVE-FEATURE-MATRIX.md`
- Vision PRD: `docs/research/02-SOKRATES-VISION-PRD.md`
- Research papers & principles: `docs/research/11-FINDINGS-RESEARCH-PAPERS.md`
- Gemini API details: `docs/research/07-FINDINGS-GEMINI-APIS.md`
