import { Middleware } from '@reduxjs/toolkit'

// Logging middleware for development
export const loggingMiddleware: Middleware = () => next => action => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Dispatching action:', action)
  }
  return next(action)
}