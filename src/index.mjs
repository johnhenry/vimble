/**
 * @module vimble/src/index
 * @description Core module providing functionality to execute code in isolated contexts
 */

import { InjectedConsole } from "./injected-console.mjs";
/** @type {string[]} Keys to remove from the global context */
const REMOVE_KEYS = ["0"];
/** @type {string[]} Additional keys to add to the context */
const ADD_KEYS = ["globalThis"];
/** @type {string[]} Final list of keys for the empty context */
const EMPTY_KEYS = Object.keys(globalThis)
  .concat(ADD_KEYS)
  .filter((key) => !REMOVE_KEYS.includes(key));
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
};

/** @type {string} Trailer code appended to all scripts */
const trailer = `
};
`;

const preview = (code, context) => {
  const fullBody =
    fillHeader(...new Set([...EMPTY_KEYS, ...Object.keys(context)])) +
    code +
    trailer;
  return encodeURIComponent(fullBody);
};

/**
 * Executes JavaScript code in an isolated context with specified global variables
 * @async
 * @param {string} code - The JavaScript code to execute
 * @param {Object} context - Object containing global variables to inject into the execution context
 * @returns {Promise<any>} Result of the executed code
 * @throws {Error} If code execution fails
 */
const run = async (code, context) => {
  const { timeout, signal } = context ?? {};
  const newContext = {
    ...EMPTY_CONTEXT,
    ...context,
  };
  // Remove meta-options from the execution context
  delete newContext.timeout;
  delete newContext.signal;

  const module = await import(
    "data:application/javascript," + preview(code, newContext)
  );

  if (timeout || signal) {
    const ac = new AbortController();
    const s = signal ?? ac.signal;
    let timer;

    const execution = module.default(newContext);
    const timeoutPromise = new Promise((_, reject) => {
      if (timeout) {
        timer = setTimeout(() => {
          ac.abort();
          reject(new Error(`Execution timed out after ${timeout}ms`));
        }, timeout);
      }
      if (signal) {
        signal.addEventListener("abort", () => {
          reject(new Error("Execution aborted"));
        }, { once: true });
      }
    });

    try {
      return await Promise.race([execution, timeoutPromise]);
    } finally {
      clearTimeout(timer);
    }
  }

  return await module.default(newContext);
};
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
  await run(code, {
    ...context,
    console: localConsole,
  });
  return localConsole.result;
};
export { run, runWithInjectedConsole, InjectedConsole, preview };
export default run;
