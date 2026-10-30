import { Title } from "@solidjs/meta";
import type { RouteDefinition } from "@solidjs/router";
import { httpStatus } from "@solidjs/web";
import { container, pageShell, panel, panelTitle } from "../styles";

export const route = {
  preload: () => httpStatus(404),
} satisfies RouteDefinition;

export default function NotFound() {
  return (
    <main class={pageShell().class}>
      <Title>Not Found - Solid App</Title>
      <div class={container().class}>
        <div class={panel().class}>
          <h1 class={panelTitle().class}>404 - Page Not Found</h1>
        </div>
      </div>
    </main>
  );
}
