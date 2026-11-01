import { css, styled } from "@yak/solid";

// Color roles live on the workspace so lazy pages share one reactive theme boundary.
export const WorkspaceRoot = styled.div<{ $compact: boolean }>`
  --ink: #202521;
  --muted: #59645d;
  --line: #dbe1dc;
  --brand: #147d68;
  --brand-solid: #147d68;
  --paper: #fff;
  --ground: #f4f6f3;
  --control: #fff;
  --hover: #eaf0eb;
  --selected: #e0eee7;
  --danger: #a73c35;
  --warning: #80591c;
  --body-muted: var(--ink);
  --row-hover: var(--hover);
  --row-space: 16px;
  --selected-hover: #d2e6dc;
  --danger-surface: #f8e7e5;
  --warning-surface: #f6eddc;
  --success: #376d3b;
  --success-surface: #e0f1df;
  --brand-contrast: #fff;
  color-scheme: light;
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  color: var(--ink);
  background: var(--ground);
  font:
    14px/1.5 system-ui,
    sans-serif;
  ${(p) =>
    p.theme().dark &&
    css`
      --ink: #eff3f0;
      --muted: #b4beb7;
      --line: #404b43;
      --brand: #76d8bb;
      --paper: #202623;
      --ground: #171b19;
      --control: #1b211e;
      --hover: #303a33;
      --selected: #293f35;
      --danger: #f2a49d;
      --warning: #efc67a;
      --body-muted: var(--ink);
      --row-hover: var(--hover);
      --brand-solid: #76d8bb;
      --selected-hover: #344e41;
      --danger-surface: #482b29;
      --warning-surface: #423721;
      --success: #a4d3a7;
      --success-surface: #293c2c;
      --brand-contrast: #102a21;
      color-scheme: dark;
    `}
  ${(p) =>
    p.$compact &&
    css`
      --row-space: 9px;
    `}
  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 28px 18px;
  position: sticky;
  top: 0;
  align-self: start;
  height: 100dvh;
  overflow-y: auto;
  overscroll-behavior: contain;
  border-right: 1px solid var(--line);
  @media (max-width: 800px) {
    position: static;
    height: auto;
    gap: 0.75rem;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }
`;
export const BrandLink = styled.a`
  flex-shrink: 0;
  font-weight: 650;
  font-size: 16px;
  text-decoration: none;
  color: inherit;
`;
export const Caption = styled.p`
  flex-shrink: 0;
  margin: 12px 0;
  color: var(--muted);
  font-size: 0.75rem;
  overflow-wrap: anywhere;
`;
export const Navigation = styled.nav`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  @media (max-width: 800px) {
    flex: none;
    overflow: visible;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
`;
export const NavLink = styled.a`
  display: block;
  padding: 10px 12px;
  margin-block: 0.25rem;
  border-radius: 4px;
  color: inherit;
  text-decoration: none;
  &:hover {
    background: var(--hover);
  }
  &[aria-current="page"] {
    background: var(--selected);
    font-weight: 650;
    &:hover {
      background: var(--selected-hover);
    }
  }
`;
export const SidebarFooter = styled.div`
  flex-shrink: 0;
  @media (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  display: grid;
  gap: 0.75rem;
  margin-top: auto;
  color: var(--muted);
  font-size: 0.75rem;
`;
export const Content = styled.main`
  min-width: 0;
  padding: 2rem;
  @media (max-width: 800px) {
    padding: 1.25rem 1rem;
  }
`;
export const SkipLink = styled.a`
  position: absolute;
  top: -10rem;
  left: 1rem;
  z-index: 10;
  padding: 0.75rem;
  background: var(--paper);
  color: var(--ink);
  &:focus {
    top: 1rem;
  }
`;
