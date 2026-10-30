import type { ParentProps } from "solid-js";
import { HydrationScript } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { primitives } from "./styles";

export default function Document(props: ParentProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <title>Solid 2.0 × StyleX</title>
        {import.meta.env.DEV && (
          <>
            <link rel="stylesheet" href="/virtual:stylex.css" />
            <script type="module" src="/@id/virtual:stylex:runtime" />
          </>
        )}
        <HydrationScript />
      </head>
      <body class={stylex.attrs(primitives.body).class}>{props.children}</body>
    </html>
  );
}
