import '@testing-library/jest-dom'

// Mock Electron APIs
global.window.electronAPI = {
  games: {
    scanForGames: jest.fn(),
    launchGame: jest.fn(),
    updateGameMetadata: jest.fn(),
  },
  system: {
    getSystemInfo: jest.fn(),
    getPerformanceMetrics: jest.fn(),
  },
  ipc: {
    send: jest.fn(),
    on: jest.fn(),
    removeAllListeners: jest.fn(),
  },
  store: {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  },
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Suppress console.error for tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})