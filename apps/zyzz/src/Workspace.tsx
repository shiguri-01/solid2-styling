import { useLocation } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import {
  createSignal,
  lazy,
  Loading,
  Errored,
  Show,
  createMemo,
  isPending,
  latest,
} from "solid-js";
import { createIssueTracker } from "utils";
import { cx } from "zyzz";
import { style, variants, vars } from "./zyzz.config";
import { Button } from "./components/Button";
const Issues = lazy(() => import("./pages/Issues"));
const Projects = lazy(() => import("./pages/Projects"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));
const pages = ["issues", "projects", "reports", "settings"] as const;
const workspace = style({
  minHeight: "100svh",
  display: "grid",
  gridTemplateColumns: "220px minmax(0,1fr)",
  backgroundColor: vars.color.bg,
  color: vars.color.text,
  fontFamily: "system-ui, sans-serif",
  fontSize: "14px",
  lineHeight: 1.5,
  accentColor: vars.color.brand,
  "@media (max-width:800px)": { gridTemplateColumns: "minmax(0,1fr)" },
});
const density = variants({
  selection: "class",
  base: { "--workspace-row": "16px" },
  variants: { compact: { true: { "--workspace-row": "8px" }, false: {} } },
  defaultVariants: { compact: false },
});
const sidebar = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  padding: vars.space.xl,
  borderRight: "1px solid",
  borderRightColor: vars.color.border,
  position: "sticky",
  top: 0,
  height: "100dvh",
  alignSelf: "start",
  overflowY: "auto",
  overscrollBehavior: "contain",
  "@media (max-width:800px)": {
    position: "static",
    overflowY: "visible",
    height: "auto",
    padding: vars.space.lg,
    borderRightWidth: 0,
    borderBottom: "1px solid",
    borderBottomColor: vars.color.border,
  },
});
const brand = style({
  flexShrink: 0,
  fontSize: "16px",
  fontWeight: 600,
  color: vars.color.text,
  textDecoration: "none",
});
const caption = style({
  flexShrink: 0,
  fontSize: "12px",
  color: vars.color.textMuted,
  overflowWrap: "anywhere",
});
const nav = style({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  "@media (max-width:800px)": {
    flex: "none",
    overflowY: "visible",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
const navLink = variants({
  selection: "class",
  base: {
    padding: "10px 12px",
    borderRadius: vars.radius.sm,
    textDecoration: "none",
    color: vars.color.text,
    ":hover": { backgroundColor: vars.color.surfaceHover },
  },
  variants: {
    active: { true: { backgroundColor: vars.color.surfaceSelected, fontWeight: 600 }, false: {} },
  },
  defaultVariants: { active: false },
});
const footer = style({
  flexShrink: 0,
  "@media (max-width:800px)": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  marginTop: "auto",
  fontSize: "12px",
  color: vars.color.textMuted,
});
const content = style({
  minWidth: 0,
  padding: "32px",
  "@media (max-width:800px)": { padding: "20px 16px" },
});
const skip = style({
  position: "fixed",
  top: "-100px",
  left: vars.space.md,
  zIndex: 10,
  padding: vars.space.md,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  ":focus": { top: vars.space.md },
});
export default function Home() {
  const tracker = createIssueTracker();
  const location = useLocation();
  const page = createMemo(() => pages.find((p) => p === location.hash.slice(1)) ?? "issues");
  const [compact, setCompact] = createSignal(false);
  const [name, setName] = createSignal("Solid / Design engineering");

  return (
    <div
      {...cx(
        vars({ colorScheme: tracker.isDark() ? "dark" : "light" }),
        workspace(),
        density({ compact: compact() }),
      )}
    >
      <Title>Solid 2.0 × Zyzz — Workspace</Title>
      <a
        {...skip()}
        href="#content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("content")?.focus();
        }}
      >
        Skip to content
      </a>
      <aside {...sidebar()}>
        <a {...brand()} href="#issues">
          S / Solid workspace
        </a>
        <p {...caption()}>{name()}</p>
        <nav {...nav()} aria-label="Workspace">
          {pages.map((p) => (
            <a
              {...navLink({ active: latest(page) === p })}
              href={`#${p}`}
              aria-current={latest(page) === p ? "page" : "false"}
            >
              {p[0].toUpperCase() + p.slice(1)}
            </a>
          ))}
        </nav>
        <div {...footer()}>
          <span>Q4 · Styling migration</span>
          <Button onClick={() => tracker.toggleTheme()}>
            {tracker.isDark() ? "Light theme" : "Dark theme"}
          </Button>
        </div>
      </aside>
      <main
        {...content()}
        id="content"
        tabindex="-1"
        aria-busy={isPending(() => page()) ? "true" : "false"}
      >
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
      </main>
    </div>
  );
}
