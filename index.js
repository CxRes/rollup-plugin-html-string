import { createFilter } from 'rollup-pluginutils';
import { minify } from 'html-minifier';
import MagicString from 'magic-string';

export default function string(opts = {}) {
  const include = opts.include || '**/*.html';
  const sourcemap = opts.sourcemap || opts.sourceMap;
  const filter = createFilter(include, opts.exclude);

  return {
    name: 'html-string',

    transform(code, id) {
      if (filter(id)) {
        const s = new MagicString(code);
        s.overwrite(0, s.length(), minify(code, opts.htmlMinifierOptions || {}));
        const map = s.generateMap({
          source: id,
          includeContent: false,
        });
        const result = {
          code: `export default ${JSON.stringify(s.toString())};`,
          map: sourcemap ? map : { mappings: '' },
        };
        return result;
      }
      return undefined;
    },
  };
}
