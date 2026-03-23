export type DrawingElementType = 'line' | 'circle' | 'rect' | 'path' | 'text' | 'arrow'

export interface DrawingStep {
  id: string
  order: number
  type: DrawingElementType
  data: {
    x?: number
    y?: number
    x2?: number
    y2?: number
    cx?: number
    cy?: number
    r?: number
    width?: number
    height?: number
    d?: string  // SVG path
    text?: string
    fontSize?: number
  }
  stroke: string
  strokeWidth: number
  fill?: string
  label?: string
  animationDuration: number  // ms
}

export interface MathStep {
  id: string
  order: number
  expression: string  // KaTeX expression
  points: Array<{ x: number; y: number }>
  color: string
  label: string
  animationDuration: number
}

export interface MindmapNode {
  id: string
  label: string
  children: MindmapNode[]
  color: string
  expanded: boolean
}

export interface MindmapData {
  root: MindmapNode
  topic: string
}
