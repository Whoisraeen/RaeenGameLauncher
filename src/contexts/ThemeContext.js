/**
 * Raeen Launcher Design System - Theme Context
 * Dynamic theming system with real-time preview
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { colors, lightTheme, darkTheme, gamingThemes } from '../../design-system/tokens';

// Theme action types
const THEME_ACTIONS = {
  SET_THEME: 'SET_THEME',
  SET_GAMING_THEME: 'SET_GAMING_THEME',
  SET_CUSTOM_COLORS: 'SET_CUSTOM_COLORS',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_ACCENT_COLOR: 'SET_ACCENT_COLOR',
  SET_GLASS_INTENSITY: 'SET_GLASS_INTENSITY',
  SET_ANIMATION_SPEED: 'SET_ANIMATION_SPEED',
  RESET_TO_DEFAULT: 'RESET_TO_DEFAULT',
  IMPORT_THEME: 'IMPORT_THEME',
  SET_RGB_SYNC: 'SET_RGB_SYNC'
};

// Default theme state
const defaultThemeState = {
  // Current theme mode
  mode: 'dark', // 'light' | 'dark'
  
  // Gaming theme variant
  gamingTheme: 'neon', // 'neon' | 'cyberpunk' | 'retro' | 'custom'
  
  // Accent color override
  accentColor: colors.primary[500],
  
  // Glass effect intensity (0-100)
  glassIntensity: 80,
  
  // Animation speed multiplier (0.5-2.0)
  animationSpeed: 1.0,
  
  // RGB lighting sync
  rgbSync: {
    enabled: false,
    primaryColor: colors.primary[500],
    syncWithUI: true,
    breathingEffect: false
  },
  
  // Custom color overrides
  customColors: {
    primary: null,
    secondary: null,
    tertiary: null,
    background: null,
    surface: null,
    text: null
  },
  
  // Performance mode settings
  performance: {
    reducedMotion: false,
    reducedBlur: false,
    reducedTransparency: false
  },
  
  // Accessibility settings
  accessibility: {
    highContrast: false,
    largeText: false,
    reducedMotion: false
  }
};

// Theme reducer
function themeReducer(state, action) {
  switch (action.type) {
    case THEME_ACTIONS.SET_THEME:
      return {
        ...state,
        mode: action.payload
      };
      
    case THEME_ACTIONS.SET_GAMING_THEME:
      return {
        ...state,
        gamingTheme: action.payload
      };
      
    case THEME_ACTIONS.SET_CUSTOM_COLORS:
      return {
        ...state,
        customColors: {
          ...state.customColors,
          ...action.payload
        }
      };
      
    case THEME_ACTIONS.TOGGLE_DARK_MODE:
      return {
        ...state,
        mode: state.mode === 'dark' ? 'light' : 'dark'
      };
      
    case THEME_ACTIONS.SET_ACCENT_COLOR:
      return {
        ...state,
        accentColor: action.payload,
        rgbSync: {
          ...state.rgbSync,
          primaryColor: action.payload
        }
      };
      
    case THEME_ACTIONS.SET_GLASS_INTENSITY:
      return {
        ...state,
        glassIntensity: Math.max(0, Math.min(100, action.payload))
      };
      
    case THEME_ACTIONS.SET_ANIMATION_SPEED:
      return {
        ...state,
        animationSpeed: Math.max(0.1, Math.min(3.0, action.payload))
      };
      
    case THEME_ACTIONS.SET_RGB_SYNC:
      return {
        ...state,
        rgbSync: {
          ...state.rgbSync,
          ...action.payload
        }
      };
      
    case THEME_ACTIONS.RESET_TO_DEFAULT:
      return defaultThemeState;
      
    case THEME_ACTIONS.IMPORT_THEME:
      return {
        ...state,
        ...action.payload
      };
      
    default:
      return state;
  }
}

// Create theme context
const ThemeContext = createContext();

// Theme provider component
export function ThemeProvider({ children }) {
  const [themeState, dispatch] = useReducer(themeReducer, defaultThemeState);
  
  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('raeen-theme');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        dispatch({ type: THEME_ACTIONS.IMPORT_THEME, payload: parsed });
      } catch (error) {
        console.warn('Failed to load saved theme:', error);
      }
    }
  }, []);
  
  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('raeen-theme', JSON.stringify(themeState));
  }, [themeState]);
  
  // Generate computed theme object
  const computedTheme = React.useMemo(() => {
    const baseTheme = themeState.mode === 'dark' ? darkTheme : lightTheme;
    const gamingTheme = gamingThemes[themeState.gamingTheme] || gamingThemes.neon;
    
    // Apply glass intensity
    const glassIntensityFactor = themeState.glassIntensity / 100;
    
    // Apply custom colors or gaming theme colors
    const themeColors = {
      ...colors,
      primary: themeState.customColors.primary ? 
        generateColorScale(themeState.customColors.primary) : 
        (themeState.accentColor !== colors.primary[500] ? 
          generateColorScale(themeState.accentColor) : 
          colors.primary
        )
    };
    
    return {
      // Theme state
      ...themeState,
      isDark: themeState.mode === 'dark',
      isLight: themeState.mode === 'light',
      
      // Colors
      colors: themeColors,
      
      // Base theme colors
      background: baseTheme.background,
      text: baseTheme.text,
      
      // Gaming theme integration
      gaming: gamingTheme,
      
      // Glass effects with intensity
      glass: {
        ...baseTheme.glass,
        background: adjustOpacity(baseTheme.glass.background, glassIntensityFactor),
        backgroundStrong: adjustOpacity(baseTheme.glass.backgroundStrong, glassIntensityFactor),
        backgroundUltra: adjustOpacity(baseTheme.glass.backgroundUltra, glassIntensityFactor)
      },
      
      // Animation timing with speed multiplier
      animation: {
        speed: themeState.animationSpeed,
        disabled: themeState.performance.reducedMotion || themeState.accessibility.reducedMotion
      }
    };
  }, [themeState]);
  
  // Theme actions
  const themeActions = {
    setTheme: (mode) => dispatch({ type: THEME_ACTIONS.SET_THEME, payload: mode }),
    setGamingTheme: (theme) => dispatch({ type: THEME_ACTIONS.SET_GAMING_THEME, payload: theme }),
    setCustomColors: (colors) => dispatch({ type: THEME_ACTIONS.SET_CUSTOM_COLORS, payload: colors }),
    toggleDarkMode: () => dispatch({ type: THEME_ACTIONS.TOGGLE_DARK_MODE }),
    setAccentColor: (color) => dispatch({ type: THEME_ACTIONS.SET_ACCENT_COLOR, payload: color }),
    setGlassIntensity: (intensity) => dispatch({ type: THEME_ACTIONS.SET_GLASS_INTENSITY, payload: intensity }),
    setAnimationSpeed: (speed) => dispatch({ type: THEME_ACTIONS.SET_ANIMATION_SPEED, payload: speed }),
    setRgbSync: (settings) => dispatch({ type: THEME_ACTIONS.SET_RGB_SYNC, payload: settings }),
    resetToDefault: () => dispatch({ type: THEME_ACTIONS.RESET_TO_DEFAULT }),
    importTheme: (themeData) => dispatch({ type: THEME_ACTIONS.IMPORT_THEME, payload: themeData }),
    
    // Utility functions
    exportTheme: () => JSON.stringify(themeState, null, 2),
    
    // Gaming-specific actions
    syncWithRGB: (color) => {
      if (themeState.rgbSync.enabled) {
        // This would integrate with RGB lighting APIs
        // OpenRGB, Corsair iCUE, Razer Chroma, etc.
        console.log('Syncing RGB lighting with color:', color);
      }
    },
    
    // Performance optimization
    enablePerformanceMode: () => {
      dispatch({
        type: THEME_ACTIONS.IMPORT_THEME,
        payload: {
          ...themeState,
          performance: {
            reducedMotion: true,
            reducedBlur: true,
            reducedTransparency: true
          },
          glassIntensity: 30,
          animationSpeed: 0.5
        }
      });
    },
    
    // Accessibility helpers
    enableHighContrast: () => {
      dispatch({
        type: THEME_ACTIONS.IMPORT_THEME,
        payload: {
          ...themeState,
          accessibility: {
            ...themeState.accessibility,
            highContrast: true
          }
        }
      });
    }
  };
  
  const contextValue = {
    theme: computedTheme,
    ...themeActions
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Utility functions
function generateColorScale(baseColor) {
  // This would generate a full color scale from a base color
  // For now, return a basic scale - in production, use a color manipulation library
  return {
    50: lighten(baseColor, 0.9),
    100: lighten(baseColor, 0.8),
    200: lighten(baseColor, 0.6),
    300: lighten(baseColor, 0.4),
    400: lighten(baseColor, 0.2),
    500: baseColor,
    600: darken(baseColor, 0.1),
    700: darken(baseColor, 0.2),
    800: darken(baseColor, 0.3),
    900: darken(baseColor, 0.4),
    950: darken(baseColor, 0.5)
  };
}

function lighten(color, amount) {
  // Basic color lightening - use a proper color library in production
  return color;
}

function darken(color, amount) {
  // Basic color darkening - use a proper color library in production
  return color;
}

function adjustOpacity(colorString, factor) {
  // Parse rgba and adjust opacity
  const match = colorString.match(/rgba?\(([^)]+)\)/);
  if (match) {
    const values = match[1].split(',').map(v => v.trim());
    if (values.length === 4) {
      const newOpacity = parseFloat(values[3]) * factor;
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${newOpacity})`;
    }
  }
  return colorString;
}

// Pre-built theme presets for quick switching
export const themePresets = {
  'Gaming Neon': {
    mode: 'dark',
    gamingTheme: 'neon',
    accentColor: '#6366f1',
    glassIntensity: 85
  },
  
  'Cyberpunk': {
    mode: 'dark',
    gamingTheme: 'cyberpunk',
    accentColor: '#00ff88',
    glassIntensity: 90
  },
  
  'Retro Gaming': {
    mode: 'dark',
    gamingTheme: 'retro',
    accentColor: '#ff6b35',
    glassIntensity: 75
  },
  
  'Professional Light': {
    mode: 'light',
    gamingTheme: 'neon',
    accentColor: '#4f46e5',
    glassIntensity: 60
  },
  
  'High Performance': {
    mode: 'dark',
    gamingTheme: 'neon',
    accentColor: '#22c55e',
    glassIntensity: 30,
    animationSpeed: 0.5,
    performance: {
      reducedMotion: true,
      reducedBlur: true,
      reducedTransparency: true
    }
  }
};