import { Middleware } from '@reduxjs/toolkit'

// Error handling middleware for Redux actions
export const errorHandlingMiddleware: Middleware = () => next => action => {
  try {
    return next(action)
  } catch (error) {
    console.error('Redux action error:', error)
    // Handle error (send to error reporting, show notification, etc.)
    return next(action)
  }
}