   Modules: node:module API | Node.js v23.5.0 Documentation     const storedTheme = localStorage.getItem('theme'); // Follow operating system theme preference if (storedTheme === null && window.matchMedia) { const mq = window.matchMedia('(prefers-color-scheme: dark)'); if (mq.matches) { document.documentElement.classList.add('dark-mode'); } } else if (storedTheme === 'dark') { document.documentElement.classList.add('dark-mode'); } @media(max-width:430px){.with-26-chars>.js-flavor-toggle{float:none;margin:0 0 1em auto;}}@media(max-width:630px){.with-51-chars>.js-flavor-toggle{float:none;margin:0 0 1em auto;}}@media(max-width:670px){.with-56-chars>.js-flavor-toggle{float:none;margin:0 0 1em auto;}}@media(max-width:1104px){.with-76-chars>.js-flavor-toggle{float:none;margin:0 0 1em auto;}}@media(max-width:1128px){.with-79-chars>.js-flavor-toggle{float:none;margin:0 0 1em auto;}}@media(max-width:590px){.with-46-chars>.js-flavor-toggle{float:none;margin:0 0 1em auto;}}@media(max-width:694px){.with-59-chars>.js-flavor-toggle{float:none;margin:0 0 1em auto;}}@media(max-width:574px){.with-44-chars>.js-flavor-toggle{float:none;margin:0 0 1em auto;}}@media(max-width:614px){.with-49-chars>.js-flavor-toggle{float:none;margin:0 0 1em auto;}}@media(max-width:646px){.with-53-chars>.js-flavor-toggle{float:none;margin:0 0 1em auto;}}

[Node.js](/ "Go back to the home page")

*   [About this documentation](documentation.html)
*   [Usage and example](synopsis.html)

* * *

*   [Assertion testing](assert.html)
*   [Asynchronous context tracking](async_context.html)
*   [Async hooks](async_hooks.html)
*   [Buffer](buffer.html)
*   [C++ addons](addons.html)
*   [C/C++ addons with Node-API](n-api.html)
*   [C++ embedder API](embedding.html)
*   [Child processes](child_process.html)
*   [Cluster](cluster.html)
*   [Command-line options](cli.html)
*   [Console](console.html)
*   [Corepack](corepack.html)
*   [Crypto](crypto.html)
*   [Debugger](debugger.html)
*   [Deprecated APIs](deprecations.html)
*   [Diagnostics Channel](diagnostics_channel.html)
*   [DNS](dns.html)
*   [Domain](domain.html)
*   [Errors](errors.html)
*   [Events](events.html)
*   [File system](fs.html)
*   [Globals](globals.html)
*   [HTTP](http.html)
*   [HTTP/2](http2.html)
*   [HTTPS](https.html)
*   [Inspector](inspector.html)
*   [Internationalization](intl.html)
*   [Modules: CommonJS modules](modules.html)
*   [Modules: ECMAScript modules](esm.html)
*   [Modules: `node:module` API](module.html)
*   [Modules: Packages](packages.html)
*   [Modules: TypeScript](typescript.html)
*   [Net](net.html)
*   [OS](os.html)
*   [Path](path.html)
*   [Performance hooks](perf_hooks.html)
*   [Permissions](permissions.html)
*   [Process](process.html)
*   [Punycode](punycode.html)
*   [Query strings](querystring.html)
*   [Readline](readline.html)
*   [REPL](repl.html)
*   [Report](report.html)
*   [Single executable applications](single-executable-applications.html)
*   [SQLite](sqlite.html)
*   [Stream](stream.html)
*   [String decoder](string_decoder.html)
*   [Test runner](test.html)
*   [Timers](timers.html)
*   [TLS/SSL](tls.html)
*   [Trace events](tracing.html)
*   [TTY](tty.html)
*   [UDP/datagram](dgram.html)
*   [URL](url.html)
*   [Utilities](util.html)
*   [V8](v8.html)
*   [VM](vm.html)
*   [WASI](wasi.html)
*   [Web Crypto API](webcrypto.html)
*   [Web Streams API](webstreams.html)
*   [Worker threads](worker_threads.html)
*   [Zlib](zlib.html)

* * *

