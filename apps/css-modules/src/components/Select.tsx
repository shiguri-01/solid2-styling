import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import s from "./Select.module.css";
export type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement>;
export function Select(props: SelectProps) {
  const rest = omit(props, "class");
  return <select {...rest} class={[s.control, props.class]} />;
}
