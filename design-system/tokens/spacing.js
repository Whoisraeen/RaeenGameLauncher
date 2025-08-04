/**
 * Raeen Launcher Design System - Spacing Tokens
 * Consistent spacing scale for premium gaming UI
 */

// Base spacing scale using 4px grid system
export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem'       // 384px
};

// Component-specific spacing presets
export const componentSpacing = {
  // Button padding
  button: {
    sm: { x: spacing[3], y: spacing[1.5] },
    md: { x: spacing[4], y: spacing[2] },
    lg: { x: spacing[6], y: spacing[3] },
    xl: { x: spacing[8], y: spacing[4] }
  },

  // Card padding
  card: {
    sm: spacing[4],
    md: spacing[6],
    lg: spacing[8],
    xl: spacing[10]
  },

  // Modal padding
  modal: {
    sm: spacing[4],
    md: spacing[6],
    lg: spacing[8]
  },

  // Form spacing
  form: {
    fieldGap: spacing[4],
    sectionGap: spacing[8],
    groupGap: spacing[2]
  },

  // Layout spacing
  layout: {
    sectionGap: spacing[16],
    containerPadding: spacing[6],
    gridGap: spacing[6]
  },

  // Navigation spacing
  nav: {
    itemGap: spacing[2],
    sectionGap: spacing[6],
    padding: spacing[4]
  },

  // Gaming-specific spacing
  gaming: {
    // Game card spacing
    gameCard: {
      padding: spacing[4],
      gap: spacing[3]
    },
    
    // Performance widget spacing
    perfWidget: {
      padding: spacing[3],
      metricGap: spacing[2]
    },
    
    // Overlay spacing
    overlay: {
      padding: spacing[2],
      gap: spacing[1]
    },

    // Stats display spacing
    stats: {
      padding: spacing[2],
      gap: spacing[1]
    }
  }
};

// Border radius scale
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px'
};

// Gaming-specific border radius presets
export const gamingRadius = {
  // Glassmorphism friendly radii
  glass: {
    sm: borderRadius.lg,    // 8px
    md: borderRadius.xl,    // 12px
    lg: borderRadius['2xl'], // 16px
    xl: borderRadius['3xl']  // 24px
  },
  
  // Component-specific radii
  gameCard: borderRadius.xl,
  button: borderRadius.lg,
  modal: borderRadius['2xl'],
  widget: borderRadius.lg,
  overlay: borderRadius.md
};

// Shadow scale for depth
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none'
};

// Glassmorphism shadows
export const glassShadows = {
  light: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    md: '0 4px 16px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.12)',
    xl: '0 16px 64px rgba(0, 0, 0, 0.15)'
  },
  dark: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
    md: '0 4px 16px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.4)',
    xl: '0 16px 64px rgba(0, 0, 0, 0.5)'
  },
  // Gaming-specific glowing shadows
  glow: {
    primary: '0 0 20px rgba(99, 102, 241, 0.5)',
    secondary: '0 0 20px rgba(34, 197, 94, 0.5)', 
    tertiary: '0 0 20px rgba(249, 115, 22, 0.5)',
    success: '0 0 20px rgba(16, 185, 129, 0.5)',
    warning: '0 0 20px rgba(245, 158, 11, 0.5)',
    error: '0 0 20px rgba(239, 68, 68, 0.5)'
  }
};

// Z-index scale for layering
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1020,
  banner: 1030,
  overlay: 1040,
  modal: 1050,
  popover: 1060,
  skipLink: 1070,
  toast: 1080,
  tooltip: 1090
};

// Gaming-specific z-index
export const gamingZIndex = {
  gameBackground: zIndex.base,
  gameCard: zIndex.base + 1,
  navigation: zIndex.docked,
  perfOverlay: zIndex.overlay,
  gameModal: zIndex.modal,
  notification: zIndex.toast,
  tooltip: zIndex.tooltip
};