*   [Code repository and issue tracker](https://github.com/nodejs/node)

Node.js v23.5.0 documentation
=============================

*   Node.js v23.5.0
*   [Table of contents](#)
    
    *   [Modules: `node:module` API](#modules-nodemodule-api)
        *   [The `Module` object](#the-module-object)
            *   [`module.builtinModules`](#modulebuiltinmodules)
            *   [`module.createRequire(filename)`](#modulecreaterequirefilename)
            *   [`module.findPackageJSON(specifier[, base])`](#modulefindpackagejsonspecifier-base)
            *   [`module.isBuiltin(moduleName)`](#moduleisbuiltinmodulename)
            *   [`module.register(specifier[, parentURL][, options])`](#moduleregisterspecifier-parenturl-options)
            *   [`module.registerHooks(options)`](#moduleregisterhooksoptions)
            *   [`module.stripTypeScriptTypes(code[, options])`](#modulestriptypescripttypescode-options)
            *   [`module.syncBuiltinESMExports()`](#modulesyncbuiltinesmexports)
        *   [Module compile cache](#module-compile-cache)
            *   [`module.constants.compileCacheStatus`](#moduleconstantscompilecachestatus)
            *   [`module.enableCompileCache([cacheDir])`](#moduleenablecompilecachecachedir)
            *   [`module.flushCompileCache()`](#moduleflushcompilecache)
            *   [`module.getCompileCacheDir()`](#modulegetcompilecachedir)
        *   [Customization Hooks](#customization-hooks)
            *   [Enabling](#enabling)
            *   [Chaining](#chaining)
            *   [Communication with module customization hooks](#communication-with-module-customization-hooks)
            *   [Hooks](#hooks)
                *   [Asynchronous hooks accepted by `module.register()`](#asynchronous-hooks-accepted-by-moduleregister)
                *   [Synchronous hooks accepted by `module.registerHooks()`](#synchronous-hooks-accepted-by-moduleregisterhooks)
                *   [Conventions of hooks](#conventions-of-hooks)
                *   [`initialize()`](#initialize)
                *   [`resolve(specifier, context, nextResolve)`](#resolvespecifier-context-nextresolve)
                *   [`load(url, context, nextLoad)`](#loadurl-context-nextload)
                    *   [Caveat in the asynchronous `load` hook](#caveat-in-the-asynchronous-load-hook)
            *   [Examples](#examples)
                *   [Import from HTTPS](#import-from-https)
                *   [Transpilation](#transpilation)
                    *   [Asynchronous version](#asynchronous-version)
                    *   [Synchronous version](#synchronous-version)
                *   [Running hooks](#running-hooks)
                *   [Import maps](#import-maps)
                    *   [Asynchronous version](#asynchronous-version_1)
                    *   [Synchronous version](#synchronous-version_1)
                    *   [Using the hooks](#using-the-hooks)
        *   [Source map v3 support](#source-map-v3-support)
            *   [`module.findSourceMap(path)`](#modulefindsourcemappath)
            *   [Class: `module.SourceMap`](#class-modulesourcemap)
                *   [`new SourceMap(payload[, { lineLengths }])`](#new-sourcemappayload--linelengths-)
                *   [`sourceMap.payload`](#sourcemappayload)
                *   [`sourceMap.findEntry(lineOffset, columnOffset)`](#sourcemapfindentrylineoffset-columnoffset)
                *   [`sourceMap.findOrigin(lineNumber, columnNumber)`](#sourcemapfindoriginlinenumber-columnnumber)
    
*   [Index](#)
    
    *   [About this documentation](documentation.html)
    *   [Usage and example](synopsis.html)
    *   [Index](index.html)
    
    * * *
    
    *   [Assertion testing](assert.html)
    *   [Asynchronous context tracking](async_context.html)
    *   [Async hooks](async_hooks.html)
    *   [Buffer](buffer.html)
    *   [C++ addons](addons.html)
    *   [C/C++ addons with Node-API](n-api.html)
    *   [C++ embedder API](embedding.html)
    *   [Child processes](child_process.html)
    *   [Cluster](cluster.html)
    *   [Command-line options](cli.html)
    *   [Console](console.html)
    *   [Corepack](corepack.html)
    *   [Crypto](crypto.html)
    *   [Debugger](debugger.html)
    *   [Deprecated APIs](deprecations.html)
    *   [Diagnostics Channel](diagnostics_channel.html)
    *   [DNS](dns.html)
    *   [Domain](domain.html)
    *   [Errors](errors.html)
    *   [Events](events.html)
    *   [File system](fs.html)
    *   [Globals](globals.html)
    *   [HTTP](http.html)
    *   [HTTP/2](http2.html)
    *   [HTTPS](https.html)
    *   [Inspector](inspector.html)
    *   [Internationalization](intl.html)
    *   [Modules: CommonJS modules](modules.html)
    *   [Modules: ECMAScript modules](esm.html)
    *   [Modules: `node:module` API](module.html)
    *   [Modules: Packages](packages.html)
    *   [Modules: TypeScript](typescript.html)
    *   [Net](net.html)
    *   [OS](os.html)
    *   [Path](path.html)
    *   [Performance hooks](perf_hooks.html)
    *   [Permissions](permissions.html)
    *   [Process](process.html)
    *   [Punycode](punycode.html)
    *   [Query strings](querystring.html)
    *   [Readline](readline.html)
    *   [REPL](repl.html)
    *   [Report](report.html)
    *   [Single executable applications](single-executable-applications.html)
    *   [SQLite](sqlite.html)
    *   [Stream](stream.html)
    *   [String decoder](string_decoder.html)
    *   [Test runner](test.html)
    *   [Timers](timers.html)
    *   [TLS/SSL](tls.html)
    *   [Trace events](tracing.html)
    *   [TTY](tty.html)
    *   [UDP/datagram](dgram.html)
    *   [URL](url.html)
    *   [Utilities](util.html)
    *   [V8](v8.html)
    *   [VM](vm.html)
    *   [WASI](wasi.html)
    *   [Web Crypto API](webcrypto.html)
    *   [Web Streams API](webstreams.html)
    *   [Worker threads](worker_threads.html)
    *   [Zlib](zlib.html)
    
    * * *
    
    *   [Code repository and issue tracker](https://github.com/nodejs/node)
    
*   [Other versions](#)
    
    1.  [23.x](https://nodejs.org/docs/latest-v23.x/api/module.html)
    2.  [22.x **LTS**](https://nodejs.org/docs/latest-v22.x/api/module.html)
    3.  [21.x](https://nodejs.org/docs/latest-v21.x/api/module.html)
    4.  [20.x **LTS**](https://nodejs.org/docs/latest-v20.x/api/module.html)
    5.  [19.x](https://nodejs.org/docs/latest-v19.x/api/module.html)
    6.  [18.x **LTS**](https://nodejs.org/docs/latest-v18.x/api/module.html)
    7.  [17.x](https://nodejs.org/docs/latest-v17.x/api/module.html)
    8.  [16.x](https://nodejs.org/docs/latest-v16.x/api/module.html)
    9.  [15.x](https://nodejs.org/docs/latest-v15.x/api/module.html)
    10.  [14.x](https://nodejs.org/docs/latest-v14.x/api/module.html)
    11.  [13.x](https://nodejs.org/docs/latest-v13.x/api/module.html)
    12.  [12.x](https://nodejs.org/docs/latest-v12.x/api/module.html)
    
*   [Options](#)
    
    *   [View on single page](all.html)
    *   [View as JSON](module.json)
    *   [Edit on GitHub](https://github.com/nodejs/node/edit/main/doc/api/module.md)
    

* * *

Table of contents

*   [Modules: `node:module` API](#modules-nodemodule-api)
    *   [The `Module` object](#the-module-object)
        *   [`module.builtinModules`](#modulebuiltinmodules)
        *   [`module.createRequire(filename)`](#modulecreaterequirefilename)
        *   [`module.findPackageJSON(specifier[, base])`](#modulefindpackagejsonspecifier-base)
        *   [`module.isBuiltin(moduleName)`](#moduleisbuiltinmodulename)
        *   [`module.register(specifier[, parentURL][, options])`](#moduleregisterspecifier-parenturl-options)
        *   [`module.registerHooks(options)`](#moduleregisterhooksoptions)
        *   [`module.stripTypeScriptTypes(code[, options])`](#modulestriptypescripttypescode-options)
        *   [`module.syncBuiltinESMExports()`](#modulesyncbuiltinesmexports)
    *   [Module compile cache](#module-compile-cache)
        *   [`module.constants.compileCacheStatus`](#moduleconstantscompilecachestatus)
        *   [`module.enableCompileCache([cacheDir])`](#moduleenablecompilecachecachedir)
        *   [`module.flushCompileCache()`](#moduleflushcompilecache)
        *   [`module.getCompileCacheDir()`](#modulegetcompilecachedir)
    *   [Customization Hooks](#customization-hooks)
        *   [Enabling](#enabling)
        *   [Chaining](#chaining)
        *   [Communication with module customization hooks](#communication-with-module-customization-hooks)
        *   [Hooks](#hooks)
            *   [Asynchronous hooks accepted by `module.register()`](#asynchronous-hooks-accepted-by-moduleregister)
            *   [Synchronous hooks accepted by `module.registerHooks()`](#synchronous-hooks-accepted-by-moduleregisterhooks)
            *   [Conventions of hooks](#conventions-of-hooks)
            *   [`initialize()`](#initialize)
            *   [`resolve(specifier, context, nextResolve)`](#resolvespecifier-context-nextresolve)
            *   [`load(url, context, nextLoad)`](#loadurl-context-nextload)
                *   [Caveat in the asynchronous `load` hook](#caveat-in-the-asynchronous-load-hook)
        *   [Examples](#examples)
            *   [Import from HTTPS](#import-from-https)
            *   [Transpilation](#transpilation)
                *   [Asynchronous version](#asynchronous-version)
                *   [Synchronous version](#synchronous-version)
            *   [Running hooks](#running-hooks)
            *   [Import maps](#import-maps)
                *   [Asynchronous version](#asynchronous-version_1)
                *   [Synchronous version](#synchronous-version_1)
                *   [Using the hooks](#using-the-hooks)
    *   [Source map v3 support](#source-map-v3-support)
        *   [`module.findSourceMap(path)`](#modulefindsourcemappath)
        *   [Class: `module.SourceMap`](#class-modulesourcemap)
            *   [`new SourceMap(payload[, { lineLengths }])`](#new-sourcemappayload--linelengths-)
            *   [`sourceMap.payload`](#sourcemappayload)
            *   [`sourceMap.findEntry(lineOffset, columnOffset)`](#sourcemapfindentrylineoffset-columnoffset)
            *   [`sourceMap.findOrigin(lineNumber, columnNumber)`](#sourcemapfindoriginlinenumber-columnnumber)

Modules: `node:module` API[#](#modules-nodemodule-api)
------------------------------------------------------

Added in: v0.3.7

### The `Module` object[#](#the-module-object)

*   [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Provides general utility methods when interacting with instances of `Module`, the [`module`](#the-module-object) variable often seen in [CommonJS](modules.html) modules. Accessed via `import 'node:module'` or `require('node:module')`.

#### `module.builtinModules`[#](#modulebuiltinmodules)

History

Version

Changes

v23.5.0

The list now also contains prefix-only modules.

v9.3.0, v8.10.0, v6.13.0

Added in: v9.3.0, v8.10.0, v6.13.0

*   [<string\[\]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

A list of the names of all modules provided by Node.js. Can be used to verify if a module is maintained by a third party or not.

`module` in this context isn't the same object that's provided by the [module wrapper](modules.html#the-module-wrapper). To access it, require the `Module` module:

`// module.mjs // In an ECMAScript module import { builtinModules as builtin } from 'node:module';``// module.cjs // In a CommonJS module const builtin = require('node:module').builtinModules;`copy

#### `module.createRequire(filename)`[#](#modulecreaterequirefilename)

Added in: v12.2.0

*   `filename` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<URL>](url.html#the-whatwg-url-api) Filename to be used to construct the require function. Must be a file URL object, file URL string, or absolute path string.
*   Returns: [<require>](modules.html#requireid) Require function

    import { createRequire } from 'node:module';
    const require = createRequire(import.meta.url);
    
    // sibling-module.js is a CommonJS module.
    const siblingModule = require('./sibling-module');

#### `module.findPackageJSON(specifier[, base])`[#](#modulefindpackagejsonspecifier-base)

Added in: v23.2.0

[Stability: 1](documentation.html#stability-index).1 - Active Development

*   `specifier` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<URL>](url.html#the-whatwg-url-api) The specifier for the module whose `package.json` to retrieve. When passing a _bare specifier_, the `package.json` at the root of the package is returned. When passing a _relative specifier_ or an _absolute specifier_, the closest parent `package.json` is returned.
*   `base` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<URL>](url.html#the-whatwg-url-api) The absolute location (`file:` URL string or FS path) of the containing module. For CJS, use `__filename` (not `__dirname`!); for ESM, use `import.meta.url`. You do not need to pass it if `specifier` is an `absolute specifier`.
*   Returns: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) A path if the `package.json` is found. When `startLocation` is a package, the package's root `package.json`; when a relative or unresolved, the closest `package.json` to the `startLocation`.

> **Caveat**: Do not use this to try to determine module format. There are many things effecting that determination; the `type` field of package.json is the _least_ definitive (ex file extension superceeds it, and a loader hook superceeds that).

    /path/to/project
      ├ packages/
        ├ bar/
          ├ bar.js
          └ package.json // name = '@foo/bar'
        └ qux/
          ├ node_modules/
            └ some-package/
              └ package.json // name = 'some-package'
          ├ qux.js
          └ package.json // name = '@foo/qux'
      ├ main.js
      └ package.json // name = '@foo'

``// /path/to/project/packages/bar/bar.js import { findPackageJSON } from 'node:module';  findPackageJSON('..', import.meta.url); // '/path/to/project/package.json' // Same result when passing an absolute specifier instead: findPackageJSON(new URL('../', import.meta.url)); findPackageJSON(import.meta.resolve('../'));  findPackageJSON('some-package', import.meta.url); // '/path/to/project/packages/bar/node_modules/some-package/package.json' // When passing an absolute specifier, you might get a different result if the // resolved module is inside a subfolder that has nested `package.json`. findPackageJSON(import.meta.resolve('some-package')); // '/path/to/project/packages/bar/node_modules/some-package/some-subfolder/package.json'  findPackageJSON('@foo/qux', import.meta.url); // '/path/to/project/packages/qux/package.json'````// /path/to/project/packages/bar/bar.js const { findPackageJSON } = require('node:module'); const { pathToFileURL } = require('node:url'); const path = require('node:path');  findPackageJSON('..', __filename); // '/path/to/project/package.json' // Same result when passing an absolute specifier instead: findPackageJSON(pathToFileURL(path.join(__dirname, '..')));  findPackageJSON('some-package', __filename); // '/path/to/project/packages/bar/node_modules/some-package/package.json' // When passing an absolute specifier, you might get a different result if the // resolved module is inside a subfolder that has nested `package.json`. findPackageJSON(pathToFileURL(require.resolve('some-package'))); // '/path/to/project/packages/bar/node_modules/some-package/some-subfolder/package.json'  findPackageJSON('@foo/qux', __filename); // '/path/to/project/packages/qux/package.json'``copy

#### `module.isBuiltin(moduleName)`[#](#moduleisbuiltinmodulename)

Added in: v18.6.0, v16.17.0

*   `moduleName` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) name of the module
*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) returns true if the module is builtin else returns false

    import { isBuiltin } from 'node:module';
    isBuiltin('node:fs'); // true
    isBuiltin('fs'); // true
    isBuiltin('wss'); // false

#### `module.register(specifier[, parentURL][, options])`[#](#moduleregisterspecifier-parenturl-options)

History

Version

Changes

v20.8.0, v18.19.0

Add support for WHATWG URL instances.

v20.6.0, v18.19.0

Added in: v20.6.0, v18.19.0

[Stability: 1](documentation.html#stability-index).2 - Release candidate

*   `specifier` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<URL>](url.html#the-whatwg-url-api) Customization hooks to be registered; this should be the same string that would be passed to `import()`, except that if it is relative, it is resolved relative to `parentURL`.
*   `parentURL` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<URL>](url.html#the-whatwg-url-api) If you want to resolve `specifier` relative to a base URL, such as `import.meta.url`, you can pass that URL here. **Default:** `'data:'`
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `parentURL` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<URL>](url.html#the-whatwg-url-api) If you want to resolve `specifier` relative to a base URL, such as `import.meta.url`, you can pass that URL here. This property is ignored if the `parentURL` is supplied as the second argument. **Default:** `'data:'`
    *   `data` [<any>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) Any arbitrary, cloneable JavaScript value to pass into the [`initialize`](#initialize) hook.
    *   `transferList` [<Object\[\]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) [transferable objects](worker_threads.html#portpostmessagevalue-transferlist) to be passed into the `initialize` hook.

Register a module that exports [hooks](#customization-hooks) that customize Node.js module resolution and loading behavior. See [Customization hooks](#customization-hooks).

#### `module.registerHooks(options)`[#](#moduleregisterhooksoptions)

Added in: v23.5.0

[Stability: 1](documentation.html#stability-index).1 - Active development

*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `load` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) See [load hook](#loadurl-context-nextload). **Default:** `undefined`.
    *   `resolve` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) See [resolve hook](#resolvespecifier-context-nextresolve). **Default:** `undefined`.

Register [hooks](#customization-hooks) that customize Node.js module resolution and loading behavior. See [Customization hooks](#customization-hooks).

#### `module.stripTypeScriptTypes(code[, options])`[#](#modulestriptypescripttypescode-options)

Added in: v23.2.0

[Stability: 1](documentation.html#stability-index).1 - Active development

*   `code` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The code to strip type annotations from.
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `mode` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'strip'`. Possible values are:
        *   `'strip'` Only strip type annotations without performing the transformation of TypeScript features.
        *   `'transform'` Strip type annotations and transform TypeScript features to JavaScript.
    *   `sourceMap` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`. Only when `mode` is `'transform'`, if `true`, a source map will be generated for the transformed code.
    *   `sourceUrl` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Specifies the source url used in the source map.
*   Returns: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The code with type annotations stripped. `module.stripTypeScriptTypes()` removes type annotations from TypeScript code. It can be used to strip type annotations from TypeScript code before running it with `vm.runInContext()` or `vm.compileFunction()`. By default, it will throw an error if the code contains TypeScript features that require transformation such as `Enums`, see [type-stripping](typescript.html#type-stripping) for more information. When mode is `'transform'`, it also transforms TypeScript features to JavaScript, see [transform TypeScript features](typescript.html#typescript-features) for more information. When mode is `'strip'`, source maps are not generated, because locations are preserved. If `sourceMap` is provided, when mode is `'strip'`, an error will be thrown.

_WARNING_: The output of this function should not be considered stable across Node.js versions, due to changes in the TypeScript parser.

`import { stripTypeScriptTypes } from 'node:module'; const code = 'const a: number = 1;'; const strippedCode = stripTypeScriptTypes(code); console.log(strippedCode); // Prints: const a         = 1;``const { stripTypeScriptTypes } = require('node:module'); const code = 'const a: number = 1;'; const strippedCode = stripTypeScriptTypes(code); console.log(strippedCode); // Prints: const a         = 1;`copy

If `sourceUrl` is provided, it will be used appended as a comment at the end of the output:

`import { stripTypeScriptTypes } from 'node:module'; const code = 'const a: number = 1;'; const strippedCode = stripTypeScriptTypes(code, { mode: 'strip', sourceUrl: 'source.ts' }); console.log(strippedCode); // Prints: const a         = 1\n\n//# sourceURL=source.ts;``const { stripTypeScriptTypes } = require('node:module'); const code = 'const a: number = 1;'; const strippedCode = stripTypeScriptTypes(code, { mode: 'strip', sourceUrl: 'source.ts' }); console.log(strippedCode); // Prints: const a         = 1\n\n//# sourceURL=source.ts;`copy

When `mode` is `'transform'`, the code is transformed to JavaScript:

``import { stripTypeScriptTypes } from 'node:module'; const code = `   namespace MathUtil {     export const add = (a: number, b: number) => a + b;   }`; const strippedCode = stripTypeScriptTypes(code, { mode: 'transform', sourceMap: true }); console.log(strippedCode); // Prints: // var MathUtil; // (function(MathUtil) { //     MathUtil.add = (a, b)=>a + b; // })(MathUtil || (MathUtil = {})); // # sourceMappingURL=data:application/json;base64, ...````const { stripTypeScriptTypes } = require('node:module'); const code = `   namespace MathUtil {     export const add = (a: number, b: number) => a + b;   }`; const strippedCode = stripTypeScriptTypes(code, { mode: 'transform', sourceMap: true }); console.log(strippedCode); // Prints: // var MathUtil; // (function(MathUtil) { //     MathUtil.add = (a, b)=>a + b; // })(MathUtil || (MathUtil = {})); // # sourceMappingURL=data:application/json;base64, ...``copy

#### `module.syncBuiltinESMExports()`[#](#modulesyncbuiltinesmexports)

Added in: v12.12.0

The `module.syncBuiltinESMExports()` method updates all the live bindings for builtin [ES Modules](esm.html) to match the properties of the [CommonJS](modules.html) exports. It does not add or remove exported names from the [ES Modules](esm.html).

    const fs = require('node:fs');
    const assert = require('node:assert');
    const { syncBuiltinESMExports } = require('node:module');
    
    fs.readFile = newAPI;
    
    delete fs.readFileSync;
    
    function newAPI() {
      // ...
    }
    
    fs.newAPI = newAPI;
    
    syncBuiltinESMExports();
    
    import('node:fs').then((esmFS) => {
      // It syncs the existing readFile property with the new value
      assert.strictEqual(esmFS.readFile, newAPI);
      // readFileSync has been deleted from the required fs
      assert.strictEqual('readFileSync' in fs, false);
      // syncBuiltinESMExports() does not remove readFileSync from esmFS
      assert.strictEqual('readFileSync' in esmFS, true);
      // syncBuiltinESMExports() does not add names
      assert.strictEqual(esmFS.newAPI, undefined);
    });

### Module compile cache[#](#module-compile-cache)

History

Version

Changes

v22.8.0

add initial JavaScript APIs for runtime access.

v22.1.0

Added in: v22.1.0

The module compile cache can be enabled either using the [`module.enableCompileCache()`](#moduleenablecompilecachecachedir) method or the [`NODE_COMPILE_CACHE=dir`](cli.html#node_compile_cachedir) environment variable. After it is enabled, whenever Node.js compiles a CommonJS or a ECMAScript Module, it will use on-disk [V8 code cache](https://v8.dev/blog/code-caching-for-devs) persisted in the specified directory to speed up the compilation. This may slow down the first load of a module graph, but subsequent loads of the same module graph may get a significant speedup if the contents of the modules do not change.

To clean up the generated compile cache on disk, simply remove the cache directory. The cache directory will be recreated the next time the same directory is used for for compile cache storage. To avoid filling up the disk with stale cache, it is recommended to use a directory under the [`os.tmpdir()`](os.html#ostmpdir). If the compile cache is enabled by a call to [`module.enableCompileCache()`](#moduleenablecompilecachecachedir) without specifying the directory, Node.js will use the [`NODE_COMPILE_CACHE=dir`](cli.html#node_compile_cachedir) environment variable if it's set, or defaults to `path.join(os.tmpdir(), 'node-compile-cache')` otherwise. To locate the compile cache directory used by a running Node.js instance, use [`module.getCompileCacheDir()`](#modulegetcompilecachedir).

Currently when using the compile cache with [V8 JavaScript code coverage](https://v8project.blogspot.com/2017/12/javascript-code-coverage.html), the coverage being collected by V8 may be less precise in functions that are deserialized from the code cache. It's recommended to turn this off when running tests to generate precise coverage.

The enabled module compile cache can be disabled by the [`NODE_DISABLE_COMPILE_CACHE=1`](cli.html#node_disable_compile_cache1) environment variable. This can be useful when the compile cache leads to unexpected or undesired behaviors (e.g. less precise test coverage).

Compilation cache generated by one version of Node.js can not be reused by a different version of Node.js. Cache generated by different versions of Node.js will be stored separately if the same base directory is used to persist the cache, so they can co-exist.

At the moment, when the compile cache is enabled and a module is loaded afresh, the code cache is generated from the compiled code immediately, but will only be written to disk when the Node.js instance is about to exit. This is subject to change. The [`module.flushCompileCache()`](#moduleflushcompilecache) method can be used to ensure the accumulated code cache is flushed to disk in case the application wants to spawn other Node.js instances and let them share the cache long before the parent exits.

#### `module.constants.compileCacheStatus`[#](#moduleconstantscompilecachestatus)

Added in: v22.8.0

[Stability: 1](documentation.html#stability-index).1 - Active Development

The following constants are returned as the `status` field in the object returned by [`module.enableCompileCache()`](#moduleenablecompilecachecachedir) to indicate the result of the attempt to enable the [module compile cache](#module-compile-cache).

Constant

Description

`ENABLED`

Node.js has enabled the compile cache successfully. The directory used to store the compile cache will be returned in the `directory` field in the returned object.

`ALREADY_ENABLED`

The compile cache has already been enabled before, either by a previous call to `module.enableCompileCache()`, or by the `NODE_COMPILE_CACHE=dir` environment variable. The directory used to store the compile cache will be returned in the `directory` field in the returned object.

`FAILED`

Node.js fails to enable the compile cache. This can be caused by the lack of permission to use the specified directory, or various kinds of file system errors. The detail of the failure will be returned in the `message` field in the returned object.

`DISABLED`

Node.js cannot enable the compile cache because the environment variable `NODE_DISABLE_COMPILE_CACHE=1` has been set.

#### `module.enableCompileCache([cacheDir])`[#](#moduleenablecompilecachecachedir)

Added in: v22.8.0

[Stability: 1](documentation.html#stability-index).1 - Active Development

*   `cacheDir` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) Optional path to specify the directory where the compile cache will be stored/retrieved.
*   Returns: [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `status` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) One of the [`module.constants.compileCacheStatus`](#moduleconstantscompilecachestatus)
    *   `message` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) If Node.js cannot enable the compile cache, this contains the error message. Only set if `status` is `module.constants.compileCacheStatus.FAILED`.
    *   `directory` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) If the compile cache is enabled, this contains the directory where the compile cache is stored. Only set if `status` is `module.constants.compileCacheStatus.ENABLED` or `module.constants.compileCacheStatus.ALREADY_ENABLED`.

Enable [module compile cache](#module-compile-cache) in the current Node.js instance.

If `cacheDir` is not specified, Node.js will either use the directory specified by the [`NODE_COMPILE_CACHE=dir`](cli.html#node_compile_cachedir) environment variable if it's set, or use `path.join(os.tmpdir(), 'node-compile-cache')` otherwise. For general use cases, it's recommended to call `module.enableCompileCache()` without specifying the `cacheDir`, so that the directory can be overridden by the `NODE_COMPILE_CACHE` environment variable when necessary.

Since compile cache is supposed to be a quiet optimization that is not required for the application to be functional, this method is designed to not throw any exception when the compile cache cannot be enabled. Instead, it will return an object containing an error message in the `message` field to aid debugging. If compile cache is enabled successfully, the `directory` field in the returned object contains the path to the directory where the compile cache is stored. The `status` field in the returned object would be one of the `module.constants.compileCacheStatus` values to indicate the result of the attempt to enable the [module compile cache](#module-compile-cache).

This method only affects the current Node.js instance. To enable it in child worker threads, either call this method in child worker threads too, or set the `process.env.NODE_COMPILE_CACHE` value to compile cache directory so the behavior can be inherited into the child workers. The directory can be obtained either from the `directory` field returned by this method, or with [`module.getCompileCacheDir()`](#modulegetcompilecachedir).

#### `module.flushCompileCache()`[#](#moduleflushcompilecache)

Added in: v23.0.0

[Stability: 1](documentation.html#stability-index).1 - Active Development

Flush the [module compile cache](#module-compile-cache) accumulated from modules already loaded in the current Node.js instance to disk. This returns after all the flushing file system operations come to an end, no matter they succeed or not. If there are any errors, this will fail silently, since compile cache misses should not interfere with the actual operation of the application.

#### `module.getCompileCacheDir()`[#](#modulegetcompilecachedir)

Added in: v22.8.0

[Stability: 1](documentation.html#stability-index).1 - Active Development

*   Returns: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) Path to the [module compile cache](#module-compile-cache) directory if it is enabled, or `undefined` otherwise.

### Customization Hooks[#](#customization-hooks)

History

Version

Changes

v23.5.0

Add support for synchronous and in-thread hooks.

v20.6.0, v18.19.0

Added `initialize` hook to replace `globalPreload`.

v18.6.0, v16.17.0

Add support for chaining loaders.

v16.12.0

Removed `getFormat`, `getSource`, `transformSource`, and `globalPreload`; added `load` hook and `getGlobalPreload` hook.

v8.8.0

Added in: v8.8.0

[Stability: 1](documentation.html#stability-index).2 - Release candidate (asynchronous version) Stability: 1.1 - Active development (synchronous version)

There are two types of module customization hooks that are currently supported:

1.  `module.register(specifier[, parentURL][, options])` which takes a module that exports asynchronous hook functions. The functions are run on a separate loader thread.
2.  `module.registerHooks(options)` which takes synchronous hook functions that are run directly on the thread where the module is loaded.

#### Enabling[#](#enabling)

Module resolution and loading can be customized by:

1.  Registering a file which exports a set of asynchronous hook functions, using the [`register`](#moduleregisterspecifier-parenturl-options) method from `node:module`,
2.  Registering a set of synchronous hook functions using the [`registerHooks`](#moduleregisterhooksoptions) method from `node:module`.

The hooks can be registered before the application code is run by using the [`--import`](cli.html#--importmodule) or [`--require`](cli.html#-r---require-module) flag:

    node --import ./register-hooks.js ./my-app.js
    node --require ./register-hooks.js ./my-app.js

`// register-hooks.js // This file can only be require()-ed if it doesn't contain top-level await. // Use module.register() to register asynchronous hooks in a dedicated thread. import { register } from 'node:module'; register('./hooks.mjs', import.meta.url);``// register-hooks.js const { register } = require('node:module'); const { pathToFileURL } = require('node:url'); // Use module.register() to register asynchronous hooks in a dedicated thread. register('./hooks.mjs', pathToFileURL(__filename));`copy

`// Use module.registerHooks() to register synchronous hooks in the main thread. import { registerHooks } from 'node:module'; registerHooks({   resolve(specifier, context, nextResolve) { /* implementation */ },   load(url, context, nextLoad) { /* implementation */ }, });``// Use module.registerHooks() to register synchronous hooks in the main thread. const { registerHooks } = require('node:module'); registerHooks({   resolve(specifier, context, nextResolve) { /* implementation */ },   load(url, context, nextLoad) { /* implementation */ }, });`copy

The file passed to `--import` or `--require` can also be an export from a dependency:

    node --import some-package/register ./my-app.js
    node --require some-package/register ./my-app.js

Where `some-package` has an [`"exports"`](packages.html#exports) field defining the `/register` export to map to a file that calls `register()`, like the following `register-hooks.js` example.

Using `--import` or `--require` ensures that the hooks are registered before any application files are imported, including the entry point of the application and for any worker threads by default as well.

Alternatively, `register()` and `registerHooks()` can be called from the entry point, though dynamic `import()` must be used for any ESM code that should be run after the hooks are registered.

``import { register } from 'node:module';  register('http-to-https', import.meta.url);  // Because this is a dynamic `import()`, the `http-to-https` hooks will run // to handle `./my-app.js` and any other files it imports or requires. await import('./my-app.js');````const { register } = require('node:module'); const { pathToFileURL } = require('node:url');  register('http-to-https', pathToFileURL(__filename));  // Because this is a dynamic `import()`, the `http-to-https` hooks will run // to handle `./my-app.js` and any other files it imports or requires. import('./my-app.js');``copy

Customization hooks will run for any modules loaded later than the registration and the modules they reference via `import` and the built-in `require`. `require` function created by users using `module.createRequire()` can only be customized by the synchronous hooks.

In this example, we are registering the `http-to-https` hooks, but they will only be available for subsequently imported modules — in this case, `my-app.js` and anything it references via `import` or built-in `require` in CommonJS dependencies.

If the `import('./my-app.js')` had instead been a static `import './my-app.js'`, the app would have _already_ been loaded **before** the `http-to-https` hooks were registered. This due to the ES modules specification, where static imports are evaluated from the leaves of the tree first, then back to the trunk. There can be static imports _within_ `my-app.js`, which will not be evaluated until `my-app.js` is dynamically imported.

If synchronous hooks are used, both `import`, `require` and user `require` created using `createRequire()` are supported.

`import { registerHooks, createRequire } from 'node:module';  registerHooks({ /* implementation of synchronous hooks */ });  const require = createRequire(import.meta.url);  // The synchronous hooks affect import, require() and user require() function // created through createRequire(). await import('./my-app.js'); require('./my-app-2.js');``const { register, registerHooks } = require('node:module'); const { pathToFileURL } = require('node:url');  registerHooks({ /* implementation of synchronous hooks */ });  const userRequire = createRequire(__filename);  // The synchronous hooks affect import, require() and user require() function // created through createRequire(). import('./my-app.js'); require('./my-app-2.js'); userRequire('./my-app-3.js');`copy

Finally, if all you want to do is register hooks before your app runs and you don't want to create a separate file for that purpose, you can pass a `data:` URL to `--import`:

    node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("http-to-https", pathToFileURL("./"));' ./my-app.js

#### Chaining[#](#chaining)

It's possible to call `register` more than once:

`// entrypoint.mjs import { register } from 'node:module';  register('./foo.mjs', import.meta.url); register('./bar.mjs', import.meta.url); await import('./my-app.mjs');``// entrypoint.cjs const { register } = require('node:module'); const { pathToFileURL } = require('node:url');  const parentURL = pathToFileURL(__filename); register('./foo.mjs', parentURL); register('./bar.mjs', parentURL); import('./my-app.mjs');`copy

In this example, the registered hooks will form chains. These chains run last-in, first out (LIFO). If both `foo.mjs` and `bar.mjs` define a `resolve` hook, they will be called like so (note the right-to-left): node's default ← `./foo.mjs` ← `./bar.mjs` (starting with `./bar.mjs`, then `./foo.mjs`, then the Node.js default). The same applies to all the other hooks.

The registered hooks also affect `register` itself. In this example, `bar.mjs` will be resolved and loaded via the hooks registered by `foo.mjs` (because `foo`'s hooks will have already been added to the chain). This allows for things like writing hooks in non-JavaScript languages, so long as earlier registered hooks transpile into JavaScript.

The `register` method cannot be called from within the module that defines the hooks.

Chaining of `registerHooks` work similarly. If synchronous and asynchronous hooks are mixed, the synchronous hooks are always run first before the asynchronous hooks start running, that is, in the last synchronous hook being run, its next hook includes invocation of the asynchronous hooks.

`// entrypoint.mjs import { registerHooks } from 'node:module';  const hook1 = { /* implementation of hooks */ }; const hook2 = { /* implementation of hooks */ }; // hook2 run before hook1. registerHooks(hook1); registerHooks(hook2);``// entrypoint.cjs const { registerHooks } = require('node:module');  const hook1 = { /* implementation of hooks */ }; const hook2 = { /* implementation of hooks */ }; // hook2 run before hook1. registerHooks(hook1); registerHooks(hook2);`copy

#### Communication with module customization hooks[#](#communication-with-module-customization-hooks)

Asynchronous hooks run on a dedicated thread, separate from the main thread that runs application code. This means mutating global variables won't affect the other thread(s), and message channels must be used to communicate between the threads.

The `register` method can be used to pass data to an [`initialize`](#initialize) hook. The data passed to the hook may include transferable objects like ports.

``import { register } from 'node:module'; import { MessageChannel } from 'node:worker_threads';  // This example demonstrates how a message channel can be used to // communicate with the hooks, by sending `port2` to the hooks. const { port1, port2 } = new MessageChannel();  port1.on('message', (msg) => {   console.log(msg); }); port1.unref();  register('./my-hooks.mjs', {   parentURL: import.meta.url,   data: { number: 1, port: port2 },   transferList: [port2], });````const { register } = require('node:module'); const { pathToFileURL } = require('node:url'); const { MessageChannel } = require('node:worker_threads');  // This example showcases how a message channel can be used to // communicate with the hooks, by sending `port2` to the hooks. const { port1, port2 } = new MessageChannel();  port1.on('message', (msg) => {   console.log(msg); }); port1.unref();  register('./my-hooks.mjs', {   parentURL: pathToFileURL(__filename),   data: { number: 1, port: port2 },   transferList: [port2], });``copy

Synchronous module hooks are run on the same thread where the application code is run. They can directly mutate the globals of the context accessed by the main thread.

#### Hooks[#](#hooks)

##### Asynchronous hooks accepted by `module.register()`[#](#asynchronous-hooks-accepted-by-moduleregister)

The [`register`](#moduleregisterspecifier-parenturl-options) method can be used to register a module that exports a set of hooks. The hooks are functions that are called by Node.js to customize the module resolution and loading process. The exported functions must have specific names and signatures, and they must be exported as named exports.

    export async function initialize({ number, port }) {
      // Receives data from `register`.
    }
    
    export async function resolve(specifier, context, nextResolve) {
      // Take an `import` or `require` specifier and resolve it to a URL.
    }
    
    export async function load(url, context, nextLoad) {
      // Take a resolved URL and return the source code to be evaluated.
    }

Asynchronous hooks are run in a separate thread, isolated from the main thread where application code runs. That means it is a different [realm](https://tc39.es/ecma262/#realm). The hooks thread may be terminated by the main thread at any time, so do not depend on asynchronous operations (like `console.log`) to complete. They are inherited into child workers by default.

##### Synchronous hooks accepted by `module.registerHooks()`[#](#synchronous-hooks-accepted-by-moduleregisterhooks)

Added in: v23.5.0

[Stability: 1](documentation.html#stability-index).1 - Active development

The `module.registerHooks()` method accepts synchronous hook functions. `initialize()` is not supported nor necessary, as the hook implementer can simply run the initialization code directly before the call to `module.registerHooks()`.

    function resolve(specifier, context, nextResolve) {
      // Take an `import` or `require` specifier and resolve it to a URL.
    }
    
    function load(url, context, nextLoad) {
      // Take a resolved URL and return the source code to be evaluated.
    }

Synchronous hooks are run in the same thread and the same [realm](https://tc39.es/ecma262/#realm) where the modules are loaded. Unlike the asynchronous hooks they are not inherited into child worker threads by default, though if the hooks are registered using a file preloaded by [`--import`](cli.html#--importmodule) or [`--require`](cli.html#-r---require-module), child worker threads can inherit the preloaded scripts via `process.execArgv` inheritance. See [the documentation of `Worker`](worker_threads.html#new-workerfilename-options) for detail.

In synchronous hooks, users can expect `console.log()` to complete in the same way that they expect `console.log()` in module code to complete.

##### Conventions of hooks[#](#conventions-of-hooks)

Hooks are part of a [chain](#chaining), even if that chain consists of only one custom (user-provided) hook and the default hook, which is always present. Hook functions nest: each one must always return a plain object, and chaining happens as a result of each function calling `next<hookName>()`, which is a reference to the subsequent loader's hook (in LIFO order).

A hook that returns a value lacking a required property triggers an exception. A hook that returns without calling `next<hookName>()` _and_ without returning `shortCircuit: true` also triggers an exception. These errors are to help prevent unintentional breaks in the chain. Return `shortCircuit: true` from a hook to signal that the chain is intentionally ending at your hook.

##### `initialize()`[#](#initialize)

Added in: v20.6.0, v18.19.0

[Stability: 1](documentation.html#stability-index).2 - Release candidate

*   `data` [<any>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) The data from `register(loader, import.meta.url, { data })`.

The `initialize` hook is only accepted by [`register`](#moduleregisterspecifier-parenturl-options). `registerHooks()` does not support nor need it since initialization done for synchronous hooks can be run directly before the call to `registerHooks()`.

The `initialize` hook provides a way to define a custom function that runs in the hooks thread when the hooks module is initialized. Initialization happens when the hooks module is registered via [`register`](#moduleregisterspecifier-parenturl-options).

This hook can receive data from a [`register`](#moduleregisterspecifier-parenturl-options) invocation, including ports and other transferable objects. The return value of `initialize` can be a [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), in which case it will be awaited before the main application thread execution resumes.

Module customization code:

    // path-to-my-hooks.js
    
    export async function initialize({ number, port }) {
      port.postMessage(`increment: ${number + 1}`);
    }

Caller code:

``import assert from 'node:assert'; import { register } from 'node:module'; import { MessageChannel } from 'node:worker_threads';  // This example showcases how a message channel can be used to communicate // between the main (application) thread and the hooks running on the hooks // thread, by sending `port2` to the `initialize` hook. const { port1, port2 } = new MessageChannel();  port1.on('message', (msg) => {   assert.strictEqual(msg, 'increment: 2'); }); port1.unref();  register('./path-to-my-hooks.js', {   parentURL: import.meta.url,   data: { number: 1, port: port2 },   transferList: [port2], });````const assert = require('node:assert'); const { register } = require('node:module'); const { pathToFileURL } = require('node:url'); const { MessageChannel } = require('node:worker_threads');  // This example showcases how a message channel can be used to communicate // between the main (application) thread and the hooks running on the hooks // thread, by sending `port2` to the `initialize` hook. const { port1, port2 } = new MessageChannel();  port1.on('message', (msg) => {   assert.strictEqual(msg, 'increment: 2'); }); port1.unref();  register('./path-to-my-hooks.js', {   parentURL: pathToFileURL(__filename),   data: { number: 1, port: port2 },   transferList: [port2], });``copy

##### `resolve(specifier, context, nextResolve)`[#](#resolvespecifier-context-nextresolve)

History

Version

Changes

v23.5.0

Add support for synchronous and in-thread hooks.

v21.0.0, v20.10.0, v18.19.0

The property `context.importAssertions` is replaced with `context.importAttributes`. Using the old name is still supported and will emit an experimental warning.

v18.6.0, v16.17.0

Add support for chaining resolve hooks. Each hook must either call `nextResolve()` or include a `shortCircuit` property set to `true` in its return.

v17.1.0, v16.14.0

Add support for import assertions.

[Stability: 1](documentation.html#stability-index).2 - Release candidate (asynchronous version) Stability: 1.1 - Active development (synchronous version)

*   `specifier` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `context` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `conditions` [<string\[\]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Export conditions of the relevant `package.json`
    *   `importAttributes` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) An object whose key-value pairs represent the attributes for the module to import
    *   `parentURL` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) The module importing this one, or undefined if this is the Node.js entry point
*   `nextResolve` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The subsequent `resolve` hook in the chain, or the Node.js default `resolve` hook after the last user-supplied `resolve` hook
    *   `specifier` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `context` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   Returns: [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) The asynchronous version takes either an object containing the following properties, or a `Promise` that will resolve to such an object. The synchronous version only accepts an object returned synchronously.
    *   `format` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) A hint to the load hook (it might be ignored) `'builtin' | 'commonjs' | 'json' | 'module' | 'wasm'`
    *   `importAttributes` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) The import attributes to use when caching the module (optional; if excluded the input will be used)
    *   `shortCircuit` [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) | [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) A signal that this hook intends to terminate the chain of `resolve` hooks. **Default:** `false`
    *   `url` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The absolute URL to which this input resolves

> **Warning** In the case of the asynchronous version, despite support for returning promises and async functions, calls to `resolve` may still block the main thread which can impact performance.

The `resolve` hook chain is responsible for telling Node.js where to find and how to cache a given `import` statement or expression, or `require` call. It can optionally return a format (such as `'module'`) as a hint to the `load` hook. If a format is specified, the `load` hook is ultimately responsible for providing the final `format` value (and it is free to ignore the hint provided by `resolve`); if `resolve` provides a `format`, a custom `load` hook is required even if only to pass the value to the Node.js default `load` hook.

Import type attributes are part of the cache key for saving loaded modules into the internal module cache. The `resolve` hook is responsible for returning an `importAttributes` object if the module should be cached with different attributes than were present in the source code.

The `conditions` property in `context` is an array of conditions that will be used to match [package exports conditions](packages.html#conditional-exports) for this resolution request. They can be used for looking up conditional mappings elsewhere or to modify the list when calling the default resolution logic.

The current [package exports conditions](packages.html#conditional-exports) are always in the `context.conditions` array passed into the hook. To guarantee _default Node.js module specifier resolution behavior_ when calling `defaultResolve`, the `context.conditions` array passed to it _must_ include _all_ elements of the `context.conditions` array originally passed into the `resolve` hook.

    // Asynchronous version accepted by module.register().
    export async function resolve(specifier, context, nextResolve) {
      const { parentURL = null } = context;
    
      if (Math.random() > 0.5) { // Some condition.
        // For some or all specifiers, do some custom logic for resolving.
        // Always return an object of the form {url: <string>}.
        return {
          shortCircuit: true,
          url: parentURL ?
            new URL(specifier, parentURL).href :
            new URL(specifier).href,
        };
      }
    
      if (Math.random() < 0.5) { // Another condition.
        // When calling `defaultResolve`, the arguments can be modified. In this
        // case it's adding another value for matching conditional exports.
        return nextResolve(specifier, {
          ...context,
          conditions: [...context.conditions, 'another-condition'],
        });
      }
    
      // Defer to the next hook in the chain, which would be the
      // Node.js default resolve if this is the last user-specified loader.
      return nextResolve(specifier);
    }

    // Synchronous version accepted by module.registerHooks().
    function resolve(specifier, context, nextResolve) {
      // Similar to the asynchronous resolve() above, since that one does not have
      // any asynchronous logic.
    }

##### `load(url, context, nextLoad)`[#](#loadurl-context-nextload)

History

Version

Changes

v23.5.0

Add support for synchronous and in-thread version.

v20.6.0

Add support for `source` with format `commonjs`.

v18.6.0, v16.17.0

Add support for chaining load hooks. Each hook must either call `nextLoad()` or include a `shortCircuit` property set to `true` in its return.

[Stability: 1](documentation.html#stability-index).2 - Release candidate (asynchronous version) Stability: 1.1 - Active development (synchronous version)

*   `url` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The URL returned by the `resolve` chain
*   `context` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `conditions` [<string\[\]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Export conditions of the relevant `package.json`
    *   `format` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) The format optionally supplied by the `resolve` hook chain
    *   `importAttributes` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `nextLoad` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) The subsequent `load` hook in the chain, or the Node.js default `load` hook after the last user-supplied `load` hook
    *   `url` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `context` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   Returns: [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) The asynchronous version takes either an object containing the following properties, or a `Promise` that will resolve to such an object. The synchronous version only accepts an object returned synchronously.
    *   `format` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `shortCircuit` [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) | [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) A signal that this hook intends to terminate the chain of `load` hooks. **Default:** `false`
    *   `source` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<ArrayBuffer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | [<TypedArray>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) The source for Node.js to evaluate

The `load` hook provides a way to define a custom method of determining how a URL should be interpreted, retrieved, and parsed. It is also in charge of validating the import attributes.

The final value of `format` must be one of the following:

`format`

Description

Acceptable types for `source` returned by `load`

`'builtin'`

Load a Node.js builtin module

Not applicable

`'commonjs'`

Load a Node.js CommonJS module

{ [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), `null`, `undefined` }

`'json'`

Load a JSON file

{ [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) }

`'module'`

Load an ES module

{ [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) }

`'wasm'`

Load a WebAssembly module

{ [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) }

The value of `source` is ignored for type `'builtin'` because currently it is not possible to replace the value of a Node.js builtin (core) module.

###### Caveat in the asynchronous `load` hook[#](#caveat-in-the-asynchronous-load-hook)

When using the asynchronous `load` hook, omitting vs providing a `source` for `'commonjs'` has very different effects:

*   When a `source` is provided, all `require` calls from this module will be processed by the ESM loader with registered `resolve` and `load` hooks; all `require.resolve` calls from this module will be processed by the ESM loader with registered `resolve` hooks; only a subset of the CommonJS API will be available (e.g. no `require.extensions`, no `require.cache`, no `require.resolve.paths`) and monkey-patching on the CommonJS module loader will not apply.
*   If `source` is undefined or `null`, it will be handled by the CommonJS module loader and `require`/`require.resolve` calls will not go through the registered hooks. This behavior for nullish `source` is temporary — in the future, nullish `source` will not be supported.

These caveats do not apply to the synchronous `load` hook, in which case the complete set of CommonJS APIs available to the customized CommonJS modules, and `require`/`require.resolve` always go through the registered hooks.

The Node.js internal asynchronous `load` implementation, which is the value of `next` for the last hook in the `load` chain, returns `null` for `source` when `format` is `'commonjs'` for backward compatibility. Here is an example hook that would opt-in to using the non-default behavior:

    import { readFile } from 'node:fs/promises';
    
    // Asynchronous version accepted by module.register(). This fix is not needed
    // for the synchronous version accepted by module.registerSync().
    export async function load(url, context, nextLoad) {
      const result = await nextLoad(url, context);
      if (result.format === 'commonjs') {
        result.source ??= await readFile(new URL(result.responseURL ?? url));
      }
      return result;
    }

This doesn't apply to the synchronous `load` hook either, in which case the `source` returned contains source code loaded by the next hook, regardless of module format.

> **Warning**: The asynchronous `load` hook and namespaced exports from CommonJS modules are incompatible. Attempting to use them together will result in an empty object from the import. This may be addressed in the future. This does not apply to the synchronous `load` hook, in which case exports can be used as usual.

> These types all correspond to classes defined in ECMAScript.

*   The specific [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) object is a [`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer).
*   The specific [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) object is a [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array).

If the source value of a text-based format (i.e., `'json'`, `'module'`) is not a string, it is converted to a string using [`util.TextDecoder`](util.html#class-utiltextdecoder).

The `load` hook provides a way to define a custom method for retrieving the source code of a resolved URL. This would allow a loader to potentially avoid reading files from disk. It could also be used to map an unrecognized format to a supported one, for example `yaml` to `module`.

    // Asynchronous version accepted by module.register().
    export async function load(url, context, nextLoad) {
      const { format } = context;
    
      if (Math.random() > 0.5) { // Some condition
        /*
          For some or all URLs, do some custom logic for retrieving the source.
          Always return an object of the form {
            format: <string>,
            source: <string|buffer>,
          }.
        */
        return {
          format,
          shortCircuit: true,
          source: '...',
        };
      }
    
      // Defer to the next hook in the chain.
      return nextLoad(url);
    }

    // Synchronous version accepted by module.registerHooks().
    function load(url, context, nextLoad) {
      // Similar to the asynchronous load() above, since that one does not have
      // any asynchronous logic.
    }

In a more advanced scenario, this can also be used to transform an unsupported source to a supported one (see [Examples](#examples) below).

#### Examples[#](#examples)

The various module customization hooks can be used together to accomplish wide-ranging customizations of the Node.js code loading and evaluation behaviors.

##### Import from HTTPS[#](#import-from-https)

The hook below registers hooks to enable rudimentary support for such specifiers. While this may seem like a significant improvement to Node.js core functionality, there are substantial downsides to actually using these hooks: performance is much slower than loading files from disk, there is no caching, and there is no security.

    // https-hooks.mjs
    import { get } from 'node:https';
    
    export function load(url, context, nextLoad) {
      // For JavaScript to be loaded over the network, we need to fetch and
      // return it.
      if (url.startsWith('https://')) {
        return new Promise((resolve, reject) => {
          get(url, (res) => {
            let data = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({
              // This example assumes all network-provided JavaScript is ES module
              // code.
              format: 'module',
              shortCircuit: true,
              source: data,
            }));
          }).on('error', (err) => reject(err));
        });
      }
    
      // Let Node.js handle all other URLs.
      return nextLoad(url);
    }

    // main.mjs
    import { VERSION } from 'https://coffeescript.org/browser-compiler-modern/coffeescript.js';
    
    console.log(VERSION);

With the preceding hooks module, running `node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register(pathToFileURL("./https-hooks.mjs"));' ./main.mjs` prints the current version of CoffeeScript per the module at the URL in `main.mjs`.

##### Transpilation[#](#transpilation)

Sources that are in formats Node.js doesn't understand can be converted into JavaScript using the [`load` hook](#loadurl-context-nextload).

This is less performant than transpiling source files before running Node.js; transpiler hooks should only be used for development and testing purposes.

###### Asynchronous version[#](#asynchronous-version)

    // coffeescript-hooks.mjs
    import { readFile } from 'node:fs/promises';
    import { dirname, extname, resolve as resolvePath } from 'node:path';
    import { cwd } from 'node:process';
    import { fileURLToPath, pathToFileURL } from 'node:url';
    import coffeescript from 'coffeescript';
    
    const extensionsRegex = /\.(coffee|litcoffee|coffee\.md)$/;
    
    export async function load(url, context, nextLoad) {
      if (extensionsRegex.test(url)) {
        // CoffeeScript files can be either CommonJS or ES modules, so we want any
        // CoffeeScript file to be treated by Node.js the same as a .js file at the
        // same location. To determine how Node.js would interpret an arbitrary .js
        // file, search up the file system for the nearest parent package.json file
        // and read its "type" field.
        const format = await getPackageType(url);
    
        const { source: rawSource } = await nextLoad(url, { ...context, format });
        // This hook converts CoffeeScript source code into JavaScript source code
        // for all imported CoffeeScript files.
        const transformedSource = coffeescript.compile(rawSource.toString(), url);
    
        return {
          format,
          shortCircuit: true,
          source: transformedSource,
        };
      }
    
      // Let Node.js handle all other URLs.
      return nextLoad(url);
    }
    
    async function getPackageType(url) {
      // `url` is only a file path during the first iteration when passed the
      // resolved url from the load() hook
      // an actual file path from load() will contain a file extension as it's
      // required by the spec
      // this simple truthy check for whether `url` contains a file extension will
      // work for most projects but does not cover some edge-cases (such as
      // extensionless files or a url ending in a trailing space)
      const isFilePath = !!extname(url);
      // If it is a file path, get the directory it's in
      const dir = isFilePath ?
        dirname(fileURLToPath(url)) :
        url;
      // Compose a file path to a package.json in the same directory,
      // which may or may not exist
      const packagePath = resolvePath(dir, 'package.json');
      // Try to read the possibly nonexistent package.json
      const type = await readFile(packagePath, { encoding: 'utf8' })
        .then((filestring) => JSON.parse(filestring).type)
        .catch((err) => {
          if (err?.code !== 'ENOENT') console.error(err);
        });
      // If package.json existed and contained a `type` field with a value, voilà
      if (type) return type;
      // Otherwise, (if not at the root) continue checking the next directory up
      // If at the root, stop and return false
      return dir.length > 1 && getPackageType(resolvePath(dir, '..'));
    }

###### Synchronous version[#](#synchronous-version)

    // coffeescript-sync-hooks.mjs
    import { readFileSync } from 'node:fs/promises';
    import { registerHooks } from 'node:module';
    import { dirname, extname, resolve as resolvePath } from 'node:path';
    import { cwd } from 'node:process';
    import { fileURLToPath, pathToFileURL } from 'node:url';
    import coffeescript from 'coffeescript';
    
    const extensionsRegex = /\.(coffee|litcoffee|coffee\.md)$/;
    
    function load(url, context, nextLoad) {
      if (extensionsRegex.test(url)) {
        const format = getPackageType(url);
    
        const { source: rawSource } = nextLoad(url, { ...context, format });
        const transformedSource = coffeescript.compile(rawSource.toString(), url);
    
        return {
          format,
          shortCircuit: true,
          source: transformedSource,
        };
      }
    
      return nextLoad(url);
    }
    
    function getPackageType(url) {
      const isFilePath = !!extname(url);
      const dir = isFilePath ? dirname(fileURLToPath(url)) : url;
      const packagePath = resolvePath(dir, 'package.json');
    
      let type;
      try {
        const filestring = readFileSync(packagePath, { encoding: 'utf8' });
        type = JSON.parse(filestring).type;
      } catch (err) {
        if (err?.code !== 'ENOENT') console.error(err);
      }
      if (type) return type;
      return dir.length > 1 && getPackageType(resolvePath(dir, '..'));
    }
    
    registerHooks({ load });

##### Running hooks[#](#running-hooks)

    # main.coffee
    import { scream } from './scream.coffee'
    console.log scream 'hello, world'
    
    import { version } from 'node:process'
    console.log "Brought to you by Node.js version #{version}"

    # scream.coffee
    export scream = (str) -> str.toUpperCase()

With the preceding hooks modules, running `node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register(pathToFileURL("./coffeescript-hooks.mjs"));' ./main.coffee` or `node --import ./coffeescript-sync-hooks.mjs ./main.coffee` causes `main.coffee` to be turned into JavaScript after its source code is loaded from disk but before Node.js executes it; and so on for any `.coffee`, `.litcoffee` or `.coffee.md` files referenced via `import` statements of any loaded file.

##### Import maps[#](#import-maps)

The previous two examples defined `load` hooks. This is an example of a `resolve` hook. This hooks module reads an `import-map.json` file that defines which specifiers to override to other URLs (this is a very simplistic implementation of a small subset of the "import maps" specification).

###### Asynchronous version[#](#asynchronous-version_1)

    // import-map-hooks.js
    import fs from 'node:fs/promises';
    
    const { imports } = JSON.parse(await fs.readFile('import-map.json'));
    
    export async function resolve(specifier, context, nextResolve) {
      if (Object.hasOwn(imports, specifier)) {
        return nextResolve(imports[specifier], context);
      }
    
      return nextResolve(specifier, context);
    }

###### Synchronous version[#](#synchronous-version_1)

    // import-map-sync-hooks.js
    import fs from 'node:fs/promises';
    import module from 'node:module';
    
    const { imports } = JSON.parse(fs.readFileSync('import-map.json', 'utf-8'));
    
    function resolve(specifier, context, nextResolve) {
      if (Object.hasOwn(imports, specifier)) {
        return nextResolve(imports[specifier], context);
      }
    
      return nextResolve(specifier, context);
    }
    
    module.registerHooks({ resolve });

###### Using the hooks[#](#using-the-hooks)

With these files:

    // main.js
    import 'a-module';

    // import-map.json
    {
      "imports": {
        "a-module": "./some-module.js"
      }
    }

    // some-module.js
    console.log('some module!');

Running `node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register(pathToFileURL("./import-map-hooks.js"));' main.js` or `node --import ./import-map-sync-hooks.js main.js` should print `some module!`.

### Source map v3 support[#](#source-map-v3-support)

Added in: v13.7.0, v12.17.0

[Stability: 1](documentation.html#stability-index) - Experimental

Helpers for interacting with the source map cache. This cache is populated when source map parsing is enabled and [source map include directives](https://sourcemaps.info/spec.html#h.lmz475t4mvbx) are found in a modules' footer.

To enable source map parsing, Node.js must be run with the flag [`--enable-source-maps`](cli.html#--enable-source-maps), or with code coverage enabled by setting [`NODE_V8_COVERAGE=dir`](cli.html#node_v8_coveragedir).

`// module.mjs // In an ECMAScript module import { findSourceMap, SourceMap } from 'node:module';``// module.cjs // In a CommonJS module const { findSourceMap, SourceMap } = require('node:module');`copy

#### `module.findSourceMap(path)`[#](#modulefindsourcemappath)

Added in: v13.7.0, v12.17.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   Returns: [<module.SourceMap>](module.html#class-modulesourcemap) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) Returns `module.SourceMap` if a source map is found, `undefined` otherwise.

`path` is the resolved path for the file for which a corresponding source map should be fetched.

#### Class: `module.SourceMap`[#](#class-modulesourcemap)

Added in: v13.7.0, v12.17.0

##### `new SourceMap(payload[, { lineLengths }])`[#](#new-sourcemappayload--linelengths-)

*   `payload` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `lineLengths` [<number\[\]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Creates a new `sourceMap` instance.

`payload` is an object with keys matching the [Source map v3 format](https://sourcemaps.info/spec.html#h.mofvlxcwqzej):

*   `file`: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `version`: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `sources`: [<string\[\]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `sourcesContent`: [<string\[\]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `names`: [<string\[\]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `mappings`: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `sourceRoot`: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

`lineLengths` is an optional array of the length of each line in the generated code.

##### `sourceMap.payload`[#](#sourcemappayload)

*   Returns: [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Getter for the payload used to construct the [`SourceMap`](#class-modulesourcemap) instance.

##### `sourceMap.findEntry(lineOffset, columnOffset)`[#](#sourcemapfindentrylineoffset-columnoffset)

*   `lineOffset` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The zero-indexed line number offset in the generated source
*   `columnOffset` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The zero-indexed column number offset in the generated source
*   Returns: [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Given a line offset and column offset in the generated source file, returns an object representing the SourceMap range in the original file if found, or an empty object if not.

The object returned contains the following keys:

*   generatedLine: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The line offset of the start of the range in the generated source
*   generatedColumn: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The column offset of start of the range in the generated source
*   originalSource: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The file name of the original source, as reported in the SourceMap
*   originalLine: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The line offset of the start of the range in the original source
*   originalColumn: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The column offset of start of the range in the original source
*   name: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The returned value represents the raw range as it appears in the SourceMap, based on zero-indexed offsets, _not_ 1-indexed line and column numbers as they appear in Error messages and CallSite objects.

To get the corresponding 1-indexed line and column numbers from a lineNumber and columnNumber as they are reported by Error stacks and CallSite objects, use `sourceMap.findOrigin(lineNumber, columnNumber)`

##### `sourceMap.findOrigin(lineNumber, columnNumber)`[#](#sourcemapfindoriginlinenumber-columnnumber)

*   `lineNumber` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The 1-indexed line number of the call site in the generated source
*   `columnNumber` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The 1-indexed column number of the call site in the generated source
*   Returns: [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Given a 1-indexed `lineNumber` and `columnNumber` from a call site in the generated source, find the corresponding call site location in the original source.

If the `lineNumber` and `columnNumber` provided are not found in any source map, then an empty object is returned. Otherwise, the returned object contains the following keys:

*   name: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) The name of the range in the source map, if one was provided
*   fileName: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The file name of the original source, as reported in the SourceMap
*   lineNumber: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The 1-indexed lineNumber of the corresponding call site in the original source
*   columnNumber: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The 1-indexed columnNumber of the corresponding call site in the original source