import { defineConfig } from "@pandacss/dev";
export default defineConfig({
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  preflight: true,
  jsxFramework: "solid",
  include: ["./src/**/*.{ts,tsx}", "../../packages/issue-board/src/**/*.{ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  theme: {
    extend: {
      tokens: {
        colors: {
          ink: { value: "#202521" },
          muted: { value: "#737b76" },
          line: { value: "#e1e6e2" },
          brand: { value: "#147d68" },
          paper: { value: "#ffffff" },
          ground: { value: "#f4f6f3" },
        },
      },
    },
  },
});
