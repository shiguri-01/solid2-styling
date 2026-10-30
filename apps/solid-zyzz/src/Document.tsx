import type { ParentProps } from "solid-js";
import { HydrationScript } from "@solidjs/web";
import { body } from "./styles";

export default function Document(props: ParentProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Solid App (Zyzz)</title>
        <HydrationScript />
      </head>
      <body class={body().class}>{props.children}</body>
    </html>
  );
}
