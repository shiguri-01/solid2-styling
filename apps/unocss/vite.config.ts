import { defineConfig, lazyPlugins } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import UnoCSS from "unocss/vite";
export default defineConfig({
  plugins: lazyPlugins(() => [
    UnoCSS(),
    solid({ extensions: [".jsx", ".tsx"], diagnostics: true }),
  ]),
  server: { port: 3006 },
  build: { target: "esnext", assetsInlineLimit: 0 },
});
