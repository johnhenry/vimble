import { Script, createContext, SourceTextModule } from './src/index.mjs';
import { InjectedConsole } from "./src/injected-console.mjs";
import { createRunScript, createRunSourceTextModule } from "./src/create-run.mjs";
const run = createRunScript({Script, createContext, InjectedConsole});
import {withFetch} from "./text.mjs";
console.log(await run((withFetch), {
        fetch
        }));
const runSourceTextModule = createRunSourceTextModule({SourceTextModule, createContext, InjectedConsole});
console.log(await runSourceTextModule((withFetch), {
        fetch
        }));