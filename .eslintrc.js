module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // from eslint-plugin-react
    'plugin:react/jsx-runtime', // from eslint-plugin-react
    'next', // from eslint-config-next
    'plugin:@typescript-eslint/recommended', // only for ts
    'prettier', // put this last so it can override other configs
  ],
  rules: {
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-no-target-blank': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // only for ts
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}
