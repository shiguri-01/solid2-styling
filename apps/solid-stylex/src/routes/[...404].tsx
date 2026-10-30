import { Title } from "@solidjs/meta";
import type { RouteDefinition } from "@solidjs/router";
import { httpStatus } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { appStyles } from "../styles";

export const route = {
  preload: () => httpStatus(404),
} satisfies RouteDefinition;

export default function NotFound() {
  return (
    <main class={stylex.attrs(appStyles.pageShell).class}>
      <Title>Not Found - Solid App</Title>
      <div class={stylex.attrs(appStyles.container).class}>
        <div class={stylex.attrs(appStyles.panel).class}>
          <h1 class={stylex.attrs(appStyles.panelTitle).class}>404 - Page Not Found</h1>
        </div>
      </div>
    </main>
  );
}
