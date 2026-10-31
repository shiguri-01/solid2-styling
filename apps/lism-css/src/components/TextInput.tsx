import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
export function TextInput(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
  const rest = omit(props, "class");
  return <input {...rest} class={["b--control", props.class]} />;
}
