import * as path from 'node:path';
import react from '@vitejs/plugin-react';
import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        ...coverageConfigDefaults.exclude,
        'coverage/**.*',
        './src/env.mjs',
        './*.{js,ts,mjs,cjs}',
      ],
    },
    setupFiles: ['./vitest-setup.ts'],
    include: ['./src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [...configDefaults.exclude, './src/env.mjs'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
