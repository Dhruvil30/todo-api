module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
  eslintIgnore: [
    '*.test.js'
  ],
  rules: {
    'no-useless-catch': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'max-len': ['error', { code: 100 }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
