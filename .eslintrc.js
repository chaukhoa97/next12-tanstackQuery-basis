module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  plugins: ['react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // from eslint-plugin-react
    'plugin:react/jsx-runtime', // from eslint-plugin-react
    'next', // from eslint-config-next
    'prettier', // put this last so it can override other configs
  ],
  rules: {
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'no-unused-vars': 'off',
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}
