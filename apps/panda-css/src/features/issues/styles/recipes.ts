import { cva } from "../../../../styled-system/css";

export const filterTab = cva({
  base: {
    borderWidth: 0,
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    borderRadius: "0",
    bg: "transparent",
    color: "muted",
    py: "9px",
    px: "10px",
    cursor: "pointer",
    fontSize: "12px",
    "& span": { ml: "4px", fontSize: "10px" },
  },
  defaultVariants: { active: false },
  variants: {
    active: {
      true: { color: "brand", borderBottomColor: "brand" },
      false: {},
    },
  },
});

export const priorityBadge = cva({
  base: {
    width: "max-content",
    px: "7px",
    py: "3px",
    borderRadius: "20px",
    fontSize: "10px",
    bg: "badge",
    color: "badge-ink",
  },
  defaultVariants: { priority: "medium" },
  variants: {
    priority: {
      high: { bg: "red-soft", color: "red-ink" },
      medium: { bg: "priority-amber-soft", color: "priority-amber-ink" },
      low: { bg: "green-soft", color: "green-ink" },
    },
  },
});
