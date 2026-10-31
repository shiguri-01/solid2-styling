import { useLocation } from "@solidjs/router";
import * as stylex from "@stylexjs/stylex";
import { createSignal, createMemo, lazy, Loading, Errored, Show, isPending } from "solid-js";
import { createIssueTracker } from "utils";
import { Button } from "../components/Button";
import { darkTheme } from "../styles";
import { tokens } from "../tokens.stylex";
import { density } from "../workspace-tokens.stylex";
const Issues = lazy(() => import("../pages/Issues"));
const Projects = lazy(() => import("../pages/Projects"));
const Reports = lazy(() => import("../pages/Reports"));
const Settings = lazy(() => import("../pages/Settings"));
const pages = ["issues", "projects", "reports", "settings"] as const;
const compactTheme = stylex.createTheme(density, { row: "8px" });
const s = stylex.create({
  root: {
    minHeight: "100svh",
    display: "grid",
    gridTemplateColumns: {
      default: "220px minmax(0,1fr)",
      "@media (max-width: 800px)": "minmax(0,1fr)",
    },
    backgroundColor: tokens.bg,
    color: tokens.text,
    accentColor: tokens.brand,
    fontFamily: tokens.fontSans,
    fontSize: 14,
    lineHeight: 1.5,
    colorScheme: "light",
  },
  dark: { colorScheme: "dark" },
  sidebar: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spaceLg,
    padding: tokens.spaceLg,
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: tokens.border,
    position: { default: "sticky", "@media (max-width: 800px)": "static" },
    top: 0,
    alignSelf: "start",
    height: { default: "100dvh", "@media (max-width: 800px)": "auto" },
    overflowY: { default: "auto", "@media (max-width: 800px)": "visible" },
    overscrollBehavior: "contain",
  },
  brand: {
    flexShrink: 0,
    fontSize: 16,
    fontWeight: 600,
    color: tokens.text,
    textDecoration: "none",
    outlineColor: tokens.brand,
    outlineOffset: 3,
  },
  caption: { flexShrink: 0, fontSize: 12, color: tokens.textMuted, overflowWrap: "anywhere" },
  nav: {
    flex: { default: "1", "@media (max-width: 800px)": "none" },
    minHeight: 0,
    overflowY: { default: "auto", "@media (max-width: 800px)": "visible" },
    display: { default: "block", "@media (max-width: 800px)": "flex" },
    flexWrap: "wrap",
    gap: tokens.spaceXs,
  },
  link: {
    display: "block",
    paddingBlock: tokens.spaceSm,
    paddingInline: tokens.spaceMd,
    marginBlock: tokens.spaceXs,
    borderRadius: tokens.radiusSm,
    textDecoration: "none",
    color: tokens.text,
    backgroundColor: { default: "transparent", ":hover": tokens.surfaceHover },
    outlineColor: tokens.brand,
    outlineOffset: 3,
  },
  active: {
    backgroundColor: { default: tokens.surfaceSelected, ":hover": tokens.surfaceSelected },
    fontWeight: 600,
  },
  footer: {
    flexShrink: 0,
    justifyContent: "space-between",
    alignItems: { default: "stretch", "@media (max-width: 800px)": "center" },
    marginTop: "auto",
    display: "flex",
    flexDirection: { default: "column", "@media (max-width: 800px)": "row" },
    gap: tokens.spaceMd,
    color: tokens.textMuted,
    fontSize: 12,
  },
  content: {
    boxSizing: "border-box",
    minWidth: 0,
    padding: { default: 32, "@media (max-width: 800px)": 16 },
  },
  skip: {
    position: "fixed",
    top: { default: -100, ":focus": 12 },
    left: 12,
    zIndex: 10,
    padding: tokens.spaceMd,
    backgroundColor: tokens.surface,
    color: tokens.text,
    outlineColor: tokens.brand,
  },
});
export default function Home() {
  const tracker = createIssueTracker();
  const location = useLocation();
  const page = createMemo(() => pages.find((p) => p === location.hash.slice(1)) ?? "issues");
  const [compact, setCompact] = createSignal(false);
  const [name, setName] = createSignal("Solid / Design engineering");
  const pending = () => isPending(() => page());
  return (
    <div
      class={
        stylex.attrs(
          s.root,
          tracker.isDark() && darkTheme,
          tracker.isDark() && s.dark,
          compact() && compactTheme,
        ).class
      }
      data-theme={tracker.isDark() ? "dark" : "light"}
      data-density={compact() ? "compact" : "comfortable"}
    >
      <a
        class={stylex.attrs(s.skip).class}
        href="#content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("content")?.focus();
        }}
      >
        Skip to content
      </a>
      <aside class={stylex.attrs(s.sidebar).class}>
        <a href="#issues" class={stylex.attrs(s.brand).class}>
          S / Solid workspace
        </a>
        <p class={stylex.attrs(s.caption).class}>{name()}</p>
        <nav class={stylex.attrs(s.nav).class} aria-label="Workspace">
          {pages.map((p) => (
            <a
              class={stylex.attrs(s.link, page() === p && s.active).class}
              href={`#${p}`}
              aria-current={page() === p ? "page" : "false"}
            >
              {p[0].toUpperCase() + p.slice(1)}
            </a>
          ))}
        </nav>
        <div class={stylex.attrs(s.footer).class}>
          <span>Q4 · Styling migration</span>
          <Button onClick={() => tracker.toggleTheme()}>
            {tracker.isDark() ? "Light theme" : "Dark theme"}
          </Button>
        </div>
      </aside>
      <main
        id="content"
        class={stylex.attrs(s.content).class}
        tabindex="-1"
        aria-busy={pending() ? "true" : "false"}
      >
        <Show when={pending()}>
          <p role="status">Loading workspace…</p>
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
      </main>
    </div>
  );
}
