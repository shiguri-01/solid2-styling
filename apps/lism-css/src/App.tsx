import "lism-css/full.css";
import "./style.css";
import { Button } from "./components/Button";
import { createSignal, lazy, latest, Loading, Errored, Show, onCleanup } from "solid-js";
import { createIssueTracker } from "utils";
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
      class="c--workspace is--container -bgc:base-2 -c:text -fz:base -ff:base -lh:m -min-h"
      style={{ "--min-h": "100dvh" }}
      data-theme={tracker.isDark() ? "dark" : "light"}
      data-density={compact() ? "compact" : "comfortable"}
    >
      <a
        class="c--skipLink"
        href="#content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("content")?.focus();
        }}
      >
        Skip to content
      </a>
      <div
        class="l--grid -gtc -gtc_md -min-h"
        style={{
          "--gtc": "minmax(0, 1fr)",
          "--gtc_md": "220px minmax(0, 1fr)",
          "--min-h": "100dvh",
        }}
      >
        <aside
          class="l--stack -g:10 -g_md -py:20 -py_md -px:20 -bd-e -bd-be -bgc:base-2 -pos:static -pos_md -t:0 -aslf:start -h -h_md -ov-y:auto"
          style={{
            "--g_md": "var(--s25)",
            "--py_md": "var(--s30)",
            "--pos_md": "sticky",
            "--h": "auto",
            "--h_md": "100dvh",
            "overscroll-behavior": "contain",
          }}
        >
          <a href="#issues" class="-fz:l -fw:700 -fxsh:0 -td:none -c:text">
            S / Solid workspace
          </a>
          <p class="-fz:s -c:text-2 -fxsh:0 -ovw:anywhere">{name()}</p>
          <nav
            class="l--flex -fxw:wrap -g:5 -d_md -fx -fx_md -min-h -ov-y:auto"
            style={{ "--d_md": "block", "--fx": "none", "--fx_md": "1", "--min-h": "0" }}
            aria-label="Workspace"
          >
            <ForNav page={latest(page)} />
          </nav>
          <div
            class="l--cluster -jc:between -g:15 -d_md -fxsh:0 -mt -fz:s -c:text-2"
            style={{ "--d_md": "grid", "--mt": "auto" }}
          >
            <span>Q4 · Styling migration</span>
            <Button onClick={() => tracker.toggleTheme()}>
              {tracker.isDark() ? "Light theme" : "Dark theme"}
            </Button>
          </div>
        </aside>
        <main
          id="content"
          class="is--container -p:20 -p_md -min-w"
          style={{ "--p_md": "var(--s35)", "--min-w": "0" }}
          tabindex="-1"
        >
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
    </div>
  );
}
function ForNav(props: { page: string }) {
  return (
    <>
      {pages.map((p) => (
        <a
          class={[
            "c--navLink -d:block -p:15 -bdrs:20 -td:none -hov:-bgc",
            props.page === p ? "-c:text -fw:700" : "-c:text",
          ]}
          href={`#${p}`}
          aria-current={props.page === p ? "page" : undefined}
        >
          {p[0].toUpperCase() + p.slice(1)}
        </a>
      ))}
    </>
  );
}
