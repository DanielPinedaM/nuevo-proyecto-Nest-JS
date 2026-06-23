// @ts-check
// Flat config para ESLint v10 siguiendo el patrón oficial del starter de NestJS
// (https://github.com/nestjs/typescript-starter) y la doc de typescript-eslint
// (https://typescript-eslint.io/getting-started). No usa el sistema legacy eslintrc.
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Archivos y carpetas que ESLint debe ignorar por completo.
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**', 'coverage/**'],
  },
  // Reglas base recomendadas de ESLint (JavaScript).
  eslint.configs.recommended,
  // Reglas recomendadas de typescript-eslint CON información de tipos (typed linting).
  ...tseslint.configs.recommendedTypeChecked,
  // Integración de Prettier: aplica eslint-config-prettier (desactiva reglas en
  // conflicto) y eslint-plugin-prettier (reporta el formato como error de lint).
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      // NestJS compila a CommonJS, igual que el starter oficial.
      sourceType: 'commonjs',
      parserOptions: {
        // projectService reemplaza a `project: 'tsconfig.json'`: pide la info de
        // tipos al servicio de TypeScript por archivo. Es el patrón vigente para
        // habilitar typed linting en flat config.
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Ajustes de reglas propios del starter de NestJS.
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
