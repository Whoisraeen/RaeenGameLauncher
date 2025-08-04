import { Middleware } from '@reduxjs/toolkit'

// Performance monitoring middleware
export const performanceMiddleware: Middleware = () => next => action => {
  const start = performance.now()
  const result = next(action)
  const end = performance.now()
  
  if (process.env.NODE_ENV === 'development' && end - start > 10) {
    console.warn(`Slow action detected: ${action.type} took ${end - start}ms`)
  }
  
  return result
}