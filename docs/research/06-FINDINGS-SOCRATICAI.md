# SocraticAI — Research Findings
> Source: github.com/RunzheYang/SocraticAI | 241 stars | MIT
> Also: github.com/princeton-nlp/SocraticAI (Princeton NLP mirror)
> Status: COMPLETE

## Key Architecture
- Python + Flask (web UI at 127.0.0.1:5000)
- OpenAI ChatCompletion API (GPT-3.5-turbo)
- Wolfram Alpha API + Python subprocess for code execution
- Core file: AliceBobCindy.py

## Three Agents

| Agent | Role | Color | Function |
|-------|------|-------|----------|
| Socrates | Lead Analyst | Red | Leads discussion, implements solution, presents final answer |
| Theaetetus | Collaborator | Blue | Provides feedback, brainstorms, builds consensus |
| Plato | Proofreader | Yellow | Reviews dialogue, identifies errors, provides guidance |

## ACTUAL PROMPTS EXTRACTED

### Meta-Level System Prompt:
"Socrates and Theaetetus are two AI assistants for Tony to solve challenging problems.
The problem statement is as follows: '{question}.' Socrates and Theaetetus will engage
in multi-round dialogue to solve the problem together for Tony."

### Role Assignment:
"Now, suppose that you are {self.role}. Please discuss the problem with {self.other_role}!"

### Plato (Proofreader):
"Now as a proofreader, Plato, your task is to read through the dialogue between
Socrates and Theaetetus and identify any errors they made."

### Tool Usage:
- Wolfram: "@Check with WolframAlpha: [insert your question]"
- Code: "@write_code [python in markdown block]" + "@execute"
- User: "@Check with Tony: [insert your question]"

## Theoretical Foundation
- Based on Theory of Anamnesis: if models possess knowledge, they should be capable
  of questioning and extracting it from each other
- No fixed-format prompts required — agents write prompts for each other
- Self-discovery through cooperative argumentative dialogue

## Conversation Flow
1. User submits problem via Flask UI
2. System constructs meta-level prompt for all 3 agents
3. Socrates generates first response
4. Theaetetus responds with dialogue context
5. Plato reviews and flags errors
6. Tool resolution (Wolfram/code/user queries)
7. Repeat until convergence
8. Socrates presents structured final answer

## Key Innovation
Agents write prompts for each other — each agent's output becomes input
for the next, creating emergent self-organizing dialogue without human
prompt engineering.
