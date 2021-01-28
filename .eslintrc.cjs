var os = require('os');
var linebreakStyle = os.EOL === '\n' ? 'unix' : 'windows';

module.exports = {
  env: {
    node: true,
    mocha: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    // Platform Dependent
    'linebreak-style': ['error', linebreakStyle], // allows CRLF checkout on windows

    // Sensible Defaults
    'semi-style': 'off', // allows semantically meaningful empty line semicolon
    'function-paren-newline': ['error', 'consistent'], // easier to manage long argument lists
    'no-use-before-define': ['error', { 'functions': false }],
    'no-unused-vars': ['error', { 'argsIgnorePattern': 'reject' }], // allow re
    'no-return-await': 'off', // do not swallow functions in error stacks

    // Personal Taste
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
    'no-else-return': 'off',
    'no-lonely-if': 'off',
    'wrap-iife': ['error', 'inside'],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'prefer-arrow-callback': 'off',
    'operator-linebreak': ['error', 'after', { overrides: { '?': 'after', ':': 'after' } }],
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],

    // Import Settings
    'no-multi-spaces': ['error', {
      exceptions: { 'ImportDeclaration': true }, // allows aligned input statements
    }],
    'import/extensions': ['error', 'ignorePackages'],
  },
};
