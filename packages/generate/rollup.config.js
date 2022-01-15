import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: [{
    file: 'dist/zh-template-generate.cjs.js',
    format: 'cjs'
  }, {
    file: 'dist/zh-template-generate.esm.js',
    format: 'es'
  }, {
    file: 'dist/zh-template-generate.global.js',
    format: 'umd',
    name: 'zhTemplateGen',
  }],
  plugins: [
    typescript()
  ]
};