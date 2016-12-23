module.exports = {
  extends: ['eslint:recommended', 'google'],
  installedESLint: true,
  parserOptions: {
    ecmaVersion: 7,
  },
  rules: {
    'no-console': 0,
    'new-cap': [
      'error', {
        'capIsNewExceptionPattern': '^M\..'
      }
    ]
  },
  env: {
    node: true,
    mocha: true,
    browser: true,
  },
};
