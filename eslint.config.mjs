import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import sonar from 'eslint-plugin-sonarjs';
import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['dist'],
  },
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    curly: 'all',
    semi: true,
    commaDangle: 'always-multiline',
    blockSpacing: 'always',
    arrowParens: true,
  }),
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  sonar.configs.recommended,
  {
    rules: {
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@typescript-eslint/no-unused-vars': 'off',
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/todo-tag': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'sonarjs/pseudo-random': 'off',
      // 'sonarjs/cyclomatic-complexity': ['error', { threshold: 1 }],
    },
  },
];
