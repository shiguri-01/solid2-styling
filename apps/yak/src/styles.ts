import { styled, css } from "@yak/solid";

export const Page = styled.section`
  min-width: 0;
`;

export const Shell = styled.div`
  max-width: none;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  & h1 {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
  }
`;

export const Mark = styled.span`
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 10px;
  background: var(--brand);
  color: var(--brand-contrast);
  font-weight: 700;
`;

export const Eyebrow = styled.p`
  margin: 0;
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.08em;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatars = styled(HeaderActions)`
  gap: 0;
`;

export const Avatar = styled.span<{ $tone: string }>`
  display: grid;
  width: 27px;
  height: 27px;
  margin-left: -5px;
  place-items: center;
  border: 2px solid var(--ground);
  border-radius: 50%;
  font-size: 10px;

  ${(p) =>
    p.$tone === "teal" &&
    css`
      background: var(--selected);
      color: var(--brand);
    `}
  ${(p) =>
    p.$tone === "emerald" &&
    css`
      background: var(--success-surface);
      color: var(--success);
    `}
  ${(p) =>
    p.$tone === "amber" &&
    css`
      background: var(--warning-surface);
      color: var(--warning);
    `}
  ${(p) =>
    p.$tone === "rose" &&
    css`
      background: var(--danger-surface);
      color: var(--danger);
    `}
`;

export const Sprint = styled.span`
  color: var(--muted);
  font-size: 11px;
`;

export const Button = styled.button`
  min-height: 40px;
  padding: 9px 12px;
  line-height: 20px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
  font: inherit;
  &:hover:not(:disabled) {
    background: var(--hover);
  }
`;

export const Metrics = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid var(--line);
  border-radius: 9px;
  background: var(--paper);

  & > div {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 18px 20px;
    border-right: 1px solid var(--line);
    color: var(--muted);
    font-size: 12px;
  }

  & > div:last-child {
    border: 0;
  }

  & strong {
    color: var(--ink);
    font-size: 24px;
    line-height: 1.2;
  }

  & small {
    font-size: 11px;
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Progress = styled.div`
  height: 4px;
  overflow: hidden;
  border-radius: 4px;
  background: var(--line);
`;

export const ProgressFill = styled.i<{ $percent: number }>`
  display: block;
  height: 100%;
  background: var(--brand);
  width: ${(p) => p.$percent}%;
`;

export const Workspace = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.9fr);
  gap: 18px;
  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const panelStyles = css`
  min-width: 0;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--paper);
  container: issue-panel / inline-size;
  @media (max-width: 700px) {
    padding: 16px;
  }
`;
export const Panel = styled.section`
  ${panelStyles};
`;

export const PanelHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  & h2 {
    margin: 0;
    font-size: 16px;
  }

  & p {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 12px;
  }
`;

export const Count = Sprint;

export const Toolbar = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(140px, 180px);
  gap: 8px;
  align-items: center;
  @container issue-panel (max-width:380px) {
    grid-template-columns: minmax(0, 1fr);
  }
  margin-top: 18px;

  & input {
    flex: 1;
  }
`;

export const Input = styled.input`
  min-width: 0;
  min-height: 40px;
  padding: 9px 12px;
  line-height: 20px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--control);
  color: var(--ink);
  font: inherit;
`;

export const Select = styled.select`
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
  min-height: 40px;
  line-height: 20px;
  appearance: none;
  padding: 9px 36px 9px 12px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--control)
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='m4.5 6.25 3.5 3.5 3.5-3.5' stroke='%237c8880' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
    no-repeat right 12px center / 16px 16px;
  color: var(--ink);
  font: inherit;
  cursor: pointer;
`;

export const Filters = styled.nav`
  display: flex;
  gap: 4px;
  margin-top: 12px;
  border-bottom: 1px solid var(--line);
`;

export const Filter = styled.button<{ $active: boolean }>`
  padding: 9px 10px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 12px;

  & span {
    margin-left: 4px;
    font-size: 10px;
  }

  ${(p) =>
    p.$active &&
    css`
      border-color: var(--brand);
      color: var(--brand);
    `}
