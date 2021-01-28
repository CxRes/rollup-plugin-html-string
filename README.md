# rollup-plugin-html-string

[![Build Status](https://travis-ci.com/CxRes/rollup-plugin-html-string.svg?branch=master)](https://travis-ci.com/CxRes/rollup-plugin-html-string)

Rollup plugin for loading content of HTML files to use as string variable in JavaScript code.

## Installation

```bash
npm install --save-dev rollup-plugin-html-string
```

## Usage

```js
import htmlString from 'rollup-plugin-html-string';

export default {
	input: 'main.js',
	plugins: [
		htmlString({
			include: '**/*.html'
		})
	],
	output: {
		dir: 'dist',
	},
}
```

## Options

### include

Type: `array`, `string` or `regexp`
Default: `**/*.html`

A single file pattern, or an array of file patterns to include when importing html files. For more details see [rollup-pluginutils](https://github.com/rollup/rollup-pluginutils#createfilter).

### exclude

Type: `array`, `string` or `regexp`
Default: `undefined`

A single file pattern, or an array of file patterns to exclude when importing html files. For more details see [rollup-pluginutils](https://github.com/rollup/rollup-pluginutils#createfilter).

### htmlMinifierOptions

Type: `Object`
Default: `{}`

The options which are given to [html-minifier](https://github.com/kangax/html-minifier#options-quick-reference)

For example:
```js
import htmlString from 'rollup-plugin-html-string';

export default {
	entry: 'main.js',
	plugins: [
		html({
			htmlMinifierOptions: {
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				conservativeCollapse: true,
				minifyJS: true
			}
		})
	],
	output: {
		dir: 'dist',
	},
}
```

## License

MIT

## Credits

This plugin is forked from [rollup-plugin-html](https://github.com/bdadam/rollup-plugin-html) written by Adam Beres-Deak (@bdadam).

He thanks Bogdan Chadkin (@TrySound) for his [rollup-plugin-string](https://github.com/TrySound/rollup-plugin-string) rollup plugin which he used as the basis for this plugin.
