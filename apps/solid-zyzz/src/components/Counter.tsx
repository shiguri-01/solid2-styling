import { createSignal } from "solid-js";
import { style, variants, vars } from "../zyzz.config";

const card = style({
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.75rem",
  padding: "1.5rem 2rem",
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  borderRadius: vars.radius.md,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.07)",
});

const badge = style({
  fontSize: "0.75rem",
  fontWeight: 600,
  color: vars.color.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

const button = variants({
  selection: "class",
  base: {
    fontSize: "1rem",
    fontWeight: 600,
    padding: "0.6rem 1.5rem",
    borderRadius: vars.radius.full,
    borderStyle: "none",
    cursor: "pointer",
    color: vars.color.white,
    transitionProperty: "background-color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ":active": {
      transform: "scale(0.97)",
    },
  },
  variants: {
    intent: {
      primary: {
        backgroundColor: vars.color.brand,
        ":hover": {
          backgroundColor: vars.color.brandHover,
        },
      },
      subtle: {
        backgroundColor: vars.color.subtle,
      },
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export default function Counter(props: { intent?: "primary" | "subtle" }) {
  const [count, setCount] = createSignal(0);
  const currentIntent = () => props.intent ?? (count() > 0 ? "subtle" : "primary");

  return (
    <div class={card().class}>
      <span class={badge().class}>Zyzz</span>
      <button
        class={button({ intent: currentIntent() }).class}
        onClick={() => setCount(count() + 1)}
        type="button"
      >
        Clicks: {count()}
      </button>
    </div>
  );
}
