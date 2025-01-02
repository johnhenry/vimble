const GLOBALS = {};
const createRunScript = ({Script, createContext, InjectedConsole}) =>async (code, globals = GLOBALS ) => {
    const context = createContext({...globals, console: new InjectedConsole()});
    // Create a new script
    const script = new Script(code);
    // Run the script in the context
    await script.runInContext(context);
    return context.console?.result;
};
const createRunSourceTextModule = ({SourceTextModule, createContext, InjectedConsole}) =>async (code, globals = GLOBALS ) => {
    const context = createContext({...globals, console: new InjectedConsole()});
    const module = new SourceTextModule(code, {context});
    await module.link(()=>{});
    await module.evaluate();
    return context.console?.result;
};
export { createRunScript, createRunSourceTextModule };
export default createRunScript;
