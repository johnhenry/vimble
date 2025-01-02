import test from 'node:test';
import assert from 'node:assert/strict';
import { constatns, createContext, Script, SourceTextModule } from '../src/index.mjs';

test('createContext', async (t) => {
    await t.test('creates empty context by default', () => {
        const context = createContext({});
        assert.deepEqual(Object.keys(context).sort(), Object.keys(globalThis)
            .filter(key => key !== '0')
            .concat(['globalThis'])
            .sort());
    });

    await t.test('preserves global context with DONT_CONTEXTIFY', () => {
        const context = createContext(constatns.DONT_CONTEXTIFY);
        assert.equal(Object.getPrototypeOf(context), globalThis);
    });

    await t.test('merges provided context', () => {
        const customContext = { testKey: 'testValue' };
        const context = createContext(customContext);
        assert.equal(context.testKey, 'testValue');
    });
});

test('Script', async (t) => {
    await t.test('constructor preserves code', () => {
        const code = 'return 42;';
        const script = new Script(code);
        assert.equal(script.code, code);
    });

    await t.test('runInContext executes code in isolation', async () => {
        const code = 'return testValue;';
        const script = new Script(code);
        const context = { testValue: 42 };
        const result = await script.runInContext(context);
        assert.equal(result, 42);
    });

    await t.test('handles async code', async () => {
        const code = 'return await Promise.resolve(42);';
        const script = new Script(code);
        const result = await script.runInContext({});
        assert.equal(result, 42);
    });
});

test('SourceTextModule', async (t) => {
    await t.test('constructor initializes with code and context', () => {
        const code = 'export const value = 42;';
        const context = { test: true };
        const module = new SourceTextModule(code, { context });
        assert.ok(module instanceof SourceTextModule);
    });

    await t.test('evaluate executes module code', async () => {
        const code = 'return 42;';
        const module = new SourceTextModule(code);
        const result = await module.evaluate();
        assert.equal(result, 42);
    });
});
