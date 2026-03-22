# ChatTutor — Research Findings
> Source: github.com/HugeCatLab/ChatTutor | 978 stars | AGPL-3.0
> Status: COMPLETE

## Key Architecture
- Frontend: Vue 3 + Nuxt + Vite
- Backend: ElysiaJS on Bun runtime
- AI: Vercel AI SDK (streamText, useChat, tool calling)
- Math: GeoGebra embedded applet
- Reactivity: @vue/reactivity for Reactive DSL
- Monorepo: pnpm workspaces (apps/web, apps/client, packages/core, packages/ui)

## Features Extracted
- Electronic whiteboard: synchronized drawing alongside chat ("explain while drawing")
- Math Canvas: GeoGebra-powered interactive mathematical visualizations
- Mindmap generation: auto-structures complex concepts, exportable
- Interactive forms: dynamic AI-generated input collection
- Multi-agent: "Agent" (chat) + "Painter" (math graphs)
- Image upload (requires OSS config)
- User-configurable LLM (bring your own API key)

## Five Teaching Engines
1. Mathematical Visualization — function graphs, geometric constructions, stats charts
2. Physics Experiment Simulation — force diagrams, motion trajectories, wave propagation
3. Logical Circuit Interaction — drag-and-drop gates, sequential logic verification
4. Programming Line-by-Line Teaching — Python/JS with execution and debugging
5. Concept Mapping Generation — auto-structuring, exportable mindmaps

## Whiteboard System
- Synchronized canvas on right side of chat
- AI draws in real-time while explaining
- Dynamic curves, vertices, transformations for math
- Force diagrams with color-coded vectors for physics
- Powered by Reactive DSL (@vue/reactivity)

## AI Tool-Calling Pattern
- LLM receives user message + tool definitions (description + parameters)
- Model autonomously decides which tool to invoke
- Streamed via SSE; server-side tools execute + return results
- Agent routing: Agent (chat) vs Painter (graphs)

## GeoGebra Integration
- Embedded via GeoGebra JavaScript API
- Commands like evalCommand('f(x)=sin(x)')
- Dynamic parameter adjustment, one-click generation
- Smooth animations + reactive components
