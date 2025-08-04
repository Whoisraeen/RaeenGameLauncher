/**
 * Raeen Launcher Design System - Color Tokens
 * Premium Gaming UI Color Palette
 */

export const colors = {
  // Primary Brand Colors - Gaming-focused vibrant palette
  primary: {
    50: '#f0f4ff',
    100: '#e0e8ff',
    200: '#c7d4fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // Main brand color - Electric blue
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b'
  },

  // Secondary - Neon Gaming Accent
  secondary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Neon green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16'
  },

  // Tertiary - Orange gaming accent
  tertiary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Gaming orange
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407'
  },

  // Neutral Grays - For glassmorphism backgrounds
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a'
  },

  // Dark theme optimized grays
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  },

  // Gaming Performance Colors
  performance: {
    excellent: '#00ff88', // Bright green
    good: '#88ff00',      // Yellow-green
    average: '#ffaa00',   // Orange
    poor: '#ff4400',      // Red-orange
    critical: '#ff0044'   // Bright red
  },

  // Status Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Gaming Specific Colors
  gaming: {
    fps: '#00ff88',       // FPS counter green
    temp: '#ff6b35',      // Temperature orange-red
    cpu: '#4f46e5',       // CPU blue
    gpu: '#22c55e',       // GPU green
    ram: '#f59e0b',       // RAM yellow
    network: '#06b6d4',   // Network cyan
    storage: '#8b5cf6'    // Storage purple
  },

  // Glassmorphism specific colors
  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.1)',
      backgroundStrong: 'rgba(255, 255, 255, 0.15)',
      backgroundUltra: 'rgba(255, 255, 255, 0.25)',
      border: 'rgba(255, 255, 255, 0.2)',
      borderStrong: 'rgba(255, 255, 255, 0.3)',
      shadow: 'rgba(0, 0, 0, 0.1)',
      shadowStrong: 'rgba(0, 0, 0, 0.2)'
    },
    dark: {
      background: 'rgba(0, 0, 0, 0.2)',
      backgroundStrong: 'rgba(0, 0, 0, 0.3)',
      backgroundUltra: 'rgba(0, 0, 0, 0.4)',
      border: 'rgba(255, 255, 255, 0.1)',
      borderStrong: 'rgba(255, 255, 255, 0.15)',
      shadow: 'rgba(0, 0, 0, 0.3)',
      shadowStrong: 'rgba(0, 0, 0, 0.5)'
    }
  },

  // RGB Lighting Integration
  rgb: {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
    cyan: '#00ffff',
    magenta: '#ff00ff',
    yellow: '#ffff00',
    purple: '#8000ff',
    orange: '#ff8000'
  }
};

// Theme-specific color mappings
export const lightTheme = {
  background: {
    primary: colors.neutral[50],
    secondary: colors.neutral[100],
    tertiary: colors.neutral[200]
  },
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[700],
    muted: colors.neutral[500]
  },
  glass: colors.glass.light
};

export const darkTheme = {
  background: {
    primary: colors.slate[950],
    secondary: colors.slate[900],
    tertiary: colors.slate[800]
  },
  text: {
    primary: colors.neutral[50],
    secondary: colors.neutral[200],
    muted: colors.neutral[400]
  },
  glass: colors.glass.dark
};

// Gaming theme variants
export const gamingThemes = {
  neon: {
    primary: colors.primary[500],
    secondary: colors.secondary[500],
    accent: colors.tertiary[500],
    background: '#0a0a0a',
    text: '#ffffff'
  },
  cyberpunk: {
    primary: '#00ff88',
    secondary: '#ff0080',
    accent: '#ffaa00',
    background: '#0d1117',
    text: '#f0f6fc'
  },
  retro: {
    primary: '#ff6b35',
    secondary: '#f7931e',
    accent: '#ffcc02',
    background: '#1a1a1a',
    text: '#ffffff'
  }
};