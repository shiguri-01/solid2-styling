import { For } from "solid-js";
import { type IssueTrackerStore, TEAM_MEMBERS } from "utils";
import { actionButton, avatar, breadcrumbRow, pill } from "../styles";
import { style, vars } from "../zyzz.config";

const headerBar = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.lg,
  paddingBottom: "20px",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.border,
});

const brandGroup = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
});

const liveDot = style({
  width: "10px",
  height: "10px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.brand,
  flexShrink: 0,
});

const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const appTitle = style({
  margin: 0,
  fontSize: "22px",
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
});

const headerActions = style({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
});

const avatarStack = style({
  display: "inline-flex",
  alignItems: "center",
  paddingLeft: "6px",
});

interface HeaderBarProps {
  tracker: IssueTrackerStore;
}

export function HeaderBar(props: HeaderBarProps) {
  return (
    <header class={headerBar().class}>
      <div class={brandGroup().class}>
        <span class={liveDot().class} />
        <div class={titleBlock().class}>
          <div class={breadcrumbRow().class}>
            <span>Design Engineering</span>
            <span>/</span>
            <span>Q4 Styling Migration</span>
          </div>
          <h1 class={appTitle().class}>Solid 2.0 × Zyzz</h1>
        </div>
      </div>

      <div class={headerActions().class}>
        <div class={avatarStack().class} aria-label="Active team members">
          <For each={TEAM_MEMBERS}>
            {(member) => (
              <span class={avatar({ tone: member.tone }).class} title={member.name}>
                {member.initials}
              </span>
            )}
          </For>
        </div>
        <span class={pill({ tone: "brand" }).class}>Sprint 14</span>
        <button
          type="button"
          class={actionButton({ tone: "neutral", size: "sm" }).class}
          onClick={() => props.tracker.toggleTheme()}
        >
          {props.tracker.isDark() ? "Light Theme" : "Dark Theme"}
        </button>
      </div>
    </header>
  );
}
