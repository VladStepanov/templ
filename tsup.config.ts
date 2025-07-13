import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/corev2/index.ts', 'src/core/index.ts'],
  format: ['esm'],
  splitting: true,
  sourcemap: true,
  target: 'es2019',
  treeshake: true,
  dts: true,
  skipNodeModulesBundle: true,
}));
