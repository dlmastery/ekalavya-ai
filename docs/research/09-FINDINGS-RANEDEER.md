# Mr. Ranedeer AI Tutor — Research Findings
> Source: github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor | 29.7k stars | Discontinued
> Status: COMPLETE (from training data)

## Key Innovation: Pure Prompt-as-Application
- Single system prompt file (Mr_Ranedeer.txt) transforms any LLM into personalized tutor
- Pseudo-code/YAML-like format that GPT-4 interprets as behavioral instructions
- No code, no app — just one file

## Configuration System (10 Depth Levels)
1. Elementary | 2. Middle School | 3. High School | 4. College Prep
5. Undergraduate | 6. Graduate | 7. Master's | 8. Doctoral | 9. Postdoc | 10. Ph.D

## Learning Styles
Sensing, Visual*, Inductive, Active, Sequential, Intuitive, Verbal, Deductive, Reflective, Global

## Communication Styles
Stochastic, Formal, Textbook, Layman, Story Telling, Socratic, Humorous

## Tone Styles
Debate, Encouraging, Neutral, Informative, Friendly*

## Reasoning Frameworks
Deductive, Inductive, Abductive, Analogical, Causal

## Command System (/ prefix)
/plan, /test, /config, /start, /continue, /self-eval, /language, /example, /search*, /visualize*

## Prompt Architecture Pattern
1. Header Block (===) — metadata
2. [student configuration] — mutable state variables
3. [Overall Rules] — global behavioral constraints
4. [Personalization Options] — valid values schema
5. [Commands] — slash command -> function mappings
6. [Function Rules] — meta-instructions for pseudo-code interpretation
7. [Functions] — named procedures with [BEGIN]/[END], [IF/ELSE/ENDIF], execute, say
8. [Init] — entry point on conversation start

## Key Functions
- [teach] — adapts to all 5 config axes simultaneously
- [Lesson Plan] — structured outline with prerequisites assumption
- [Test] — depth-calibrated assessment with feedback
- [Config] — interactive numbered menu for settings changes
- [Token Check] — handles output length limits with /continue
- [Suggestions] — 3 relevant follow-up actions
- [post-auto] — automatic suffix: separator + token check + suggestions

## Prompt Engineering Techniques
1. Pseudo-code framing for precise behavioral control
2. Variable-driven personalization (no combinatorial explosion)
3. Function composition via execute <function>
4. Output control via say directives with fill-in templates
5. Conditional logic [IF/ELSE/ENDIF]
6. Meta-instructions (Function Rules)
7. Init pattern for consistent first-message
8. Graceful degradation for plugin-dependent features
