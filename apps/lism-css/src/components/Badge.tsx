import type { JSX } from "@solidjs/web";
export function Badge(props: { children: JSX.Element; tone?: "neutral" | "success" | "warning" }) {
  return (
    <span
      class={[
        "b--badge",
        props.tone === "success" && "b--badge--success",
        props.tone === "warning" && "b--badge--warning",
      ]}
    >
      {props.children}
    </span>
  );
}
