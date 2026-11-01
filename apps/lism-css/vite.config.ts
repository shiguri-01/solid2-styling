import { defineConfig, lazyPlugins } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import { lismCss } from "@lism-css/plugin/vite";
import { fileRoutes } from "filesystem-routing/vite";

export default defineConfig({
  lint: {
    ignorePatterns: ["dist/**", "**/file-routes.d.ts", "**/lism-env.d.ts"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  plugins: lazyPlugins(() => [
    lismCss({ purge: { report: true } }),
    solid({ start: true, extensions: [".jsx", ".tsx"], diagnostics: true }),
    fileRoutes({ types: true }),
  ]),
  server: { port: 3009 },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./vitest-setup.ts"],
    isolate: false,
  },
  build: { target: "esnext", assetsInlineLimit: 0 },
});
