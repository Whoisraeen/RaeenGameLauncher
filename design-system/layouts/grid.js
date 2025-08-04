/**
 * Raeen Launcher Design System - Responsive Grid System
 * Advanced grid system optimized for gaming interfaces
 */

import { css } from 'styled-components';
import { spacing } from '../tokens';

// Breakpoints for responsive design
export const breakpoints = {
  xs: '0px',
  sm: '640px',   // Small tablets
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px', // Large desktops
  '3xl': '1920px', // Ultra-wide monitors
  '4xl': '2560px'  // 4K displays
};

// Media query helpers
export const media = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  '3xl': `@media (min-width: ${breakpoints['3xl']})`,
  '4xl': `@media (min-width: ${breakpoints['4xl']})`,
  
  // Max-width queries
  maxXs: `@media (max-width: ${parseInt(breakpoints.sm) - 1}px)`,
  maxSm: `@media (max-width: ${parseInt(breakpoints.md) - 1}px)`,
  maxMd: `@media (max-width: ${parseInt(breakpoints.lg) - 1}px)`,
  maxLg: `@media (max-width: ${parseInt(breakpoints.xl) - 1}px)`,
  maxXl: `@media (max-width: ${parseInt(breakpoints['2xl']) - 1}px)`,
  
  // Gaming-specific breakpoints
  mobile: `@media (max-width: ${parseInt(breakpoints.md) - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.md}) and (max-width: ${parseInt(breakpoints.lg) - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.lg})`,
  ultrawide: `@media (min-width: ${breakpoints['3xl']}) and (min-aspect-ratio: 2/1)`
};

// Container max-widths
export const containerSizes = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
  full: '100%'
};

// Grid configuration
export const gridConfig = {
  columns: 12,
  gutters: {
    xs: spacing[4],  // 16px
    sm: spacing[4],  // 16px
    md: spacing[6],  // 24px
    lg: spacing[6],  // 24px
    xl: spacing[8],  // 32px
    '2xl': spacing[8] // 32px
  }
};

// Container mixins
export const container = css`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${spacing[4]};
  padding-right: ${spacing[4]};
  
  ${media.sm} {
    max-width: ${containerSizes.sm};
    padding-left: ${spacing[6]};
    padding-right: ${spacing[6]};
  }
  
  ${media.md} {
    max-width: ${containerSizes.md};
  }
  
  ${media.lg} {
    max-width: ${containerSizes.lg};
    padding-left: ${spacing[8]};
    padding-right: ${spacing[8]};
  }
  
  ${media.xl} {
    max-width: ${containerSizes.xl};
  }
  
  ${media['2xl']} {
    max-width: ${containerSizes['2xl']};
  }
  
  ${media['3xl']} {
    max-width: ${containerSizes['3xl']};
  }
`;

// Fluid container (no max-width)
export const containerFluid = css`
  width: 100%;
  padding-left: ${spacing[4]};
  padding-right: ${spacing[4]};
  
  ${media.sm} {
    padding-left: ${spacing[6]};
    padding-right: ${spacing[6]};
  }
  
  ${media.lg} {
    padding-left: ${spacing[8]};
    padding-right: ${spacing[8]};
  }
`;

// Grid row
export const row = css`
  display: flex;
  flex-wrap: wrap;
  margin-left: -${gridConfig.gutters.xs};
  margin-right: -${gridConfig.gutters.xs};
  
  ${media.sm} {
    margin-left: -${gridConfig.gutters.sm};
    margin-right: -${gridConfig.gutters.sm};
  }
  
  ${media.md} {
    margin-left: -${gridConfig.gutters.md};
    margin-right: -${gridConfig.gutters.md};
  }
  
  ${media.lg} {
    margin-left: -${gridConfig.gutters.lg};
    margin-right: -${gridConfig.gutters.lg};
  }
  
  ${media.xl} {
    margin-left: -${gridConfig.gutters.xl};
    margin-right: -${gridConfig.gutters.xl};
  }
  
  ${media['2xl']} {
    margin-left: -${gridConfig.gutters['2xl']};
    margin-right: -${gridConfig.gutters['2xl']};
  }
`;

