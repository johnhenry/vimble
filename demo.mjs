import {runWithInjectedConsole} from "./src/index.mjs";
import { withFetch } from "./text.mjs";
console.log(await runWithInjectedConsole((`console.log(1 + 2);console.log(await four());`), {
    async four(){
        return 4;
    }
}));
console.log(await runWithInjectedConsole(withFetch, {
    fetch
 }));
