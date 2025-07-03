declare module 'redis' {
  export interface RedisClientOptions {
    url?: string;
    host?: string;
    port?: number;
    password?: string;
    db?: number;
  }

  export interface RedisClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<string>;
    setEx(key: string, seconds: number, value: string): Promise<string>;
    del(key: string): Promise<number>;
    exists(key: string): Promise<number>;
    expire(key: string, seconds: number): Promise<number>;
    ttl(key: string): Promise<number>;
    keys(pattern: string): Promise<string[]>;
    flushdb(): Promise<string>;
    quit(): Promise<string>;
  }

  export function createClient(options?: RedisClientOptions): RedisClient;
} 