/**
 * Raeen Launcher Design System - Glassmorphism Styling System
 * Premium glass effect utilities and mixins
 */

import { css } from 'styled-components';
import { colors, glassShadows, borderRadius, spacing } from '../../design-system/tokens';

// Base glassmorphism effect
export const glassEffect = css`
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: ${props => 
    props.theme.isDark 
      ? colors.glass.dark.background 
      : colors.glass.light.background
  };
  border: 1px solid ${props => 
    props.theme.isDark 
      ? colors.glass.dark.border 
      : colors.glass.light.border
  };
  box-shadow: ${props => 
    props.theme.isDark 
      ? glassShadows.dark.md 
      : glassShadows.light.md
  };
`;

// Enhanced glassmorphism variants
export const glassVariants = {
  // Subtle glass effect for backgrounds
  subtle: css`
    backdrop-filter: blur(10px) saturate(150%);
    -webkit-backdrop-filter: blur(10px) saturate(150%);
    background: ${props => 
      props.theme.isDark 
        ? 'rgba(0, 0, 0, 0.1)' 
        : 'rgba(255, 255, 255, 0.05)'
    };
    border: 1px solid ${props => 
      props.theme.isDark 
        ? 'rgba(255, 255, 255, 0.05)' 
        : 'rgba(255, 255, 255, 0.15)'
    };
    box-shadow: ${props => 
      props.theme.isDark 
        ? glassShadows.dark.sm 
        : glassShadows.light.sm
    };
  `,

  // Standard glass effect
  standard: css`
    ${glassEffect}
  `,

  // Strong glass effect for important elements
  strong: css`
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    background: ${props => 
      props.theme.isDark 
        ? colors.glass.dark.backgroundStrong 
        : colors.glass.light.backgroundStrong
    };
    border: 1px solid ${props => 
      props.theme.isDark 
        ? colors.glass.dark.borderStrong 
        : colors.glass.light.borderStrong
    };
    box-shadow: ${props => 
      props.theme.isDark 
        ? glassShadows.dark.lg 
        : glassShadows.light.lg
    };
  `,

  // Ultra strong for modals and overlays
  ultra: css`
    backdrop-filter: blur(40px) saturate(220%);
    -webkit-backdrop-filter: blur(40px) saturate(220%);
    background: ${props => 
      props.theme.isDark 
        ? colors.glass.dark.backgroundUltra 
        : colors.glass.light.backgroundUltra
    };
    border: 1px solid ${props => 
      props.theme.isDark 
        ? colors.glass.dark.borderStrong 
        : colors.glass.light.borderStrong
    };
    box-shadow: ${props => 
      props.theme.isDark 
        ? glassShadows.dark.xl 
        : glassShadows.light.xl
    };
  `
};

// Gaming-specific glass effects with color tints
export const gamingGlassEffects = {
  primary: css`
    ${glassVariants.standard}
    background: ${props => 
      props.theme.isDark 
        ? 'rgba(99, 102, 241, 0.1)' 
        : 'rgba(99, 102, 241, 0.05)'
    };
    border-color: rgba(99, 102, 241, 0.2);
    box-shadow: 
      ${props => props.theme.isDark ? glassShadows.dark.md : glassShadows.light.md},
      0 0 20px rgba(99, 102, 241, 0.1);
  `,

  success: css`
    ${glassVariants.standard}
    background: ${props => 
      props.theme.isDark 
        ? 'rgba(16, 185, 129, 0.1)' 
        : 'rgba(16, 185, 129, 0.05)'
    };
    border-color: rgba(16, 185, 129, 0.2);
    box-shadow: 
      ${props => props.theme.isDark ? glassShadows.dark.md : glassShadows.light.md},
      0 0 20px rgba(16, 185, 129, 0.1);
  `,

  warning: css`
    ${glassVariants.standard}
    background: ${props => 
      props.theme.isDark 
        ? 'rgba(245, 158, 11, 0.1)' 
        : 'rgba(245, 158, 11, 0.05)'
    };
    border-color: rgba(245, 158, 11, 0.2);
    box-shadow: 
      ${props => props.theme.isDark ? glassShadows.dark.md : glassShadows.light.md},
      0 0 20px rgba(245, 158, 11, 0.1);
  `,

  error: css`
    ${glassVariants.standard}
    background: ${props => 
      props.theme.isDark 
        ? 'rgba(239, 68, 68, 0.1)' 
        : 'rgba(239, 68, 68, 0.05)'
    };
    border-color: rgba(239, 68, 68, 0.2);
    box-shadow: 
      ${props => props.theme.isDark ? glassShadows.dark.md : glassShadows.light.md},
      0 0 20px rgba(239, 68, 68, 0.1);
  `
};

