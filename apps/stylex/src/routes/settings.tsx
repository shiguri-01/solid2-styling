import { useWorkspace } from "../layouts/workspace-context";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Switch } from "../components/Switch";
import { TextInput } from "../components/TextInput";
import { Select } from "../components/Select";
import { createSignal, For, Show } from "solid-js";
import { TEAM_MEMBERS } from "utils";
import { Badge } from "../components/Badge";
import { PageHeading } from "../components/PageHeading";
import * as stylex from "@stylexjs/stylex";
import { pageStyles as s } from "../styles/page-styles";
export default function Settings() {
  const workspace = useWorkspace();
  const [draft, setDraft] = createSignal(() => workspace.name());
  const [savedName, setSavedName] = createSignal(() => workspace.name());
  const [message, setMessage] = createSignal("");
  const [error, setError] = createSignal("");
  const [digest, setDigest] = createSignal(true);
  const [mentions, setMentions] = createSignal(true);
  const [tab, setTab] = createSignal("general");
  const save = (e: SubmitEvent) => {
    e.preventDefault();
    const value = draft().trim();
    if (value.length < 3) {
      setError("Enter at least 3 characters.");
      setMessage("");
      return;
    }
    workspace.setName(value);
    setSavedName(value);
    setError("");
    setMessage("Workspace name saved for this session.");
  };
  return (
    <>
      <PageHeading
        title="Workspace settings"
        description="Manage your workspace, reading density and notification preferences."
      />
      <nav class={stylex.attrs(s.tabs).class} aria-label="Settings sections">
        <For each={["general", "members"]}>
          {(t) => (
            <button
              class={stylex.attrs(s.tab, tab() === t && s.tabActive).class}
              aria-pressed={tab() === t ? "true" : "false"}
              onClick={() => setTab(t)}
            >
              {t === "general" ? "General" : "Members"}
            </button>
          )}
        </For>
      </nav>
      <Show
        when={tab() === "general"}
        fallback={
          <section class={stylex.attrs(s.members).class}>
            <h2 class={stylex.attrs(s.heading).class}>Design engineering team</h2>
            <p class={stylex.attrs(s.description).class}>
              Members in this demo workspace. Role selections reset when you leave this section.
            </p>
            <For each={TEAM_MEMBERS}>
              {(m) => (
                <div class={stylex.attrs(s.member).class}>
                  <span class={stylex.attrs(s.avatar).class}>{m.initials}</span>
                  <span>{m.name}</span>
                  <label class={stylex.attrs(s.roleLabel).class}>
                    Role
                    <Select xstyle={s.roleSelect} aria-label={`${m.name} role`}>
                      <option>Editor</option>
                      <option>Viewer</option>
                      <option>Admin</option>
                    </Select>
                  </label>
                  <Badge>Active</Badge>
                </div>
              )}
            </For>
          </section>
        }
      >
        <section class={stylex.attrs(s.section).class}>
          <div>
            <h2 class={stylex.attrs(s.heading).class}>Workspace profile</h2>
            <p class={stylex.attrs(s.description).class}>
              The name appears in the workspace navigation.
            </p>
          </div>
          <Card
            as="form"
            variant="plain"
            spacing="roomy"
            xstyle={s.form}
            onSubmit={save}
            novalidate
          >
            <label for="workspace-name">Workspace name</label>
            <TextInput
              id="workspace-name"
              maxlength="64"
              value={draft()}
              aria-invalid={error() ? "true" : "false"}
              aria-describedby="name-hint name-error"
              onInput={(e) => {
                setDraft(e.currentTarget.value);
                setError("");
                setMessage("");
              }}
            />
            <small id="name-hint">3–64 characters. Changes are kept until you reload.</small>
            <p id="name-error" class={stylex.attrs(s.error).class} role="alert">
              {error()}
            </p>
            <div class={stylex.attrs(s.actions).class}>
              <Button variant="primary" type="submit" disabled={draft().trim() === savedName()}>
                Save changes
              </Button>
              <Button
                type="button"
                disabled={draft() === savedName()}
                onClick={() => {
                  setDraft(savedName());
                  setError("");
                }}
              >
                Reset
              </Button>
            </div>
            <p class={stylex.attrs(s.message).class} role="status">
              {message()}
            </p>
          </Card>
        </section>
        <section class={stylex.attrs(s.section).class}>
          <div>
            <h2 class={stylex.attrs(s.heading).class}>Appearance</h2>
            <p class={stylex.attrs(s.description).class}>
              Density applies to project checklists and report tables. Use the sidebar to change
              theme.
            </p>
          </div>
          <Card variant="plain" spacing="roomy" xstyle={s.form}>
            <Switch
              label="Compact rows"
              description="Reduce vertical spacing for detailed reviews."
              checked={workspace.compact()}
              onChange={(e) => workspace.setCompact(e.currentTarget.checked)}
            />
            <div class={stylex.attrs(s.preview).class} data-compact={workspace.compact()}>
              <For each={["Review token naming", "Verify keyboard focus", "Check narrow layouts"]}>
                {(title, index) => (
                  <div
                    class={
                      stylex.attrs(
                        s.previewRow,
                        workspace.compact() && s.compactRow,
                        index() === 2 && s.previewLast,
                      ).class
                    }
                  >
                    {title}
                    <span class={stylex.attrs(s.description).class}>Open</span>
                  </div>
                )}
              </For>
            </div>
          </Card>
        </section>
        <section class={stylex.attrs(s.section).class}>
          <div>
            <h2 class={stylex.attrs(s.heading).class}>Notifications</h2>
            <p class={stylex.attrs(s.description).class}>
              Local preference examples; this demo does not send emails.
            </p>
          </div>
          <Card variant="plain" spacing="roomy" xstyle={s.form}>
            <Switch
              label="Weekly delivery digest"
              description="A summary of open work and completion."
              checked={digest()}
              onChange={(e) => setDigest(e.currentTarget.checked)}
            />
            <Switch
              label="Mentions and assignments"
              description="Updates related to your work."
              checked={mentions()}
              onChange={(e) => setMentions(e.currentTarget.checked)}
            />
            <p role="status">
              {digest() || mentions()
                ? "Preferences enabled while this page is open."
                : "All notifications are paused."}
            </p>
          </Card>
        </section>
      </Show>
    </>
  );
}
