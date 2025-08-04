/**
 * Raeen Launcher Design System - Glass Button Component
 * Premium glassmorphism buttons with gaming aesthetics
 */

import React from 'react';
import styled, { css } from 'styled-components';
import { glassVariants, glassInteractions, gamingGlassEffects } from '../../styles/glassmorphism';
import { spacing, borderRadius, typographyPresets } from '../../../design-system/tokens';

// Button variants
const buttonVariants = {
  primary: css`
    ${gamingGlassEffects.primary}
    color: ${props => props.theme.colors.primary[500]};
    
    &:hover {
      color: ${props => props.theme.colors.primary[400]};
      box-shadow: 
        ${props => props.theme.isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)'},
        0 0 30px rgba(99, 102, 241, 0.3);
    }
  `,
  
  secondary: css`
    ${gamingGlassEffects.success}
    color: ${props => props.theme.colors.secondary[500]};
    
    &:hover {
      color: ${props => props.theme.colors.secondary[400]};
      box-shadow: 
        ${props => props.theme.isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)'},
        0 0 30px rgba(34, 197, 94, 0.3);
    }
  `,
  
  tertiary: css`
    ${gamingGlassEffects.warning}
    color: ${props => props.theme.colors.tertiary[500]};
    
    &:hover {
      color: ${props => props.theme.colors.tertiary[400]};
      box-shadow: 
        ${props => props.theme.isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)'},
        0 0 30px rgba(249, 115, 22, 0.3);
    }
  `,
  
  danger: css`
    ${gamingGlassEffects.error}
    color: ${props => props.theme.colors.error};
    
    &:hover {
      box-shadow: 
        ${props => props.theme.isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)'},
        0 0 30px rgba(239, 68, 68, 0.3);
    }
  `,
  
  ghost: css`
    ${glassVariants.subtle}
    color: ${props => props.theme.text.primary};
    border: 2px solid transparent;
    
    &:hover {
      border-color: ${props => props.theme.colors.primary[500]};
      color: ${props => props.theme.colors.primary[500]};
    }
  `,
  
  outline: css`
    background: transparent;
    border: 2px solid ${props => props.theme.colors.primary[500]};
    color: ${props => props.theme.colors.primary[500]};
    backdrop-filter: none;
    
    &:hover {
      ${gamingGlassEffects.primary}
      border-color: ${props => props.theme.colors.primary[400]};
      color: ${props => props.theme.colors.primary[400]};
    }
  `
};

// Button sizes
const buttonSizes = {
  xs: css`
    ${typographyPresets.caption}
    padding: ${spacing[1]} ${spacing[2]};
    border-radius: ${borderRadius.md};
    min-height: 24px;
  `,
  
  sm: css`
    ${typographyPresets.buttonSmall}
    padding: ${spacing[2]} ${spacing[3]};
    border-radius: ${borderRadius.md};
    min-height: 32px;
  `,
  
  md: css`
    ${typographyPresets.button}
    padding: ${spacing[3]} ${spacing[4]};
    border-radius: ${borderRadius.lg};
    min-height: 40px;
  `,
  
  lg: css`
    ${typographyPresets.button}
    font-size: 1.125rem;
    padding: ${spacing[4]} ${spacing[6]};
    border-radius: ${borderRadius.xl};
    min-height: 48px;
  `,
  
  xl: css`
    ${typographyPresets.button}
    font-size: 1.25rem;
    padding: ${spacing[5]} ${spacing[8]};
    border-radius: ${borderRadius.xl};
    min-height: 56px;
  `
};

