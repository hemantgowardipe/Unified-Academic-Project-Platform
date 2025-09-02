import { globals } from '@eslint/js'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // Global ignores, e.g. dist folder:
  {
    files: ['**/*'],
    excludedFiles: ['dist/**'],
  },
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      'eslint:recommended',
      'plugin:react-hooks/recommended',
      'plugin:react-refresh/recommended',
      // Alternatively, if you want the latest react hooks recommended rules:
      // 'plugin:react-hooks/recommended',
    ],
    parserOptions: {
      ecmaVersion: 'latest',   // Use latest stable features
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,            // enable JSX parsing
      },
    },
    env: {
      browser: true,
      es2021: true,
    },
    globals: globals.browser,
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
    settings: {
      react: {
        version: 'detect',   // Automatically detect the react version
      },
    },
  },
])