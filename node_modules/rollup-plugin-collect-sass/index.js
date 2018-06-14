
import fs from 'fs'
import path from 'path'
import resolve from 'resolve'
import styleInject from 'style-inject'
import sass from 'node-sass'
import { createFilter } from 'rollup-pluginutils'

const START_COMMENT_FLAG = '/* collect-postcss-start'
const END_COMMENT_FLAG = 'collect-postcss-end */'
const ESCAPED_END_COMMENT_FLAG = 'collect-postcss-escaped-end * /'
const ESCAPED_END_COMMENT_REGEX = /collect-postcss-escaped-end \* \//g

const escapeRegex = str => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

const findRegex = new RegExp(`${escapeRegex(START_COMMENT_FLAG)}([^]*?)${escapeRegex(END_COMMENT_FLAG)}`, 'g')
const replaceRegex = new RegExp(`${escapeRegex(START_COMMENT_FLAG)}[^]*?${escapeRegex(END_COMMENT_FLAG)}`)
const importRegex = new RegExp('@import([^;]*);', 'g')

const importExtensions = ['.scss', '.sass']
const injectFnName = '__$styleInject'
const injectStyleFuncCode = styleInject
    .toString()
    .replace(/styleInject/, injectFnName)

export default (options = {}) => {
    const extensions = options.extensions || importExtensions
    const filter = createFilter(options.include || ['**/*.scss', '**/*.sass'], options.exclude)
    const extract = Boolean(options.extract)
    const extractPath = typeof options.extract === 'string' ? options.extract : null
    const importOnce = Boolean(options.importOnce)

    let cssExtract = ''
    let visitedImports = new Set()

    return {
        name: 'collect-sass',
        intro () {
            if (extract) {
                return null
            }

            return injectStyleFuncCode
        },
        transform (code, id) {
            if (!filter(id)) { return null }
            if (extensions.indexOf(path.extname(id)) === -1) { return null }

            const relBase = path.dirname(id)
            const fileImports = new Set([id])
            visitedImports.add(id)

            // Resolve imports before lossing relative file info
            // Find all import statements to replace
            let transformed = code.replace(importRegex, (match, p1) => {
                const paths = p1.split(/[,]/).map(p => {
                    const orgName = p.trim()  // strip whitespace
                    let name = orgName

                    if (name[0] === name[name.length - 1] && (name[0] === '"' || name[0] === "'")) {
                        name = name.substring(1, name.length - 1)  // string quotes
                    }

                    // Exclude CSS @import: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#import
                    if (path.extname(name) === '.css') { return orgName }
                    if (name.startsWith('http://')) { return orgName }
                    if (name.startsWith('url(')) { return orgName }

                    const fileName = path.basename(name)
                    const dirName = path.dirname(name)

                    // libsass's file name resolution: https://github.com/sass/node-sass/blob/1b9970a/src/libsass/src/file.cpp#L300
                    if (fs.existsSync(path.join(relBase, dirName, fileName))) {
                        const absPath = path.join(relBase, name)

                        if (importOnce && visitedImports.has(absPath)) {
                            return null
                        }

                        visitedImports.add(absPath)
                        fileImports.add(absPath)
                        return `'${absPath}'`
                    }

                    if (fs.existsSync(path.join(relBase, dirName, `_${fileName}`))) {
                        const absPath = path.join(relBase, `_${name}`)

                        if (importOnce && visitedImports.has(absPath)) {
                            return null
                        }

                        visitedImports.add(absPath)
                        fileImports.add(absPath)
                        return `'${absPath}'`
                    }

                    for (let i = 0; i < importExtensions.length; i += 1) {
                        const absPath = path.join(relBase, dirName, `_${fileName}${importExtensions[i]}`)

                        if (fs.existsSync(absPath)) {
                            if (importOnce && visitedImports.has(absPath)) {
                                return null
                            }

                            visitedImports.add(absPath)
                            fileImports.add(absPath)
                            return `'${absPath}'`
                        }
                    }

                    for (let i = 0; i < importExtensions.length; i += 1) {
                        const absPath = path.join(relBase, `${name}${importExtensions[i]}`)

                        if (fs.existsSync(absPath)) {
                            if (importOnce && visitedImports.has(absPath)) {
                                return null
                            }

                            visitedImports.add(absPath)
                            fileImports.add(absPath)
                            return `'${absPath}'`
                        }
                    }

                    let nodeResolve

                    try {
                        nodeResolve = resolve.sync(path.join(dirName, `_${fileName}`), { extensions })
                    } catch (e) {} // eslint-disable-line no-empty

                    try {
                        nodeResolve = resolve.sync(path.join(dirName, fileName), { extensions })
                    } catch (e) {} // eslint-disable-line no-empty

                    if (nodeResolve) {
                        if (importOnce && visitedImports.has(nodeResolve)) {
                            return null
                        }

                        visitedImports.add(nodeResolve)
                        fileImports.add(nodeResolve)
                        return `'${nodeResolve}'`
                    }

                    this.warn(`Unresolved path in ${id}: ${name}`)

                    return orgName
                })

                const uniquePaths = paths.filter(p => p !== null)

                if (uniquePaths.length) {
                    return `@import ${uniquePaths.join(', ')};`
                }

                return ''
            })

            // Escape */ end comments
            transformed = transformed.replace(/\*\//g, ESCAPED_END_COMMENT_FLAG)

            // Add sass imports to bundle as JS comment blocks
            return {
                code: START_COMMENT_FLAG + transformed + END_COMMENT_FLAG,
                map: { mappings: '' },
                dependencies: Array.from(fileImports),
            }
        },
        transformBundle (source) {
            // Reset paths
            visitedImports = new Set()

            // Extract each sass file from comment blocks
            let accum = ''
            let match = findRegex.exec(source)

            while (match !== null) {
                accum += match[1]
                match = findRegex.exec(source)
            }

            if (accum) {
                // Add */ end comments back
                accum = accum.replace(ESCAPED_END_COMMENT_REGEX, '*/')
                // Transform sass
                const css = sass.renderSync({
                    data: accum,
                    includePaths: ['node_modules'],
                }).css.toString()

                if (!extract) {
                    const injected = `${injectFnName}(${JSON.stringify(css)});`

                    // Replace first instance with output. Remove all other instances
                    return {
                        code: source.replace(replaceRegex, injected).replace(findRegex, ''),
                        map: { mappings: '' },
                    }
                }

                // Store css for writing
                cssExtract = css
            }

            // Remove all other instances
            return {
                code: source.replace(findRegex, ''),
                map: { mappings: '' },
            }
        },
        onwrite (opts) {
            if (extract && cssExtract) {
                return new Promise((resolveExtract, rejectExtract) => {
                    const destPath = extractPath ||
                        path.join(path.dirname(opts.dest), `${path.basename(opts.dest, path.extname(opts.dest))}.css`)

                    fs.writeFile(destPath, cssExtract, err => {
                        if (err) { rejectExtract(err) }
                        resolveExtract()
                    })
                })
            }

            return null
        },
    }
}
