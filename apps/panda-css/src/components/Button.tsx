import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import { cva } from "../../styled-system/css";
const button = cva({
  base: {
    px: "3",
    py: "9px",
    minH: "10",
    lineHeight: "20px",
    rounded: "4px",
    borderWidth: "1px",
    borderColor: "line",
    fontSize: "sm",
    fontWeight: "medium",
    cursor: "pointer",
    _disabled: { opacity: 0.55, cursor: "not-allowed" },
  },
  variants: {
    variant: {
      default: { bg: "paper", color: "ink", _hover: { bg: "row-hover" } },
      primary: { bg: "ink", color: "paper", _hover: { opacity: 0.9 } },
    },
  },
  defaultVariants: { variant: "default" },
});
export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary";
};
export function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      {...omit(props, "class", "variant")}
      class={[button({ variant: props.variant }), props.class]}
    />
  );
}
