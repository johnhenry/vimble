# VMB

VMB leverages a _subset of_ [node's vm api](https://nodejs.org/api/vm.html),
to run browser code in sandboxed ennvironments.

```javascript
import vmb from 'https://cdn.jsdelivr.net/npm/vmb@0.0.0/src/index.mjs';
// OR "https://ga.jspm.io/npm:vmb@0.0.0/src/index.mjs";
```

Or install via npm

```bash
npm install vmb
```

## Usage Examples: Script

The following example uses `Script` to run synchronous code.

Note: `vmb.Script`' is capable of running asynchronous code, while `node:vm.Script` is not.

```javascript
import { Script, createContext } from 'https://cdn.jsdelivr.net/npm/vmb@0.0.0/src/index.mjs';
import { InjectedConsole } from 'https://cdn.jsdelivr.net/npm/vmb@0.0.0/src/inkected-console.mjs';
const code = 'console.log(1 + 2);';
const GLOBALS = {};
const context = createContext({...GLOBALS, console: new InjectedConsole()});
// Create a new script
const script = new Script(CODE);
// Run the script in the context
await script.runInContext(context);
return context.console?.result; // logs "3"
```

Compare a similar example using `node:vm`.

Note: we inject `vmb`'s `InjectedConsole` to handle program output.

```javascript
import { Script, createContext } from 'node:vm';
import { InjectedConsole } from 'vmb/injected-console';
const code = 'console.log(1 + 2);';
const GLOBALS = {};
const context = createContext({...GLOBALS, console: new InjectedConsole()});
// Create a new script
const script = new Script(CODE);
// Run the script in the context
await script.runInContext(context);
return context.console?.result;
```

## Usage Examples : SourceTextModule

The following example uses `SourceTextModule` to run asynchronous code.

Note while `vmb.SourceTextModule`' and `node:vm.SourceTextModule` are capable of running asynchronous code,
to use `node:vm.SourceTextModule` you must use the flag `--experimental-vm-modules`.


```javascript
import { SourceTextModule, createContext } from 'https://cdn.jsdelivr.net/npm/vmb@0.0.0/src/index.mjs';
import { InjectedConsole } from 'https://cdn.jsdelivr.net/npm/vmb@0.0.0/src/inkected-console.mjs';
const CODE = 'console.log(await (await fetch("http://example.com")).text());';
const GLOBALS = {};
const context = createContext({...GLOBALS, console: new InjectedConsole()});
// Create a new module
const module = new SourceTextModule(CODE, {context});
// Run the module in the context
await module.evaluate();
return context.console?.result; // logs "3"
```

Compare a similar example using `node:vm`
Note: we inject `vmb`'s `InjectedConsole` to handle program output.

```javascript
import { SourceTextModule, createContext } from 'node:vm';
import { InjectedConsole } from 'vmb/injected-console';
const CODE = 'console.log(await (await fetch("http://example.com")).text());';
const GLOBALS = {};
const context = createContext({...GLOBALS, console: new InjectedConsole()});
// Create a new module
const module = new SourceTextModule(CODE, {context});
// Run the module in the context
await module.evaluate();
return context.console?.result;
```

## API

### constants

Constants avaliable for use with

- `constatns.DONT_CONTEXTIFY` - don't contextify


### Script

### SourceTextModule

### createContext

### Utilities

#### InjectedConsole

#### createRunScript

#### createRunSourceTextModule

#### wrapAsync
