import { describe, it, expect } from 'vitest'
import { colors, typography, spacing } from '@/lib/constants/theme-tokens'

describe('Theme Tokens', () => {
  it('has primary saffron color', () => {
    expect(colors.primary.DEFAULT).toBe('#FF9933')
  })

  it('has all 8 subject colors', () => {
    expect(Object.keys(colors.subject)).toHaveLength(8)
  })

  it('has light and dark surface colors', () => {
    expect(colors.surface.light).toBeDefined()
    expect(colors.surface.dark).toBeDefined()
  })

  it('has 6 typography levels', () => {
    expect(Object.keys(typography)).toHaveLength(6)
  })
})
