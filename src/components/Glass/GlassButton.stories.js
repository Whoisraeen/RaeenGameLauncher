/**
 * Raeen Launcher Design System - GlassButton Stories
 * Storybook stories for the glassmorphism button component
 */

import React from 'react';
import { GlassButton, PlayButton, LaunchButton, SettingsButton, CloseButton } from './GlassButton';

// Sample icons for demonstration
const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
  </svg>
);

export default {
  title: 'Design System/Glass/GlassButton',
  component: GlassButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Premium glassmorphism button component with multiple variants, sizes, and gaming-specific enhancements.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'danger', 'ghost', 'outline'],
      description: 'Button style variant'
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Button size'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Make button full width'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable button'
    },
    gaming: {
      control: { type: 'boolean' },
      description: 'Enable gaming-specific effects'
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Button contains only an icon'
    }
  }
};

// Template for stories
const Template = (args) => (
  <GlassButton {...args}>
    {args.iconOnly ? <PlayIcon /> : 'Button Text'}
  </GlassButton>
);

// Default story
export const Default = Template.bind({});
Default.args = {
  variant: 'primary',
  size: 'md',
  gaming: false
};

// Variants showcase
export const Variants = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
    <GlassButton variant="primary">Primary</GlassButton>
    <GlassButton variant="secondary">Secondary</GlassButton>
    <GlassButton variant="tertiary">Tertiary</GlassButton>
    <GlassButton variant="danger">Danger</GlassButton>
    <GlassButton variant="ghost">Ghost</GlassButton>
    <GlassButton variant="outline">Outline</GlassButton>
  </div>
);

// Sizes showcase
export const Sizes = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
    <GlassButton size="xs">Extra Small</GlassButton>
    <GlassButton size="sm">Small</GlassButton>
    <GlassButton size="md">Medium</GlassButton>
    <GlassButton size="lg">Large</GlassButton>
    <GlassButton size="xl">Extra Large</GlassButton>
  </div>
);

// Gaming variants
export const Gaming = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
    <GlassButton variant="primary" gaming>Primary Gaming</GlassButton>
    <GlassButton variant="secondary" gaming>Secondary Gaming</GlassButton>
    <GlassButton variant="tertiary" gaming>Tertiary Gaming</GlassButton>
    <GlassButton variant="danger" gaming>Danger Gaming</GlassButton>
  </div>
);

// With icons
export const WithIcons = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
    <GlassButton variant="primary" leftIcon={<PlayIcon />}>
      Play Game
    </GlassButton>
    
    <GlassButton variant="secondary" rightIcon={<DownloadIcon />}>
      Download
    </GlassButton>
    
    <GlassButton variant="ghost" leftIcon={<SettingsIcon />} rightIcon={<DownloadIcon />}>
      Settings & Download
    </GlassButton>
  </div>
);

// Icon-only buttons
export const IconOnly = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
    <GlassButton variant="primary" iconOnly size="sm">
      <PlayIcon />
    </GlassButton>
    
    <GlassButton variant="secondary" iconOnly size="md">
      <SettingsIcon />
    </GlassButton>
    
    <GlassButton variant="danger" iconOnly size="lg">
      <CloseIcon />
    </GlassButton>
    
    <GlassButton variant="ghost" iconOnly size="xs">
      <SettingsIcon />
    </GlassButton>
  </div>
);

// Button states
export const States = () => (
  <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
    <GlassButton variant="primary">Normal</GlassButton>
    <GlassButton variant="primary" loading>Loading</GlassButton>
    <GlassButton variant="primary" disabled>Disabled</GlassButton>
    <GlassButton variant="primary" gaming>Gaming</GlassButton>
  </div>
);

// Full width examples
export const FullWidth = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
    <GlassButton variant="primary" fullWidth>
      Primary Full Width
    </GlassButton>
    
    <GlassButton variant="secondary" fullWidth leftIcon={<PlayIcon />}>
      Launch Game
    </GlassButton>
    
    <GlassButton variant="outline" fullWidth>
      Full Width Outline
    </GlassButton>
  </div>
);

// Specialized gaming buttons
export const SpecializedButtons = () => (
  <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
    <PlayButton leftIcon={<PlayIcon />}>
      Play Now
    </PlayButton>
    
    <LaunchButton>
      Launch Game
    </LaunchButton>
    
    <SettingsButton>
      <SettingsIcon />
    </SettingsButton>
    
    <CloseButton>
      <CloseIcon />
    </CloseButton>
  </div>
);

// Game launcher interface example
export const GameLauncherInterface = () => (
  <div style={{ 
    display: 'grid', 
    gap: '20px', 
    padding: '24px',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)'
  }}>
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 'bold' }}>Cyberpunk 2077</h3>
      <p style={{ opacity: 0.8, marginBottom: '20px' }}>Action RPG • Last played 2 hours ago</p>
    </div>
    
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
      <PlayButton leftIcon={<PlayIcon />} size="lg">
        Play
      </PlayButton>
      <GlassButton variant="outline" leftIcon={<SettingsIcon />}>
        Settings
      </GlassButton>
    </div>
    
    <div style={{ display: 'flex', gap: '8px', fontSize: '14px', opacity: 0.9 }}>
      <GlassButton variant="ghost" size="sm">
        Achievements
      </GlassButton>
      <GlassButton variant="ghost" size="sm">
        Screenshots
      </GlassButton>
      <GlassButton variant="ghost" size="sm">
        Mods
      </GlassButton>
    </div>
  </div>
);

// Performance overlay buttons
export const PerformanceOverlay = () => (
  <div style={{ 
    position: 'relative',
    height: '200px',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4))',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '16px'
  }}>
    <div style={{ display: 'flex', gap: '8px' }}>
      <GlassButton variant="ghost" size="xs" iconOnly>
        <SettingsIcon />
      </GlassButton>
      <GlassButton variant="ghost" size="xs" iconOnly>
        <CloseIcon />
      </GlassButton>
    </div>
    
    <div style={{ 
      position: 'absolute', 
      top: '16px', 
      right: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontSize: '12px',
      textAlign: 'right'
    }}>
      <div style={{ color: '#22c55e' }}>FPS: 144</div>
      <div style={{ color: '#f59e0b' }}>CPU: 45°C</div>
      <div style={{ color: '#3b82f6' }}>GPU: 78%</div>
    </div>
  </div>
);