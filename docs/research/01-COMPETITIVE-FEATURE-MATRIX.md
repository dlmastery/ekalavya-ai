# Drona (Sokrates) — Competitive Feature Matrix
> Master comparison of all source repos. Updated as research agents complete.
> **Last updated**: 2026-03-19

## Source Repos Under Analysis

| # | Repo | Stars | Tech | License | Active? |
|---|------|-------|------|---------|---------|
| 1 | OpenMAIC (THU-MAIC) | 9.2k | Next.js + LangGraph | AGPL-3.0 | Yes (hours ago) |
| 2 | ChatTutor (HugeCatLab) | 978 | Vue 3 + ElysiaJS + GeoGebra | AGPL-3.0 | Jan 2026 |
| 3 | Tutor-GPT (plastic-labs) | 887 | Next.js + Supabase + Honcho | GPL-3.0 | Nov 2025 |
| 4 | SocraticAI (RunzheYang) | 241 | Python + Flask | MIT | 2023 |
| 5 | SocratiQ DSA (codernoahx) | 1 | Python + Streamlit + Gemini | None | Oct 2024 |
| 6 | AlgoMentor DSA (jatinkaushik-jk) | 4 | Next.js + MongoDB + Gemini | MIT | Early 2025 |
| 7 | Algo Sensei (karanb192) | 24 | Pure Markdown prompts | MIT | Oct 2025 |
| 8 | DeepTutor (HKUDS) | 10.8k | Next.js + FastAPI + Python | AGPL-3.0 | Jan 2026 |
| 9 | Mr. Ranedeer (JushBJJ) | 29.7k | Pure prompt (GPT-4) | None | Discontinued |
| 10 | Multi-Agent-Study-Assist (A-R007) | 12 | Streamlit + Phidata + ChromaDB | — | — |
| 11 | Awesome-AI-Era-Edu (THU-MAIC) | 28 | Paper list (173 papers) | — | — |

---

## Feature Matrix (POPULATED — All agents complete as of 2026-03-19)

### A. Core Teaching Capabilities

| Feature | OpenMAIC | ChatTutor | Tutor-GPT | SocraticAI | SocratiQ | AlgoMentor | Algo Sensei | DeepTutor | Ranedeer | StudyAssist |
|---------|----------|-----------|-----------|------------|----------|------------|-------------|-----------|----------|-------------|
| Multi-agent classroom | YES (T+TA+4P+Mgr) | YES (Agent+Painter) | — | YES (3 agents) | — | — | — | YES (multi-agent) | — | YES (6 agents) |
| Lesson auto-generation | YES (2-stage) | — | — | — | — | — | — | YES (guided) | YES (/plan) | — |
| Socratic questioning | YES | — | YES (ToM) | YES (core) | YES | YES | YES | — | YES (config) | — |
| Theory-of-Mind | — | — | YES (core) | — | — | — | — | — | — | — |
| Self-evolving prompts | — | — | YES (Honcho) | — | — | — | — | — | — | — |
| Progressive hints | — | — | — | — | — | — | YES (5-lvl) | — | — | — |
| Mode switching | — | — | — | — | — | — | YES (5 modes) | YES (7 modules) | YES (/commands) | — |
| Adaptive difficulty | — | — | YES | — | — | YES | — | — | YES (10 depth) | YES |
| Knowledge graphs | — | — | — | — | — | — | — | YES (LightRAG) | — | — |
| RAG / document upload | YES (PDF) | — | — | — | — | — | — | YES (3 RAG types) | — | YES (ChromaDB) |
| Learning style detect | — | — | YES | — | — | — | — | — | YES (10 styles) | YES |
| Dual-loop reasoning | — | — | — | — | — | — | — | YES (Analysis+Solve) | — | — |
| Deep research | — | — | — | — | — | — | — | YES (DR-in-KG) | — | — |

### B. Visual & Interactive Tools

| Feature | OpenMAIC | ChatTutor | Tutor-GPT | SocraticAI | SocratiQ | AlgoMentor | Algo Sensei | DeepTutor | Ranedeer | StudyAssist |
|---------|----------|-----------|-----------|------------|----------|------------|-------------|-----------|----------|-------------|
| Shared whiteboard | YES (SVG) | YES (reactive) | — | — | — | — | — | — | — | — |
| Math canvas / GeoGebra | — | YES (GeoGebra) | — | — | — | — | — | — | — | — |
| Mindmap generation | — | YES | — | — | — | — | — | — | — | — |
| Narrated slides | YES (+spotlight) | — | — | — | — | — | — | — | — | — |
| HTML simulations | YES | — | — | — | — | — | — | YES (guided) | — | — |
| TTS / voice | YES (pluggable) | — | — | — | — | — | — | YES (DashScope) | — | — |
| STT / speech input | YES | — | — | — | — | — | — | — | — | — |
| Interactive quizzes | YES (auto-grade) | — | — | — | — | — | — | YES (dual-mode) | YES (/test) | YES |
| Image generation | YES (AI images) | — | — | — | — | — | — | — | — | — |
| Export (PPTX/HTML) | YES (both) | — | — | — | — | — | — | YES (PDF/MD) | — | — |
| Physics sim | — | YES | — | — | — | — | — | — | — | — |
| Circuit editor | — | YES | — | — | — | — | — | — | — | — |
| Code teaching | — | YES (Py/JS) | — | — | — | — | — | — | — | — |

### C. Code & DSA Practice

