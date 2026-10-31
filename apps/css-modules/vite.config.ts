import { defineConfig, lazyPlugins } from "vite-plus";
import solid from "@solidjs/vite-plugin";
export default defineConfig({
  lint: {
    ignorePatterns: ["dist/**", "**/file-routes.d.ts", "**/lism-env.d.ts"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  plugins: lazyPlugins(() => [solid({ extensions: [".jsx", ".tsx"], diagnostics: true })]),
  server: { port: 3007 },
  build: { manifest: true, target: "esnext", assetsInlineLimit: 0 },
});
