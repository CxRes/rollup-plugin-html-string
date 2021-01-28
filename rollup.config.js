import pkg from './package.json';

const external = Object.keys(pkg.dependencies);

export default {
  input: 'index.js',
  external,
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      exports: 'auto',
    },
    {
      format: 'es',
      file: pkg.module,
      exports: 'auto',
    },
  ],
};
