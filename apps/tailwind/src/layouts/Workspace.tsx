import "../style.css";
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
      class={
        "min-h-screen grid grid-cols-1 bg-ground text-ink font-sans text-sm leading-[1.5] md:grid-cols-[220px_minmax(0,1fr)]"
      }
      data-theme={workspace.tracker.isDark() ? "dark" : "light"}
      data-density={workspace.compact() ? "compact" : "comfortable"}
    >
      <a
        class="absolute -top-24 left-3 z-10 bg-paper p-3 focus:top-3"
        href="#content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("content")?.focus();
        }}
      >
        Skip to content
      </a>
      <aside class="flex flex-col gap-2 border-b border-line p-4 md:sticky md:self-start md:overscroll-contain md:top-0 md:h-dvh md:gap-5 md:overflow-y-auto md:border-r md:border-b-0 md:px-[18px] md:py-7">
        <a href="/issues" class="shrink-0 text-base font-semibold">
          S / Solid workspace
        </a>
        <p class="shrink-0 text-xs text-muted wrap-anywhere">{workspace.name()}</p>
        <nav
          class="min-h-0 flex flex-wrap md:block md:flex-1 md:overflow-y-auto"
          aria-label="Workspace"
        >
          <ForNav page={location.pathname} />
        </nav>
        <div class="mt-auto shrink-0 flex items-center justify-between gap-3 text-xs text-muted md:grid md:gap-[14px]">
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
          class="my-1 block rounded px-3 py-2.5 hover:bg-row-hover aria-[current=page]:bg-selected aria-[current=page]:font-[650] aria-[current=page]:hover:bg-selected-hover"
          href={`/${p}`}
          aria-current={props.page === `/${p}` ? "page" : undefined}
        >
          {p[0].toUpperCase() + p.slice(1)}
        </a>
      ))}
    </>
  );
}
