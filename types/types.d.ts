// Base Types
export class Script {
    constructor(code: string);
    code: string;
    runInContext(context: object): Promise<void>;
    runInThisContext(): Promise<void>;
    runInNewContext(): Promise<void>;
    sourceMapURL: string;
}
export function createContext(context: object): object;
export type constants = {
    DONT_CONTEXTIFY: Symbol;
};
export class InjectedConsole {
    #output: string[];
    #errors: string[];
    log(...output: string[]): void;
    info(...output: string[]): void;
    warn(...output: string[]): void;
    error(...output: string[]): void;
    result(): string;
}
declare module "vimble" {
    export { Script, createContext, constants, InjectedConsole};
}
declare module "vimble/injected-console" {
    export { InjectedConsole };
    export default InjectedConsole;
}
export function run(code: string, globals?: object): Promise<string>;
export function createRunScript({Script, createContext, InjectedConsole}: {Script: typeof Script, createContext: typeof createContext, InjectedConsole: typeof InjectedConsole}): typeof run;
export function wrapAsync(code: string): string;
declare module "vimble/create-run" {
    export { createRunScript };
    export default createRunScript;
}
declare module "vimble/wrap-async" {
    export { wrapAsync };
    export default wrapAsync;
}