import { Middleware } from '@reduxjs/toolkit'

// API middleware
import { gameStoreApi } from './slices/api/gameStoreApi'
import { systemInfoApi } from './slices/api/systemInfoApi'
import { communityApi } from './slices/api/communityApi'

// Custom middleware
import { errorHandlingMiddleware } from './middleware/errorHandling'
import { loggingMiddleware } from './middleware/logging'
import { performanceMiddleware } from './middleware/performance'
import { electronIpcMiddleware } from './middleware/electronIpc'

export const middleware: Middleware[] = [
  // RTK Query API middleware
  gameStoreApi.middleware,
  systemInfoApi.middleware,
  communityApi.middleware,

  // Custom middleware
  errorHandlingMiddleware,
  loggingMiddleware,
  performanceMiddleware,
  electronIpcMiddleware,
]