import { fileRoutes } from "filesystem-routing/vite";
import { defineConfig } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import { lazyPlugins } from "vite-plus";
import { zyzz } from "zyzz/vite";

export default defineConfig({
  // Turnkey client mode: no index.html and no mount file — the plugin generates
  // the entries around src/App.tsx (wrapped in src/Document.tsx) and `vite build`
  // prerenders the shell into a purely static dist/client.
  plugins: lazyPlugins(() => [
    zyzz({ reset: true }),
    // `extensions` makes @solidjs/vite-plugin also compile the `?pick=` route
    // modules the fileRoutes plugin emits (their ids end in a query string).
    solid({ start: true, extensions: [".jsx", ".tsx"], diagnostics: true }), // add `ssr: true` for streaming SSR
    fileRoutes({ types: true }),
  ]),
  server: {
    port: 3003,
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
