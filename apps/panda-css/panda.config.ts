import { defineConfig } from "@pandacss/dev";
export default defineConfig({
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  preflight: true,
  jsxFramework: "solid",
  include: ["./src/**/*.{ts,tsx}"],
  outdir: "styled-system",
  conditions: {
    extend: {
      dark: '[data-theme="dark"] &, &[data-theme="dark"]',
      compact: '[data-density="compact"] &',
    },
  },
  globalCss: {
    body: { margin: "0" },
    ":where(button, a, input, select, textarea):focus-visible": {
      outline: "2px solid token(colors.brand)",
      outlineOffset: "3px",
    },
    'input[type="checkbox"]': { accentColor: "brand" },
    "button:disabled": { cursor: "not-allowed", opacity: 0.55 },
    "@media (prefers-reduced-motion: reduce)": { "*": { animation: "none", transition: "none" } },
  },
  theme: {
    extend: {
      tokens: {
        colors: {
          comparison: {
            n25: { value: "#eff3f0" },
            n50: { value: "#f4f6f3" },
            n100: { value: "#eaf0eb" },
            n200: { value: "#dbe1dc" },
            n300: { value: "#b4beb7" },
            n600: { value: "#59645d" },
            n700: { value: "#404b43" },
            n800: { value: "#303a33" },
            n850: { value: "#202521" },
            n900: { value: "#202623" },
            n950: { value: "#171b19" },
            g300: { value: "#76d8bb" },
            g700: { value: "#147d68" },
            s100: { value: "#e0eee7" },
            s800: { value: "#293f35" },
            a300: { value: "#efc67a" },
            a700: { value: "#80591c" },
            r300: { value: "#f2a49d" },
            r700: { value: "#a73c35" },
            r100: { value: "#f8e7e5" },
            r850: { value: "#482b29" },
            a100: { value: "#f6eddc" },
            a850: { value: "#423721" },
            k100: { value: "#e0f1df" },
            k300: { value: "#a4d3a7" },
            k700: { value: "#376d3b" },
            k850: { value: "#293c2c" },
          },
        },
      },
      semanticTokens: {
        colors: {
          ink: {
            value: {
              base: "{colors.comparison.n850}",
              _dark: "{colors.comparison.n25}",
            },
          },
          muted: {
            value: {
              base: "{colors.comparison.n600}",
              _dark: "{colors.comparison.n300}",
            },
          },
          line: {
            value: {
              base: "{colors.comparison.n200}",
              _dark: "{colors.comparison.n700}",
            },
          },
          paper: {
            value: {
              base: "{colors.white}",
              _dark: "{colors.comparison.n900}",
            },
          },
          ground: {
            value: {
              base: "{colors.comparison.n50}",
              _dark: "{colors.comparison.n950}",
            },
          },
          brand: {
            value: {
              base: "{colors.comparison.g700}",
              _dark: "{colors.comparison.g300}",
            },
          },
          contrast: {
            value: {
              base: "{colors.white}",
              _dark: "{colors.comparison.n900}",
            },
          },
          selected: {
            value: {
              base: "{colors.comparison.s100}",
              _dark: "{colors.comparison.s800}",
            },
          },
          "row-hover": {
            value: {
              base: "{colors.comparison.n100}",
              _dark: "{colors.comparison.n800}",
            },
          },
          hover: {
            value: {
              base: "{colors.comparison.n100}",
              _dark: "{colors.comparison.n800}",
            },
          },
          progress: {
            value: {
              base: "{colors.comparison.n200}",
              _dark: "{colors.comparison.n700}",
            },
          },
          badge: {
            value: {
              base: "{colors.gray.100}",
              _dark: "{colors.gray.800}",
            },
          },
          "badge-ink": {
            value: {
              base: "{colors.comparison.n850}",
              _dark: "{colors.comparison.n25}",
            },
          },
          "body-muted": {
            value: {
              base: "{colors.comparison.n600}",
              _dark: "{colors.comparison.n300}",
            },
          },
          danger: {
            value: {
              base: "{colors.comparison.r700}",
              _dark: "{colors.comparison.r300}",
            },
          },
          "red-soft": {
            value: {
              base: "{colors.comparison.r100}",
              _dark: "{colors.comparison.r850}",
            },
          },
          "red-ink": {
            value: {
              base: "{colors.comparison.r700}",
              _dark: "{colors.comparison.r300}",
            },
          },
          "green-soft": {
            value: {
              base: "{colors.comparison.k100}",
              _dark: "{colors.comparison.k850}",
            },
          },
          "green-ink": {
            value: {
              base: "{colors.comparison.k700}",
              _dark: "{colors.comparison.k300}",
            },
          },
          "priority-amber-soft": {
            value: {
              base: "{colors.comparison.a100}",
              _dark: "{colors.comparison.a850}",
            },
          },
          "priority-amber-ink": {
            value: {
              base: "{colors.comparison.a700}",
              _dark: "{colors.comparison.a300}",
            },
          },
          "teal-soft": {
            value: {
              base: "{colors.comparison.s100}",
              _dark: "{colors.comparison.s800}",
            },
          },
          "teal-ink": {
            value: {
              base: "{colors.comparison.g700}",
              _dark: "{colors.comparison.g300}",
            },
          },
          "emerald-soft": {
            value: {
              base: "{colors.comparison.k100}",
              _dark: "{colors.comparison.k850}",
            },
          },
          "emerald-ink": {
            value: {
              base: "{colors.comparison.k700}",
              _dark: "{colors.comparison.k300}",
            },
          },
          "amber-soft": {
            value: {
              base: "{colors.comparison.a100}",
              _dark: "{colors.comparison.a850}",
            },
          },
          "amber-ink": {
            value: {
              base: "{colors.comparison.a700}",
              _dark: "{colors.comparison.a300}",
            },
          },
          "rose-soft": {
            value: {
              base: "{colors.comparison.r100}",
              _dark: "{colors.comparison.r850}",
            },
          },
          "rose-ink": {
            value: {
              base: "{colors.comparison.r700}",
              _dark: "{colors.comparison.r300}",
            },
          },
          warning: {
            value: {
              base: "{colors.comparison.a700}",
              _dark: "{colors.comparison.a300}",
            },
          },
          "success-tint": {
            value: {
              base: "color-mix(in srgb, {colors.comparison.g700} 8%, transparent)",
              _dark: "color-mix(in srgb, {colors.comparison.g300} 8%, transparent)",
            },
          },
          "warning-tint": {
            value: {
              base: "color-mix(in srgb, {colors.comparison.a700} 8%, transparent)",
              _dark: "color-mix(in srgb, {colors.comparison.a300} 8%, transparent)",
            },
          },
        },
        spacing: { row: { value: { base: "{spacing.4}", _compact: "{spacing.2}" } } },
      },
    },
  },
});
