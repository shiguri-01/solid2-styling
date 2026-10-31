import { omit } from "solid-js";
import { Dynamic, type JSX } from "@solidjs/web";
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
      class={[
        "b--card",
        props.variant === "plain" && "b--card--plain",
        props.spacing === "roomy" && "b--card--roomy",
        props.class,
      ]}
      data-selected={props.selected ? "true" : "false"}
    />
  );
}