// Column base styles
export const colBase = css`
  position: relative;
  width: 100%;
  padding-left: ${gridConfig.gutters.xs};
  padding-right: ${gridConfig.gutters.xs};
  
  ${media.sm} {
    padding-left: ${gridConfig.gutters.sm};
    padding-right: ${gridConfig.gutters.sm};
  }
  
  ${media.md} {
    padding-left: ${gridConfig.gutters.md};
    padding-right: ${gridConfig.gutters.md};
  }
  
  ${media.lg} {
    padding-left: ${gridConfig.gutters.lg};
    padding-right: ${gridConfig.gutters.lg};
  }
  
  ${media.xl} {
    padding-left: ${gridConfig.gutters.xl};
    padding-right: ${gridConfig.gutters.xl};
  }
  
  ${media['2xl']} {
    padding-left: ${gridConfig.gutters['2xl']};
    padding-right: ${gridConfig.gutters['2xl']};
  }
`;

// Generate column width
const generateColWidth = (size) => {
  if (size === 'auto') return 'flex: 0 0 auto; width: auto;';
  if (size === 'fill') return 'flex: 1 1 0%; min-width: 0;';
  if (typeof size === 'number') {
    const percentage = (size / gridConfig.columns) * 100;
    return `flex: 0 0 auto; width: ${percentage}%;`;
  }
  return '';
};

// Column size mixins
export const col = (xs, sm, md, lg, xl, xl2) => css`
  ${colBase}
  
  ${xs && generateColWidth(xs)}
  
  ${sm && media.sm} {
    ${generateColWidth(sm)}
  }
  
  ${md && media.md} {
    ${generateColWidth(md)}
  }
  
  ${lg && media.lg} {
    ${generateColWidth(lg)}
  }
  
  ${xl && media.xl} {
    ${generateColWidth(xl)}
  }
  
  ${xl2 && media['2xl']} {
    ${generateColWidth(xl2)}
  }
`;

// Offset mixins
const generateOffset = (size) => {
  if (typeof size === 'number') {
    const percentage = (size / gridConfig.columns) * 100;
    return `margin-left: ${percentage}%;`;
  }
  return '';
};

export const offset = (xs, sm, md, lg, xl, xl2) => css`
  ${xs && generateOffset(xs)}
  
  ${sm && media.sm} {
    ${generateOffset(sm)}
  }
  
  ${md && media.md} {
    ${generateOffset(md)}
  }
  
  ${lg && media.lg} {
    ${generateOffset(lg)}
  }
  
  ${xl && media.xl} {
    ${generateOffset(xl)}
  }
  
  ${xl2 && media['2xl']} {
    ${generateOffset(xl2)}
  }
`;

// Gaming-specific layouts
export const gamingLayoutPresets = {
  // Game library grid - responsive cards
  gameLibrary: css`
    display: grid;
    gap: ${spacing[4]};
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    
    ${media.sm} {
      gap: ${spacing[6]};
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
    
    ${media.md} {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
    
    ${media.lg} {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    }
    
    ${media.xl} {
      gap: ${spacing[8]};
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
    
    ${media['2xl']} {
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    }
    
    ${media.ultrawide} {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  `,
  
  // Dashboard layout with sidebar
  dashboard: css`
    display: grid;
    gap: ${spacing[6]};
    grid-template-columns: 1fr;
    
    ${media.lg} {
      grid-template-columns: 280px 1fr;
      gap: ${spacing[8]};
    }
    
    ${media.xl} {
      grid-template-columns: 320px 1fr;
    }
    
    ${media['2xl']} {
      grid-template-columns: 360px 1fr;
    }
    
    ${media.ultrawide} {
      grid-template-columns: 400px 1fr 300px;
    }
  `,
  
  // Performance widgets grid
  perfWidgets: css`
    display: grid;
    gap: ${spacing[3]};
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    
    ${media.sm} {
      gap: ${spacing[4]};
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    }
    
    ${media.md} {
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    }
    
    ${media.lg} {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
  `,
  
  // Settings panels
  settingsPanels: css`
    display: grid;
    gap: ${spacing[6]};
    grid-template-columns: 1fr;
    
    ${media.md} {
      grid-template-columns: 250px 1fr;
    }
    
    ${media.lg} {
      grid-template-columns: 300px 1fr;
      gap: ${spacing[8]};
    }
    
    ${media.xl} {
      grid-template-columns: 350px 1fr;
    }
  `,
  
  // Modal layouts
  modalContent: css`
    display: grid;
    gap: ${spacing[4]};
    grid-template-columns: 1fr;
    max-width: 90vw;
    
    ${media.sm} {
      max-width: 600px;
      gap: ${spacing[6]};
    }
    
    ${media.md} {
      max-width: 700px;
    }
    
    ${media.lg} {
      max-width: 800px;
      gap: ${spacing[8]};
    }
    
    ${media.xl} {
      max-width: 900px;
    }
  `
};

