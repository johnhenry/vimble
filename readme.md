# Vimble

Vimble leverages a _subset of_ [node's vm api](https://nodejs.org/api/vm.html),
to run code in a sandboxed environment in the browser.

```javascript
import vimble from 'https://cdn.jsdelivr.net/npm/vimble@0.0.0/src/index.mjs';
// OR "https://ga.jspm.io/npm:vimble@0.0.0/src/index.mjs";
```

Or install via npm

```bash
npm install vimble
```

## Usage Example: Script

The following example uses `Script` to run synchronous code.

Note: `vimble.Script`' is capable of running asynchronous code, while `node:vm.Script` is not.

```javascript
import { Script, createContext } from 'https://cdn.jsdelivr.net/npm/vimble@0.0.0/src/index.mjs';
import { InjectedConsole } from 'https://cdn.jsdelivr.net/npm/vimble@0.0.0/src/inkected-console.mjs';
const code = 'console.log(1 + 2);';
const GLOBALS = {};
const context = createContext({...GLOBALS, console: new InjectedConsole()});
// Create a new script
const script = new Script(code);
// Run the script in the context
await script.runInContext(context);
return context.console?.result; // logs "3"
```

Compare a similar example using `node:vm`.

Note: we inject `vimble`'s `InjectedConsole` to handle program output.

```javascript
import { Script, createContext } from 'node:vm';
import { InjectedConsole } from 'vimble/injected-console';
const code = 'console.log(1 + 2);';
const GLOBALS = {};
const context = createContext({...GLOBALS, console: new InjectedConsole()});
// Create a new script
const script = new Script(code);
// Run the script in the context
await script.runInContext(context);
return context.console?.result;
```

## Usage Example : SourceTextModule

The following example uses `SourceTextModule` to run asynchronous code.

Note while `vimble.SourceTextModule`' and `node:vm.SourceTextModule` are capable of running asynchronous code,
to use `node:vm.SourceTextModule` you must use the flag `--experimental-vm-modules`.


```javascript
import { SourceTextModule, createContext } from 'https://cdn.jsdelivr.net/npm/vimble@0.0.0/src/index.mjs';
import { InjectedConsole } from 'https://cdn.jsdelivr.net/npm/vimble@0.0.0/src/inkected-console.mjs';
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
Note: we inject `vimble`'s `InjectedConsole` to handle program output.

```javascript
import { SourceTextModule, createContext } from 'node:vm';
import { InjectedConsole } from 'vimble/injected-console';
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

Compare to https://nodejs.org/api/vm.html.

### Constants

The following constants are available for use:

- `constants.DONT_CONTEXTIFY` - A symbol that indicates the context should not be modified when creating a new execution context. Used with `createContext`.

### Core API

#### createContext(context)

Creates a new execution context for running scripts and modules.

**Parameters:**
- `context` (Object|Symbol): Either an object containing the context properties or `constants.DONT_CONTEXTIFY`

**Returns:**
- (Object): A new context object

**Example:**
```javascript
const context = createContext({ customVar: 'value' });
// Or with DONT_CONTEXTIFY
const globalContext = createContext(constants.DONT_CONTEXTIFY);
```

#### Script

A class that represents a script that can be executed in different contexts. Supports both synchronous and asynchronous code execution.

**Constructor:**
- `new Script(code: string)`

**Methods:**
- `runInContext(context: Object)`: Executes the script in a given context
- `runInThisContext(options?: Object)`: Runs the script in the current global context
- `runInNewContext(options?: Object)`: Runs the script in a new empty context

**Properties:**
- `code`: Gets the script's source code
- `sourceMapURL`: Gets the source map URL if present

**Example:**
```javascript
const script = new Script('console.log("Hello World")');
await script.runInContext(context);
```

#### SourceTextModule

A class that represents an ES module that can be dynamically executed.

**Constructor:**
- `new SourceTextModule(code: string, options?: { context?: Object })`

**Methods:**
- `evaluate()`: Evaluates the module in its context
- `link()`: Links the module (currently a no-op)

**Example:**
```javascript
const module = new SourceTextModule('export const x = 42;', { context });
await module.evaluate();
```

### Vimble Utilities

The following utilities are not mirrored in the `node:vm` API, but can be used with it or `vimble`.

#### InjectedConsole

A custom console implementation that captures output in isolated contexts.

**Methods:**
- `log(...output)`: Logs messages to the output buffer
- `info(...output)`: Alias for log
- `warn(...output)`: Alias for log
- `error(...output)`: Logs messages to the error buffer
- `get result()`: Gets the combined output, prioritizing errors if present

**Example:**
```javascript
const console = new InjectedConsole();
console.log('Hello', 'World');
console.error('Oops');
console.result; // Returns error message "Oops"
```

#### createRunScript({ Script, createContext, InjectedConsole })

Creates a function that can run scripts in an isolated context.

**Parameters:**
- Object containing:
  - `Script`: The Script class
  - `createContext`: Context creation function
  - `InjectedConsole`: Console implementation

**Returns:**
- `(code: string, globals?: Object) => Promise<string|undefined>`: Function to run scripts

**Example:**
```javascript
const runScript = createRunScript({ Script, createContext, InjectedConsole });
const result = await runScript('console.log("Hello World")', { customGlobal: 'value' });
```

#### createRunSourceTextModule({ SourceTextModule, createContext, InjectedConsole })

Creates a function that can run ES modules in an isolated context.

**Parameters:**
- Object containing:
  - `SourceTextModule`: The SourceTextModule class
  - `createContext`: Context creation function
  - `InjectedConsole`: Console implementation

**Returns:**
- `(code: string, globals?: Object) => Promise<string|undefined>`: Function to run modules

**Example:**
```javascript
const runModule = createRunSourceTextModule({ SourceTextModule, createContext, InjectedConsole });
const result = await runModule('export const x = 42; console.log(x);');
```

#### wrapAsync(code)

Wraps code in an async IIFE (Immediately Invoked Function Expression) to enable top-level await.

**Parameters:**
- `code` (string): The code to wrap

**Returns:**
- (string): The wrapped code

**Example:**
```javascript
const wrappedCode = wrapAsync('await fetch("https://api.example.com")');
// Results in: (async ()=>{ await fetch("https://api.example.com") })();
```
