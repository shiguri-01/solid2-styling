import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Switch } from "../components/Switch";
import { TextInput } from "../components/TextInput";
import { Select } from "../components/Select";
import { createSignal, For, Show } from "solid-js";
import { TEAM_MEMBERS } from "utils";
import { Badge } from "../components/Badge";
import { PageHeading } from "../components/PageHeading";
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
      <nav class="l--cluster -g:25 -bd-be -mb:30" aria-label="Settings sections">
        <For each={["general", "members"]}>
          {(t) => (
            <button
              class="b--tab set--plain"
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
          <section class="l--stack -g:15">
            <h2 class="-fz:l -mb:10">Design engineering team</h2>
            <p>
              Members in this demo workspace. Role selections reset when you leave this section.
            </p>
            <For each={TEAM_MEMBERS}>
              {(m) => (
                <div class="l--cluster -g:20 -py:20 -bd-be">
                  <span
                    class="l--grid -pi:center -sz -h -bdrs:99 -bgc -fz:xs"
                    style={{
                      "--sz": "var(--memberAvatarSize)",
                      "--h": "var(--memberAvatarSize)",
                      "--bgc": "var(--hoverSurface)",
                    }}
                  >
                    {m.initials}
                  </span>
                  <span>{m.name}</span>
                  <label class="l--flex -ai:center -g:15 -ms -fz:s" style={{ "--ms": "auto" }}>
                    Role
                    <Select class="-w" style={{ "--w": "auto" }} aria-label={`${m.name} role`}>
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
        <section
          class="l--grid -gtc -gtc_md -g:15 -g_md -py:30 -bd-be"
          style={{
            "--gtc": "minmax(0, 1fr)",
            "--gtc_md": "minmax(0, 1fr) minmax(0, 1.5fr)",
            "--g_md": "var(--s40)",
          }}
        >
          <div>
            <h2 class="-fz:l -mb:10">Workspace profile</h2>
            <p>The name appears in the workspace navigation.</p>
          </div>
          <Card
            as="form"
            variant="plain"
            spacing="roomy"
            class="l--stack -g:15"
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
            <p id="name-error" class="c--feedback -c:red" role="alert">
              {error()}
            </p>
            <div class="l--cluster -g:10">
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
            <p class="c--feedback -c:green" role="status">
              {message()}
            </p>
          </Card>
        </section>
        <section
          class="l--grid -gtc -gtc_md -g:15 -g_md -py:30 -bd-be"
          style={{
            "--gtc": "minmax(0, 1fr)",
            "--gtc_md": "minmax(0, 1fr) minmax(0, 1.5fr)",
            "--g_md": "var(--s40)",
          }}
        >
          <div>
            <h2 class="-fz:l -mb:10">Appearance</h2>
            <p>
              Density applies to project checklists and report tables. Use the sidebar to change
              theme.
            </p>
          </div>
          <Card variant="plain" spacing="roomy" class="l--stack -g:15">
            <Switch
              label="Compact rows"
              description="Reduce vertical spacing for detailed reviews."
              checked={props.compact}
              onChange={(e) => props.setCompact(e.currentTarget.checked)}
            />
            <div class="c--preview -bd -bdrs:20 -px:15 -fz:s" data-compact={props.compact}>
              <For each={["Review token naming", "Verify keyboard focus", "Check narrow layouts"]}>
                {(title) => (
                  <div class="l--flex -jc:between -g:15 -py" style={{ "--py": "var(--rowSpace)" }}>
                    {title}
                    <span class="-c:text-2">Open</span>
                  </div>
                )}
              </For>
            </div>
          </Card>
        </section>
        <section
          class="l--grid -gtc -gtc_md -g:15 -g_md -py:30 -bd-be"
          style={{
            "--gtc": "minmax(0, 1fr)",
            "--gtc_md": "minmax(0, 1fr) minmax(0, 1.5fr)",
            "--g_md": "var(--s40)",
          }}
        >
          <div>
            <h2 class="-fz:l -mb:10">Notifications</h2>
            <p>Local preference examples; this demo does not send emails.</p>
          </div>
          <Card variant="plain" spacing="roomy" class="l--stack -g:15">
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
