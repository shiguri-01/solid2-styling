import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const pageShell = style({
  minHeight: "100svh",
  background: vars.color.bg,
  color: vars.color.text,
  fontFamily: vars.font.sans,
  padding: "32px",
});
export const container = style({ margin: "0 auto", maxWidth: "1200px" });
export const panel = style({
  padding: "24px",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
});
export const panelTitle = style({ margin: 0, fontSize: "22px", fontWeight: 600 });
