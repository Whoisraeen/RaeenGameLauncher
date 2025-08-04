/**
 * Raeen Launcher Design System - Design Tokens
 * Centralized export of all design tokens
 */

export * from './colors.js';
export * from './typography.js';
export * from './spacing.js';
export * from './motion.js';

// Re-export with organized structure
export { colors, lightTheme, darkTheme, gamingThemes } from './colors.js';
export { 
  fontFamilies, 
  fontWeights, 
  fontSize, 
  lineHeight, 
  letterSpacing, 
  typographyPresets, 
  textUtilities 
} from './typography.js';
export { 
  spacing, 
  componentSpacing, 
  borderRadius, 
  gamingRadius, 
  shadows, 
  glassShadows, 
  zIndex, 
  gamingZIndex 
} from './spacing.js';
export { 
  duration, 
  easing, 
  transitions, 
  keyframes, 
  animations, 
  hoverEffects, 
  microInteractions 
} from './motion.js';

// Combined token object for easy consumption
export const designTokens = {
  colors: {
    primary: {
      50: '#f0f4ff',
      100: '#e0e8ff',
      200: '#c7d4fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
      950: '#1e1b4b'
    },
    // ... other color scales would be imported here
  },
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    // ... rest of spacing scale
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Orbitron', 'Rajdhani', 'Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      // ... rest of font sizes
    }
  },
  motion: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '400ms'
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  }
};