/**
 * Raeen Launcher Design System - Glass Container Component
 * Premium glassmorphism container with dynamic theming
 */

import React from 'react';
import styled, { css } from 'styled-components';
import { glassVariants, glassMixins, glassInteractions } from '../../styles/glassmorphism';
import { spacing, borderRadius } from '../../../design-system/tokens';

// Glass container variants
const containerVariants = {
  subtle: glassVariants.subtle,
  standard: glassVariants.standard,
  strong: glassVariants.strong,
  ultra: glassVariants.ultra
};

// Container sizes
const containerSizes = {
  sm: css`
    padding: ${spacing[3]};
    border-radius: ${borderRadius.md};
  `,
  md: css`
    padding: ${spacing[4]};
    border-radius: ${borderRadius.lg};
  `,
  lg: css`
    padding: ${spacing[6]};
    border-radius: ${borderRadius.xl};
  `,
  xl: css`
    padding: ${spacing[8]};
    border-radius: ${borderRadius['2xl']};
  `
};

// Styled glass container
const StyledGlassContainer = styled.div`
  ${props => containerVariants[props.$variant || 'standard']}
  ${props => containerSizes[props.$size || 'md']}
  
  ${props => props.$interactive && css`
    cursor: pointer;
    user-select: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      ${glassInteractions.hover}
      ${props.$hoverEffect && props.$hoverEffect}
    }
    
    &:focus {
      ${glassInteractions.focus}
    }
    
    &:active {
      ${glassInteractions.active}
    }
  `}
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
  ${props => props.$fullHeight && css`
    height: 100%;
  `}
  
  ${props => props.$centered && css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
  
  ${props => props.$flex && css`
    display: flex;
    flex-direction: ${props.$flexDirection || 'row'};
    align-items: ${props.$alignItems || 'stretch'};
    justify-content: ${props.$justifyContent || 'flex-start'};
    gap: ${props.$gap ? spacing[props.$gap] : spacing[4]};
  `}
  
  ${props => props.$grid && css`
    display: grid;
    grid-template-columns: ${props.$gridCols || '1fr'};
    grid-template-rows: ${props.$gridRows || 'auto'};
    gap: ${props.$gap ? spacing[props.$gap] : spacing[4]};
  `}
  
  /* Gaming-specific styling */
  ${props => props.$gaming && css`
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(99, 102, 241, 0.1) 0%,
        transparent 50%,
        rgba(34, 197, 94, 0.1) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    &:hover::before {
      opacity: 1;
    }
  `}
  
  /* Performance mode optimizations */
  ${props => props.theme.animation?.disabled && css`
    transition: none !important;
    
    &::before {
      transition: none !important;
    }
  `}
  
  /* Accessibility enhancements */
  ${props => props.theme.accessibility?.highContrast && css`
    border-width: 2px;
    border-style: solid;
  `}
  
  /* Custom styles */
  ${props => props.$customStyles}
`;

/**
 * GlassContainer - Premium glassmorphism container component
 * 
 * @param {Object} props - Component properties
 * @param {'subtle'|'standard'|'strong'|'ultra'} props.variant - Glass effect intensity
 * @param {'sm'|'md'|'lg'|'xl'} props.size - Container size preset
 * @param {boolean} props.interactive - Enable hover/focus interactions
 * @param {boolean} props.gaming - Enable gaming-specific styling
 * @param {boolean} props.fullWidth - Make container full width
 * @param {boolean} props.fullHeight - Make container full height
 * @param {boolean} props.centered - Center content
 * @param {boolean} props.flex - Enable flexbox layout
 * @param {string} props.flexDirection - Flex direction
 * @param {string} props.alignItems - Flex align items
 * @param {string} props.justifyContent - Flex justify content
 * @param {boolean} props.grid - Enable grid layout
 * @param {string} props.gridCols - Grid template columns
 * @param {string} props.gridRows - Grid template rows
 * @param {number} props.gap - Gap between children (spacing scale)
 * @param {function} props.onClick - Click handler
 * @param {function} props.onHover - Hover handler
 * @param {React.CSSProperties} props.customStyles - Additional custom styles
 * @param {React.ReactNode} props.children - Child components
 */
export const GlassContainer = React.forwardRef(({
  variant = 'standard',
  size = 'md',
  interactive = false,
  gaming = false,
  fullWidth = false,
  fullHeight = false,
  centered = false,
  flex = false,
  flexDirection,
  alignItems,
  justifyContent,
  grid = false,
  gridCols,
  gridRows,
  gap,
  onClick,
  onHover,
  customStyles,
  hoverEffect,
  className,
  children,
  ...props
}, ref) => {
  return (
    <StyledGlassContainer
      ref={ref}
      className={className}
      $variant={variant}
      $size={size}
      $interactive={interactive}
      $gaming={gaming}
      $fullWidth={fullWidth}
      $fullHeight={fullHeight}
      $centered={centered}
      $flex={flex}
      $flexDirection={flexDirection}
      $alignItems={alignItems}
      $justifyContent={justifyContent}
      $grid={grid}
      $gridCols={gridCols}
      $gridRows={gridRows}
      $gap={gap}
      $customStyles={customStyles}
      $hoverEffect={hoverEffect}
      onClick={onClick}
      onMouseEnter={onHover}
      {...props}
    >
      {children}
    </StyledGlassContainer>
  );
});

GlassContainer.displayName = 'GlassContainer';

// Specialized glass containers for common use cases
export const GlassCard = (props) => (
  <GlassContainer
    variant="standard"
    size="md"
    interactive
    {...props}
  />
);

export const GlassModal = (props) => (
  <GlassContainer
    variant="ultra"
    size="lg"
    centered
    {...props}
  />
);

export const GlassWidget = (props) => (
  <GlassContainer
    variant="strong"
    size="sm"
    gaming
    {...props}
  />
);

export const GlassNavigation = (props) => (
  <GlassContainer
    variant="strong"
    size="md"
    flex
    flexDirection="column"
    {...props}
  />
);

export const GlassGameCard = (props) => (
  <GlassContainer
    variant="standard"
    size="md"
    interactive
    gaming
    hoverEffect={css`
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    `}
    {...props}
  />
);