declare module 'dotenv' {
  interface DotenvConfigOptions {
    path?: string;
    encoding?: string;
    debug?: boolean;
    override?: boolean;
  }

  interface DotenvConfigOutput {
    parsed?: { [key: string]: string };
    error?: Error;
  }

  interface DotenvModule {
    config(options?: DotenvConfigOptions): DotenvConfigOutput;
  }

  const dotenv: DotenvModule;
  export default dotenv;
} 