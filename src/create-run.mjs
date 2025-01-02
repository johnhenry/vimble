/**
 * @module vimble/src/create-run
 * @description Factory functions for creating script and module runners with isolated contexts
 */

/** @type {Object} Default empty globals object */
const GLOBALS = {};

/**
 * Creates a function that can run scripts in an isolated context
 * @param {Object} params - The required dependencies
 * @param {typeof import('./index.mjs').Script} params.Script - The Script class
 * @param {typeof import('./index.mjs').createContext} params.createContext - Context creation function
 * @param {typeof import('./injected-console.mjs').InjectedConsole} params.InjectedConsole - Console implementation
 * @returns {(code: string, globals?: Object) => Promise<string|undefined>} Function to run scripts
 */
const createRunScript = ({Script, createContext, InjectedConsole}) =>async (code, globals = GLOBALS ) => {
    const context = createContext({...globals, console: new InjectedConsole()});
    // Create a new script
    const script = new Script(code);
    // Run the script in the context
    await script.runInContext(context);
    return context.console?.result;
};

/**
 * Creates a function that can run ES modules in an isolated context
 * @param {Object} params - The required dependencies
 * @param {typeof import('./index.mjs').SourceTextModule} params.SourceTextModule - The SourceTextModule class
 * @param {typeof import('./index.mjs').createContext} params.createContext - Context creation function
 * @param {typeof import('./injected-console.mjs').InjectedConsole} params.InjectedConsole - Console implementation
 * @returns {(code: string, globals?: Object) => Promise<string|undefined>} Function to run modules
 */
const createRunSourceTextModule = ({SourceTextModule, createContext, InjectedConsole}) =>async (code, globals = GLOBALS ) => {
    const context = createContext({...globals, console: new InjectedConsole()});
    const module = new SourceTextModule(code, {context});
    await module.link(()=>{});
    await module.evaluate();
    return context.console?.result;
};

export { createRunScript, createRunSourceTextModule };
export default createRunScript;
