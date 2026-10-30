import { defineConfig, lazyPlugins } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import pandacss from "@pandacss/vite";
export default defineConfig({
  plugins: lazyPlugins(() => [
    pandacss(),
    solid({ extensions: [".jsx", ".tsx"], diagnostics: true }),
  ]),
  server: { port: 3004 },
  build: { target: "esnext", assetsInlineLimit: 0 },
});
