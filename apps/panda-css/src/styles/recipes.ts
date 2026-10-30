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
    bg: "#f0f2f0",
    color: "#58605b",
  },
  variants: {
    priority: {
      high: { bg: "#f8e7e5", color: "#9e4640" },
      medium: { bg: "#f6eddc", color: "#86602b" },
      low: { bg: "#e7f2e8", color: "#3d7345" },
    },
  },
});
