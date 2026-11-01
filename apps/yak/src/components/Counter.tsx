import { styled } from "@yak/solid";
import { createSignal } from "solid-js";

const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 2rem;
  border: 1px solid var(--line);
  border-radius: 0.75rem;
  background: var(--paper);
`;
const Label = styled.span`
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;
const Button = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1.5rem;
  border: 0;
  border-radius: 9999px;
  background: ${(p) => (p.$active ? "#059669" : "var(--brand)")};
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
  transition: background-color 150ms ease;
  &:hover {
    background: ${(p) => (p.$active ? "#047857" : "var(--brand-hover)")};
  }
`;

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const active = () => count() > 0;

  return (
    <Card>
      <Label>yak</Label>
      <Button
        $active={active()}
        aria-pressed={active() ? "true" : "false"}
        onClick={() => {
          setCount(count() + 1);
        }}
        type="button"
      >
        Clicks: {count()}
      </Button>
    </Card>
  );
}
