import { fileRoutes } from "filesystem-routing/vite";
import { defineConfig } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import stylex from "@stylexjs/unplugin";
import { lazyPlugins } from "vite-plus";

export default defineConfig({
  lint: {
    ignorePatterns: ["dist/**", "styled-system/**"],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    jsPlugins: [
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
      { name: "@stylexjs", specifier: "@stylexjs/eslint-plugin" },
    ],
    options: { typeAware: true, typeCheck: true },
    overrides: [
      {
        files: ["src/**/*.{ts,tsx}"],
        rules: {
          "@stylexjs/valid-styles": "error",
          "@stylexjs/valid-shorthands": "error",
          "@stylexjs/enforce-extension": "error",
          "@stylexjs/no-unused": "warn",
        },
      },
    ],
  },
  // Turnkey client mode: no index.html and no mount file — the plugin generates
  // the entries around src/App.tsx (wrapped in src/Document.tsx) and `vite build`
  // prerenders the shell into a purely static dist/client.
  plugins: lazyPlugins(() => [
    stylex.vite({
      useCSSLayers: true,
    }),
    // `extensions` makes @solidjs/vite-plugin also compile the `?pick=` route
    // modules the fileRoutes plugin emits (their ids end in a query string).
    solid({ start: true, extensions: [".jsx", ".tsx"], diagnostics: true }), // add `ssr: true` for streaming SSR
    fileRoutes({ types: true }),
  ]),
  server: {
    port: 3002,
  },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./vitest-setup.ts"],
    // if you have few tests, try commenting this
    // out to improve performance:
    isolate: false,
  },
  build: {
    target: "esnext",
    assetsInlineLimit: 0,
  },
});
