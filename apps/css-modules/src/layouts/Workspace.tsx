import { Button } from "../components/Button";
import { Loading, Errored, type ParentProps } from "solid-js";
import { useLocation } from "@solidjs/router";
import { useWorkspace } from "./workspace-context";
import s from "./workspace.module.css";
const pages = ["issues", "projects", "reports", "settings"] as const;
export default function Workspace(props: ParentProps) {
  const workspace = useWorkspace();
  const location = useLocation();
  return (
    <div
      class={s.workspace}
      data-theme={workspace.tracker.isDark() ? "dark" : "light"}
      data-density={workspace.compact() ? "compact" : "comfortable"}
    >
      <a
        class={s.skip}
        href="#content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("content")?.focus();
        }}
      >
        Skip to content
      </a>
      <aside class={s.sidebar}>
        <a href="/issues" class={s.brand}>
          S / Solid workspace
        </a>
        <p class={s.caption}>{workspace.name()}</p>
        <nav aria-label="Workspace">
          <ForNav page={location.pathname} />
        </nav>
        <div class={s.sidebarFooter}>
          <span>Q4 · Styling migration</span>
          <Button onClick={() => workspace.tracker.toggleTheme()}>
            {workspace.tracker.isDark() ? "Light theme" : "Dark theme"}
          </Button>
        </div>
      </aside>
      <main id="content" class={s.content} tabindex="-1">
        <Errored
          fallback={(error, reset) => (
            <div role="alert">
              <p>Unable to load this page: {String(error())}</p>
              <Button onClick={reset}>Try again</Button>
            </div>
          )}
        >
          <Loading fallback={<p role="status">Loading workspace…</p>}>{props.children}</Loading>
        </Errored>
      </main>
    </div>
  );
}
function ForNav(props: { page: string }) {
  return (
    <>
      {pages.map((p) => (
        <a
          class={s.navLink}
          href={`/${p}`}
          aria-current={props.page === `/${p}` ? "page" : undefined}
        >
          {p[0].toUpperCase() + p.slice(1)}
        </a>
      ))}
    </>
  );
}