// Interactive glass states
export const glassInteractions = {
  hover: css`
    backdrop-filter: blur(25px) saturate(190%);
    -webkit-backdrop-filter: blur(25px) saturate(190%);
    background: ${props => 
      props.theme.isDark 
        ? 'rgba(255, 255, 255, 0.08)' 
        : 'rgba(255, 255, 255, 0.12)'
    };
    border-color: ${props => 
      props.theme.isDark 
        ? 'rgba(255, 255, 255, 0.15)' 
        : 'rgba(255, 255, 255, 0.25)'
    };
    transform: translateY(-1px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  `,

  focus: css`
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    border-color: ${colors.primary[500]};
    box-shadow: 
      ${props => props.theme.isDark ? glassShadows.dark.lg : glassShadows.light.lg},
      0 0 0 3px rgba(99, 102, 241, 0.1);
    outline: none;
  `,

  active: css`
    backdrop-filter: blur(15px) saturate(170%);
    -webkit-backdrop-filter: blur(15px) saturate(170%);
    transform: translateY(0px) scale(0.98);
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  `
};

// Performance optimized glass for widgets and overlays
export const performanceGlass = css`
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: ${props => 
    props.theme.isDark 
      ? 'rgba(0, 0, 0, 0.4)' 
      : 'rgba(255, 255, 255, 0.4)'
  };
  border: 1px solid ${props => 
    props.theme.isDark 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(255, 255, 255, 0.2)'
  };
  will-change: backdrop-filter;
`;

// Gaming performance widget specific glass
export const perfWidgetGlass = css`
  ${performanceGlass}
  background: ${props => 
    props.theme.isDark 
      ? 'rgba(0, 0, 0, 0.6)' 
      : 'rgba(255, 255, 255, 0.6)'
  };
  border-radius: ${borderRadius.lg};
  
  &:hover {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background: ${props => 
      props.theme.isDark 
        ? 'rgba(0, 0, 0, 0.7)' 
        : 'rgba(255, 255, 255, 0.7)'
    };
  }
`;

// Glassmorphism component mixins
export const glassMixins = {
  // Basic glass container
  container: css`
    ${glassVariants.standard}
    border-radius: ${borderRadius.xl};
    padding: ${spacing[6]};
  `,

  // Glass card
  card: css`
    ${glassVariants.standard}
    border-radius: ${borderRadius.lg};
    padding: ${spacing[4]};
    
    &:hover {
      ${glassInteractions.hover}
    }
  `,

  // Glass button
  button: css`
    ${glassVariants.standard}
    border-radius: ${borderRadius.lg};
    padding: ${spacing[3]} ${spacing[6]};
    cursor: pointer;
    user-select: none;
    
    &:hover {
      ${glassInteractions.hover}
    }
    
    &:focus {
      ${glassInteractions.focus}
    }
    
    &:active {
      ${glassInteractions.active}
    }
  `,

  // Glass modal
  modal: css`
    ${glassVariants.ultra}
    border-radius: ${borderRadius['2xl']};
    max-width: 90vw;
    max-height: 90vh;
    margin: auto;
  `,

  // Glass overlay/backdrop
  overlay: css`
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    background: ${props => 
      props.theme.isDark 
        ? 'rgba(0, 0, 0, 0.5)' 
        : 'rgba(0, 0, 0, 0.3)'
    };
  `,

  // Glass navigation
  nav: css`
    ${glassVariants.strong}
    border-radius: ${borderRadius.xl};
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
  `,

  // Glass input
  input: css`
    ${glassVariants.subtle}
    border-radius: ${borderRadius.lg};
    padding: ${spacing[3]} ${spacing[4]};
    
    &:focus {
      ${glassInteractions.focus}
    }
    
    &::placeholder {
      color: ${props => 
        props.theme.isDark 
          ? 'rgba(255, 255, 255, 0.5)' 
          : 'rgba(0, 0, 0, 0.5)'
      };
    }
  `
};

// Utility function to create custom glass effect
export const createGlassEffect = ({
  blur = 20,
  saturation = 180,
  backgroundOpacity = 0.1,
  borderOpacity = 0.2,
  shadowSize = 'md'
} = {}) => css`
  backdrop-filter: blur(${blur}px) saturate(${saturation}%);
  -webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
  background: ${props => 
    props.theme.isDark 
      ? `rgba(0, 0, 0, ${backgroundOpacity})` 
      : `rgba(255, 255, 255, ${backgroundOpacity})`
  };
  border: 1px solid ${props => 
    props.theme.isDark 
      ? `rgba(255, 255, 255, ${borderOpacity})` 
      : `rgba(255, 255, 255, ${borderOpacity + 0.1})`
  };
  box-shadow: ${props => 
    props.theme.isDark 
      ? glassShadows.dark[shadowSize] 
      : glassShadows.light[shadowSize]
  };
`;