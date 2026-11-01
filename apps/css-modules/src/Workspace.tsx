import { Button } from "./components/Button";
import { createSignal, lazy, Loading, Errored, Show, onCleanup } from "solid-js";
import { createIssueTracker } from "utils";
import s from "./workspace.module.css";
const Issues = lazy(() => import("./pages/Issues"));
const Projects = lazy(() => import("./pages/Projects"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));
const pages = ["issues", "projects", "reports", "settings"] as const;
export default function App() {
  const tracker = createIssueTracker();
  const readPage = () => pages.find((p) => p === location.hash.slice(1)) ?? "issues";
  const [page, setPage] = createSignal(readPage());
  const [compact, setCompact] = createSignal(false);
  const [name, setName] = createSignal("Solid / Design engineering");
  const navigate = () => setPage(readPage());
  window.addEventListener("hashchange", navigate);
  onCleanup(() => window.removeEventListener("hashchange", navigate));
  return (
    <div
      class={s.workspace}
      data-theme={tracker.isDark() ? "dark" : "light"}
      data-density={compact() ? "compact" : "comfortable"}
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
        <a href="#issues" class={s.brand}>
          S / Solid workspace
        </a>
        <p class={s.caption}>{name()}</p>
        <nav aria-label="Workspace">
          <ForNav page={page()} />
        </nav>
        <div class={s.sidebarFooter}>
          <span>Q4 · Styling migration</span>
          <Button onClick={() => tracker.toggleTheme()}>
            {tracker.isDark() ? "Light theme" : "Dark theme"}
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
          <Loading fallback={<p role="status">Loading workspace…</p>}>
            <Show when={page() === "issues"}>
              <Issues tracker={tracker} />
            </Show>
            <Show when={page() === "projects"}>
              <Projects tracker={tracker} />
            </Show>
            <Show when={page() === "reports"}>
              <Reports tracker={tracker} />
            </Show>
            <Show when={page() === "settings"}>
              <Settings
                compact={compact()}
                setCompact={setCompact}
                name={name()}
                setName={setName}
              />
            </Show>
          </Loading>
        </Errored>
      </main>
    </div>
  );
}
function ForNav(props: { page: string }) {
  return (
    <>
      {pages.map((p) => (
        <a class={s.navLink} href={`#${p}`} aria-current={props.page === p ? "page" : undefined}>
          {p[0].toUpperCase() + p.slice(1)}
        </a>
      ))}
    </>
  );
}
