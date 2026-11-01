import { useWorkspace } from "./workspace-context";
import { useLocation } from "@solidjs/router";
import * as stylex from "@stylexjs/stylex";
import { Loading, Errored, type ParentProps } from "solid-js";
import { Button } from "../components/Button";
import { darkTheme } from "../styles";
import { tokens } from "../tokens.stylex";
import { density } from "../workspace-tokens.stylex";
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
export default function Workspace(props: ParentProps) {
  const workspaceState = useWorkspace();
  const location = useLocation();
  return (
    <div
      class={
        stylex.attrs(
          s.root,
          workspaceState.tracker.isDark() && darkTheme,
          workspaceState.tracker.isDark() && s.dark,
          workspaceState.compact() && compactTheme,
        ).class
      }
      data-theme={workspaceState.tracker.isDark() ? "dark" : "light"}
      data-density={workspaceState.compact() ? "compact" : "comfortable"}
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
        <a href="/issues" class={stylex.attrs(s.brand).class}>
          S / Solid workspace
        </a>
        <p class={stylex.attrs(s.caption).class}>{workspaceState.name()}</p>
        <nav class={stylex.attrs(s.nav).class} aria-label="Workspace">
          {pages.map((p) => (
            <a
              class={stylex.attrs(s.link, location.pathname === `/${p}` && s.active).class}
              href={`/${p}`}
              aria-current={location.pathname === `/${p}` ? "page" : undefined}
            >
              {p[0].toUpperCase() + p.slice(1)}
            </a>
          ))}
        </nav>
        <div class={stylex.attrs(s.footer).class}>
          <span>Q4 · Styling migration</span>
          <Button onClick={() => workspaceState.tracker.toggleTheme()}>
            {workspaceState.tracker.isDark() ? "Light theme" : "Dark theme"}
          </Button>
        </div>
      </aside>
      <main id="content" class={stylex.attrs(s.content).class} tabindex="-1">
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
