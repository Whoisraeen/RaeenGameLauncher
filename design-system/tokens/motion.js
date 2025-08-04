/**
 * Raeen Launcher Design System - Motion & Animation Tokens
 * Premium gaming animation system with smooth transitions
 */

// Duration tokens for consistent timing
export const duration = {
  instant: '0ms',
  fast: '150ms',
  normal: '250ms',
  slow: '400ms',
  slower: '600ms',
  slowest: '1000ms'
};

// Easing curves for natural motion
export const easing = {
  // Standard easing
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',

  // Custom cubic-bezier curves for premium feel
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  snappy: 'cubic-bezier(0.4, 0, 0.6, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  
  // Gaming-specific easing
  gameEntry: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  gameExit: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  glassSlide: 'cubic-bezier(0.23, 1, 0.32, 1)',
  perfMeter: 'cubic-bezier(0.4, 0, 0.2, 1)'
};

// Transition presets for common UI patterns
export const transitions = {
  // Basic transitions
  fast: `all ${duration.fast} ${easing.smooth}`,
  normal: `all ${duration.normal} ${easing.smooth}`,
  slow: `all ${duration.slow} ${easing.smooth}`,

  // Property-specific transitions
  opacity: `opacity ${duration.normal} ${easing.smooth}`,
  transform: `transform ${duration.normal} ${easing.smooth}`,
  colors: `color ${duration.normal} ${easing.smooth}, background-color ${duration.normal} ${easing.smooth}, border-color ${duration.normal} ${easing.smooth}`,
  shadow: `box-shadow ${duration.normal} ${easing.smooth}`,
  
  // Component-specific transitions
  button: {
    default: `all ${duration.fast} ${easing.smooth}`,
    hover: `transform ${duration.fast} ${easing.snappy}, box-shadow ${duration.fast} ${easing.smooth}`,
    press: `transform ${duration.instant} ${easing.smooth}`
  },

  modal: {
    enter: `opacity ${duration.normal} ${easing.smooth}, transform ${duration.normal} ${easing.gameEntry}`,
    exit: `opacity ${duration.fast} ${easing.smooth}, transform ${duration.fast} ${easing.gameExit}`
  },

  dropdown: {
    enter: `opacity ${duration.fast} ${easing.smooth}, transform ${duration.fast} ${easing.gameEntry}`,
    exit: `opacity ${duration.fast} ${easing.smooth}, transform ${duration.fast} ${easing.gameExit}`
  },

  tooltip: {
    enter: `opacity ${duration.fast} ${easing.smooth}`,
    exit: `opacity ${duration.fast} ${easing.smooth}`
  },

  // Gaming-specific transitions
  gameCard: {
    hover: `transform ${duration.normal} ${easing.bounce}, box-shadow ${duration.normal} ${easing.smooth}`,
    press: `transform ${duration.fast} ${easing.smooth}`
  },

  perfWidget: {
    update: `all ${duration.normal} ${easing.perfMeter}`,
    alert: `background-color ${duration.fast} ${easing.smooth}, box-shadow ${duration.fast} ${easing.smooth}`
  },

  glassmorphism: {
    hover: `backdrop-filter ${duration.normal} ${easing.glassSlide}, background ${duration.normal} ${easing.smooth}`,
    focus: `backdrop-filter ${duration.fast} ${easing.smooth}, box-shadow ${duration.fast} ${easing.smooth}`
  }
};