// Base button styles
const StyledGlassButton = styled.button`
  ${props => buttonVariants[props.$variant || 'primary']}
  ${props => buttonSizes[props.$size || 'md']}
  
  /* Base button properties */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  border: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  /* Full width option */
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
  /* Loading state */
  ${props => props.$loading && css`
    pointer-events: none;
    opacity: 0.7;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      margin: -8px 0 0 -8px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `}
  
  /* Disabled state */
  ${props => props.disabled && css`
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  `}
  
  /* Icon-only button */
  ${props => props.$iconOnly && css`
    padding: ${spacing[2]};
    aspect-ratio: 1;
    
    ${props.$size === 'xs' && css`padding: ${spacing[1]};`}
    ${props.$size === 'sm' && css`padding: ${spacing[1.5]};`}
    ${props.$size === 'lg' && css`padding: ${spacing[3]};`}
    ${props.$size === 'xl' && css`padding: ${spacing[4]};`}
  `}
  
  /* Gaming enhancements */
  ${props => props.$gaming && css`
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.5s ease;
    }
    
    &:hover::before {
      left: 100%;
    }
  `}
  
  /* Interaction effects */
  &:hover {
    ${glassInteractions.hover}
    transform: translateY(-2px);
  }
  
  &:focus {
    ${glassInteractions.focus}
    outline: none;
  }
  
  &:active {
    ${glassInteractions.active}
    transform: translateY(0) scale(0.95);
  }
  
  /* Performance mode */
  ${props => props.theme.animation?.disabled && css`
    transition: none !important;
    
    &::before {
      display: none;
    }
    
    &:hover,
    &:focus,
    &:active {
      transition: none !important;
      transform: none !important;
    }
  `}
  
  /* High contrast mode */
  ${props => props.theme.accessibility?.highContrast && css`
    border: 2px solid currentColor !important;
    font-weight: 600;
  `}
  
  /* Custom styles */
  ${props => props.$customStyles}
`;

// Button icon wrapper
const ButtonIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  ${props => props.$position === 'left' && css`
    margin-right: ${spacing[1]};
  `}
  
  ${props => props.$position === 'right' && css`
    margin-left: ${spacing[1]};
  `}
  
  svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
`;

/**
 * GlassButton - Premium glassmorphism button component
 * 
 * @param {Object} props - Component properties
 * @param {'primary'|'secondary'|'tertiary'|'danger'|'ghost'|'outline'} props.variant - Button style variant
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} props.size - Button size
 * @param {boolean} props.fullWidth - Make button full width
 * @param {boolean} props.loading - Show loading state
 * @param {boolean} props.disabled - Disable button
 * @param {boolean} props.iconOnly - Button contains only an icon
 * @param {boolean} props.gaming - Enable gaming-specific effects
 * @param {React.ReactNode} props.leftIcon - Icon to show on the left
 * @param {React.ReactNode} props.rightIcon - Icon to show on the right
 * @param {function} props.onClick - Click handler
 * @param {React.CSSProperties} props.customStyles - Additional custom styles
 * @param {React.ReactNode} props.children - Button content
 */
export const GlassButton = React.forwardRef(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  iconOnly = false,
  gaming = false,
  leftIcon,
  rightIcon,
  onClick,
  customStyles,
  className,
  children,
  ...props
}, ref) => {
  const handleClick = (e) => {
    if (loading || disabled) return;
    onClick?.(e);
  };

  return (
    <StyledGlassButton
      ref={ref}
      className={className}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      $iconOnly={iconOnly}
      $gaming={gaming}
      $customStyles={customStyles}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {leftIcon && (
        <ButtonIcon $position="left">
          {leftIcon}
        </ButtonIcon>
      )}
      
      {!loading && children}
      
      {rightIcon && (
        <ButtonIcon $position="right">
          {rightIcon}
        </ButtonIcon>
      )}
    </StyledGlassButton>
  );
});

GlassButton.displayName = 'GlassButton';

// Specialized button variants
export const PlayButton = (props) => (
  <GlassButton
    variant="primary"
    size="lg"
    gaming
    {...props}
  />
);

export const LaunchButton = (props) => (
  <GlassButton
    variant="secondary"
    size="md"
    gaming
    {...props}
  />
);

export const SettingsButton = (props) => (
  <GlassButton
    variant="ghost"
    size="md"
    iconOnly
    {...props}
  />
);

export const CloseButton = (props) => (
  <GlassButton
    variant="danger"
    size="sm"
    iconOnly
    {...props}
  />
);