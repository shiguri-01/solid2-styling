import { defineConfig, lazyPlugins } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import UnoCSS from "unocss/vite";
import { fileRoutes } from "filesystem-routing/vite";
export default defineConfig({
  lint: {
    ignorePatterns: ["dist/**", "styled-system/**"],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    jsPlugins: [
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
      { name: "unocss", specifier: "@unocss/eslint-plugin" },
    ],
    options: { typeAware: true, typeCheck: true },
    overrides: [
      {
        files: ["src/**/*.{ts,tsx}"],
        rules: { "unocss/order": "warn", "unocss/order-attributify": "warn" },
      },
    ],
  },
  plugins: lazyPlugins(() => [
    UnoCSS(),
    solid({ start: true, extensions: [".jsx", ".tsx"], diagnostics: true }),
    fileRoutes({ types: true }),
  ]),
  server: { port: 3006 },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./vitest-setup.ts"],
    isolate: false,
  },
  build: { target: "esnext", assetsInlineLimit: 0 },
});
