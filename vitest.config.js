import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['sandbox', 'node_modules'],
    globals: true,
  },
});
