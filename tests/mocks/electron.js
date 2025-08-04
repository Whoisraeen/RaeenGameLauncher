// Mock Electron main process APIs
const electronMock = {
  app: {
    getVersion: () => '1.0.0',
    getName: () => 'Raeen Launcher',
    getPath: (name) => `/mock/path/${name}`,
    quit: jest.fn(),
    relaunch: jest.fn(),
    on: jest.fn(),
  },
  ipcMain: {
    handle: jest.fn(),
    on: jest.fn(),
    removeAllListeners: jest.fn(),
  },
  ipcRenderer: {
    invoke: jest.fn(),
    send: jest.fn(),
    on: jest.fn(),
    removeAllListeners: jest.fn(),
  },
  BrowserWindow: jest.fn(() => ({
    loadURL: jest.fn(),
    loadFile: jest.fn(),
    on: jest.fn(),
    once: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    close: jest.fn(),
    webContents: {
      send: jest.fn(),
      openDevTools: jest.fn(),
    },
  })),
  Menu: {
    setApplicationMenu: jest.fn(),
    buildFromTemplate: jest.fn(),
  },
  shell: {
    openExternal: jest.fn(),
    showItemInFolder: jest.fn(),
  },
  dialog: {
    showOpenDialog: jest.fn(),
    showSaveDialog: jest.fn(),
    showMessageBox: jest.fn(),
  },
}

// Set up the mock
if (typeof window !== 'undefined') {
  window.require = jest.fn((module) => {
    if (module === 'electron') {
      return electronMock
    }
    return {}
  })
}

module.exports = electronMock