import { Title } from "@solidjs/meta";
import type { RouteDefinition } from "@solidjs/router";
import { httpStatus } from "@solidjs/web";
import { panel } from "../styles";
import { style, vars } from "../zyzz.config";

const fontSans = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const pageShell = style({
  minHeight: "100svh",
  backgroundColor: vars.color.bg,
  color: vars.color.text,
  fontFamily: fontSans,
  padding: vars.space.xl,
});

const container = style({
  maxWidth: "1200px",
  marginBlock: 0,
  marginInline: "auto",
});

const panelTitle = style({
  margin: 0,
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: 1.3,
});

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
