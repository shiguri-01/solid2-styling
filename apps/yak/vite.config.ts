import { defineConfig, lazyPlugins } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import { yak } from "@yak/solid/vite";

export default defineConfig({
  plugins: lazyPlugins(() => [yak(), solid({ diagnostics: true })]),
  server: { port: 3008 },
  build: { target: "esnext", assetsInlineLimit: 0 },
});
