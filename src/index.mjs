/**
 * @module vmb/src/index
 * @description Core module providing context creation and script execution functionality
 */

export { InjectedConsole } from "./injected-console.mjs"

/** @type {Object.<symbol, symbol>} Constants used throughout the module */
const constatns = {
    /** @type {symbol} Symbol indicating that context should not be modified */
    DONT_CONTEXTIFY: Symbol('context_no_contextify')
}

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
 * Creates a new execution context
 * @param {Object|symbol} context - The context object or DONT_CONTEXTIFY symbol
 * @returns {Object} A new context object
 */
const createContext = (context)=>{
    if(context === constatns.DONT_CONTEXTIFY){
        return Object.create(globalThis);
    }
    return {
        ...EMPTY_CONTEXT,
        ...context
    };
}

/**
 * Represents a script that can be executed in different contexts
 * @class
 */
const Script = class {
    /** @type {string} Trailer code appended to all scripts */
    static trailer = `
};
`;
    
    /**
     * Generates the header for the script with given context keys
     * @param {...string} keys - Context keys to include in the function parameters
     * @returns {string} Generated header code
     */
    static fillHeader (...keys){
        return `
            "use strict";
            export default async function({${keys.join(", ")}}){
    `;
    }

    /** @type {string} The script's source code */
    #code = ""
    /** @type {string|null} Source map URL if present */
    #sourceMapURL = null

    /**
     * Creates a new Script instance
     * @param {string} code - The source code to execute
     */
    constructor(code) {
        this.#code = code;
        const match = this.#code.match(/\/\/# sourceMappingURL=(.*)/);
        if (match) {
            this.#sourceMapURL = match[1];
        }
    }

    /** @returns {string} The script's source code */
    get code() {
        return this.#code;
    }

    /**
     * Executes the script in a given context
     * @param {Object} context - The context object to run the script in
     * @returns {Promise<any>} Result of the script execution
     * @throws {Error} If script execution fails
     */
    async runInContext(context) {
        const fullBody = Script.fillHeader(...new Set([...EMPTY_KEYS, ...Object.keys(context)])) + this.code + Script.trailer;
        let module;
        try {
            module = await import(
                URL.createObjectURL(
                new Blob([fullBody], {
                    type: "application/javascript",
                })
                )
            );
        } catch (error) {
            console.error(error);
            context.console?.error(error.message);
            throw error;
        }
        return await module.default(context);
    }

    /**
     * Runs the script in the current global context
     * @param {Object} _options - Execution options (currently unused)
     * @returns {Promise<any>} Result of the script execution
     */
    runInThisContext(_options) {
        const context = createContext(constatns.DONT_CONTEXTIFY);
        return this.runInContext(context, _options);
    }

    /**
     * Runs the script in a new empty context
     * @param {Object} _options - Execution options (currently unused)
     * @returns {Promise<any>} Result of the script execution
     */
    runInNewContext(_options) {
        const context = createContext(Object.create(null));
        return this.runInContext(context, _options);
    }

    /** @returns {string|null} The source map URL if present */
    get sourceMapURL() {
        return this.#sourceMapURL;
    }
}

/**
 * Represents an ES module that can be dynamically executed
 * @class
 */
const SourceTextModule = class {
    /** @type {Script|null} The underlying script instance */
    #script = null;
    /** @type {Object} The module's execution context */
    #context = {}

    /**
     * Creates a new SourceTextModule instance
     * @param {string} code - The module's source code
     * @param {Object} options - Module options
     * @param {Object} [options.context] - The context to execute the module in
     */
    constructor(code, {context}= {}) {
        this.#script = new Script(code);
        this.#context = createContext(context);
    }

    /**
     * Evaluates the module in its context
     * @returns {Promise<any>} Result of the module evaluation
     */
    evaluate(){
        return this.#script.runInContext(this.#context);
    }

    /**
     * Links the module (currently a no-op)
     * @returns {void}
     */
    link(){
    }
}

export { constatns, createContext, Script, SourceTextModule };