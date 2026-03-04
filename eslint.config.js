import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactPlugin from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import'
import prettierConfig from 'eslint-config-prettier'      // disables conflicting rules
import prettierPlugin from 'eslint-plugin-prettier'      // runs prettier as a rule

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'coverage']),

  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig,                   // ← must come LAST in extends to win
    ],
    plugins: {
      react: reactPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // ── Prettier (runs formatting as a lint rule) ──────────────────────────
      'prettier/prettier': 'warn',        // shows formatting issues as warnings

      // ── Error Prevention ──────────────────────────────────────────────────
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-shadow': 'warn',
      'eqeqeq': ['error', 'always'],
      'no-var': 'error',
      'no-throw-literal': 'error',
      'no-await-in-loop': 'warn',
      'require-await': 'warn',
      'no-return-await': 'warn',

      // ── Code Style (non-formatting — safe alongside Prettier) ─────────────
      'prefer-const': 'warn',
      'prefer-template': 'warn',
      'object-shorthand': 'warn',
      'no-nested-ternary': 'warn',
      'spaced-comment': ['warn', 'always'],
      'max-depth': ['warn', 4],
      'complexity': ['warn', 10],

      // NOTE: rules below are intentionally OMITTED — Prettier owns these:
      // indent, quotes, semi, comma-dangle, arrow-parens, max-len, etc.

      // ── Imports ───────────────────────────────────────────────────────────
      'import/no-duplicates': 'error',
      'import/no-cycle': 'warn',
      'import/order': ['warn', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      }],

      // ── React ─────────────────────────────────────────────────────────────
      'react/jsx-no-undef': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-pascal-case': 'warn',
      'react/no-unknown-property': 'error',
      'react/self-closing-comp': 'warn',
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/no-array-index-key': 'warn',
      'react/no-unstable-nested-components': 'warn',
      'react/no-danger': 'warn',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/jsx-no-constructed-context-values': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // ── Test files ────────────────────────────────────────────────────────────
  {
    files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}', '**/__tests__/**'],
    rules: {
      'no-console': 'off',
      'max-depth': 'off',
      'complexity': 'off',
    },
  },
])