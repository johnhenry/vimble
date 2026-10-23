# Vimble

> Previously published on npm as `vimble` (unscoped). That name is no longer updated; use `@johnhenry/vimble`.

Vimble allows you to execute code in an isolated context.

```javascript
import * as vimble from 'https://cdn.jsdelivr.net/npm/@johnhenry/vimble@0.1.0/src/index.mjs';
// OR "https://ga.jspm.io/npm:@johnhenry/vimble@0.1.0/src/index.mjs";
```

Or install via npm

```bash
npm install @johnhenry/vimble
```

## Quick Start

Using `run` and `InjectedConsole`

```javascript
import run,  { InjectedConsole } from '@johnhenry/vimble';
const localConsole = new InjectedConsole();
await run('console.log(1 + 2);', { console: localConsole });
console.log(localConsole.result); // logs "3"
```

Uing `runWithInjectedConsole`

```javascript
import { runWithInjectedConsole as run } from '@johnhenry/vimble';
console.log(await run('console.log(1 + 2);')); // logs "3"
```

## API

### run(code, context)

Executes JavaScript code in an isolated context with specified global variables.

**Parameters:**
- `code` (string): The JavaScript code to execute
- `context` (Object): Object containing global variables to inject into the execution context

**Returns:** Promise<any> - Result of the executed code

**Example:**
```javascript
import { run } from '@johnhenry/vimble';
// Access modified global variables
const obj = { count: 0 };
await run('obj.count += 1;', { obj });
console.log(obj.count); // outputs: 1
```

Global objects must be specified in the context object

```javascript
import { run } from '@johnhenry/vimble';
// Access modified global variables
const obj = { text: "" };
await run('await fetch("https://example.com").then((response) => response.text()).then((text) => obj.text = text);', { obj, fetch});
console.log(obj.text); // outputs: 1
```

### InjectedConsole

A custom console implementation that captures output and errors in isolated contexts.

**Methods:**
- `log(...args)`: Logs messages to the output buffer
- `info(...args)`: Alias for log
- `warn(...args)`: Alias for log
- `error(...args)`: Logs messages to the error buffer
- `reset()`: Resets output and error buffers

**Properties:**
- `result`: Gets the combined output, prioritizing errors if present
- `info`: Gets information about console including error and output counts

**Example:**
```javascript
import { InjectedConsole } from '@johnhenry/vimble';

const console = new InjectedConsole();
console.log('Hello');
console.log('World');

// Error messages take priority
console.result; // outputs: "Hello World"
console.error('Error occurred');
console.result; // outputs: "Error occurred"
```

### runWithInjectedConsole(code, [context])

Executes JavaScript code with a custom console implementation and returns the console output.

**Parameters:**
- `code` (string): The JavaScript code to execute
- `context` (Object, optional): Additional context variables to inject into the execution environment

**Returns:** Promise<string> - Console output from the code execution

**Example:**
```javascript
import { runWithInjectedConsole as run } from '@johnhenry/vimble';

// Capture console output
const output = await run(`
  console.log('Hello');
  console.log('World');
`);
console.log(output); // outputs: "Hello\nWorld"
```
