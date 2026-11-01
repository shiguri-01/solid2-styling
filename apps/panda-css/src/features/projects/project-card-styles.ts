import { css } from "../../../styled-system/css";
import { flex, stack } from "../../../styled-system/patterns";
export const s = {
  project: stack({ gap: "4" }),
  heading: css({ m: "0", fontSize: "18px", fontWeight: "semibold" }),
  description: css({ m: "0", color: "muted", fontSize: "xs" }),
  meta: flex({
    justify: "space-between",
    wrap: "wrap",
    gap: "2",
    fontSize: "xs",
    color: "muted",
    fontVariantNumeric: "tabular-nums",
  }),
  name: css({ cursor: "pointer", textAlign: "left", _hover: { textDecoration: "underline" } }),
  risk: css({
    borderTopWidth: "1px",
    borderColor: "line",
    pt: "3",
    fontSize: "xs",
    color: "muted",
  }),
};
