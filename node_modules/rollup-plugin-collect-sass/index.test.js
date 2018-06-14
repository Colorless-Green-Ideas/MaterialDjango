
import fs from 'fs'
import { rollup } from 'rollup'
import resolve from 'rollup-plugin-node-resolve'

import collectSass from './index.js'

const unJS = str => str
    .trim()
    .replace(/\\n/g, '')
    .replace(/\n/g, '')
    .replace(/\\"/g, '"')

test('simple', done => rollup({
    entry: 'fixtures/simple.js',
    plugins: [
        collectSass(),
    ],
}).then(bundle => {
    const output = unJS(bundle.generate({ format: 'es' }).code)
    const expected = `"${unJS(fs.readFileSync('fixtures/simple-output.css').toString())}"`

    expect(output).toEqual(expect.stringContaining(expected))
    done()
}))

test('supports sourcemaps', done => rollup({
    entry: 'fixtures/simple.js',
    plugins: [
        collectSass(),
    ],
    sourceMap: true,
}).then(bundle => {
    const output = unJS(bundle.generate({ format: 'es' }).code)
    const expected = `"${unJS(fs.readFileSync('fixtures/simple-output.css').toString())}"`

    expect(output).toEqual(expect.stringContaining(expected))
    done()
}))

test('imports', done => rollup({
    entry: 'fixtures/imports.js',
    plugins: [
        collectSass(),
    ],
}).then(bundle => {
    const output = unJS(bundle.generate({ format: 'es' }).code)
    const expected = `"${unJS(fs.readFileSync('fixtures/imports-output.css').toString())}"`

    expect(output).toEqual(expect.stringContaining(expected))
    done()
}))

test('multiple imports', done => rollup({
    entry: 'fixtures/multiple.js',
    plugins: [
        collectSass(),
    ],
}).then(bundle => {
    const output = unJS(bundle.generate({ format: 'es' }).code)
    const expected = `"${unJS(fs.readFileSync('fixtures/multiple-output.css').toString())}"`

    expect(output).toEqual(expect.stringContaining(expected))
    done()
}))

test('without importOnce', done => rollup({
    entry: 'fixtures/dedupe.js',
    plugins: [
        collectSass(),
    ],
}).then(bundle => {
    const output = unJS(bundle.generate({ format: 'es' }).code)
    const expected = `"${unJS(fs.readFileSync('fixtures/dedupe-output.css').toString())}"`

    expect(output).toEqual(expect.stringContaining(expected))
    done()
}))

test('with importOnce', done => rollup({
    entry: 'fixtures/dedupe.js',
    plugins: [
        collectSass({
            importOnce: true,
        }),
    ],
}).then(bundle => {
    const output = unJS(bundle.generate({ format: 'es' }).code)
    const expected = `"${unJS(fs.readFileSync('fixtures/dedupe-output-importOnce.css').toString())}"`

    expect(output).toEqual(expect.stringContaining(expected))
    done()
}))

test('with duplicate js imports', done => rollup({
    entry: 'fixtures/dedupe-js.js',
    plugins: [
        collectSass({
            importOnce: true,
        }),
    ],
}).then(bundle => {
    const output = unJS(bundle.generate({ format: 'es' }).code)
    const expected = `"${unJS(fs.readFileSync('fixtures/dedupe-js-output.css').toString())}"`

    expect(output).toEqual(expect.stringContaining(expected))
    done()
}))

test('import node_modules', done => rollup({
    entry: 'fixtures/node-modules.js',
    plugins: [
        collectSass(),
    ],
}).then(bundle => {
    const output = unJS(bundle.generate({ format: 'es' }).code)
    const expected = `"${unJS(fs.readFileSync('fixtures/node-modules-output.css').toString())}"`

    expect(output).toEqual(expect.stringContaining(expected))
    done()
}))

test('import node_modules from js', done => rollup({
    entry: 'fixtures/node-modules-js.js',
    plugins: [
        resolve(),
        collectSass(),
    ],
}).then(bundle => {
    const output = unJS(bundle.generate({ format: 'es' }).code)
    const expected = `"${unJS(fs.readFileSync('fixtures/node-modules-output.css').toString())}"`

    expect(output).toEqual(expect.stringContaining(expected))
    done()
}))

test('with multiline comments', done => rollup({
    entry: 'fixtures/multiline.js',
    plugins: [
        collectSass(),
    ],
}).then(bundle => {
    const output = unJS(bundle.generate({ format: 'es' }).code)
    const expected = `"${unJS(fs.readFileSync('fixtures/multiline-output.css').toString())}"`

    expect(output).toEqual(expect.stringContaining(expected))
    done()
}))
