import jsEslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import { fixupPluginRules } from '@eslint/compat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import("eslint").Linter.FlatConfig[];} */
export default tsEslint.config(
  {
    ignores: ['node_modules', 'dist'],
  },
  jsEslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'all',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      eqeqeq: 'error',
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  {
    ...reactRecommended,
    settings: { react: { version: 'detect' } },
  },
  {
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
);