`;

export const CreateForm = styled.form`
  display: grid;
  grid-template-columns: minmax(180px, 1fr) minmax(140px, 160px) minmax(100px, 120px) auto;
  align-items: center;
  gap: 8px;

  & input {
    flex: 1;
  }

  margin-top: 14px;

  @container issue-panel (max-width:640px) {
    grid-template-columns: minmax(0, 1fr) minmax(100px, 140px) auto;
    & input {
      grid-column: 1/-1;
    }
  }
  @container issue-panel (max-width:380px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    & button {
      grid-column: 1/-1;
    }
  }
`;

export const Primary = styled(Button)`
  background: var(--ink);
  color: var(--paper);
  &:hover:not(:disabled) {
    background: color-mix(in srgb, var(--ink) 85%, var(--paper));
  }
`;

export const TableHead = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 100px 78px 55px 45px;
  gap: 8px;
  align-items: center;

  margin-top: 20px;
  padding: 0 5px 8px;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 11px;

  @container issue-panel (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr) 70px 42px;

    & > *:nth-child(2) {
      display: none;
    }

    & > *:nth-child(4) {
      display: none;
    }
  }
`;

export const Rows = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Row = styled.li<{ $selected: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 100px 78px 55px 45px;
  gap: 8px;
  align-items: center;

  min-height: 49px;
  padding: 0 5px;
  border-bottom: 1px solid var(--line);
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background: var(--row-hover);
  }

  @container issue-panel (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr) 70px 42px;

    & > *:nth-child(2) {
      display: none;
    }

    & > *:nth-child(4) {
      display: none;
    }
  }
  ${(p) =>
    p.$selected &&
    css`
      background: var(--selected);
      box-shadow: inset 2px 0 var(--brand);
      &:hover {
        background: var(--selected-hover);
      }
    `}
`;

export const Issue = styled.label`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 7px;

  & input[type="checkbox"] {
    flex-shrink: 0;
    width: 13px;
    height: 13px;
    margin: 0;
  }

  & span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & code {
    color: var(--muted);
    font-size: 10px;
    flex-shrink: 0;
    white-space: nowrap;
  }
`;

export const Done = styled.span<{ $done: boolean }>`
  ${(p) =>
    p.$done &&
    css`
      color: var(--muted);
      text-decoration: line-through;
    `}
`;

export const CategoryLabel = styled.span`
  overflow: hidden;
  color: var(--muted);
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Badge = styled.span<{ $priority: "high" | "medium" | "low" }>`
  width: max-content;
  padding: 3px 7px;
  border-radius: 20px;
  background: var(--hover);
  color: var(--muted);
  font-size: 10px;

  ${(p) =>
    p.$priority === "high" &&
    css`
      background: var(--danger-surface);
      color: var(--danger);
    `}
  ${(p) =>
    p.$priority === "medium" &&
    css`
      background: var(--warning-surface);
      color: var(--warning);
    `}
  ${(p) =>
    p.$priority === "low" &&
    css`
      background: var(--success-surface);
      color: var(--success);
    `}
`;

export const Delete = styled.button`
  border: 0;
  background: transparent;
  color: var(--muted);
  font-size: 10px;
  cursor: pointer;
`;

export const Empty = styled.p`
  padding: 24px;
  text-align: center;
  color: var(--muted);
`;

export const Footer = styled.footer`
  padding-top: 12px;
  color: var(--muted);
  font-size: 11px;
`;

export const PanelAside = styled.aside`
  ${panelStyles};
`;

export const DetailTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);

  & h2 {
    margin: 5px 0 0;
    font-size: 16px;
    line-height: 1.4;
  }
`;

export const Meta = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin: 0;
  padding: 16px 0;
  border-bottom: 1px solid var(--line);

  & div {
    display: grid;
    gap: 4px;
  }

  & dt {
    color: var(--muted);
    font-size: 11px;
  }

  & dd {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
  }
`;

export const DetailSection = styled.section`
  margin-top: 16px;

  & h3 {
    margin: 0 0 8px;
    color: var(--muted);
    font-size: 12px;
  }

  & p {
    margin: 0;
    color: var(--body-muted);
    font-size: 12px;
    line-height: 1.6;
  }
`;

export const Criteria = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  & li {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid var(--line);
    font-size: 11px;
  }

  & small {
    color: var(--muted);
    white-space: nowrap;
  }
`;

export const Activity = styled(Criteria)`
  & li {
    border: 0;
  }
`;

export const DetailActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
`;

export const CompareNote = styled.p`
  margin: 0;
  text-align: center;
  color: var(--muted);
  font-size: 11px;
`;
