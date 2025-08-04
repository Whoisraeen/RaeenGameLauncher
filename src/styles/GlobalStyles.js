/**
 * Raeen Launcher Design System - Global Styles
 * Base styling and CSS resets for the gaming launcher
 */

import { createGlobalStyle } from 'styled-components';
import { colors, typographyPresets, fontFamilies } from '../../design-system/tokens';

const GlobalStyles = createGlobalStyle`
  /* CSS Reset and Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
  }

  body {
    ${typographyPresets.body}
    background: ${props => props.theme.background?.primary || colors.slate[950]};
    color: ${props => props.theme.text?.primary || colors.neutral[50]};
    overflow-x: hidden;
    
    /* Gaming-optimized scrollbar */
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: ${props => props.theme.isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
      backdrop-filter: blur(10px);
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${colors.primary[500]};
      border-radius: 4px;
      
      &:hover {
        background: ${colors.primary[400]};
      }
    }
  }

  /* Typography Elements */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${fontFamilies.display.join(', ')};
    font-weight: 600;
    line-height: 1.2;
    color: ${props => props.theme.text?.primary || colors.neutral[50]};
  }

  h1 { ${typographyPresets.heading1} }
  h2 { ${typographyPresets.heading2} }
  h3 { ${typographyPresets.heading3} }
  h4 { ${typographyPresets.heading4} }

  p {
    ${typographyPresets.body}
    color: ${props => props.theme.text?.secondary || colors.neutral[200]};
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: ${colors.primary[400]};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${colors.primary[300]};
      text-decoration: underline;
    }
    
    &:focus {
      outline: 2px solid ${colors.primary[500]};
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  /* Form Elements */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    
    &:focus {
      outline: 2px solid ${colors.primary[500]};
      outline-offset: 2px;
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    
    &:focus {
      outline: 2px solid ${colors.primary[500]};
      outline-offset: 2px;
    }
  }

  /* Lists */
  ul, ol {
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  /* Code */
  code, pre {
    font-family: ${fontFamilies.mono.join(', ')};
    background: ${props => props.theme.isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)'};
    border-radius: 4px;
  }

  code {
    padding: 0.2em 0.4em;
    font-size: 0.875em;
  }

  pre {
    padding: 1rem;
    overflow-x: auto;
    
    code {
      padding: 0;
      background: none;
    }
  }

  /* Selection */
  ::selection {
    background: ${colors.primary[500]};
    color: white;
  }

  ::-moz-selection {
    background: ${colors.primary[500]};
    color: white;
  }

  /* Focus Management */
  .focus-visible {
    outline: 2px solid ${colors.primary[500]};
    outline-offset: 2px;
  }

  /* Gaming-specific classes */
  .gaming-glow {
    box-shadow: 0 0 20px ${colors.primary[500]};
    animation: glow-pulse 2s ease-in-out infinite alternate;
  }

  @keyframes glow-pulse {
    from {
      box-shadow: 0 0 20px ${colors.primary[500]};
    }
    to {
      box-shadow: 0 0 30px ${colors.primary[400]}, 0 0 40px ${colors.primary[500]};
    }
  }

  .neon-text {
    text-shadow: 
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 15px currentColor,
      0 0 20px currentColor;
  }

  /* Performance optimizations */
  .will-change-transform {
    will-change: transform;
  }

  .will-change-opacity {
    will-change: opacity;
  }

  .hardware-accelerated {
    transform: translateZ(0);
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  @media (prefers-high-contrast: high) {
    * {
      border-color: currentColor !important;
    }
  }

  /* High-performance mode */
  ${props => props.theme.performance?.reducedBlur && `
    * {
      backdrop-filter: none !important;
      filter: none !important;
    }
  `}

  ${props => props.theme.performance?.reducedTransparency && `
    * {
      opacity: 1 !important;
      background: ${props.theme.isDark ? colors.slate[900] : colors.neutral[100]} !important;
    }
  `}

  /* Custom scrollbars for gaming aesthetic */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${colors.primary[500]} ${props => props.theme.isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
  }

  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  *::-webkit-scrollbar-track {
    background: ${props => props.theme.isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
    backdrop-filter: blur(10px);
  }

  *::-webkit-scrollbar-thumb {
    background: ${colors.primary[500]};
    border-radius: 3px;
    
    &:hover {
      background: ${colors.primary[400]};
    }
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .glass-blur {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  /* Font loading optimization */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  @font-face {
    font-family: 'Orbitron';
    font-style: normal;
    font-weight: 400 900;
    font-display: swap;
    src: url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
  }

  @font-face {
    font-family: 'JetBrains Mono';
    font-style: normal;
    font-weight: 100 800;
    font-display: swap;
    src: url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap');
  }
`;

export default GlobalStyles;