import { omit } from "solid-js";
import { Dynamic, type JSX } from "@solidjs/web";
import s from "./Card.module.css";
type CardElementProps =
  | (JSX.HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "article" | "aside" })
  | (JSX.FormHTMLAttributes<HTMLFormElement> & { as: "form" });
type CardProps = CardElementProps & {
  variant?: "outlined" | "plain";
  spacing?: "default" | "roomy";
  selected?: boolean;
};
export function Card(props: CardProps) {
  const rest = omit(props, "as", "class", "variant", "spacing", "selected");
  return (
    <Dynamic
      component={props.as ?? "div"}
      {...rest}
      class={[s.card, props.class]}
      data-variant={props.variant ?? "outlined"}
      data-spacing={props.spacing ?? "default"}
      data-selected={props.selected ? "true" : "false"}
    />
  );
}
