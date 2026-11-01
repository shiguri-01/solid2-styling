import { Button } from "../components/Button";
import { Loading, Errored, type ParentProps } from "solid-js";
import { useLocation } from "@solidjs/router";
import { useWorkspace } from "./workspace-context";
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
} from "./workspace-styles";
import "../reset.css";
const pages = ["issues", "projects", "reports", "settings"] as const;
export default function Workspace(props: ParentProps) {
  const workspace = useWorkspace();
  const location = useLocation();
  return (
    <YakThemeProvider theme={{ dark: workspace.tracker.isDark() }}>
      <WorkspaceRoot
        $compact={workspace.compact()}
        data-theme={workspace.tracker.isDark() ? "dark" : "light"}
        data-density={workspace.compact() ? "compact" : "comfortable"}
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
          <BrandLink href="/issues">S / Solid workspace</BrandLink>
          <Caption>{workspace.name()}</Caption>
          <Navigation aria-label="Workspace">
            <ForNav page={location.pathname} />
          </Navigation>
          <SidebarFooter>
            <span>Q4 · Styling migration</span>
            <Button onClick={() => workspace.tracker.toggleTheme()}>
              {workspace.tracker.isDark() ? "Light theme" : "Dark theme"}
            </Button>
          </SidebarFooter>
        </Sidebar>
        <Content id="content" tabindex="-1">
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
        </Content>
      </WorkspaceRoot>
    </YakThemeProvider>
  );
}
function ForNav(props: { page: string }) {
  return (
    <>
      {pages.map((p) => (
        <NavLink href={`/${p}`} aria-current={props.page === `/${p}` ? "page" : undefined}>
          {p[0].toUpperCase() + p.slice(1)}
        </NavLink>
      ))}
    </>
  );
}
