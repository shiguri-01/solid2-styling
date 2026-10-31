import { Button } from "./components/Button";
import { createSignal, lazy, Loading, Errored, Show, onCleanup, isPending } from "solid-js";
import { createIssueTracker } from "utils";
import { YakThemeProvider } from "@yak/solid";
import {
  WorkspaceRoot,
  Sidebar,
  BrandLink,
  Caption,
  Navigation,
  NavLink,
  SidebarFooter,
  Content,
  SkipLink,
} from "./workspace";
import "./reset.css";
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
    <YakThemeProvider theme={{ dark: tracker.isDark() }}>
      <WorkspaceRoot
        $compact={compact()}
        data-theme={tracker.isDark() ? "dark" : "light"}
        data-density={compact() ? "compact" : "comfortable"}
      >
        <SkipLink
          href="#content"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("content")?.focus();
          }}
        >
          Skip to content
        </SkipLink>
        <Sidebar>
          <BrandLink href="#issues">S / Solid workspace</BrandLink>
          <Caption>{name()}</Caption>
          <Navigation aria-label="Workspace">
            <ForNav page={page()} />
          </Navigation>
          <SidebarFooter>
            <span>Q4 · Styling migration</span>
            <Button onClick={() => tracker.toggleTheme()}>
              {tracker.isDark() ? "Light theme" : "Dark theme"}
            </Button>
          </SidebarFooter>
        </Sidebar>
        <Content id="content" tabindex="-1" aria-busy={isPending(() => page()) ? "true" : "false"}>
          <Show when={isPending(() => page())}>
            <p role="status">Loading page…</p>
          </Show>
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
        </Content>
      </WorkspaceRoot>
    </YakThemeProvider>
  );
}
function ForNav(props: { page: string }) {
  return (
    <>
      {pages.map((p) => (
        <NavLink href={`#${p}`} aria-current={props.page === p ? "page" : undefined}>
          {p[0].toUpperCase() + p.slice(1)}
        </NavLink>
      ))}
    </>
  );
}
