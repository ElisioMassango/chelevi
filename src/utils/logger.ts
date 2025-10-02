// Logger utility for debugging
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

class Logger {
  private level: LogLevel;

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level;
  }

  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}]`;
    
    if (data) {
      return `${prefix} ${message} ${JSON.stringify(data, null, 2)}`;
    }
    return `${prefix} ${message}`;
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage('DEBUG', message, data));
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage('INFO', message, data));
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage('WARN', message, data));
    }
  }

  error(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage('ERROR', message, data));
    }
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  // API specific logging
  apiRequest(method: string, url: string, data?: any): void {
    this.debug(`API Request: ${method} ${url}`, data);
  }

  apiResponse(method: string, url: string, status: number, data?: any): void {
    this.debug(`API Response: ${method} ${url} - Status: ${status}`, data);
  }

  apiError(method: string, url: string, error: any): void {
    this.error(`API Error: ${method} ${url}`, error);
  }

  // User action logging
  userAction(action: string, data?: any): void {
    this.info(`User Action: ${action}`, data);
  }

  // Performance logging
  performance(operation: string, duration: number): void {
    this.info(`Performance: ${operation} took ${duration}ms`);
  }
}

// Create a singleton instance
export const logger = new Logger(
  process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO
);

export default logger;
