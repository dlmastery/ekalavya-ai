import type { DrawingStep, MathStep, MindmapData } from '@/lib/types'
import { colors } from '@/lib/constants/theme-tokens'

// ---------------------------------------------------------------------------
// 1. Triangle construction (3 drawing steps with lines + labels)
// ---------------------------------------------------------------------------
export const TRIANGLE_STEPS: DrawingStep[] = [
  {
    id: 'tri-1',
    order: 1,
    type: 'line',
    data: { x: 100, y: 300, x2: 400, y2: 300, text: 'Base AB = 5 cm' },
    stroke: colors.subject.math,
    strokeWidth: 3,
    label: 'Draw base AB',
    animationDuration: 800,
  },
  {
    id: 'tri-2',
    order: 2,
    type: 'line',
    data: { x: 400, y: 300, x2: 250, y2: 80, text: 'Side BC = 4 cm' },
    stroke: colors.subject.math,
    strokeWidth: 3,
    label: 'Draw side BC',
    animationDuration: 800,
  },
  {
    id: 'tri-3',
    order: 3,
    type: 'line',
    data: { x: 250, y: 80, x2: 100, y2: 300, text: 'Side CA = 3 cm' },
    stroke: colors.subject.math,
    strokeWidth: 3,
    label: 'Close triangle with CA',
    animationDuration: 800,
  },
]

// ---------------------------------------------------------------------------
// 2. Quadratic function plot (5 math steps)
// ---------------------------------------------------------------------------
function generateParabolaPoints(): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = []
  for (let x = -4; x <= 4; x += 0.25) {
    points.push({ x, y: x * x })
  }
  return points
}

export const QUADRATIC_STEPS: MathStep[] = [
  {
    id: 'quad-1',
    order: 1,
    expression: 'f(x) = x^2',
    points: generateParabolaPoints(),
    color: colors.subject.math,
    label: 'Basic parabola y = x\u00B2',
    animationDuration: 1200,
  },
  {
    id: 'quad-2',
    order: 2,
    expression: '\\text{Vertex} = (0, 0)',
    points: [{ x: 0, y: 0 }],
    color: colors.accent.red,
    label: 'Mark the vertex',
    animationDuration: 600,
  },
  {
    id: 'quad-3',
    order: 3,
    expression: '\\text{Axis of symmetry: } x = 0',
    points: [
      { x: 0, y: -2 },
      { x: 0, y: 16 },
    ],
    color: colors.text.secondary,
    label: 'Axis of symmetry',
    animationDuration: 600,
  },
  {
    id: 'quad-4',
    order: 4,
    expression: 'f(-2) = 4, \\quad f(2) = 4',
    points: [
      { x: -2, y: 4 },
      { x: 2, y: 4 },
    ],
    color: colors.accent.green,
    label: 'Symmetric points',
    animationDuration: 600,
  },
  {
    id: 'quad-5',
    order: 5,
    expression: '\\text{The parabola opens upward because the coefficient of } x^2 \\text{ is positive.}',
    points: [],
    color: colors.subject.math,
    label: 'Key insight',
    animationDuration: 400,
  },
]

