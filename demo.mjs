import { Script, createContext, SourceTextModule } from './src/index.mjs';
import { InjectedConsole } from "./src/injected-console.mjs";
import { createRunScript, createRunSourceTextModule } from "./src/create-run.mjs";
import { withFetch } from "./text.mjs";

const run = createRunScript({Script, createContext, InjectedConsole});
console.log(await run((`console.log(1 + 2);console.log(await four());`), {
    async four(){
        return 4;
    }
}));
const runSourceTextModule = createRunSourceTextModule({SourceTextModule, createContext, InjectedConsole});
console.log(await runSourceTextModule(withFetch, {
   fetch
}));