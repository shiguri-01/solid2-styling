import { defineConfig, lazyPlugins } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import { yak } from "@yak/solid/vite";

export default defineConfig({
  lint: {
    ignorePatterns: ["dist/**", "styled-system/**"],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    jsPlugins: [
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
      { name: "@yak", specifier: "@yak/eslint-plugin" },
    ],
    options: { typeAware: true, typeCheck: true },
    overrides: [
      {
        files: ["src/**/*.{ts,tsx}"],
        rules: {
          "@yak/css-nesting-operator": "error",
          "@yak/enforce-semicolon": "error",
          "@yak/style-conditions": "warn",
        },
      },
    ],
  },
  plugins: lazyPlugins(() => [yak(), solid({ diagnostics: true })]),
  server: { port: 3008 },
  build: { target: "esnext", assetsInlineLimit: 0 },
});
