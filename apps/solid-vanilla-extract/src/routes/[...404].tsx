import { Title } from "@solidjs/meta";
import type { RouteDefinition } from "@solidjs/router";
import { httpStatus } from "@solidjs/web";
import { container, lightTheme, pageShell, panel, panelTitle } from "../styles.css";

export const route = {
  preload: () => httpStatus(404),
} satisfies RouteDefinition;

export default function NotFound() {
  return (
    <main class={`${lightTheme} ${pageShell}`}>
      <Title>Not Found - Solid App</Title>
      <div class={container}>
        <div class={panel}>
          <h1 class={panelTitle}>404 - Page Not Found</h1>
        </div>
      </div>
    </main>
  );
}
