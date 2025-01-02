export { InjectedConsole } from "./injected-console.mjs"
// CONSTANTS
const constatns = {
    DONT_CONTEXTIFY: Symbol('context_no_contextify')
}
// CREATE CONTEXT
const REMOVE_KEYS = ['0'];
const ADD_KEYS = ['globalThis'];
const EMPTY_KEYS = Object.keys(globalThis).concat(ADD_KEYS).filter(key => !REMOVE_KEYS.includes(key));
const EMPTY_CONTEXT = Object.create(null);
for (const key of EMPTY_KEYS) {
    EMPTY_CONTEXT[key] = undefined;
}
const createContext = (context)=>{
    // TODO: This can probably be simplified
    if(context === constatns.DONT_CONTEXTIFY){
        return Object.create(globalThis);
    }
    return {
        ...EMPTY_CONTEXT,
        ...context
    };
}
// SCRIPT
const Script = class {
    static trailer = `
};
`;
    static fillHeader (...keys){
        return `
            "use strict";
            export default async function({${keys.join(", ")}}){
    `;
    }
    #code = ""
    #sourceMapURL = null
    constructor(code) {
        this.#code = code;
        const match = this.#code.match(/\/\/# sourceMappingURL=(.*)/);
        if (match) {
            this.#sourceMapURL = match[1];
        }
    }
    get code() {
        return this.#code;
    }
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
    runInThisContext(_options) {
        const context = createContext(constatns.DONT_CONTEXTIFY);
        return this.runInContext(context, _options);
    }
    runInNewContext(_options) {
        const context = createContext(Object.create(null));
        return this.runInContext(context, _options);
    }
    get sourceMapURL() {
        this.#sourceMapURL;
    }
}
const SourceTextModule = class {
    #script = null;
    #context = {}
    constructor(code, {context}= {}) {
        this.#script = new Script(code);
        this.#context = createContext(context);
    }
    evaluate(){
        return this.#script.runInContext(this.#context);
    }
    link(){

    }
}

export { constatns, createContext, Script, SourceTextModule };