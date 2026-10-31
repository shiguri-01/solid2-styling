import type { JSX } from "@solidjs/web";
import s from "./Badge.module.css";
export function Badge(props: { children: JSX.Element; tone?: "neutral" | "success" | "warning" }) {
  return (
    <span class={s.badge} data-tone={props.tone ?? "neutral"}>
      {props.children}
    </span>
  );
}
