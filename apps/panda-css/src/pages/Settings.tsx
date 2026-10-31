import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Switch } from "../components/Switch";
import { TextInput } from "../components/TextInput";
import { Select } from "../components/Select";
import { createSignal, For, Show } from "solid-js";
import { TEAM_MEMBERS } from "utils";
import { Badge } from "../components/Badge";
import { PageHeading } from "../components/PageHeading";
import { settings as s } from "./page-styles";
export default function Settings(props: {
  compact: boolean;
  setCompact: (v: boolean) => void;
  name: string;
  setName: (v: string) => void;
}) {
  const [draft, setDraft] = createSignal(() => props.name);
  const [savedName, setSavedName] = createSignal(() => props.name);
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
    props.setName(value);
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
      <nav class={s.tabs} aria-label="Settings sections">
        <For each={["general", "members"]}>
          {(t) => (
            <button
              class={s.tab}
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
          <section class={s.members}>
            <h2 class={s.heading}>Design engineering team</h2>
            <p class={s.description}>
              Members in this demo workspace. Role selections reset when you leave this section.
            </p>
            <For each={TEAM_MEMBERS}>
              {(m) => (
                <div class={s.member}>
                  <span class={s.avatar}>{m.initials}</span>
                  <span>{m.name}</span>
                  <label class={s.roleLabel}>
                    Role
                    <Select aria-label={`${m.name} role`}>
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
        <section class={s.section}>
          <div>
            <h2 class={s.heading}>Workspace profile</h2>
            <p class={s.description}>The name appears in the workspace navigation.</p>
          </div>
          <Card as="form" variant="plain" spacing="roomy" class={s.form} onSubmit={save} novalidate>
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
            <small class={s.description} id="name-hint">
              3–64 characters. Changes are kept until you reload.
            </small>
            <p id="name-error" class={s.error} role="alert">
              {error()}
            </p>
            <div class={s.actions}>
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
            <p class={s.message} role="status">
              {message()}
            </p>
          </Card>
        </section>
        <section class={s.section}>
          <div>
            <h2 class={s.heading}>Appearance</h2>
            <p class={s.description}>
              Density applies to project checklists and report tables. Use the sidebar to change
              theme.
            </p>
          </div>
          <Card variant="plain" spacing="roomy" class={s.form}>
            <Switch
              label="Compact rows"
              description="Reduce vertical spacing for detailed reviews."
              checked={props.compact}
              onChange={(e) => props.setCompact(e.currentTarget.checked)}
            />
            <div class={s.preview} data-compact={props.compact}>
              <For each={["Review token naming", "Verify keyboard focus", "Check narrow layouts"]}>
                {(title) => (
                  <div class={s.previewRow} data-compact={props.compact}>
                    {title}
                    <span class={s.description}>Open</span>
                  </div>
                )}
              </For>
            </div>
          </Card>
        </section>
        <section class={s.section}>
          <div>
            <h2 class={s.heading}>Notifications</h2>
            <p class={s.description}>Local preference examples; this demo does not send emails.</p>
          </div>
          <Card variant="plain" spacing="roomy" class={s.form}>
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
            <p class={s.description} role="status">
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
