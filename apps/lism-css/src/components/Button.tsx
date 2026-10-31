import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary";
};
export function Button(props: ButtonProps) {
  const rest = omit(props, "variant", "class");
  return (
    <button
      type="button"
      {...rest}
      class={[
        "b--button",
        props.variant === "primary" && "b--button--primary",
        "set--plain -hov:-o",
        props.class,
      ]}
    />
  );
}
