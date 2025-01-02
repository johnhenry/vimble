# Vimble

Vimble allows you to execute code in an isolated context.

```javascript
import * as vimble from 'https://cdn.jsdelivr.net/npm/vimble@0.0.0/src/index.mjs';
// OR "https://ga.jspm.io/npm:vimble@0.0.0/src/index.mjs";
```

Or install via npm

```bash
npm install vimble
```

## Quick Start

```javascript
import run,  { InjectedConsole } from 'vimble';
const localConsole = new InjectedConsole();
await run('console.log(1 + 2);', { console: localConsole });
console.log(localConsole.result); // logs "3"
```


```javascript
import { runWithConsoleOutput } from 'vimble';
console.log(await runWithConsoleOutput('console.log(1 + 2);')); // logs "3"
```

## API

### run

### InjectedConsole

### runWithConsoleOutput

