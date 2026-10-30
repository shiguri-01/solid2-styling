import { Title } from "@solidjs/meta";
import type { RouteDefinition } from "@solidjs/router";
import { httpStatus } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { primitives } from "../styles";
import { tokens } from "../tokens.stylex";

const styles = stylex.create({
  pageShell: {
    boxSizing: "border-box",
    minHeight: "100svh",
    backgroundColor: tokens.bg,
    color: tokens.text,
    fontFamily: tokens.fontSans,
    padding: tokens.spaceXl,
  },
  container: {
    boxSizing: "border-box",
    maxWidth: "1200px",
    marginBlock: 0,
    marginInline: "auto",
  },
  panelTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: 1.3,
  },
});

export const route = {
  preload: () => httpStatus(404),
} satisfies RouteDefinition;

export default function NotFound() {
  return (
    <main class={stylex.attrs(styles.pageShell).class}>
      <Title>Not Found - Solid App</Title>
      <div class={stylex.attrs(styles.container).class}>
        <div class={stylex.attrs(primitives.panel).class}>
          <h1 class={stylex.attrs(styles.panelTitle).class}>404 - Page Not Found</h1>
        </div>
      </div>
    </main>
  );
}
