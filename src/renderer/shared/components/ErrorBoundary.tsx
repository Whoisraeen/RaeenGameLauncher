import React, { Component, ErrorInfo, ReactNode } from 'react'
import { errorHandler, RaeenError } from '@services/errorHandler'
import { logger } from '@services/logger'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, errorId: string, retry: () => void) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  feature?: string
  level?: 'page' | 'feature' | 'component'
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorId: string | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryCount = 0
  private maxRetries = 3

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError, feature, level = 'component' } = this.props

    // Create error context
    const context = {
      component: feature || 'unknown',
      level,
      retryCount: this.retryCount,
      componentStack: errorInfo.componentStack,
    }

    // Report error
    const errorId = errorHandler.reportError(error, context)

    // Update state with error details
    this.setState({
      errorId,
      errorInfo,
    })

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo)
    }

    // Log error
    logger.error('React Error Boundary caught error', {
      errorId,
      feature,
      level,
      componentStack: errorInfo.componentStack,
    }, error)
  }

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++
      this.setState({
        hasError: false,
        error: null,
        errorId: null,
        errorInfo: null,
      })
      
      logger.info('Error boundary retry attempt', {
        retryCount: this.retryCount,
        feature: this.props.feature,
      })
    }
  }

  private handleReload = () => {
    window.location.reload()
  }

  private handleRestart = () => {
    if (window.electronAPI?.app) {
      window.electronAPI.app.restart()
    }
  }

  private renderDefaultFallback(error: Error, errorId: string): ReactNode {
    const { level = 'component', feature } = this.props
    const canRetry = this.retryCount < this.maxRetries

    if (level === 'page') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-destructive">Page Error</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This page encountered an unexpected error and couldn't load properly.
              </p>
              {process.env.NODE_ENV === 'development' && (
                <details className="text-xs">
                  <summary>Error Details</summary>
                  <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                    {error.message}
                    {error.stack && `\n\n${error.stack}`}
                  </pre>
                </details>
              )}
              <div className="flex gap-2">
                <Button onClick={this.handleReload} className="flex-1">
                  Reload Page
                </Button>
                <Button onClick={this.handleRestart} variant="outline" className="flex-1">
                  Restart App
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Error ID: {errorId}
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (level === 'feature') {
      return (
        <Card className="m-4">
          <CardHeader>
            <CardTitle className="text-destructive">
              {feature ? `${feature} Error` : 'Feature Error'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This feature encountered an error and couldn't load properly.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="text-xs">
                <summary>Error Details</summary>
                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                  {error.message}
                </pre>
              </details>
            )}
            <div className="flex gap-2">
              {canRetry && (
                <Button onClick={this.handleRetry} className="flex-1">
                  Try Again ({this.maxRetries - this.retryCount} left)
                </Button>
              )}
              <Button onClick={this.handleReload} variant="outline" className="flex-1">
                Reload App
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Error ID: {errorId}
            </p>
          </CardContent>
        </Card>
      )
    }

    // Component level error
    return (
      <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
        <div className="flex items-center gap-2 text-destructive mb-2">
          <span className="text-sm font-medium">Component Error</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          A component failed to render properly.
        </p>
        {canRetry && (
          <Button size="sm" onClick={this.handleRetry} className="mr-2">
            Retry ({this.maxRetries - this.retryCount} left)
          </Button>
        )}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-2 text-xs">
            <summary>Error Details</summary>
            <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    )
  }

  render() {
    const { hasError, error, errorId } = this.state
    const { children, fallback } = this.props

    if (hasError && error && errorId) {
      if (fallback) {
        return fallback(error, errorId, this.handleRetry)
      }
      return this.renderDefaultFallback(error, errorId)
    }

    return children
  }
}

// HOC for wrapping components with error boundaries
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// Hook for reporting errors from components
export function useErrorHandler() {
  const reportError = (error: Error | string, context?: any) => {
    const errorObj = typeof error === 'string' ? new Error(error) : error
    return errorHandler.reportError(errorObj, context)
  }

  const reportGameError = (message: string, gameId?: string, context?: any) => {
    return errorHandler.reportGameError(message, gameId, context)
  }

  const reportUIError = (message: string, component?: string, context?: any) => {
    return errorHandler.reportUIError(message, component, context)
  }

  const reportNetworkError = (message: string, context?: any) => {
    return errorHandler.reportNetworkError(message, context)
  }

  return {
    reportError,
    reportGameError,
    reportUIError,
    reportNetworkError,
  }
}