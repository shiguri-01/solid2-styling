import { styled, css } from "@yak/solid";

export const Page = styled.main`
  --ink: #202521;
  --muted: #737b76;
  --line: #e1e6e2;
  --brand: #147d68;
  --paper: #ffffff;
  --ground: #f4f6f3;
  --control: #ffffff;
  --body-muted: #4d5650;
  --row-hover: #f7f9f7;
  --selected: #eef6f2;

  min-height: 100vh;
  box-sizing: border-box;
  padding: 32px;
  background: var(--ground);
  color: var(--ink);
  font:
    14px/1.5 system-ui,
    sans-serif;

  @media (max-width: 700px) {
    padding: 18px;
  }
  ${(p) =>
    p.theme().dark &&
    css`
      --ink: #eff3f0;
      --muted: #b4beb7;
      --line: #343c37;
      --paper: #202623;
      --ground: #171b19;
      --control: #1b211e;
      --body-muted: #c5cec8;
      --row-hover: #29312c;
      --selected: #263e34;
    `}
`;

export const Shell = styled.div`
  max-width: 1320px;
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
  color: white;
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
      background: #d8eee8;
      color: #17634f;
    `}
  ${(p) =>
    p.$tone === "emerald" &&
    css`
      background: #e0f1df;
      color: #376d3b;
    `}
  ${(p) =>
    p.$tone === "amber" &&
    css`
      background: #f6ead3;
      color: #805915;
    `}
  ${(p) =>
    p.$tone === "rose" &&
    css`
      background: #f5e0df;
      color: #8b4745;
    `}
`;

export const Sprint = styled.span`
  color: var(--muted);
  font-size: 11px;
`;

export const Button = styled.button`
  padding: 8px 12px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--control);
  color: var(--ink);
  cursor: pointer;
  font-size: 12px;
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
  background: #e7eee9;
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
  border-radius: 9px;
  background: var(--paper);
`;
export const Panel = styled.section`
  ${panelStyles}
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
  display: flex;
  gap: 8px;

  margin-top: 18px;

  & input {
    flex: 1;
  }
`;

export const Input = styled.input`
  min-width: 0;
  height: 34px;
  padding: 0 10px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--control);
  color: var(--ink);
  font-size: 12px;
`;

export const Select = styled.select`
  box-sizing: border-box;
  min-width: 126px;
  height: 34px;
  appearance: none;
  padding: 0 30px 0 10px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--control)
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23585c60' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
    no-repeat right 9px center / 12px 12px;
  color: var(--ink);
  font-size: 12px;
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
  display: flex;
  gap: 8px;

  & input {
    flex: 1;
  }

  margin-top: 14px;

  @media (max-width: 700px) {
    flex-wrap: wrap;
    & input {
      flex-basis: 100%;
    }
  }
`;

export const Primary = styled(Button)`
  border-color: var(--brand);
  background: var(--brand);
  color: white;
  font-weight: 600;
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

  @media (max-width: 700px) {
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

  @media (max-width: 700px) {
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
  background: #f0f2f0;
  color: #58605b;
  font-size: 10px;

  ${(p) =>
    p.$priority === "high" &&
    css`
      background: #f8e7e5;
      color: #9e4640;
    `}
  ${(p) =>
    p.$priority === "medium" &&
    css`
      background: #f6eddc;
      color: #86602b;
    `}
  ${(p) =>
    p.$priority === "low" &&
    css`
      background: #e7f2e8;
      color: #3d7345;
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
  ${panelStyles}
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
