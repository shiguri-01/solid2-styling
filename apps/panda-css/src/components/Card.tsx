import { omit } from "solid-js";
import { Dynamic, type JSX } from "@solidjs/web";
import { css, cva } from "../../styled-system/css";
import type { StyleProps } from "./style-props";
type ElementProps =
  | (JSX.HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "article" | "aside" })
  | (JSX.FormHTMLAttributes<HTMLFormElement> & { as: "form" });
type CardProps = ElementProps &
  StyleProps & {
    variant?: "outlined" | "plain";
    spacing?: "default" | "roomy";
    selected?: boolean;
  };
const card = cva({
  base: { minW: "0", rounded: "6px", bg: "paper", borderWidth: "1px", borderColor: "line" },
  variants: {
    variant: { outlined: {}, plain: { borderWidth: "0" } },
    spacing: {
      default: { p: "5", "@media(max-width:700px)": { p: "4" } },
      roomy: { p: "6", "@media(max-width:700px)": { p: "4" } },
    },
    selected: { true: { borderColor: "brand", bg: "selected" } },
  },
  defaultVariants: { variant: "outlined", spacing: "default", selected: false },
});
export function Card(props: CardProps) {
  return (
    <Dynamic
      component={props.as ?? "div"}
      {...omit(props, "as", "class", "variant", "spacing", "selected", "css")}
      class={[
        css(
          card.raw({ variant: props.variant, spacing: props.spacing, selected: props.selected }),
          props.css,
        ),
        props.class,
      ]}
    />
  );
}
