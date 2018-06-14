
import buble from 'rollup-plugin-buble'

export default {
    entry: 'index.js',
    format: 'cjs',
    dest: 'dist/rollup-plugin-collect-sass.js',
    external: [
        'fs',
        'path',
        'resolve',
        'style-inject',
        'node-sass',
        'rollup-pluginutils',
    ],
    plugins: [
        buble(),
    ],
}
