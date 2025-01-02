import test from 'node:test';
import assert from 'node:assert/strict';
import { run, runWithInjectedConsole, InjectedConsole} from '../src/index.mjs';

// TODO: Add more tests

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

test('InjectedConsole captures log output', async (t) => {
  const console = new InjectedConsole();
  console.log('test message');
  assert.match(console.result, /test message/);
});

test('InjectedConsole captures error output', async (t) => {
  const console = new InjectedConsole();
  console.error('error message');
  assert.match(console.result, /error message/);
});

test('InjectedConsole reset clears buffers', async (t) => {
  const console = new InjectedConsole();
  console.log('test');
  console.error('error');
  console.reset();
  assert.equal(console.result, '');
});

test('runWithInjectedConsole captures console output', async (t) => {
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

test('runWithInjectedConsole captures errors', async (t) => {
  const result = await runWithInjectedConsole('console.error("test error");');
  assert.match(result, /test error/);
});