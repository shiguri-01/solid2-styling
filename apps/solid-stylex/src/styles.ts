import * as stylex from "@stylexjs/stylex";

const logoSpin = stylex.keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const appStyles = stylex.create({
  body: {
    margin: 0,
    fontFamily: "system-ui, -apple-system, sans-serif",
    textAlign: "center",
  },
  nav: {
    padding: "1rem",
    backgroundColor: "#282c34",
  },
  navLink: {
    display: "inline-block",
    marginBlock: 0,
    marginInline: "0.125rem",
    paddingBlock: "0.4rem",
    paddingInline: "0.75rem",
    borderRadius: "0.5rem",
    color: {
      default: "#93c5fd",
      ":hover": "#dbeafe",
    },
    backgroundColor: {
      default: "transparent",
      ":hover": "rgb(255 255 255 / 10%)",
    },
    fontWeight: 600,
    textDecorationLine: "none",
    transitionProperty: "background-color, color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: {
      default: null,
      ":focus-visible": "solid",
    },
    outlineWidth: {
      default: null,
      ":focus-visible": "3px",
    },
    outlineColor: {
      default: null,
      ":focus-visible": "#0284c7",
    },
    outlineOffset: {
      default: null,
      ":focus-visible": "3px",
    },
  },
  main: {
    paddingBlock: "3rem",
    paddingInline: "1rem",
  },
  logo: {
    animationName: logoSpin,
    animationDuration: "20s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    height: "24vmin",
    pointerEvents: "none",
  },
  contentLink: {
    color: {
      default: "#1d5f91",
      ":hover": "#123f63",
    },
    fontWeight: 600,
    textDecorationColor: "#7bb6df",
    textDecorationThickness: "0.1em",
    textUnderlineOffset: "0.2em",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: {
      default: null,
      ":focus-visible": "solid",
    },
    outlineWidth: {
      default: null,
      ":focus-visible": "3px",
    },
    outlineColor: {
      default: null,
      ":focus-visible": "#0284c7",
    },
    outlineOffset: {
      default: null,
      ":focus-visible": "3px",
    },
    borderRadius: {
      default: null,
      ":focus-visible": "0.2rem",
    },
  },
  userList: {
    listStyleType: "none",
    padding: 0,
    display: "inline-flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  userSection: {
    transitionProperty: "opacity",
    transitionDuration: "150ms",
  },
  userSectionPending: {
    opacity: 0.5,
  },
});
