import type { JSX } from "@solidjs/web";
import { cva } from "../../styled-system/css";
const badge = cva({
  base: {
    display: "inline-flex",
    width: "fit",
    rounded: "4px",
    borderWidth: "1px",
    borderColor: "line",
    whiteSpace: "nowrap",
    px: "2",
    py: "0.5",
    fontSize: "xs",
  },
  variants: {
    tone: {
      neutral: { color: "ink" },
      success: { bg: "success-tint", color: "brand" },
      warning: { bg: "warning-tint", color: "warning" },
    },
  },
  defaultVariants: { tone: "neutral" },
});
export function Badge(props: { children: JSX.Element; tone?: "neutral" | "success" | "warning" }) {
  return <span class={badge({ tone: props.tone })}>{props.children}</span>;
}
