declare module 'winston' {
  export interface LoggerOptions {
    level?: string;
    format?: any;
    transports?: any[];
  }

  export interface Logger {
    info(message: string, meta?: any): void;
    error(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
  }

  export function createLogger(options?: LoggerOptions): Logger;
  export const format: any;
  export const transports: any;
} 