// Flexbox utilities
export const flexUtilities = {
  flex: css`display: flex;`,
  flexCol: css`display: flex; flex-direction: column;`,
  flexRow: css`display: flex; flex-direction: row;`,
  flexWrap: css`flex-wrap: wrap;`,
  flexNoWrap: css`flex-wrap: nowrap;`,
  
  // Justify content
  justifyStart: css`justify-content: flex-start;`,
  justifyEnd: css`justify-content: flex-end;`,
  justifyCenter: css`justify-content: center;`,
  justifyBetween: css`justify-content: space-between;`,
  justifyAround: css`justify-content: space-around;`,
  justifyEvenly: css`justify-content: space-evenly;`,
  
  // Align items
  itemsStart: css`align-items: flex-start;`,
  itemsEnd: css`align-items: flex-end;`,
  itemsCenter: css`align-items: center;`,
  itemsBaseline: css`align-items: baseline;`,
  itemsStretch: css`align-items: stretch;`,
  
  // Align content
  contentStart: css`align-content: flex-start;`,
  contentEnd: css`align-content: flex-end;`,
  contentCenter: css`align-content: center;`,
  contentBetween: css`align-content: space-between;`,
  contentAround: css`align-content: space-around;`,
  contentEvenly: css`align-content: space-evenly;`,
  
  // Flex grow/shrink
  flexGrow: css`flex-grow: 1;`,
  flexShrink: css`flex-shrink: 1;`,
  flexNoShrink: css`flex-shrink: 0;`,
  
  // Gaps
  gap1: css`gap: ${spacing[1]};`,
  gap2: css`gap: ${spacing[2]};`,
  gap3: css`gap: ${spacing[3]};`,
  gap4: css`gap: ${spacing[4]};`,
  gap6: css`gap: ${spacing[6]};`,
  gap8: css`gap: ${spacing[8]};`
};

// Layout utilities for gaming interfaces
export const gamingLayoutUtils = {
  // Full screen overlay
  fullOverlay: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  `,
  
  // Sidebar navigation
  sidebar: css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    z-index: 100;
    
    ${media.lg} {
      width: 320px;
    }
    
    ${media.xl} {
      width: 360px;
    }
  `,
  
  // Main content with sidebar offset
  mainWithSidebar: css`
    margin-left: 0;
    
    ${media.lg} {
      margin-left: 320px;
    }
    
    ${media.xl} {
      margin-left: 360px;
    }
  `,
  
  // Performance overlay (HUD style)
  perfOverlay: css`
    position: fixed;
    top: ${spacing[4]};
    right: ${spacing[4]};
    z-index: 999;
    pointer-events: none;
    
    ${media.sm} {
      top: ${spacing[6]};
      right: ${spacing[6]};
    }
  `,
  
  // Modal centering
  modalCenter: css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1050;
  `,
  
  // Game card aspect ratio
  gameCardAspect: css`
    aspect-ratio: 16 / 9;
    overflow: hidden;
    
    ${media.sm} {
      aspect-ratio: 3 / 4;
    }
    
    ${media.md} {
      aspect-ratio: 16 / 9;
    }
  `
};