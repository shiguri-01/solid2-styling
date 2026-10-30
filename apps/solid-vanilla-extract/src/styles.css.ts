import { globalStyle, keyframes, style } from "@vanilla-extract/css";

globalStyle("body", {
  margin: 0,
  fontFamily: "system-ui, -apple-system, sans-serif",
  textAlign: "center",
});

const logoSpin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const nav = style({
  padding: "1rem",
  backgroundColor: "#282c34",
});

export const navLink = style({
  display: "inline-block",
  margin: "0 0.125rem",
  padding: "0.4rem 0.75rem",
  borderRadius: "0.5rem",
  color: "#93c5fd",
  fontWeight: 600,
  textDecoration: "none",
  transition: "background-color 150ms ease, color 150ms ease",
  selectors: {
    "&:hover": {
      backgroundColor: "rgb(255 255 255 / 10%)",
      color: "#dbeafe",
    },
    "&:focus-visible": {
      outline: "3px solid #0284c7",
      outlineOffset: "3px",
    },
  },
});

export const main = style({
  padding: "3rem 1rem",
});

export const logo = style({
  animation: `${logoSpin} infinite 20s linear`,
  height: "24vmin",
  pointerEvents: "none",
});

export const contentLink = style({
  color: "#1d5f91",
  fontWeight: 600,
  textDecorationColor: "#7bb6df",
  textDecorationThickness: "0.1em",
  textUnderlineOffset: "0.2em",
  transition: "color 150ms ease",
  selectors: {
    "&:hover": {
      color: "#123f63",
    },
    "&:focus-visible": {
      outline: "3px solid #0284c7",
      outlineOffset: "3px",
      borderRadius: "0.2rem",
    },
  },
});

export const userList = style({
  listStyle: "none",
  padding: 0,
  display: "inline-flex",
  flexDirection: "column",
  gap: "0.5rem",
});
