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

const run = async (code, context) => {
    const newContext = {
        ...EMPTY_CONTEXT,
        ...context
    };
    const fullBody = fillHeader(...new Set([...EMPTY_KEYS, ...Object.keys(newContext)])) + code + trailer;
    try {
        const module = await import(
            'data:application/javascript,' + encodeURIComponent(fullBody)
        );
        return await module.default(context);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const runWithConsoleOutput = async (code, context) => {
    const localConsole = new InjectedConsole();
    await run (code, {
        ...context,
        console:localConsole
    });
    return localConsole.result;
}
export { run, runWithConsoleOutput, InjectedConsole };
export default run;