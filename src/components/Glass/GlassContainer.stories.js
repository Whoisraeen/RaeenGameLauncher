/**
 * Raeen Launcher Design System - GlassContainer Stories
 * Storybook stories for the glassmorphism container component
 */

import React from 'react';
import { GlassContainer, GlassCard, GlassModal, GlassWidget, GlassGameCard } from './GlassContainer';

export default {
  title: 'Design System/Glass/GlassContainer',
  component: GlassContainer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Premium glassmorphism container component with multiple variants and gaming-specific styling options.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['subtle', 'standard', 'strong', 'ultra'],
      description: 'Glass effect intensity'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Container size preset'
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Enable hover/focus interactions'
    },
    gaming: {
      control: { type: 'boolean' },
      description: 'Enable gaming-specific styling'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Make container full width'
    },
    centered: {
      control: { type: 'boolean' },
      description: 'Center content'
    },
    flex: {
      control: { type: 'boolean' },
      description: 'Enable flexbox layout'
    },
    gap: {
      control: { type: 'number' },
      description: 'Gap between children (spacing scale)'
    }
  }
};

// Template for stories
const Template = (args) => (
  <GlassContainer {...args}>
    <h3>Glass Container</h3>
    <p>This is a premium glassmorphism container with customizable styling options.</p>
    <button style={{ padding: '8px 16px', background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: 'inherit' }}>
      Sample Button
    </button>
  </GlassContainer>
);

// Default story
export const Default = Template.bind({});
Default.args = {
  variant: 'standard',
  size: 'md',
  interactive: false,
  gaming: false
};

// Variants showcase
export const Variants = () => (
  <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
    <GlassContainer variant="subtle" size="md">
      <h4>Subtle Glass</h4>
      <p>Light glass effect for backgrounds</p>
    </GlassContainer>
    
    <GlassContainer variant="standard" size="md">
      <h4>Standard Glass</h4>
      <p>Default glass effect for most components</p>
    </GlassContainer>
    
    <GlassContainer variant="strong" size="md">
      <h4>Strong Glass</h4>
      <p>Enhanced glass effect for important elements</p>
    </GlassContainer>
    
    <GlassContainer variant="ultra" size="md">
      <h4>Ultra Glass</h4>
      <p>Maximum glass effect for modals and overlays</p>
    </GlassContainer>
  </div>
);

// Interactive examples
export const Interactive = () => (
  <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
    <GlassContainer variant="standard" size="md" interactive>
      <h4>Interactive Container</h4>
      <p>Hover me to see the glass effect change</p>
    </GlassContainer>
    
    <GlassContainer variant="standard" size="md" interactive gaming>
      <h4>Gaming Interactive</h4>
      <p>Gaming-enhanced interactive container</p>
    </GlassContainer>
  </div>
);

// Gaming theme examples
export const Gaming = () => (
  <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
    <GlassContainer variant="standard" size="md" gaming>
      <h4>Gaming Container</h4>
      <p>Standard gaming-themed container</p>
    </GlassContainer>
    
    <GlassContainer variant="strong" size="md" gaming interactive>
      <h4>Gaming Interactive</h4>
      <p>Enhanced gaming container with interactions</p>
    </GlassContainer>
  </div>
);

// Layout examples
export const Layouts = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <GlassContainer variant="standard" size="md" flex flexDirection="row" gap={4}>
      <div style={{ flex: 1, padding: '16px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>Item 1</div>
      <div style={{ flex: 1, padding: '16px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px' }}>Item 2</div>
      <div style={{ flex: 1, padding: '16px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '8px' }}>Item 3</div>
    </GlassContainer>
    
    <GlassContainer variant="standard" size="md" grid gridCols="repeat(3, 1fr)" gap={4}>
      <div style={{ padding: '16px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>Grid Item 1</div>
      <div style={{ padding: '16px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px' }}>Grid Item 2</div>
      <div style={{ padding: '16px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '8px' }}>Grid Item 3</div>
    </GlassContainer>
  </div>
);

// Specialized containers
export const SpecializedContainers = () => (
  <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
    <GlassCard>
      <h4>Glass Card</h4>
      <p>Pre-configured card with standard glass and interactive hover effects.</p>
    </GlassCard>
    
    <GlassWidget>
      <h4>Performance Widget</h4>
      <p>Gaming-optimized widget with strong glass effect.</p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <span style={{ color: '#22c55e' }}>CPU: 45%</span>
        <span style={{ color: '#f59e0b' }}>GPU: 78%</span>
        <span style={{ color: '#3b82f6' }}>RAM: 12GB</span>
      </div>
    </GlassWidget>
    
    <GlassGameCard>
      <h4>Cyberpunk 2077</h4>
      <p>Action RPG • Last played 2 hours ago</p>
      <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
        <button style={{ 
          padding: '6px 12px', 
          background: 'rgba(34, 197, 94, 0.2)', 
          border: '1px solid rgba(34, 197, 94, 0.3)', 
          borderRadius: '6px', 
          color: 'inherit',
          fontSize: '14px'
        }}>
          Play
        </button>
        <button style={{ 
          padding: '6px 12px', 
          background: 'rgba(99, 102, 241, 0.2)', 
          border: '1px solid rgba(99, 102, 241, 0.3)', 
          borderRadius: '6px', 
          color: 'inherit',
          fontSize: '14px'
        }}>
          Settings
        </button>
      </div>
    </GlassGameCard>
  </div>
);

// Performance widget showcase
export const PerformanceWidgets = () => (
  <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
    <GlassWidget>
      <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>FPS</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>144</div>
    </GlassWidget>
    
    <GlassWidget>
      <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>CPU TEMP</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>65°C</div>
    </GlassWidget>
    
    <GlassWidget>
      <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>GPU USAGE</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>87%</div>
    </GlassWidget>
    
    <GlassWidget>
      <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>RAM</div>
      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#8b5cf6' }}>12.4/32GB</div>
    </GlassWidget>
  </div>
);

// Modal example
export const ModalExample = () => (
  <div style={{ position: 'relative', height: '400px', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <GlassModal style={{ width: '400px', maxWidth: '90%' }}>
      <h3 style={{ marginBottom: '16px' }}>Game Settings</h3>
      <p style={{ marginBottom: '20px' }}>Configure your game preferences and performance settings.</p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button style={{ 
          padding: '8px 16px', 
          background: 'rgba(99, 102, 241, 0.2)', 
          border: '1px solid rgba(99, 102, 241, 0.3)', 
          borderRadius: '6px', 
          color: 'inherit'
        }}>
          Save
        </button>
        <button style={{ 
          padding: '8px 16px', 
          background: 'rgba(239, 68, 68, 0.2)', 
          border: '1px solid rgba(239, 68, 68, 0.3)', 
          borderRadius: '6px', 
          color: 'inherit'
        }}>
          Cancel
        </button>
      </div>
    </GlassModal>
  </div>
);