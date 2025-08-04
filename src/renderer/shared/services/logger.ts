import { app } from 'electron'

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4,
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  category: string
  message: string
  data?: any
  error?: Error
  userId?: string
  sessionId?: string
}

export interface LoggerConfig {
  level: LogLevel
  enableConsole: boolean
  enableFile: boolean
  enableRemote: boolean
  maxFileSize: number
  maxFiles: number
  remoteEndpoint?: string
}

class Logger {
  private config: LoggerConfig
  private sessionId: string
  private userId?: string

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: LogLevel.INFO,
      enableConsole: true,
      enableFile: true,
      enableRemote: false,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      ...config,
    }
    
    this.sessionId = this.generateSessionId()
    this.initializeLogger()
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private initializeLogger(): void {
    // Set up global error handlers
    if (typeof window !== 'undefined') {
      window.addEventListener('error', this.handleGlobalError.bind(this))
      window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this))
    }

    // Set up process error handlers for Electron
    if (typeof process !== 'undefined') {
      process.on('uncaughtException', this.handleUncaughtException.bind(this))
      process.on('unhandledRejection', this.handleUnhandledRejection.bind(this))
    }
  }

  private handleGlobalError(event: ErrorEvent): void {
    this.error('Global Error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    })
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent): void {
    this.error('Unhandled Promise Rejection', {
      reason: event.reason,
      promise: event.promise,
    })
  }

  private handleUncaughtException(error: Error): void {
    this.error('Uncaught Exception', error)
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.config.level
  }

  private formatMessage(level: LogLevel, category: string, message: string): string {
    const timestamp = new Date().toISOString()
    const levelName = LogLevel[level]
    return `[${timestamp}] [${levelName}] [${category}] ${message}`
  }

  private createLogEntry(
    level: LogLevel,
    category: string,
    message: string,
    data?: any,
    error?: Error
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data,
      error,
      userId: this.userId,
      sessionId: this.sessionId,
    }
  }

  private async writeToFile(entry: LogEntry): Promise<void> {
    if (!this.config.enableFile) return

    try {
      // In Electron renderer, send to main process for file writing
      if (window.electronAPI?.logger) {
        await window.electronAPI.logger.writeLog(entry)
      }
    } catch (error) {
      console.error('Failed to write log to file:', error)
    }
  }

  private logToConsole(entry: LogEntry): void {
    if (!this.config.enableConsole) return

    const formattedMessage = this.formatMessage(entry.level, entry.category, entry.message)
    
    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(formattedMessage, entry.data, entry.error)
        break
      case LogLevel.WARN:
        console.warn(formattedMessage, entry.data)
        break
      case LogLevel.INFO:
        console.info(formattedMessage, entry.data)
        break
      case LogLevel.DEBUG:
        console.debug(formattedMessage, entry.data)
        break
      case LogLevel.TRACE:
        console.trace(formattedMessage, entry.data)
        break
    }
  }

  private async sendToRemote(entry: LogEntry): Promise<void> {
    if (!this.config.enableRemote || !this.config.remoteEndpoint) return

    try {
      await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      })
    } catch (error) {
      console.error('Failed to send log to remote endpoint:', error)
    }
  }

  private async processLogEntry(entry: LogEntry): Promise<void> {
    // Always log to console in development
    if (process.env.NODE_ENV === 'development') {
      this.logToConsole(entry)
    }

    // Write to file
    await this.writeToFile(entry)

    // Send to remote logging service
    await this.sendToRemote(entry)
  }

  public setUserId(userId: string): void {
    this.userId = userId
  }

  public setLogLevel(level: LogLevel): void {
    this.config.level = level
  }

  public error(message: string, data?: any, error?: Error): void {
    if (!this.shouldLog(LogLevel.ERROR)) return
    
    const entry = this.createLogEntry(LogLevel.ERROR, 'ERROR', message, data, error)
    this.processLogEntry(entry)
  }

  public warn(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.WARN)) return
    
    const entry = this.createLogEntry(LogLevel.WARN, 'WARN', message, data)
    this.processLogEntry(entry)
  }

  public info(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.INFO)) return
    
    const entry = this.createLogEntry(LogLevel.INFO, 'INFO', message, data)
    this.processLogEntry(entry)
  }

  public debug(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return
    
    const entry = this.createLogEntry(LogLevel.DEBUG, 'DEBUG', message, data)
    this.processLogEntry(entry)
  }

  public trace(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.TRACE)) return
    
    const entry = this.createLogEntry(LogLevel.TRACE, 'TRACE', message, data)
    this.processLogEntry(entry)
  }

  // Category-specific logging methods
  public game(message: string, data?: any): void {
    const entry = this.createLogEntry(LogLevel.INFO, 'GAME', message, data)
    this.processLogEntry(entry)
  }

  public performance(message: string, data?: any): void {
    const entry = this.createLogEntry(LogLevel.INFO, 'PERFORMANCE', message, data)
    this.processLogEntry(entry)
  }

  public ui(message: string, data?: any): void {
    const entry = this.createLogEntry(LogLevel.DEBUG, 'UI', message, data)
    this.processLogEntry(entry)
  }

  public api(message: string, data?: any): void {
    const entry = this.createLogEntry(LogLevel.DEBUG, 'API', message, data)
    this.processLogEntry(entry)
  }

  public security(message: string, data?: any): void {
    const entry = this.createLogEntry(LogLevel.WARN, 'SECURITY', message, data)
    this.processLogEntry(entry)
  }

  // Performance monitoring
  public time(label: string): void {
    console.time(label)
  }

  public timeEnd(label: string): void {
    console.timeEnd(label)
  }

  public group(label: string): void {
    console.group(label)
  }

  public groupEnd(): void {
    console.groupEnd()
  }
}

// Create and export singleton instance
export const logger = new Logger({
  level: process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsole: true,
  enableFile: true,
  enableRemote: process.env.NODE_ENV === 'production',
})

// Export types and classes
export { Logger }
export default logger