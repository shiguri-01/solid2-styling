import { createVar, globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const rowSpace = createVar();
export const workspace = style({
  vars: { [rowSpace]: vars.space.lg },
  minHeight: "100dvh",
  display: "grid",
  gridTemplateColumns: "220px minmax(0, 1fr)",
  background: vars.color.bg,
  color: vars.color.text,
  fontFamily: vars.font.sans,
  fontSize: 14,
  lineHeight: 1.5,
  colorScheme: "light",
  selectors: { '&[data-theme="dark"]': { colorScheme: "dark" } },
  "@media": { "(max-width: 800px)": { gridTemplateColumns: "minmax(0, 1fr)" } },
});
export const density = styleVariants({
  comfortable: {},
  compact: { vars: { [rowSpace]: "9px" } },
});
globalStyle(`${workspace} :where(button, a, input, select, textarea):focus-visible`, {
  outline: `2px solid ${vars.color.brand}`,
  outlineOffset: 3,
});
globalStyle(`${workspace} input[type="checkbox"]`, { accentColor: vars.color.brand });
export const sidebar = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
  padding: vars.space.xl,
  borderRight: `1px solid ${vars.color.border}`,
  position: "sticky",
  top: 0,
  height: "100dvh",
  overflowY: "auto",
  overscrollBehavior: "contain",
  alignSelf: "start",
  "@media": {
    "(max-width: 800px)": {
      position: "static",
      overflow: "visible",
      height: "auto",
      borderRight: 0,
      borderBottom: `1px solid ${vars.color.border}`,
      gap: vars.space.md,
    },
  },
});
export const brand = style({
  flexShrink: 0,
  fontSize: 16,
  fontWeight: 600,
  color: "inherit",
  textDecoration: "none",
});
export const caption = style({
  flexShrink: 0,
  color: vars.color.textMuted,
  fontSize: 12,
  overflowWrap: "anywhere",
});
export const nav = style({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  "@media": {
    "(max-width: 800px)": {
      display: "flex",
      flexWrap: "wrap",
      flex: "none",
      overflow: "visible",
      gap: vars.space.xs,
    },
  },
});
export const navLink = style({
  display: "block",
  padding: `${vars.space.sm} ${vars.space.md}`,
  marginBlock: vars.space.xs,
  borderRadius: vars.radius.sm,
  color: "inherit",
  textDecoration: "none",
  ":hover": { background: vars.color.surfaceHover },
  selectors: {
    '&[aria-current="page"]': {
      background: vars.color.surfaceSelected,
      color: vars.color.brandInk,
      fontWeight: 600,
    },
  },
});
export const sidebarFooter = style({
  flexShrink: 0,
  "@media": {
    "(max-width: 800px)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  marginTop: "auto",
  display: "grid",
  gap: vars.space.md,
  color: vars.color.textMuted,
  fontSize: 12,
});
export const content = style({
  minWidth: 0,
  padding: "32px",
  "@media": { "(max-width: 800px)": { padding: "20px 16px" } },
});
export const skip = style({
  position: "absolute",
  left: vars.space.md,
  top: "-100px",
  padding: vars.space.md,
  background: vars.color.surface,
  color: vars.color.text,
  zIndex: 10,
  ":focus": { top: vars.space.md },
});
