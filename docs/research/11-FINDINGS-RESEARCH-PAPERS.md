# Awesome-AI-Era-Edu — Research Paper Findings
> Source: github.com/THU-MAIC/Awesome-AI-Era-Edu | 28 stars
> Status: COMPLETE — 14 key papers + 10 design principles

## Top Papers for Platform Design

### Multi-Agent Systems
1. **SimClass** (NAACL 2025) — Multi-agent classroom with Flanders Analysis + CoI frameworks
2. **GenMentor** (WWW 2025 Oral) — Goal-to-skill mapping, learning path optimization
3. **EduPlanner** (IEEE TLT 2025) — Adversarial multi-agent for content QA, Skill-Tree student model

### Socratic Method
4. **SocraticLM** (NeurIPS 2024 Spotlight) — 12%+ better than GPT-4; 35K Socratic dialogues; 6 cognitive types
5. **Socratic Playground** (2025) — AI-driven interactivity layered on Socratic questioning

### Intelligent Tutoring
6. **Training LLM Tutors** (2025) — Optimize for learning outcomes, scaffold that fades
7. **Pedagogical Alignment via RL** (EMNLP 2025) — RL with pedagogical reward model
8. **MathTutorBench** (EMNLP 2025 Oral) — Pedagogical Reward Model (Ped-RM) benchmark

### Knowledge Tracing & Student Modeling
9. **Classroom Simulacra** (CHI 2025) — LLM student agents with transferable iterative reflection
10. **Agent4Edu** (AAAI 2025) — Generative student agents for synthetic training data
11. **AI-Agent School** (EMNLP Findings 2025) — Dual memory (episodic + semantic) for agent evolution

### Surveys
12. **LLMs for Education Survey** (2024) — Comprehensive taxonomy = feature roadmap
13. **Pedagogical Alignment Framework** (2025) — RL-based pedagogical alignment
14. **LLM Agents for Education** (EMNLP Findings 2025) — Agentic workflow survey

## 10 Design Principles (from research synthesis)

### P1: Multi-Agent Architecture is Essential
Single LLM insufficient. Need: teacher, TA, peer agents (4 archetypes), manager agent.

### P2: Ground Adaptation in Educational Theory
- Bloom's Taxonomy: cognitive levels (remember->create)
- Zone of Proximal Development: content just beyond mastery
- Universal Design for Learning: multiple representations/modalities

### P3: Socratic Over Answer-Giving
SocraticLM shows 12%+ improvement. Default to guided discovery.

### P4: Knowledge-Aware Content Structure
Extract into structured taxonomies, not flat text. Enables prerequisite tracking,
adaptive sequencing, knowledge gap identification.

### P5: Goal-Oriented Learning Paths
Map goals -> skills -> optimal learning paths (GenMentor pattern).

### P6: Pedagogical Reward Models
Replace correctness metrics with scaffolding quality, hint appropriateness,
cognitive load management (MathTutorBench Ped-RM).

### P7: Adversarial Collaboration for Content Quality
Evaluator + optimizer + analyst in adversarial collaboration (EduPlanner).

### P8: Dual Memory for Agent Evolution
Episodic + semantic memory enables agents that improve through interaction.

### P9: Student Simulation for Testing
Validate tutoring strategies with simulated students before real deployment.
6 cognitive types (SocraticLM) as starting set.

### P10: Fade Scaffolding Dynamically
Detailed hints initially -> smaller nudges -> confirming approaches.
35% of LLM hints are too general/incorrect/give-away — active monitoring needed.

## Recommended Architecture (from papers)
```
Input Layer -> MAIC-Craft extraction
Agent Layer -> LangGraph orchestration (Teacher, TA, 4 Peers, Manager, Assessment)
Personalization Layer -> Cognitive model, Goal-Skill mapper, Adaptive engine
Content Layer -> Knowledge Graph, RAG, Adversarial generation, 28+ actions
Evaluation Layer -> Ped-RM, Student simulation, Outcome tracking
```
