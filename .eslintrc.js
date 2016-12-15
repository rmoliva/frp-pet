module.exports = {
  extends: ['eslint:recommended', 'google'],
  installedESLint: true,
  parserOptions: {
    ecmaVersion: 7,
  },
  rules: {
    'no-console': 0,
  },
  env: {
    node: true,
    mocha: true,
    browser: true,
  },
};
