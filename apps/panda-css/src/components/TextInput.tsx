import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import { field } from "./fields";
export function TextInput(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...omit(props, "class")} class={[field, props.class]} />;
}
