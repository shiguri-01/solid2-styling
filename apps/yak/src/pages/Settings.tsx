import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Switch } from "../components/Switch";
import { TextInput } from "../components/TextInput";
import { Select } from "../components/Select";
import { createSignal, For, Show } from "solid-js";
import { TEAM_MEMBERS } from "utils";
import { Badge } from "../components/Badge";
import { PageHeading } from "../components/PageHeading";
import { css, styled } from "@yak/solid";
import { Heading, Description } from "../components/ui";

const Members = styled.section`
  & > h2 {
    font-size: 16px;
    margin: 0 0 8px;
  }
  & > p {
    color: var(--muted);
    max-width: 45ch;
  }
`;
const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-block: 16px;
  border-bottom: 1px solid var(--line);
  flex-wrap: wrap;
`;
const MemberAvatar = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--hover);
  display: grid;
  place-items: center;
  font-size: 11px;
`;
const Role = styled.label`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
`;
const RoleSelect = styled(Select)`
  width: auto;
`;
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
      <nav
        css={css`
          display: flex;
          gap: 1.25rem;
          border-bottom: 1px solid var(--line);
          margin-bottom: 1.75rem;
        `}
        aria-label="Settings sections"
      >
        <For each={["general", "members"]}>
          {(t) => (
            <button
              css={css`
                border: 0;
                border-bottom: 2px solid transparent;
                border-radius: 0;
                background: none;
                color: var(--muted);
                padding: 0.75rem 0.25rem;
                cursor: pointer;
                &[aria-pressed="true"] {
                  border-color: var(--ink);
                  color: var(--ink);
                }
              `}
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
          <Members>
            <Heading>Design engineering team</Heading>
            <Description>
              Members in this demo workspace. Role selections reset when you leave this section.
            </Description>
            <For each={TEAM_MEMBERS}>
              {(m) => (
                <Member>
                  <MemberAvatar>{m.initials}</MemberAvatar>
                  <span>{m.name}</span>
                  <Role>
                    Role
                    <RoleSelect aria-label={`${m.name} role`}>
                      <option>Editor</option>
                      <option>Viewer</option>
                      <option>Admin</option>
                    </RoleSelect>
                  </Role>
                  <Badge>Active</Badge>
                </Member>
              )}
            </For>
          </Members>
        }
      >
        <section
          css={css`
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
            gap: 2.5rem;
            padding-block: 1.75rem;
            border-bottom: 1px solid var(--line);
            @media (max-width: 700px) {
              grid-template-columns: minmax(0, 1fr);
              gap: 0.75rem;
            }
          `}
        >
          <div>
            <Heading>Workspace profile</Heading>
            <Description>The name appears in the workspace navigation.</Description>
          </div>
          <Card
            as="form"
            variant="plain"
            spacing="roomy"
            css={css`
              display: flex;
              flex-direction: column;
              align-items: stretch;
              gap: 0.75rem;
            `}
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
            <p
              id="name-error"
              css={css`
                color: var(--danger);
                margin: 0;
                &:empty {
                  display: none;
                }
              `}
              role="alert"
            >
              {error()}
            </p>
            <div
              css={css`
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;
              `}
            >
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
            <p
              css={css`
                color: var(--brand);
                &:empty {
                  display: none;
                }
              `}
              role="status"
            >
              {message()}
            </p>
          </Card>
        </section>
        <section
          css={css`
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
            gap: 2.5rem;
            padding-block: 1.75rem;
            border-bottom: 1px solid var(--line);
            @media (max-width: 700px) {
              grid-template-columns: minmax(0, 1fr);
              gap: 0.75rem;
            }
          `}
        >
          <div>
            <Heading>Appearance</Heading>
            <Description>
              Density applies to project checklists and report tables. Use the sidebar to change
              theme.
            </Description>
          </div>
          <Card
            variant="plain"
            spacing="roomy"
            css={css`
              display: flex;
              flex-direction: column;
              align-items: stretch;
              gap: 0.75rem;
            `}
          >
            <Switch
              label="Compact rows"
              description="Reduce vertical spacing for detailed reviews."
              checked={props.compact}
              onChange={(e) => props.setCompact(e.currentTarget.checked)}
            />
            <div
              css={css`
                border: 1px solid var(--line);
                border-radius: 4px;
                padding-inline: 0.75rem;
                &[data-compact="true"] > div {
                  padding-block: 8px;
                }
              `}
              data-compact={props.compact ? "true" : "false"}
            >
              <For each={["Review token naming", "Verify keyboard focus", "Check narrow layouts"]}>
                {(title) => (
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      gap: 0.75rem;
                      padding-block: 18px;
                      border-bottom: 1px solid var(--line);
                      font-size: 0.75rem;
                      &:last-child {
                        border-bottom: 0;
                      }
                    `}
                  >
                    {title}
                    <span>Open</span>
                  </div>
                )}
              </For>
            </div>
          </Card>
        </section>
        <section
          css={css`
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
            gap: 2.5rem;
            padding-block: 1.75rem;
            border-bottom: 1px solid var(--line);
            @media (max-width: 700px) {
              grid-template-columns: minmax(0, 1fr);
              gap: 0.75rem;
            }
          `}
        >
          <div>
            <Heading>Notifications</Heading>
            <Description>Local preference examples; this demo does not send emails.</Description>
          </div>
          <Card
            variant="plain"
            spacing="roomy"
            css={css`
              display: flex;
              flex-direction: column;
              align-items: stretch;
              gap: 0.75rem;
            `}
          >
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
