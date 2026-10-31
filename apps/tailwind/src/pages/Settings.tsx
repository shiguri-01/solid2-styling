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
      <nav class="mb-7 flex gap-5 border-b border-line" aria-label="Settings sections">
        <For each={["general", "members"]}>
          {(t) => (
            <button
              class="rounded-none border-x-0 border-t-0 border-b-2 border-transparent bg-transparent px-1 py-3 text-muted aria-pressed:border-ink aria-pressed:text-ink"
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
          <section>
            <h2 class="mb-2 text-base font-semibold">Design engineering team</h2>
            <p class="max-w-[45ch] text-muted">
              Members in this demo workspace. Role selections reset when you leave this section.
            </p>
            <For each={TEAM_MEMBERS}>
              {(m) => (
                <div class="flex flex-wrap items-center gap-4 border-b border-line py-4">
                  <span class="grid size-8 place-items-center rounded-full bg-row-hover text-[11px]">
                    {m.initials}
                  </span>
                  <span>{m.name}</span>
                  <label class="ml-auto flex items-center gap-3 text-xs">
                    Role
                    <Select class="w-auto!" aria-label={`${m.name} role`}>
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
        <section class="grid gap-3 border-b border-line py-7 md:grid-cols-[1fr_1.5fr] md:gap-10">
          <div>
            <h2 class="mb-2 text-base font-semibold">Workspace profile</h2>
            <p class="max-w-[45ch] text-muted">The name appears in the workspace navigation.</p>
          </div>
          <Card
            as="form"
            variant="plain"
            spacing="roomy"
            class="flex flex-col items-stretch gap-3"
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
            <small id="name-hint" class="text-muted">
              3–64 characters. Changes are kept until you reload.
            </small>
            <p id="name-error" class="text-red-ink empty:hidden" role="alert">
              {error()}
            </p>
            <div class="flex flex-wrap gap-2.5">
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
            <p class="text-muted empty:hidden" role="status">
              {message()}
            </p>
          </Card>
        </section>
        <section class="grid gap-3 border-b border-line py-7 md:grid-cols-[1fr_1.5fr] md:gap-10">
          <div>
            <h2 class="mb-2 text-base font-semibold">Appearance</h2>
            <p class="max-w-[45ch] text-muted">
              Density applies to project checklists and report tables. Use the sidebar to change
              theme.
            </p>
          </div>
          <Card variant="plain" spacing="roomy" class="flex flex-col items-stretch gap-3">
            <Switch
              label="Compact rows"
              description="Reduce vertical spacing for detailed reviews."
              checked={props.compact}
              onChange={(e) => props.setCompact(e.currentTarget.checked)}
            />
            <div class="group/preview rounded border border-line px-3" data-compact={props.compact}>
              <For each={["Review token naming", "Verify keyboard focus", "Check narrow layouts"]}>
                {(title) => (
                  <div class="flex justify-between gap-3 border-b border-line py-[18px] text-xs last:border-0 group-data-[compact=true]/preview:py-2">
                    {title}
                    <span class="text-muted">Open</span>
                  </div>
                )}
              </For>
            </div>
          </Card>
        </section>
        <section class="grid gap-3 border-b border-line py-7 md:grid-cols-[1fr_1.5fr] md:gap-10">
          <div>
            <h2 class="mb-2 text-base font-semibold">Notifications</h2>
            <p class="max-w-[45ch] text-muted">
              Local preference examples; this demo does not send emails.
            </p>
          </div>
          <Card variant="plain" spacing="roomy" class="flex flex-col items-stretch gap-3">
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
            <p class="max-w-[45ch] text-muted" role="status">
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
