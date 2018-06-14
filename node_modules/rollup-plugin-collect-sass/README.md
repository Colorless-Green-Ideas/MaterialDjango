
# Rollup Plugin Collect Sass

[![CircleCI](https://circleci.com/gh/nathancahill/rollup-plugin-collect-sass.svg?style=svg)](https://circleci.com/gh/nathancahill/rollup-plugin-collect-sass)

> :sleeping: Tired: minimalist 'lightweight' libraries
> 
> :zap: Wired: feature-rich compilers with lightweight output
>

&mdash; <cite>[Rich Harris](https://twitter.com/Rich_Harris/status/855012360892928000), creator of Rollup</cite>

## Why

Most methods for transforming Sass with Rollup operate on an individual file level. In JS, writing `import './variables.scss'` followed by `import './header.scss'` will create independent contexts for each file when compiled (variables defined in `variables.scss` will not be available in `header.scss`).

The common solution is to collect all Sass imports into a single Sass entrypoint (like `index.scss`), which is then imported once for Rollup. However, this solution is not ideal, because this second entrypoint must be kept in sync with the bundled components.

Instead, each component could import the exact Sass files it requires. This is __especially useful for libraries, where modular components and CSS is desirable__. To support this, two problems must be solved:

 - Import bloat (duplicate Sass imports in the final bundle)
 - Single context (variables defined in one import are not available in the next)

To this end, this plugin compiles Sass in two passes: It collects each Sass import (and resolves relative `@import` statements within the files), then does a second pass to compile all collected Sass to CSS, optionally deduplicating `@import` statements.

## Features

- Processes all Sass encountered by Rollup in a single context, in import order.
- Supports `node_modules` resolution, following the same Sass file name resolution algorithm. Importing from, for example, `bootstrap/scss/` Just Works&trade;.
- Optionally dedupes `@import` statements, including from `node_modules`. This prevents duplication of common imports shared by multiple components, promotes encapulation and allows modules to standalone if need be.
- By default, inserts CSS in to `<header>`, although file output is supported as well with the `extract` option.

## Installation

```
npm install rollup-plugin-collect-sass --save-dev
```

## Usage

```
import collectSass from 'rollup-plugin-collect-sass'

export default {
    plugins: [
        collectSass({
            ...options
        }),
    ],
}
```

## Options

### `importOnce`

Boolean, if set to `true`, all Sass `@import` statements are deduped after absolute paths are resolved. Default: `false` to match default libsass/Ruby Sass behavior.

#### `extensions`

File extensions to include in the transformer. Default: `['.scss', '.sass']`

### `include`

minimatch glob pattern (or array) of files to include. Default: `['**/*.scss', '**/*.sass']`

### `exclude`

minimatch glob pattern (or array) of files to exclude.

### `extract`

Either a boolean or a string path for the file to extract CSS output to. If boolean `true`, defaults to the same path as the JS output with `.css` extension. Default: `false`

If set to `false`, CSS is injected in to the header with JS.

### `extractPath`

Another way to specify the output path. Ignored if `extract` is falsy.

## License

Copyright (c) 2017 Nathan Cahill

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