| Feature | OpenMAIC | ChatTutor | Tutor-GPT | SocraticAI | SocratiQ | AlgoMentor | Algo Sensei | DeepTutor | Ranedeer | StudyAssist |
|---------|----------|-----------|-----------|------------|----------|------------|-------------|-----------|----------|-------------|
| Code evaluation | — | YES | — | YES (Python) | YES (Py) | — | YES | YES (sandbox) | — | — |
| Problem generation | — | — | — | — | YES | — | — | YES (exam mimic) | YES (/test) | YES |
| Algorithm library | — | — | — | — | — | YES (50+) | — | — | — | — |
| Mock interviews | — | — | — | — | — | — | YES | — | — | — |
| Pattern recognition | — | — | — | — | — | — | YES | — | — | — |
| Progress tracking | — | — | YES (Honcho) | — | — | YES (MongoDB) | — | — | — | — |
| Wolfram Alpha | — | — | — | YES | — | — | — | — | — | — |
| Idea generation | — | — | — | — | — | — | — | YES (IdeaGen) | — | — |

### D. Prompt Architecture & Intelligence

| Feature | OpenMAIC | ChatTutor | Tutor-GPT | SocraticAI | SocratiQ | AlgoMentor | Algo Sensei | DeepTutor | Ranedeer | StudyAssist |
|---------|----------|-----------|-----------|------------|----------|------------|-------------|-----------|----------|-------------|
| Modular prompt system | YES (MD+TS) | — | — | YES (hardcoded) | — | — | YES (MD files) | YES (YAML+i18n) | YES (pseudo-code) | YES (YAML) |
| Director/orchestrator | YES (LangGraph) | — | — | — | — | — | — | — | — | — |
| Dual-chain reasoning | — | — | YES (thought+response) | — | — | — | — | YES (analysis+solve) | — | — |
| JSON structured output | YES | — | — | — | — | — | — | — | — | — |
| Pedagogy rules built-in | YES (Bloom/ZPD/UDL) | YES (5 engines) | YES (ToM) | YES (anamnesis) | — | — | YES (Socratic+hints) | — | YES (config-driven) | — |
| Customizable personas | YES (archetypes) | YES (Agent/Painter) | — | YES (3 roles) | — | — | — | YES (YAML agents) | YES (6 tones) | YES (6 agents) |
| Persistent user model | — | — | YES (Honcho) | — | — | YES (MongoDB) | — | — | — | — |
| Prompt evolution | — | — | YES (runtime gen) | YES (emergent) | — | — | — | — | — | — |

### E. Infrastructure & Deployment

| Feature | OpenMAIC | ChatTutor | Tutor-GPT | SocraticAI | SocratiQ | AlgoMentor | Algo Sensei | DeepTutor | Ranedeer | StudyAssist |
|---------|----------|-----------|-----------|------------|----------|------------|-------------|-----------|----------|-------------|
| Docker | YES | YES (compose) | YES | — | — | — | — | YES (GHCR) | — | YES |
| Vercel deploy | YES | — | — | — | YES (Streamlit) | YES | — | — | — | — |
| Multi-LLM support | YES (4+) | YES (AI SDK) | YES (OpenRouter) | — (OpenAI only) | — (Gemini only) | — (Gemini only) | — (Claude only) | YES (4+) | — (GPT-4 only) | — |
| Offline capable | — | — | — | — | — | — | — | — | — | — |
| Mobile-first | — | — | — | — | — | — | — | — | — | — |
| i18n / multilingual | YES (zh+en) | — | — | — | — | — | — | YES (zh+en) | YES (any lang) | — |
| Co-writing / editor | — | — | — | — | — | — | — | YES (Markdown) | — | — |

---

## Gap Analysis: What NONE of the repos have (Drona/Sokrates must build)

1. **Gemini Live bidirectional streaming** — real-time voice conversation
2. **Gemini Nano on-device** — offline-first mobile experience
3. **Dynamic image generation** (Nano Banana Flash) — contextual photos/diagrams
4. **Rural/low-resource optimization** — <50MB, works on $30 phones, solar-friendly
5. **100+ language support** including low-resource languages/dialects
6. **Village group mode** — one phone becomes shared classroom
7. **Child Socrates persona** — gentle, curious child voice (not authoritative adult)
8. **Cross-age adaptation** — same system works for 6-year-olds and 60-year-olds
9. **Voice-first interface** — primary modality is speech, not text
10. **WhatsApp/Bluetooth sharing** — export learning content via local channels

---

## Traceability: Feature → Source Repo Mapping (Draft)

| Drona Feature | Primary Source | Secondary Sources | Novel? |
|---------------|---------------|-------------------|--------|
| Multi-agent classroom | OpenMAIC | SocraticAI, StudyAssist | No |
| Socratic dialogue engine | SocraticAI | Tutor-GPT, Algo Sensei, Ranedeer | No |
| Theory-of-Mind learner model | Tutor-GPT | Ranedeer (config) | No |
| Visual whiteboard | OpenMAIC + ChatTutor | — | No |
| Math canvas / GeoGebra | ChatTutor | — | No |
| Progressive hint system | Algo Sensei | — | No |
| Code evaluation | SocratiQ DSA | Algo Sensei | No |
| Knowledge graphs | DeepTutor | — | No |
| Modular prompt templates | OpenMAIC + Ranedeer + Algo Sensei | — | No |
| Learning style detection | StudyAssist + Tutor-GPT | Ranedeer | No |
| Progress analytics | AlgoMentor | — | No |
| Adaptive roadmaps | StudyAssist | — | No |
| Gemini Live voice streaming | — | — | YES |
| On-device Nano model | — | — | YES |
| Dynamic image generation | — | — | YES |
| Offline-first architecture | — | — | YES |
| Rural optimization | — | — | YES |
| Child Socrates persona | — | — | YES |
| Village group mode | — | — | YES |
| 100+ language support | — | — | YES |
