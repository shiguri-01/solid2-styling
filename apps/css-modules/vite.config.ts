import { defineConfig, lazyPlugins } from "vite-plus";
import solid from "@solidjs/vite-plugin";
export default defineConfig({
  plugins: lazyPlugins(() => [solid({ extensions: [".jsx", ".tsx"], diagnostics: true })]),
  server: { port: 3007 },
  build: { target: "esnext", assetsInlineLimit: 0 },
});
