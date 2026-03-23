export const colors = {
  primary: {
    DEFAULT: '#FF9933',
    light: '#FFB74D',
    dark: '#E65100',
  },
  secondary: {
    DEFAULT: '#2196F3',
  },
  accent: {
    red: '#E53935',
    green: '#4CAF50',
    amber: '#FFC107',
  },
  surface: {
    light: '#FFF8F0',
    dark: '#1E1E2E',
  },
  background: {
    light: '#FAFAFA',
    dark: '#121212',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    dark: '#F5F5F5',
  },
  border: '#E0E0E0',
  subject: {
    math: '#FF7043',
    science: '#66BB6A',
    language: '#42A5F5',
    history: '#AB47BC',
    arts: '#EC407A',
    tech: '#26C6DA',
    health: '#EF5350',
    lifeSkills: '#FFA726',
  },
} as const

export const typography = {
  h1: { size: '32px', lineHeight: '40px', weight: '700' },
  h2: { size: '24px', lineHeight: '32px', weight: '600' },
  h3: { size: '20px', lineHeight: '28px', weight: '600' },
  body: { size: '16px', lineHeight: '24px', weight: '400' },
  small: { size: '14px', lineHeight: '20px', weight: '400' },
  caption: { size: '12px', lineHeight: '16px', weight: '400' },
} as const

export const spacing = {
  touch: '48px',
  cardRadius: '16px',
  buttonRadius: '12px',
} as const
