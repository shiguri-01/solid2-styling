import { style, variants, vars } from "./zyzz.config";

export const body = style({
  margin: 0,
  fontFamily: "system-ui, -apple-system, sans-serif",
  textAlign: "center",
});

export const nav = style({
  padding: "1rem",
  backgroundColor: vars.color.navBg,
});

export const navLink = style({
  display: "inline-block",
  marginBlock: 0,
  marginInline: "0.125rem",
  paddingBlock: "0.4rem",
  paddingInline: "0.75rem",
  borderRadius: vars.radius.nav,
  color: vars.color.navLink,
  fontWeight: 600,
  textDecorationLine: "none",
  transitionProperty: "background-color, color",
  transitionDuration: "150ms",
  transitionTimingFunction: "ease",
  ":hover": {
    backgroundColor: vars.color.navLinkHoverBg,
    color: vars.color.navLinkHover,
  },
  ":focus-visible": {
    outlineStyle: "solid",
    outlineWidth: "3px",
    outlineColor: vars.color.focusRing,
    outlineOffset: "3px",
  },
});

export const main = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  paddingBlock: "3rem",
  paddingInline: "1rem",
});

export const logo = style({
  height: "24vmin",
  pointerEvents: "none",
});

export const contentLink = style({
  color: vars.color.link,
  fontWeight: 600,
  textDecorationColor: vars.color.linkUnderline,
  textDecorationThickness: "0.1em",
  textUnderlineOffset: "0.2em",
  transitionProperty: "color",
  transitionDuration: "150ms",
  transitionTimingFunction: "ease",
  ":hover": {
    color: vars.color.linkHover,
  },
  ":focus-visible": {
    outlineStyle: "solid",
    outlineWidth: "3px",
    outlineColor: vars.color.focusRing,
    outlineOffset: "3px",
    borderRadius: vars.radius.sm,
  },
});

export const userList = style({
  listStyleType: "none",
  padding: 0,
  display: "inline-flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const userSection = variants({
  selection: "class",
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    transitionProperty: "opacity",
    transitionDuration: "150ms",
  },
  variants: {
    pending: {
      true: {
        opacity: 0.5,
      },
      false: {
        opacity: 1,
      },
    },
  },
  defaultVariants: {
    pending: false,
  },
});
