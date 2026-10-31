import { style, vars } from "./zyzz.config";

const fontSans = "system-ui, sans-serif";

export const body = style({
  margin: 0,
  padding: 0,
  fontFamily: fontSans,
  fontSize: "14px",
  lineHeight: 1.5,
});

export const panel = style({
  containerType: "inline-size",
  backgroundColor: vars.color.surface,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
  borderRadius: vars.radius.md,
  paddingBlock: "22px",
  paddingInline: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  "@media (max-width: 600px)": {
    paddingBlock: "16px",
    paddingInline: "16px",
    gap: "14px",
  },
});