// Animation keyframes for complex animations
export const keyframes = {
  // Loading animations
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },

  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 }
  },

  bounce: {
    '0%, 100%': { 
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
    },
    '50%': { 
      transform: 'translateY(0)',
      animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
    }
  },

  // Gaming-specific animations
  glowPulse: {
    '0%, 100%': { 
      boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
      opacity: 1
    },
    '50%': { 
      boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)',
      opacity: 0.8
    }
  },

  neonGlow: {
    '0%, 100%': { 
      textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor'
    },
    '50%': { 
      textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor'
    }
  },

  // Performance meter animations
  perfMeterFill: {
    '0%': { width: '0%' },
    '100%': { width: 'var(--fill-percentage)' }
  },

  // Slide animations for modals/drawers
  slideInRight: {
    '0%': { 
      transform: 'translateX(100%)',
      opacity: 0
    },
    '100%': { 
      transform: 'translateX(0)',
      opacity: 1
    }
  },

  slideInLeft: {
    '0%': { 
      transform: 'translateX(-100%)',
      opacity: 0
    },
    '100%': { 
      transform: 'translateX(0)',
      opacity: 1
    }
  },

  slideInUp: {
    '0%': { 
      transform: 'translateY(100%)',
      opacity: 0
    },
    '100%': { 
      transform: 'translateY(0)',
      opacity: 1
    }
  },

  slideInDown: {
    '0%': { 
      transform: 'translateY(-100%)',
      opacity: 0
    },
    '100%': { 
      transform: 'translateY(0)',
      opacity: 1
    }
  },

  // Scale animations
  scaleIn: {
    '0%': { 
      transform: 'scale(0.9)',
      opacity: 0
    },
    '100%': { 
      transform: 'scale(1)',
      opacity: 1
    }
  },

  scaleOut: {
    '0%': { 
      transform: 'scale(1)',
      opacity: 1
    },
    '100%': { 
      transform: 'scale(0.9)',
      opacity: 0
    }
  },

  // Gaming launch animation
  gameLaunch: {
    '0%': { 
      transform: 'scale(1) rotateY(0deg)',
      filter: 'brightness(1)'
    },
    '50%': { 
      transform: 'scale(1.05) rotateY(5deg)',
      filter: 'brightness(1.2)'
    },
    '100%': { 
      transform: 'scale(1.1) rotateY(0deg)',
      filter: 'brightness(1.5)'
    }
  }
};

// Animation presets combining keyframes with timing
export const animations = {
  // Loading states
  spin: `${keyframes.spin} ${duration.slowest} ${easing.linear} infinite`,
  pulse: `${keyframes.pulse} ${duration.slower} ${easing.smooth} infinite`,
  bounce: `${keyframes.bounce} ${duration.slowest} ${easing.linear} infinite`,

  // Gaming animations
  glowPulse: `${keyframes.glowPulse} ${duration.slower} ${easing.smooth} infinite`,
  neonGlow: `${keyframes.neonGlow} ${duration.slower} ${easing.smooth} infinite`,
  
  // Entry/exit animations
  slideInRight: `${keyframes.slideInRight} ${duration.normal} ${easing.gameEntry}`,
  slideInLeft: `${keyframes.slideInLeft} ${duration.normal} ${easing.gameEntry}`,
  slideInUp: `${keyframes.slideInUp} ${duration.normal} ${easing.gameEntry}`,
  slideInDown: `${keyframes.slideInDown} ${duration.normal} ${easing.gameEntry}`,
  
  scaleIn: `${keyframes.scaleIn} ${duration.normal} ${easing.bounce}`,
  scaleOut: `${keyframes.scaleOut} ${duration.fast} ${easing.gameExit}`,

  // Special effects
  gameLaunch: `${keyframes.gameLaunch} ${duration.slow} ${easing.bounce} forwards`,
  perfMeterFill: `${keyframes.perfMeterFill} ${duration.slow} ${easing.perfMeter} forwards`
};

// Hover effects for interactive elements
export const hoverEffects = {
  // Scale effects
  scaleUp: {
    transform: 'scale(1.05)',
    transition: transitions.button.hover
  },
  
  scaleDown: {
    transform: 'scale(0.95)',
    transition: transitions.button.press
  },

  // Lift effects with shadows
  lift: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    transition: transitions.button.hover
  },

  liftStrong: {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.2)',
    transition: transitions.button.hover
  },

  // Gaming-specific hover effects
  gameCardHover: {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    transition: transitions.gameCard.hover
  },

  perfWidgetHover: {
    backdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: transitions.glassmorphism.hover
  },

  // Glow effects
  primaryGlow: {
    boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)',
    transition: transitions.shadow
  },

  successGlow: {
    boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)',
    transition: transitions.shadow
  },

  warningGlow: {
    boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)',
    transition: transitions.shadow
  },

  errorGlow: {
    boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
    transition: transitions.shadow
  }
};

// Micro-interactions for enhanced UX
export const microInteractions = {
  buttonPress: {
    active: {
      transform: 'scale(0.95)',
      transition: transitions.button.press
    },
    release: {
      transform: 'scale(1)',
      transition: transitions.button.hover
    }
  },

  inputFocus: {
    focus: {
      borderColor: 'var(--color-primary-500)',
      boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
      transition: transitions.fast
    }
  },

  checkboxCheck: {
    checked: {
      transform: 'scale(1.1)',
      transition: `transform ${duration.fast} ${easing.bounce}`
    }
  },

  toggleSwitch: {
    on: {
      transform: 'translateX(100%)',
      transition: transitions.normal
    },
    off: {
      transform: 'translateX(0%)',
      transition: transitions.normal
    }
  }
};