/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.{js,jsx,ts,tsx}',
    '**/*.(test|spec).{js,jsx,ts,tsx}'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/renderer/$1',
    '^@main/(.*)$': '<rootDir>/src/main/$1',
    '^@preload/(.*)$': '<rootDir>/src/preload/$1',
    '^@shared/(.*)$': '<rootDir>/src/renderer/shared/$1',
    '^@features/(.*)$': '<rootDir>/src/renderer/features/$1',
    '^@components/(.*)$': '<rootDir>/src/renderer/shared/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/renderer/shared/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/renderer/shared/utils/$1',
    '^@types/(.*)$': '<rootDir>/src/renderer/shared/types/$1',
    '^@services/(.*)$': '<rootDir>/src/renderer/shared/services/$1',
    '^@store/(.*)$': '<rootDir>/src/renderer/store/$1',
    '^@assets/(.*)$': '<rootDir>/src/renderer/assets/$1'
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx'
  ],
  modulePaths: [],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main/index.ts',
    '!src/**/index.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover',
    'html'
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.ts'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/'
  ],
  watchPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/'
  ],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: {
        jsx: 'react-jsx'
      }
    }
  },
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  verbose: true,
  
  // Mock Electron APIs
  setupFiles: [
    '<rootDir>/tests/mocks/electron.js'
  ]
}