import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      prettier,
      react,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // ---- Formatting ----
      'prettier/prettier': [
        'error',
        {
          tabWidth: 2,
          useTabs: false,
          singleQuote: true,
          semi: true,
        },
      ],

      // ---- General JS/TS conventions ----
      'no-var': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'prefer-const': 'error',

      // ---- Arrow functions ----
      'prefer-arrow-callback': 'warn',
      'func-style': ['warn', 'expression', { allowArrowFunctions: true }],

      // ---- Null/undefined handling ----
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',

      // ---- Naming conventions ----
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variableLike',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      // ---- Readability ----
      'id-length': ['warn', { min: 3, exceptions: ['id', 'fs', 'db'] }],
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true }],

      // React specific
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
