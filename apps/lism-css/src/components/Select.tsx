import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
export function Select(props: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
  const rest = omit(props, "class");
  return <select {...rest} class={["b--control", props.class]} />;
}
