import {runWithConsoleOutput} from "./src/index.mjs";
import { withFetch } from "./text.mjs";
console.log(await runWithConsoleOutput((`console.log(1 + 2);console.log(await four());`), {
    async four(){
        return 4;
    }
}));
console.log(await runWithConsoleOutput(withFetch, {
    fetch
 }));