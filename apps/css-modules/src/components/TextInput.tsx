import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import s from "./TextInput.module.css";
export type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement>;
export function TextInput(props: TextInputProps) {
  const rest = omit(props, "class");
  return <input {...rest} class={[s.control, props.class]} />;
}
