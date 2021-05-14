import typescript from '@rollup/plugin-typescript'
import glob from 'glob-all'

const commonConfig = {
  plugins: [typescript()]
}

export default [
  // Validation service
  {
    input: 'src/index.ts',

    output: {
      dir: 'dist',
      sourcemap: true,
      format: 'esm'
    },

    ...commonConfig
  },

  // Validators
  ...glob.sync('src/validators/*.ts').map((file) => ({
    input: file,

    output: {
      dir: 'dist/validators',
      sourcemap: true,
      format: 'esm'
    },

    ...commonConfig
  }))
]
