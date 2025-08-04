import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { colors, lightTheme, darkTheme } from '../design-system/tokens';
import GlobalStyles from '../src/styles/GlobalStyles';

// Gaming-themed backgrounds for Storybook
const gamingBackgrounds = [
  {
    name: 'Dark Gaming',
    value: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
  },
  {
    name: 'Light Gaming',
    value: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
  },
  {
    name: 'Neon Dark',
    value: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 100%)',
  },
  {
    name: 'Cyberpunk',
    value: 'linear-gradient(135deg, #0d1117 0%, #1c1c3a 25%, #2d1b69 50%, #0a4d4a 100%)',
  }
];

// Storybook configuration
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'Dark Gaming',
    values: gamingBackgrounds,
  },
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '375px',
          height: '667px',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1280px',
          height: '720px',
        },
      },
      ultrawide: {
        name: 'Ultrawide',
        styles: {
          width: '2560px',
          height: '1080px',
        },
      },
      gaming4k: {
        name: 'Gaming 4K',
        styles: {
          width: '3840px',
          height: '2160px',
        },
      },
    },
  },
  docs: {
    theme: {
      base: 'dark',
      brandTitle: 'Raeen Design System',
      brandUrl: 'https://raeen.dev',
    },
  },
};

// Global decorators
export const decorators = [
  (Story, context) => {
    const isDark = context.globals.backgrounds?.value?.includes('Dark') || 
                  context.globals.backgrounds?.value?.includes('Neon') ||
                  context.globals.backgrounds?.value?.includes('Cyberpunk');
    
    const theme = {
      ...(isDark ? darkTheme : lightTheme),
      colors,
      isDark,
      isLight: !isDark,
    };

    return (
      <ThemeProvider>
        <StyledThemeProvider theme={theme}>
          <GlobalStyles />
          <div style={{ 
            minHeight: '100vh', 
            padding: '20px',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            <Story />
          </div>
        </StyledThemeProvider>
      </ThemeProvider>
    );
  },
];

// Global types for Storybook controls
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dark',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light Theme' },
        { value: 'dark', title: 'Dark Theme' },
        { value: 'neon', title: 'Gaming Neon' },
        { value: 'cyberpunk', title: 'Cyberpunk' },
      ],
    },
  },
};