import * as stylex from "@stylexjs/stylex";
import { For } from "solid-js";
import { type IssueTrackerStore, TEAM_MEMBERS } from "utils";
import { avatarColorMap, primitives } from "../styles";
import { tokens } from "../tokens.stylex";

const styles = stylex.create({
  headerBar: {
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spaceLg,
    paddingBottom: "20px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.border,
  },
  brandGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spaceMd,
  },
  liveDot: {
    width: "10px",
    height: "10px",
    borderRadius: tokens.radiusFull,
    backgroundColor: tokens.brand,
    flexShrink: 0,
  },
  titleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  appTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  avatarStack: {
    display: "inline-flex",
    alignItems: "center",
    paddingLeft: "6px",
  },
});

interface HeaderBarProps {
  tracker: IssueTrackerStore;
}

export function HeaderBar(props: HeaderBarProps) {
  return (
    <header class={stylex.attrs(styles.headerBar).class}>
      <div class={stylex.attrs(styles.brandGroup).class}>
        <span class={stylex.attrs(styles.liveDot).class} />
        <div class={stylex.attrs(styles.titleBlock).class}>
          <div class={stylex.attrs(primitives.breadcrumbRow).class}>
            <span>Design Engineering</span>
            <span>/</span>
            <span>Q4 Styling Migration</span>
          </div>
          <h1 class={stylex.attrs(styles.appTitle).class}>Solid 2.0 × StyleX</h1>
        </div>
      </div>

      <div class={stylex.attrs(styles.headerActions).class}>
        <div class={stylex.attrs(styles.avatarStack).class} aria-label="Active team members">
          <For each={TEAM_MEMBERS}>
            {(member) => (
              <span
                class={stylex.attrs(primitives.avatarBase, avatarColorMap[member.tone]).class}
                title={member.name}
              >
                {member.initials}
              </span>
            )}
          </For>
        </div>
        <span class={stylex.attrs(primitives.pillBase, primitives.pillBrand).class}>Sprint 14</span>
        <button
          type="button"
          class={
            stylex.attrs(primitives.buttonBase, primitives.toneNeutral, primitives.sizeSm).class
          }
          onClick={() => props.tracker.toggleTheme()}
        >
          {props.tracker.isDark() ? "Light Theme" : "Dark Theme"}
        </button>
      </div>
    </header>
  );
}
