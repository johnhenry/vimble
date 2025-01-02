// Base Types
export class InjectedConsole {
    #output: string[];
    #errors: string[];
    log(...output: string[]): void;
    info(...output: string[]): void;
    warn(...output: string[]): void;
    error(...output: string[]): void;
    result(): string;
}

export function run(code: string, globals?: object): Promise<void>;
export function runWithConsoleOutput(code: string, globals?: object): Promise<string>;
declare module "vimble" {
    export { run, runWithConsoleOutput, InjectedConsole};
}
declare module "vimble/injected-console" {
    export { InjectedConsole };
    export default InjectedConsole;
}
