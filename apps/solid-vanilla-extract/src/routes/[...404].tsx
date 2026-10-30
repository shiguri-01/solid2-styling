import { Title } from "@solidjs/meta";
import type { RouteDefinition } from "@solidjs/router";
import { httpStatus } from "@solidjs/web";
import { contentLink, main } from "../styles.css";

export const route = {
  preload: () => httpStatus(404),
} satisfies RouteDefinition;

export default function NotFound() {
  return (
    <main class={main}>
      <Title>Not Found - Solid App</Title>
      <h1>Page Not Found</h1>
      <p>
        Visit{" "}
        <a class={contentLink} href="https://docs.solidjs.com" target="_blank" rel="noreferrer">
          docs.solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
    </main>
  );
}
