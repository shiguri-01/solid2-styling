import { defineConfig, lazyPlugins } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import UnoCSS from "unocss/vite";
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
    solid({ extensions: [".jsx", ".tsx"], diagnostics: true }),
  ]),
  server: { port: 3006 },
  build: { target: "esnext", assetsInlineLimit: 0 },
});
