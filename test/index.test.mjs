import test from 'node:test';
import assert from 'node:assert/strict';
import { run, runWithInjectedConsole, InjectedConsole} from '../src/index.mjs';

test('run executes basic code', async (t) => {
  const result = await run('return 42;', {});
  assert.equal(result, 42);
});

test('run with context variables', async (t) => {
  const result = await run('return x + y;', { x: 20, y: 22 });
  assert.equal(result, 42);
});

test('run handles async code', async (t) => {
  const result = await run('return await Promise.resolve(42);', {});
  assert.equal(result, 42);
});

test('run throws on syntax error', async (t) => {
  await assert.rejects(
    async () => await run('invalid code;', {}),
    /SyntaxError/
  );
});

test('environment isolation - cannot access outer scope', async (t) => {
  const secretValue = 'secret123';
  const result = await run('return typeof secretValue;', {});
  assert.equal(result, 'undefined');
});

test('environment isolation - variables are contained', async (t) => {
  const result = await run(`
    let x = 1;
    x = 2;
    return x;
  `, {});
  assert.equal(result, 2);
  
  const result2 = await run('return typeof x;', {});
  assert.equal(result2, 'undefined');
});

test('environment isolation - global objects are restricted', async (t) => {
  const result = await run(`
    return {
      hasFetch: typeof fetch === 'function',
      hasProcess: typeof process === 'undefined',
      hasRequire: typeof require === 'function',
      hasModule: typeof module === 'object',
      hasGlobal: typeof global === 'object',
      hasWindow: typeof window === 'object'
    };
  `, {});

  assert.deepEqual(result, {
    hasFetch: false,
    hasProcess: false,
    hasRequire: false,
    hasModule: false,
    hasGlobal: false,
    hasWindow: false
  });
});

test('environment isolation - fetch API is restricted', async (t) => {
  const result = await run(`
    try {
      await fetch('https://example.com');
      return 'fetch succeeded';
    } catch (e) {
      return e.constructor.name;
    }
  `, {});
  
  assert.equal(result, 'TypeError');
});

test('InjectedConsole captures output', async (t) => {
  const console = new InjectedConsole();
  console.log('test message');
  assert.match(console.output, /test message/);
});

test('InjectedConsole captures errors', async (t) => {
  const console = new InjectedConsole();
  console.error('error message');
  assert.match(console.errors, /error message/);
});

test('InjectedConsole reset clears buffers', async (t) => {
  const console = new InjectedConsole();
  console.log('test');
  console.error('error');
  console.reset();
  assert.equal(console.output, '');
  assert.equal(console.errors, '');
});

test('runWithInjectedConsole captures output', async (t) => {
  const result = await runWithInjectedConsole('console.log("test output");');
  assert.match(result, /test output/);
});

test('runWithInjectedConsole with context', async (t) => {
  const result = await runWithInjectedConsole(
    'console.log(message);',
    { message: 'Hello World' }
  );
  assert.match(result, /Hello World/);
});

test('separate console instances have separate state', async (t) => {
  const console1 = new InjectedConsole();
  const console2 = new InjectedConsole();
  
  console1.log('message1');
  console2.log('message2');
  
  assert.equal(console1.output, 'message1');
  assert.equal(console2.output, 'message2');
});