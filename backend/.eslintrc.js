module.exports = {
  extends: [
    'airbnb-base',
  ],
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  plugins: [
    'mocha',
    'chai-expect',
    'import',
  ],
  rules: {
    'object-curly-newline': 'off',
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: false,
      },
    ],
    'chai-expect/missing-assertion': 'error',
    'consistent-return': 'off',
    curly: [
      'error',
      'all',
    ],
    'max-len': ['off'],
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-identical-title': 'error',
    'no-underscore-dangle': 'off',
    'no-warning-comments': 'warn',
    'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
  },
};
