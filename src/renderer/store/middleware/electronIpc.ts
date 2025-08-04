import { Middleware } from '@reduxjs/toolkit'

// Middleware to sync certain actions with Electron main process
export const electronIpcMiddleware: Middleware = () => next => action => {
  const result = next(action)
  
  // Sync specific actions with main process
  const syncActions = [
    'gameLibrary/launchGame',
    'settings/updateGeneralSettings',
    'performance/enableGameMode',
  ]
  
  if (syncActions.some(actionType => action.type.startsWith(actionType))) {
    // Send to main process via IPC
    window.electronAPI?.ipc.send('redux-action', action)
  }
  
  return result
}