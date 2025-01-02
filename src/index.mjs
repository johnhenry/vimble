/**
 * @module vimble/src/index
 * @description Core module providing functionality to execute code in isolated contexts
 */

import { InjectedConsole } from "./injected-console.mjs"
/** @type {string[]} Keys to remove from the global context */
const REMOVE_KEYS = ['0'];
/** @type {string[]} Additional keys to add to the context */
const ADD_KEYS = ['globalThis'];
/** @type {string[]} Final list of keys for the empty context */
const EMPTY_KEYS = Object.keys(globalThis).concat(ADD_KEYS).filter(key => !REMOVE_KEYS.includes(key));
/** @type {Object.<string, undefined>} Base empty context object */
const EMPTY_CONTEXT = Object.create(null);
for (const key of EMPTY_KEYS) {
    EMPTY_CONTEXT[key] = undefined;
}
/**
 * Generates the header for the script with given context keys
 * @param {...string} keys - Context keys to include in the function parameters
 * @returns {string} Generated header code
 */
const fillHeader = (...keys) => {
    return `
        "use strict";
        export default async function({${keys.join(", ")}}){
`;
}

/** @type {string} Trailer code appended to all scripts */
const trailer = `
};
`;


const preview = (code, context) => {
    const fullBody = fillHeader(...new Set([...EMPTY_KEYS, ...Object.keys(context)])) + code + trailer;
    return   encodeURIComponent(fullBody);
}

/**
 * Executes JavaScript code in an isolated context with specified global variables
 * @async
 * @param {string} code - The JavaScript code to execute
 * @param {Object} context - Object containing global variables to inject into the execution context
 * @returns {Promise<any>} Result of the executed code
 * @throws {Error} If code execution fails
 */
const run = async (code, context) => {
    const newContext = {
        ...EMPTY_CONTEXT,
        ...context
    };
    try {
        const module = await import('data:application/javascript,'+preview(code, newContext));
        return await module.default(newContext);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
/**
 * Executes JavaScript code with a custom console implementation and returns the console output
 * @async
 * @param {string} code - The JavaScript code to execute
 * @param {Object} [context={}] - Additional context variables to inject into the execution environment
 * @returns {Promise<string>} Console output from the code execution
 * @throws {Error} If code execution fails
 */
const runWithInjectedConsole = async (code, context) => {
    const localConsole = new InjectedConsole();
    await run (code, {
        ...context,
        console:localConsole
    });
    return localConsole.result;
}
export { run, runWithInjectedConsole, InjectedConsole, preview };
export default run;