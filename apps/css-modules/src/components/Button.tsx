import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import s from "./Button.module.css";
export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary";
};
export function Button(props: ButtonProps) {
  const rest = omit(props, "variant", "class");
  return (
    <button
      type="button"
      {...rest}
      class={[s.control, props.class]}
      data-variant={props.variant ?? "default"}
    />
  );
}
