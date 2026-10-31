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
        "min-w-0 rounded-6px border border-line bg-paper p-5 max-[700px]:!p-4 data-[variant=plain]:border-0 data-[spacing=roomy]:p-6 data-[selected=true]:border-brand data-[selected=true]:bg-selected",
        props.class,
      ]}
      data-variant={props.variant ?? "outlined"}
      data-spacing={props.spacing ?? "default"}
      data-selected={props.selected ? "true" : "false"}
    />
  );
}
