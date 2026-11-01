import "../reset.css";
import "virtual:uno.css";
import "../uno.css";
import { Button } from "../components/Button";
import { Loading, Errored, type ParentProps } from "solid-js";
import { useLocation } from "@solidjs/router";
import { useWorkspace } from "./workspace-context";
const pages = ["issues", "projects", "reports", "settings"] as const;
export default function Workspace(props: ParentProps) {
  const workspace = useWorkspace();
  const location = useLocation();
  return (
    <div
      class="min-h-screen bg-ground text-sm text-ink leading-[1.5] font-sans md:grid md:grid-cols-[220px_minmax(0,1fr)]"
      data-theme={workspace.tracker.isDark() ? "dark" : "light"}
      data-density={workspace.compact() ? "compact" : "comfortable"}
    >
      <a
        class="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:bg-paper focus:p-4"
        href="#content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("content")?.focus();
        }}
      >
        Skip to content
      </a>
      <aside class="flex flex-col gap-2 border-b border-line p-4 md:sticky md:top-0 md:self-start md:gap-5 md:overflow-y-auto md:overscroll-contain md:border-b-0 md:border-r md:px-18px md:py-7 md:h-dvh">
        <a href="/issues" class="shrink-0 text-base text-ink font-semibold no-underline">
          S / Solid workspace
        </a>
        <p class="shrink-0 break-words text-xs text-muted">{workspace.name()}</p>
        <nav
          class="flex flex-wrap gap-1 md:block md:min-h-0 md:flex-1 md:overflow-y-auto"
          aria-label="Workspace"
        >
          <ForNav page={location.pathname} />
        </nav>
        <div class="mt-auto flex shrink-0 items-center justify-between gap-3.5 text-xs text-muted md:grid">
          <span>Q4 · Styling migration</span>
          <Button onClick={() => workspace.tracker.toggleTheme()}>
            {workspace.tracker.isDark() ? "Light theme" : "Dark theme"}
          </Button>
        </div>
      </aside>
      <main id="content" class="min-w-0 px-4 py-5 md:p-8" tabindex="-1">
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
          class="my-1 block rounded-4px px-3 py-2.5 text-inherit no-underline aria-[current=page]:bg-selected hover:bg-hover aria-[current=page]:font-semibold"
          href={`/${p}`}
          aria-current={props.page === `/${p}` ? "page" : undefined}
        >
          {p[0].toUpperCase() + p.slice(1)}
        </a>
      ))}
    </>
  );
}
