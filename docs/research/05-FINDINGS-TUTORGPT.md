# Tutor-GPT — Research Findings
> Source: github.com/plastic-labs/tutor-gpt | 887 stars | GPL-3.0
> Status: PARTIAL (agent failed - API connection refused, using user-provided info)

## Key Architecture
- Next.js (App Router) + TypeScript + Supabase + Honcho
- LangChain-style dual chains
- OpenRouter for multi-LLM support

## Features Extracted (from user's comparison)
- Theory-of-Mind reasoning: models learner's mental state, knowledge gaps, confusion
- Self-evolving prompts: dynamically updates its own prompts based on conversation + Honcho user model
- Dual-chain system:
  1. Thought chain: generates pedagogical reasoning about the learner
  2. Response chain: turns insight into actual tutoring reply
- Persistent user model via Honcho (long-term memory across sessions)
- Socratic questioning that adjusts difficulty, examples, feedback
- Few-shot examples from /data/ folder (crafted by real educators)
- Addresses Benjamin Bloom's Two Sigma Problem via prompting

## Prompt System
- No static prompts folder — everything is runtime-generated
- Metacognitive prompting: "What is the student's mental state? Gaps? Preferred style?"
- Dynamic prompt updates based on conversation history + user model
- Few-shot examples seed behavior from educator-crafted samples

## Key Innovation: Self-Evolving Prompts
- The AI's own prompts change over time based on what it learns about the student
- Honcho provides persistent memory across sessions
- Creates a "learning companion" that genuinely adapts to the individual
