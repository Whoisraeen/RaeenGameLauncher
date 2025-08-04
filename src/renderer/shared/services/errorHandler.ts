import { logger } from './logger'

export interface ErrorContext {
  component?: string
  action?: string
  userId?: string
  gameId?: string
  feature?: string
  [key: string]: any
}

export interface ErrorReport {
  id: string
  timestamp: string
  message: string
  stack?: string
  context: ErrorContext
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: 'ui' | 'game' | 'performance' | 'network' | 'system' | 'unknown'
  reproduced: boolean
  userAgent?: string
  version: string
}

export class RaeenError extends Error {
  public readonly context: ErrorContext
  public readonly severity: ErrorReport['severity']
  public readonly category: ErrorReport['category']
  public readonly timestamp: string
  public readonly id: string

  constructor(
    message: string,
    context: ErrorContext = {},
    severity: ErrorReport['severity'] = 'medium',
    category: ErrorReport['category'] = 'unknown'
  ) {
    super(message)
    this.name = 'RaeenError'
    this.context = context
    this.severity = severity
    this.category = category
    this.timestamp = new Date().toISOString()
    this.id = this.generateErrorId()
  }

  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  toReport(): ErrorReport {
    return {
      id: this.id,
      timestamp: this.timestamp,
      message: this.message,
      stack: this.stack,
      context: this.context,
      severity: this.severity,
      category: this.category,
      reproduced: false,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      version: process.env.npm_package_version || '1.0.0',
    }
  }
}

class ErrorHandler {
  private errorReports: Map<string, ErrorReport> = new Map()
  private maxReports = 1000
  private isInitialized = false

  public initialize(): void {
    if (this.isInitialized) return

    // Set up global error handlers
    if (typeof window !== 'undefined') {
      window.addEventListener('error', this.handleGlobalError.bind(this))
      window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this))
    }

    this.isInitialized = true
    logger.info('Error handler initialized')
  }

  private handleGlobalError(event: ErrorEvent): void {
    const error = new RaeenError(
      event.message || 'Unknown error',
      {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        component: 'global',
      },
      'high',
      'system'
    )

    this.reportError(error)
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent): void {
    const error = new RaeenError(
      `Unhandled promise rejection: ${event.reason}`,
      {
        reason: event.reason,
        component: 'promise',
      },
      'high',
      'system'
    )

    this.reportError(error)
  }

  public reportError(error: Error | RaeenError, context?: ErrorContext): string {
    let raeenError: RaeenError

    if (error instanceof RaeenError) {
      raeenError = error
      // Merge additional context if provided
      if (context) {
        raeenError.context = { ...raeenError.context, ...context }
      }
    } else {
      raeenError = new RaeenError(
        error.message,
        { ...context, originalError: error.name },
        'medium',
        'unknown'
      )
      raeenError.stack = error.stack
    }

    const report = raeenError.toReport()
    this.storeReport(report)
    this.logError(raeenError)
    this.notifyUser(raeenError)

    // Send to crash reporting service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToCrashReporting(report)
    }

    return report.id
  }

  private storeReport(report: ErrorReport): void {
    // Maintain max reports limit
    if (this.errorReports.size >= this.maxReports) {
      // Remove oldest report
      const oldestKey = this.errorReports.keys().next().value
      this.errorReports.delete(oldestKey)
    }

    this.errorReports.set(report.id, report)
  }

  private logError(error: RaeenError): void {
    logger.error(
      `[${error.category.toUpperCase()}] ${error.message}`,
      {
        errorId: error.id,
        severity: error.severity,
        context: error.context,
      },
      error
    )
  }

  private notifyUser(error: RaeenError): void {
    // Only show user notifications for high/critical errors
    if (error.severity === 'high' || error.severity === 'critical') {
      // Send notification to UI
      if (window.electronAPI?.notifications) {
        window.electronAPI.notifications.show({
          type: 'error',
          title: 'Application Error',
          message: this.getUserFriendlyMessage(error),
          errorId: error.id,
        })
      }
    }
  }

  private getUserFriendlyMessage(error: RaeenError): string {
    switch (error.category) {
      case 'game':
        return 'There was an issue with game management. Please try again.'
      case 'performance':
        return 'Performance monitoring encountered an issue.'
      case 'network':
        return 'Network connection issue. Please check your internet connection.'
      case 'ui':
        return 'There was a display issue. The interface may need to be refreshed.'
      case 'system':
        return 'A system error occurred. Please restart the application if issues persist.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  private async sendToCrashReporting(report: ErrorReport): Promise<void> {
    try {
      // Send to Sentry or other crash reporting service
      if (window.Sentry) {
        window.Sentry.captureException(new Error(report.message), {
          tags: {
            category: report.category,
            severity: report.severity,
          },
          contexts: {
            error_context: report.context,
          },
          extra: {
            errorId: report.id,
            version: report.version,
          },
        })
      }
    } catch (err) {
      logger.error('Failed to send error report to crash reporting service', err)
    }
  }

  public getErrorReport(errorId: string): ErrorReport | undefined {
    return this.errorReports.get(errorId)
  }

  public getAllErrorReports(): ErrorReport[] {
    return Array.from(this.errorReports.values())
  }

  public clearErrorReports(): void {
    this.errorReports.clear()
    logger.info('Error reports cleared')
  }

  public getErrorStats(): {
    total: number
    bySeverity: Record<string, number>
    byCategory: Record<string, number>
  } {
    const reports = this.getAllErrorReports()
    
    const bySeverity = reports.reduce((acc, report) => {
      acc[report.severity] = (acc[report.severity] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const byCategory = reports.reduce((acc, report) => {
      acc[report.category] = (acc[report.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      total: reports.length,
      bySeverity,
      byCategory,
    }
  }

  // Utility methods for specific error types
  public reportGameError(message: string, gameId?: string, context?: ErrorContext): string {
    const error = new RaeenError(
      message,
      { ...context, gameId },
      'medium',
      'game'
    )
    return this.reportError(error)
  }

  public reportPerformanceError(message: string, context?: ErrorContext): string {
    const error = new RaeenError(
      message,
      context,
      'low',
      'performance'
    )
    return this.reportError(error)
  }

  public reportNetworkError(message: string, context?: ErrorContext): string {
    const error = new RaeenError(
      message,
      context,
      'medium',
      'network'
    )
    return this.reportError(error)
  }

  public reportUIError(message: string, component?: string, context?: ErrorContext): string {
    const error = new RaeenError(
      message,
      { ...context, component },
      'low',
      'ui'
    )
    return this.reportError(error)
  }

  public reportCriticalError(message: string, context?: ErrorContext): string {
    const error = new RaeenError(
      message,
      context,
      'critical',
      'system'
    )
    return this.reportError(error)
  }
}

// Create and export singleton instance
export const errorHandler = new ErrorHandler()

// Auto-initialize
errorHandler.initialize()

export { ErrorHandler }
export default errorHandler