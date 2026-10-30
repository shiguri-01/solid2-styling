import { defineConfig, lazyPlugins } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: lazyPlugins(() => [
    tailwindcss(),
    solid({ extensions: [".jsx", ".tsx"], diagnostics: true }),
  ]),
  server: { port: 3005 },
  build: { target: "esnext", assetsInlineLimit: 0 },
});
