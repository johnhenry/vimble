import { Script, createContext, SourceTextModule } from "node:vm";
import { InjectedConsole } from "./src/injected-console.mjs";
import { wrapAsync } from "./src/wrap-async.mjs";
import { createRunScript, createRunSourceTextModule } from "./src/create-run.mjs";
import {withFetch} from "./text.mjs";

const run = createRunScript({Script, createContext, InjectedConsole});
console.log(await run(wrapAsync(`console.log(1 + 2);console.log(await four());`), {
    async four(){
        return 4;
    }
}));
const runSourceTextModule = createRunSourceTextModule({SourceTextModule, createContext, InjectedConsole});
console.log(await runSourceTextModule(withFetch, {
   fetch
}));