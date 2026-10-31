import { cva } from "../../styled-system/css";

export const filterTab = cva({
  base: {
    border: 0,
    bg: "transparent",
    color: "muted",
    py: "9px",
    px: "10px",
    cursor: "pointer",
    fontSize: "12px",
    "& span": { ml: "4px", fontSize: "10px" },
  },
  variants: {
    active: {
      true: { color: "brand", borderBottom: "2px solid token(colors.brand)" },
      false: {},
    },
  },
});

export const priorityBadge = cva({
  base: {
    width: "max-content",
    px: "7px",
    py: "3px",
    borderRadius: "full",
    fontSize: "10px",
    bg: "badge",
    color: "badge-ink",
  },
  variants: {
    priority: {
      high: { bg: "red-soft", color: "red-ink" },
      medium: { bg: "priority-amber-soft", color: "priority-amber-ink" },
      low: { bg: "green-soft", color: "green-ink" },
    },
  },
});
