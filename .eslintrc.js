module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: { presets: ['@babel/preset-react'] },
  },
  env: { browser: true, node: true, es6: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  plugins: ['react', 'jsx-a11y'],
  rules: {
    'react/prop-types': 0,
    'react/display-name': 0,
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  settings: { react: { version: 'detect' } },
};
