import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const control = style({
  minWidth: 0,
  minHeight: 40,
  lineHeight: "20px",
  padding: "9px 12px",
  border: `1px solid ${vars.color.control}`,
  borderRadius: vars.radius.sm,
  background: vars.color.surface,
  color: vars.color.text,
  font: "inherit",
  ":disabled": { opacity: 0.55, cursor: "not-allowed" },
  selectors: { '&[aria-invalid="true"]': { borderColor: vars.color.danger } },
});
const buttonBase = style([
  control,
  { cursor: "pointer", fontWeight: 400, ":hover": { background: vars.color.surfaceHover } },
]);
export const button = styleVariants({
  default: [buttonBase],
  primary: [
    buttonBase,
    {
      background: vars.color.primary,
      color: vars.color.primaryInk,
      borderColor: vars.color.primary,
      ":hover": { background: vars.color.primary, opacity: 0.85 },
    },
  ],
});
export const card = style({
  minWidth: 0,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
});
export const cardVariant = styleVariants({ outlined: {}, plain: { borderWidth: 0 } });
export const cardSpacing = styleVariants({
  default: { padding: "20px", "@media": { "(max-width: 700px)": { padding: "16px" } } },
  roomy: { padding: vars.space.xl, "@media": { "(max-width: 700px)": { padding: "16px" } } },
});
export const selectedCard = style({
  borderColor: vars.color.brand,
  background: vars.color.surfaceSelected,
});
const badgeBase = style({
  display: "inline-block",
  width: "fit-content",
  padding: "2px 8px",
  border: `1px solid ${vars.color.border}`,
  whiteSpace: "nowrap",
  borderRadius: vars.radius.sm,
  fontSize: 12,
});
export const badge = styleVariants({
  neutral: [badgeBase, { color: vars.color.text }],
  success: [
    badgeBase,
    {
      background: `color-mix(in srgb, ${vars.color.brand} 8%, transparent)`,
      color: vars.color.brand,
    },
  ],
  warning: [
    badgeBase,
    {
      background: `color-mix(in srgb, ${vars.color.warning} 8%, transparent)`,
      color: vars.color.warningInk,
    },
  ],
});
export const empty = style({
  padding: "40px 20px",
  border: `1px dashed ${vars.color.border}`,
  color: vars.color.textMuted,
  textAlign: "center",
});
export const heading = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px",
  marginBottom: "28px",
});
export const kicker = style({
  fontSize: 12,
  color: vars.color.textMuted,
  margin: 0,
});
export const title = style({
  fontSize: 26,
  lineHeight: 1.5,
  marginBlock: "4px",
  letterSpacing: "-.03em",
  fontWeight: 600,
});
export const description = style({ color: vars.color.textMuted, margin: 0 });
export const progressValue = createVar();
export const progress = style({
  height: 6,
  borderRadius: vars.radius.full,
  overflow: "hidden",
  background: vars.color.border,
});
export const progressFill = style({
  display: "block",
  height: "100%",
  width: progressValue,
  background: vars.color.brand,
});
export const switchRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.lg,
});
export const switchLabel = style({ display: "block", fontWeight: 500 });
export const switchDescription = style({
  display: "block",
  color: vars.color.textMuted,
  fontSize: 12,
});
export const switchControl = style({
  appearance: "none",
  boxSizing: "border-box",
  width: 34,
  height: 20,
  margin: 0,
  padding: 2,
  border: `1px solid ${vars.color.textMuted}`,
  borderRadius: 10,
  background: vars.color.surface,
  flexShrink: 0,
  cursor: "pointer",
  "::before": {
    content: '""',
    display: "block",
    width: 14,
    height: 14,
    borderRadius: "50%",
    background: vars.color.textMuted,
  },
  ":checked": { background: vars.color.brand, borderColor: vars.color.brand },
  selectors: { "&:checked::before": { transform: "translateX(14px)", background: vars.color.bg } },
});

export const field = style({ width: "100%", background: vars.color.controlSurface });
export const select = style({
  width: "100%",
  backgroundColor: vars.color.controlSurface,
  appearance: "none",
  paddingRight: 36,
  backgroundImage: vars.chevron,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  backgroundSize: "16px 16px",
});
