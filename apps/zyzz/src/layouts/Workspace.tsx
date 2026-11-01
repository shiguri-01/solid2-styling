import { useWorkspace } from "./workspace-context";
import { useLocation } from "@solidjs/router";
import { Loading, Errored, type ParentProps } from "solid-js";
import { cx } from "zyzz";
import { style, variants, vars } from "../zyzz.config";
import { Button } from "../components/Button";
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
export default function Workspace(props: ParentProps) {
  const workspaceState = useWorkspace();
  const location = useLocation();
  return (
    <div
      data-theme={workspaceState.tracker.isDark() ? "dark" : "light"}
      data-density={workspaceState.compact() ? "compact" : "comfortable"}
      {...cx(
        vars({ colorScheme: workspaceState.tracker.isDark() ? "dark" : "light" }),
        workspace(),
        density({ compact: workspaceState.compact() }),
      )}
    >
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
        <a {...brand()} href="/issues">
          S / Solid workspace
        </a>
        <p {...caption()}>{workspaceState.name()}</p>
        <nav {...nav()} aria-label="Workspace">
          {pages.map((p) => (
            <a
              {...navLink({ active: location.pathname === `/${p}` })}
              href={`/${p}`}
              aria-current={location.pathname === `/${p}` ? "page" : undefined}
            >
              {p[0].toUpperCase() + p.slice(1)}
            </a>
          ))}
        </nav>
        <div {...footer()}>
          <span>Q4 · Styling migration</span>
          <Button onClick={() => workspaceState.tracker.toggleTheme()}>
            {workspaceState.tracker.isDark() ? "Light theme" : "Dark theme"}
          </Button>
        </div>
      </aside>
      <main {...content()} id="content" tabindex="-1">
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
