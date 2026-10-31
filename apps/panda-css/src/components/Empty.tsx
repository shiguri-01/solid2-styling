import type { JSX } from "@solidjs/web";
import { css } from "../../styled-system/css";
export function Empty(props: { children: JSX.Element }) {
  return (
    <p
      class={css({
        p: "6",
        color: "muted",
        textAlign: "center",
        borderWidth: "1px",
        borderStyle: "dashed",
        borderColor: "line",
        rounded: "md",
      })}
    >
      {props.children}
    </p>
  );
}
