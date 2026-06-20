import { defineConfig } from 'tsup';

// Build the publishable JS: ESM + CJS + .d.ts. React stays external (peer dependency).
// CSS imported by components is extracted by esbuild into dist/index.css, then merged with
// the token theme CSS into dist/styles.css by scripts/build-styles.mjs.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