// ---------------------------------------------------------------------------
// 3. Water cycle diagram (8 drawing steps with arrows + labels)
// ---------------------------------------------------------------------------
export const WATER_CYCLE_DIAGRAM_STEPS: DrawingStep[] = [
  {
    id: 'wcd-1',
    order: 1,
    type: 'circle',
    data: { cx: 400, cy: 60, r: 40, text: '\u2600\uFE0F' },
    stroke: colors.primary.DEFAULT,
    strokeWidth: 2,
    fill: '#FFF9C4',
    label: 'Sun (heat source)',
    animationDuration: 600,
  },
  {
    id: 'wcd-2',
    order: 2,
    type: 'rect',
    data: { x: 50, y: 320, width: 700, height: 80, text: 'Ocean / Lake' },
    stroke: colors.secondary.DEFAULT,
    strokeWidth: 2,
    fill: '#BBDEFB',
    label: 'Body of water',
    animationDuration: 600,
  },
  {
    id: 'wcd-3',
    order: 3,
    type: 'arrow',
    data: { x: 200, y: 320, x2: 200, y2: 180, text: 'Evaporation' },
    stroke: colors.accent.red,
    strokeWidth: 2,
    label: 'Water evaporates as vapor',
    animationDuration: 800,
  },
  {
    id: 'wcd-4',
    order: 4,
    type: 'path',
    data: { d: 'M 150 160 Q 250 100 350 160 Q 450 100 550 160', text: 'Clouds' },
    stroke: '#90A4AE',
    strokeWidth: 3,
    fill: '#ECEFF1',
    label: 'Clouds form (condensation)',
    animationDuration: 800,
  },
  {
    id: 'wcd-5',
    order: 5,
    type: 'text',
    data: { x: 350, y: 130, text: 'Condensation', fontSize: 14 },
    stroke: colors.text.primary,
    strokeWidth: 0,
    label: 'Label: condensation',
    animationDuration: 400,
  },
  {
    id: 'wcd-6',
    order: 6,
    type: 'arrow',
    data: { x: 500, y: 160, x2: 550, y2: 300, text: 'Precipitation' },
    stroke: colors.secondary.DEFAULT,
    strokeWidth: 2,
    label: 'Rain falls (precipitation)',
    animationDuration: 800,
  },
  {
    id: 'wcd-7',
    order: 7,
    type: 'arrow',
    data: { x: 600, y: 310, x2: 700, y2: 340, text: 'Runoff' },
    stroke: colors.accent.green,
    strokeWidth: 2,
    label: 'Water flows back as runoff',
    animationDuration: 600,
  },
  {
    id: 'wcd-8',
    order: 8,
    type: 'arrow',
    data: { x: 550, y: 330, x2: 550, y2: 390, text: 'Groundwater' },
    stroke: '#795548',
    strokeWidth: 2,
    label: 'Water seeps underground',
    animationDuration: 600,
  },
]

// ---------------------------------------------------------------------------
// 4. Mindmap: "Water Cycle" with 4 branches
// ---------------------------------------------------------------------------
export const WATER_CYCLE_MINDMAP: MindmapData = {
  topic: 'Water Cycle',
  root: {
    id: 'mm-root',
    label: 'Water Cycle',
    color: colors.secondary.DEFAULT,
    expanded: true,
    children: [
      {
        id: 'mm-evap',
        label: 'Evaporation',
        color: colors.accent.red,
        expanded: true,
        children: [
          { id: 'mm-evap-1', label: 'Sun heats water', color: colors.accent.red, expanded: false, children: [] },
          { id: 'mm-evap-2', label: 'Water \u2192 Vapor', color: colors.accent.red, expanded: false, children: [] },
          { id: 'mm-evap-3', label: 'Oceans, lakes, rivers', color: colors.accent.red, expanded: false, children: [] },
        ],
      },
      {
        id: 'mm-cond',
        label: 'Condensation',
        color: colors.subject.language,
        expanded: true,
        children: [
          { id: 'mm-cond-1', label: 'Vapor cools', color: colors.subject.language, expanded: false, children: [] },
          { id: 'mm-cond-2', label: 'Tiny droplets form', color: colors.subject.language, expanded: false, children: [] },
          { id: 'mm-cond-3', label: 'Clouds form', color: colors.subject.language, expanded: false, children: [] },
        ],
      },
      {
        id: 'mm-precip',
        label: 'Precipitation',
        color: colors.accent.green,
        expanded: true,
        children: [
          { id: 'mm-precip-1', label: 'Rain', color: colors.accent.green, expanded: false, children: [] },
          { id: 'mm-precip-2', label: 'Snow', color: colors.accent.green, expanded: false, children: [] },
          { id: 'mm-precip-3', label: 'Hail', color: colors.accent.green, expanded: false, children: [] },
        ],
      },
      {
        id: 'mm-collect',
        label: 'Collection',
        color: colors.subject.history,
        expanded: true,
        children: [
          { id: 'mm-collect-1', label: 'Runoff to rivers', color: colors.subject.history, expanded: false, children: [] },
          { id: 'mm-collect-2', label: 'Groundwater', color: colors.subject.history, expanded: false, children: [] },
          { id: 'mm-collect-3', label: 'Back to oceans', color: colors.subject.history, expanded: false, children: [] },
        ],
      },
    ],
  },
}

/** All whiteboard data indexed by concept key */
export const MOCK_DRAWING_STEPS: Record<string, DrawingStep[]> = {
  triangle: TRIANGLE_STEPS,
  'water-cycle': WATER_CYCLE_DIAGRAM_STEPS,
}

export const MOCK_MATH_STEPS: Record<string, MathStep[]> = {
  quadratic: QUADRATIC_STEPS,
}

export const MOCK_MINDMAPS: Record<string, MindmapData> = {
  'water-cycle': WATER_CYCLE_MINDMAP,
}
