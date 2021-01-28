import assert from 'assert';
import { rollup } from 'rollup';
import htmlString from '../index.js';

process.chdir('test');

async function makeBundle(options = {}) {
  const bundle = await rollup(options);
  const { output } = await bundle.generate(options.output);
  return output;
}

describe('rollup-plugin-html-string', async () => {
  it('should import html from file as string', async () => {
    const options = {
      input: 'fixtures/basic.js',
      plugins: [
        htmlString({
          include: '**/*.html',
        }),
      ],
      output: {
        format: 'iife',
      },
    };
    const output = await makeBundle(options);
    const { code } = output[0];

    // eslint-disable-next-line no-new-func
    new Function('assert', code)(assert);
  });

  it('should not output sourcemap for html when sourcemap option is not defined', async () => {
    const options = {
      input: 'fixtures/basic.js',
      plugins: [
        htmlString({
          include: '**/*.html',
        }),
      ],
      output: {
        format: 'iife',
        sourcemap: true,
      },
    };
    const output = await makeBundle(options);
    const { code, map } = output[0];

    assert.ok(code);
    assert.ok(map);
    assert.strictEqual(map.sources.includes('fixtures/templates/tpl.html'), false);
    const match = ';;;;;EAEA,MAAM,KAAK,GAAG,CAAC;AACf;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA,CAAC,CAAC;AACF;EACA;EACA,MAAM,CAAC,WAAW,CAAC,GAAG,CAAC,OAAO,CAAC,SAAS,EAAE,IAAI,CAAC,EAAE,KAAK,CAAC;;;;;;';
    assert.strictEqual(map.mappings, match);
  });

  it('should output a sourcemap for html when sourcemap option is true', async () => {
    const options = {
      input: 'fixtures/basic.js',
      plugins: [
        htmlString({
          include: '**/*.html',
          sourcemap: true,
        }),
      ],
      output: {
        format: 'iife',
        sourcemap: true,
      },
    };
    const output = await makeBundle(options);
    const { code, map } = output[0];

    assert.ok(code);
    assert.ok(map);
    assert.strictEqual(map.sources.includes('fixtures/templates/tpl.html'), true);
    const match = ';;;AAAA;;ECEA,MAAM,KAAK,GAAG,CAAC;AACf;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA,CAAC,CAAC;AACF;EACA;EACA,MAAM,CAAC,WAAW,CAAC,GAAG,CAAC,OAAO,CAAC,SAAS,EAAE,IAAI,CAAC,EAAE,KAAK,CAAC;;;;;;';
    assert.strictEqual(map.mappings, match);
  });

  it('should import minified html when html-minifier options are present', async () => {
    const options = {
      input: 'fixtures/basic.js',
      plugins: [
        htmlString({
          include: '**/*.html',
          htmlMinifierOptions: {
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            conservativeCollapse: true,
            minifyJS: true,
          },
        }),
      ],
      output: {
        format: 'iife',
      },
    };
    const output = await makeBundle(options);
    const { code } = output[0];

    const match = 'var tpl = "<h1>This is the Title</h1> <section class=\\"section\\"> <article class=\\"article\\">Article 1</article> <article class=\\"article\\">Article 2</article> </section> <script>console.log(\\"init\\")</script> ";';
    assert.strictEqual(code.includes(match), true);
  });
});
