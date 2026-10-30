import { defineConfig } from "zyzz";

export const { style, variants, vars } = defineConfig({
  output: "html",
  vars: {
    color: {
      brand: "#ea580c",
      brandHover: "#c2410c",
      surface: "#fff7ed",
      text: "#431407",
      muted: "#9a3412",
      border: "#fed7aa",
      white: "#ffffff",
      subtle: "#78350f",
      navBg: "#282c34",
      navLink: "#93c5fd",
      navLinkHover: "#dbeafe",
      navLinkHoverBg: "rgb(255 255 255 / 10%)",
      link: "#1d5f91",
      linkHover: "#123f63",
      linkUnderline: "#7bb6df",
      focusRing: "#0284c7",
    },
    radius: {
      sm: "0.2rem",
      md: "0.75rem",
      nav: "0.5rem",
      full: "9999px",
    },
  },
});
