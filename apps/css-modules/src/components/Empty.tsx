import type { JSX } from "@solidjs/web";
import s from "./Empty.module.css";
export function Empty(props: { children: JSX.Element }) {
  return <p class={s.empty}>{props.children}</p>;
}
