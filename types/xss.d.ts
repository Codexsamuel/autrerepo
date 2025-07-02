declare module 'xss' {
  interface XSSOptions {
    whiteList?: Record<string, string[]>;
    stripIgnoreTag?: boolean;
    stripIgnoreTagBody?: string[];
    [key: string]: any;
  }
  function xss(input: string, options?: XSSOptions): string;
  export default xss;
} 