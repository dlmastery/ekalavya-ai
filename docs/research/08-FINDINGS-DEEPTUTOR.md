# DeepTutor — Research Findings
> Source: github.com/HKUDS/DeepTutor | 10.8k stars | AGPL-3.0
> Status: COMPLETE — Excellent comprehensive report

## Key Architecture
- Frontend: Next.js 16 + React 19 (port 3782)
- Backend: FastAPI + Python (port 8001)
- RAG: LlamaIndex / LightRAG / RAG-Anything (selectable per KB)
- Deploy: Docker + Docker Compose
- Latest: v0.6.0 (Jan 2026)

## Seven Modules
1. **Smart Knowledge Base** — PDF/TXT/MD upload, RAG + KG indexing
2. **Smart Solver** — Dual-loop reasoning (Analysis + Solve) with citations
3. **Knowledge Visualization / Guided Learning** — Interactive HTML pages
4. **Deep Research (DR-in-KG)** — Dynamic Topic Queue, 3-phase pipeline
5. **Quiz/Exam Generation** — Custom + reference exam mimicking
6. **Idea Generation (IdeaGen)** — Dual-filter brainstorming workflow
7. **Co-Writer** — Markdown editor + AI Rewrite/Shorten/Expand + TTS narration

## Smart Solver — Dual-Loop Architecture (KEY INNOVATION)
### Analysis Loop (understanding):
- InvestigateAgent: queries, tools (RAG, web search, docs) -> cite_id -> raw_result
- NoteAgent: processes cite_ids into summaries/citations

### Solve Loop (solving):
- PlanAgent: generates problem-solving plan (blocks)
- ManagerAgent: arranges steps per block
- SolveAgent: calls tools, writes reasoning
- CheckAgent: validates before formatting
- Format: final output

## Prompt System — PromptManager
- Singleton class in src/core/prompt_manager.py
- YAML files per module per language: src/agents/{module}/prompts/{lang}/*.yaml
- Language fallback: zh -> en, en -> zh
- Agent config in config/agents.yaml (temperature, max_tokens centralized)
- Agents access via self.get_prompt("system")

### Agent Configs
| Module | Temperature | Max Tokens |
|--------|-------------|------------|
| Solve | 0.3 | 8192 |
| Research | 0.5 | 12000 |
| Question | 0.7 | 4096 |
| Guide | 0.5 | 16192 |

## Deep Research (DR-in-KG)
- Phase 1: RephraseAgent + DecomposeAgent (planning)
- Phase 2: ManagerAgent + ResearchAgent + NoteAgent (researching)
- Phase 3: Dedup + Outline + Report with citations
- Modes: Series or Parallel (AsyncCitationManagerWrapper)
- Depth: Quick(1-2), Medium(5), Deep(8), Auto

## Knowledge Graph System — 3 RAG Options
- LlamaIndex: traditional vector search
- LightRAG: graph-based entity-relation + vector hybrid
- RAG-Anything: multimodal graph (text, images, tables, formulas)

## Numbered Items System (unique)
- Extracts: Definition, Proposition, Theorem, Lemma, Corollary, Example, etc.
- Stored in numbered_items.json per KB
- Queryable via Query Item tool for precise lookup

## Quiz Generation — Dual Mode
1. Custom KB-based: Background Knowledge -> Planning -> Generation -> Validation
2. Exam Mimicking: PDF Upload -> MinerU Parse -> Extract -> Style Mimic
- Types: MCQ, fill-in-blank, calculation, written response

## Co-Writer
- Markdown editor with Rewrite/Shorten/Expand
- NarratorAgent for script + TTS audio (DashScope)
- Multi-format export

## Guided Learning — 4 Agents
- LocateAgent: 3-5 progressive knowledge points
- InteractiveAgent: converts to visual HTML
- ChatAgent: contextual Q&A per knowledge point
- SummaryAgent: learning summaries
