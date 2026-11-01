import { css } from "../../styled-system/css";
export const field = css.raw({
  width: "full",
  minW: "0",
  borderWidth: "1px",
  borderColor: "line",
  rounded: "4px",
  bg: "paper",
  color: "ink",
  px: "3",
  py: "9px",
  minH: "10",
  lineHeight: "20px",
  fontSize: "sm",
  '&[aria-invalid="true"]': { borderColor: "danger" },
  _disabled: { opacity: 0.55 },
});
