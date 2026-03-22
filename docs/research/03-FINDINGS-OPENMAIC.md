# OpenMAIC — Research Findings
> Source: github.com/THU-MAIC/OpenMAIC | 9.2k stars | AGPL-3.0
> Status: COMPLETE

## Key Architecture
- Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS 4
- State: Zustand | Orchestration: LangGraph 1.1 | Export: Custom PptxGenJS
- Two-stage generation: Outline -> Scene Content
- 28+ action types in Action Engine

## Features Extracted
- One-click classroom generation from topic/PDF (~30min, <$2)
- Scene types: Slides (narrated), Quiz (auto-graded), Interactive HTML simulations, PBL projects
- Multi-agent: Teacher + TA + 4 Peer Archetypes + Manager/Director
- Shared SVG whiteboard (draw/text/shape/chart) with spotlight & laser
- TTS/STT voice integration (pluggable providers)
- Roundtable debates, Q&A mode, proactive discussions
- Web search integration (Tavily)
- Export: PPTX + standalone interactive HTML
- OpenClaw integration (Slack/Discord/Telegram/WhatsApp)
- i18n: zh-CN + en-US
- MinerU PDF parsing (complex tables, formulas, OCR)

## Prompt System
- `lib/generation/prompts/` — Markdown files (system.md/user.md per scene type)
- `lib/orchestration/` — director-prompt.ts, prompt-builder.ts
- Director/Manager prompt: observes classroom state, controls turn-taking
- "Oscillatory role allocation" — stochastic relevance-based selection
- Pedagogical foundations: Bloom's Taxonomy, ZPD, UDL
- Strict JSON outputs with post-processing (verbosity/safety filters)

## API Endpoints (~18)
- /api/generate, /api/generate-classroom, /api/chat (SSE streaming)
- /api/quiz-grade, /api/pbl, /api/parse-pdf, /api/web-search
- /api/transcription, /api/export (PPTX/HTML), /api/health

## Folder Structure
```
app/api/ — API routes
components/ — scene-renderers, element-renderers, whiteboard, agents, chat
lib/generation/ — two-stage pipeline + prompts/
lib/orchestration/ — LangGraph director graph
lib/playback/ — playback state machine
lib/action/ — action execution (28+ types)
lib/ai/ — LLM provider abstraction
lib/audio/ — TTS/ASR providers
lib/media/ — image/video generation
lib/export/ — PPTX/HTML export
lib/store/ — Zustand stores
packages/pptxgenjs/ — custom PPTX export
```

## Validated: 700+ students at Tsinghua, 100k+ interactions
