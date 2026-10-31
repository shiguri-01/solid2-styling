import { defineConfig, lazyPlugins } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import pandacss from "@pandacss/vite";
export default defineConfig({
  lint: {
    ignorePatterns: ["dist/**", "styled-system/**"],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    jsPlugins: [
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
      { name: "@pandacss", specifier: "@pandacss/eslint-plugin/oxlint" },
    ],
    options: { typeAware: true, typeCheck: true },
    overrides: [
      {
        files: ["src/**/*.{ts,tsx}"],
        rules: {
          "@pandacss/no-invalid-token-paths": "error",
          "@pandacss/no-invalid-nesting": "error",
          "@pandacss/file-not-included": "error",
          "@pandacss/no-deprecated": "warn",
          "@pandacss/prefer-token": ["warn", { categories: ["colors"] }],
          "@pandacss/no-debug": "warn",
          "@pandacss/extraction-diagnostics": "warn",
        },
      },
    ],
  },
  plugins: lazyPlugins(() => [
    pandacss(),
    solid({ extensions: [".jsx", ".tsx"], diagnostics: true }),
  ]),
  server: { port: 3004 },
  build: { target: "esnext", assetsInlineLimit: 0 },
});
