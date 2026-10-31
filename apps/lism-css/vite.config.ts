import { defineConfig, lazyPlugins } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import { lismCss } from "@lism-css/plugin/vite";

export default defineConfig({
  plugins: lazyPlugins(() => [lismCss({ purge: { report: true } }), solid({ diagnostics: true })]),
  server: { port: 3009 },
  build: { target: "esnext", assetsInlineLimit: 0 },
});
