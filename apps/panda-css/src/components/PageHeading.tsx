import type { JSX } from "@solidjs/web";
import { css } from "../../styled-system/css";
import { stack } from "../../styled-system/patterns";
import { headingLayout } from "../layouts/workspace-styles";
export function PageHeading(props: { title: string; description: string; children?: JSX.Element }) {
  return (
    <header class={headingLayout}>
      <div class={stack({ gap: "1" })}>
        <p
          class={css({
            fontSize: "xs",

            color: "muted",
          })}
        >
          Design engineering / Q4
        </p>
        <h1 class={css({ fontSize: "26px", fontWeight: "semibold", letterSpacing: "-.03em" })}>
          {props.title}
        </h1>
        <p class={css({ color: "muted" })}>{props.description}</p>
      </div>
      <div>{props.children}</div>
    </header>
  );
}
