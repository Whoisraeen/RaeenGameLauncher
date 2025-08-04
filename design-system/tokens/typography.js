/**
 * Raeen Launcher Design System - Typography Tokens
 * Premium Gaming Typography Scale
 */

// Font families optimized for gaming UI
export const fontFamilies = {
  // Primary UI font - Modern sans-serif
  sans: [
    'Inter',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],

  // Gaming/Display font - For headers and branding
  display: [
    'Orbitron',
    'Rajdhani',
    'Inter',
    'system-ui',
    'sans-serif'
  ],

  // Monospace for code/stats
  mono: [
    'JetBrains Mono',
    'Fira Code',
    'SF Mono',
    'Monaco',
    'Inconsolata',
    'Roboto Mono',
    'monospace'
  ],

  // Gaming-specific fonts
  gaming: [
    'Exo 2',
    'Orbitron',
    'Rajdhani',
    'Inter',
    'sans-serif'
  ]
};

// Font weights
export const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
};

// Type scale - Optimized for gaming interfaces
export const fontSize = {
  xs: '0.75rem',    // 12px - Small labels
  sm: '0.875rem',   // 14px - Body small
  base: '1rem',     // 16px - Base body
  lg: '1.125rem',   // 18px - Large body
  xl: '1.25rem',    // 20px - Small headers
  '2xl': '1.5rem',  // 24px - Headers
  '3xl': '1.875rem', // 30px - Large headers
  '4xl': '2.25rem', // 36px - Display
  '5xl': '3rem',    // 48px - Hero
  '6xl': '3.75rem', // 60px - Large hero
  '7xl': '4.5rem',  // 72px - Massive display
  '8xl': '6rem',    // 96px - Ultra display
  '9xl': '8rem'     // 128px - Maximum impact
};

// Line heights
export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2
};

// Letter spacing
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em'
};

// Typography presets for common UI patterns
export const typographyPresets = {
  // Display text (hero sections, main titles)
  hero: {
    fontFamily: fontFamilies.display,
    fontSize: fontSize['6xl'],
    fontWeight: fontWeights.black,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight
  },

  // Page titles
  title: {
    fontFamily: fontFamilies.display,
    fontSize: fontSize['4xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight
  },

  // Section headers
  heading1: {
    fontFamily: fontFamilies.display,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal
  },

  heading2: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal
  },

  heading3: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSize.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal
  },

  heading4: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSize.lg,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal
  },

  // Body text
  bodyLarge: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSize.lg,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal
  },

  body: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSize.base,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal
  },

  bodySmall: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal
  },

  // UI Elements
  button: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSize.base,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.wide
  },

  buttonSmall: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.wide
  },

  label: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide
  },

  caption: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal
  },

  // Gaming-specific presets
  gameTitle: {
    fontFamily: fontFamilies.gaming,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.wide
  },

  statsLabel: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSize.xs,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase'
  },

  statsValue: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSize.lg,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.normal
  },

  performanceMetric: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSize.base,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.normal
  }
};

// Text utilities
export const textUtilities = {
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  
  lineClamp: (lines) => ({
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }),

  uppercase: {
    textTransform: 'uppercase'
  },

  lowercase: {
    textTransform: 'lowercase'
  },

  capitalize: {
    textTransform: 'capitalize'
  },

  // Gaming-specific text effects
  glowText: {
    textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'
  },

  neonText: {
    textShadow: `
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 15px currentColor,
      0 0 20px currentColor,
      0 0 35px currentColor,
      0 0 40px currentColor
    `
  }
};