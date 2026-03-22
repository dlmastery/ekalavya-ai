# Minor Repos — Research Findings
> SocratiQ DSA, AlgoMentor DSA, Algo Sensei, Multi-Agent-Study-Assistant

---

## SocratiQ DSA (codernoahx/socratiq-ai) | 1 star
> Status: PARTIAL (source code not accessible)

### Confirmed Features
- Interactive chat: Socratic questioning on DSA concepts
- Code Evaluation: submit Python code -> feedback/debugging
- Problem Set Generator: personalized easy/medium/hard by topic
- Stack: Python + Streamlit + Google Gemini API
- Live: socratiq-ai.streamlit.app + HuggingFace space
- Socratic behavior: "asks questions that prompt critical thinking rather than direct answers"

---

## AlgoMentor DSA (jatinkaushik-jk/algo-mentor) | 4 stars
> Status: PARTIAL (limited to Devfolio/LinkedIn info)

### Confirmed Features
- Socratic DSA questioning with adaptive difficulty
- Real-time tailored feedback
- Performance optimization (caching, optimized API calls)
- Stack: Next.js 14 + TypeScript + MongoDB + Gemini 2.5 Flash
- Created at Google Gen AI Exchange Hackathon (Sep 2024)
- Live: algomentor.xyz

### Angad Singh Variant (github.com/Angad-2002/AlgoMentor) — MORE ADVANCED
- Groq Mixtral-8x7B via LangChain (not Gemini)
- FastAPI backend (not Next.js)
- Google Search, Wikipedia, YouTube API integration
- Interactive code editor with real-time execution
- Real-time DSA visualizations
- Multimodal: Text, Image, Video, Voice (80%+ accuracy)
- Custom OCR for image-based questions
- 500+ students, 1000+ queries processed

---

## Algo Sensei (karanb192/algo-sensei) | 24 stars
> Status: PARTIAL (permissions denied for file access)

### From User's Comparison (confirmed features)
- Pure Markdown skill files for Claude Code / Claude.ai
- 5 intelligent modes (auto-detected):
  1. Tutor Mode: concepts, intuition, ASCII diagrams
  2. Hint Mode: 5-level progressive (observation->pattern->approach->technique->pseudocode)
  3. Review Mode: deep code analysis (correctness, complexity, edge cases)
  4. Interview Mode: full mock interview roleplay + feedback
  5. Pattern Mapper Mode: dynamic pattern recognition (Two Pointers, DP, Graphs)
- Mode auto-switches on phrases: "I'm stuck", "review my code"
- Multi-language: Python, Java, C++, JS, Go
- Core router: SKILL.md
- Mode files: modes/tutor-mode.md, hint-mode.md, review-mode.md, interview-mode.md, pattern-mapper-mode.md
- Template: templates/solutions/solution-template.md

---

## Multi-Agent-Study-Assistant (A-R007) | 12 stars
> Status: PARTIAL (permissions denied)

### From User's Comparison (confirmed features)
- 6 agents: Student Analyzer, Roadmap Creator, Quiz Generator, Tutor, Resource Finder, RAG Tutor
- Learning style detection (visual/auditory/etc.)
- Adaptive roadmaps + personalized quizzes
- RAG over uploaded PDFs/notes + web search
- Stack: Phidata + LangChain + Streamlit + ChromaDB
- Prompts in prompts.yaml (easy to tweak agent personas)
- Docker setup available
