import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import import_ from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "public/**",
      "**/*.cjs",
      "eslint.config.mjs",
    ],
  },
  
  ...nextVitals,
  ...nextTs,
  
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: true, 
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier,
      import: import_,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: "^_" }],
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      
      'prettier/prettier': 'error',
      'no-console': 'error',
 
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          pathGroups: [
            {
              pattern: '{react,react-dom,next/**}',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@*/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'react/display-name': 'off',
      'react/self-closing-comp': 'error',
      'react/no-unknown-property': 'error',
      '@next/next/no-img-element': 'error',
    },
  }
);