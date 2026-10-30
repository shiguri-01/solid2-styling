import { For } from "solid-js";
import { type IssueTrackerStore, TEAM_MEMBERS } from "utils";
import { avatarTone, breadcrumbRow, buttonSize, buttonTone, priorityBadge } from "../styles.css";
import {
  appTitle,
  avatarStack,
  brandGroup,
  headerActions,
  headerBar,
  liveDot,
  titleBlock,
} from "./HeaderBar.css";

interface HeaderBarProps {
  tracker: IssueTrackerStore;
}

export function HeaderBar(props: HeaderBarProps) {
  return (
    <header class={headerBar}>
      <div class={brandGroup}>
        <span class={liveDot} />
        <div class={titleBlock}>
          <div class={breadcrumbRow}>
            <span>Design Engineering</span>
            <span>/</span>
            <span>Q4 Styling Migration</span>
          </div>
          <h1 class={appTitle}>Solid 2.0 × vanilla-extract</h1>
        </div>
      </div>

      <div class={headerActions}>
        <div class={avatarStack} aria-label="Active team members">
          <For each={TEAM_MEMBERS}>
            {(member) => (
              <span class={avatarTone[member.tone]} title={member.name}>
                {member.initials}
              </span>
            )}
          </For>
        </div>
        <span class={priorityBadge.brand}>Sprint 14</span>
        <button
          type="button"
          class={`${buttonTone.neutral} ${buttonSize.sm}`}
          onClick={() => props.tracker.toggleTheme()}
        >
          {props.tracker.isDark() ? "Light Theme" : "Dark Theme"}
        </button>
      </div>
    </header>
  );
}
