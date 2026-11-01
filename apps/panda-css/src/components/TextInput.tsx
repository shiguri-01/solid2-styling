import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import { field } from "./fields";
import { css } from "../../styled-system/css";
import type { StyleProps } from "./style-props";
export function TextInput(props: JSX.InputHTMLAttributes<HTMLInputElement> & StyleProps) {
  return <input {...omit(props, "class", "css")} class={[css(field, props.css), props.class]} />;
}
