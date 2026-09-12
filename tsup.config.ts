import { defineConfig } from 'tsup';

// Build the publishable JS: ESM + CJS + .d.ts. React stays external (peer dependency).
// Two entries: `tenet-ui` (src/index.ts) and `tenet-ui/icons` (src/icons/index.ts). Code splitting is
// off so each entry is self-contained (the small Icon shell is duplicated into icons.js rather than
// hoisted into a hashed shared chunk) and the Icon CSS lands in dist/index.css.
// CSS imported by components is extracted by esbuild into dist/index.css, then merged with
// the token theme CSS into dist/styles.css by scripts/build-styles.mjs.
export default defineConfig({
  entry: { index: 'src/index.ts', icons: 'src/icons/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
