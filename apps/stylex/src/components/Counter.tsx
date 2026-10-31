import * as stylex from "@stylexjs/stylex";
import { createSignal } from "solid-js";

const styles = stylex.create({
  card: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
    paddingBlock: "1.5rem",
    paddingInline: "2rem",
    backgroundColor: "#f8fafc",
    color: "#0f172a",
    borderRadius: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#e2e8f0",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.07)",
  },
  badge: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  button: {
    fontSize: "1rem",
    fontWeight: 600,
    paddingBlock: "0.6rem",
    paddingInline: "1.5rem",
    borderRadius: "9999px",
    borderStyle: "none",
    cursor: "pointer",
    color: "#ffffff",
    backgroundColor: {
      default: "#1b6c80",
      ":hover": "#145363",
    },
    transform: {
      default: null,
      ":active": "scale(0.97)",
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  buttonActive: {
    backgroundColor: {
      default: "#059669",
      ":hover": "#047857",
    },
  },
});

export default function Counter(props: { active?: boolean }) {
  const [count, setCount] = createSignal(0);
  const isActive = () => props.active ?? count() > 0;

  return (
    <div class={stylex.attrs(styles.card).class}>
      <span class={stylex.attrs(styles.badge).class}>StyleX</span>
      <button
        class={stylex.attrs(styles.button, isActive() && styles.buttonActive).class}
        onClick={() => setCount(count() + 1)}
        type="button"
      >
        Clicks: {count()}
      </button>
    </div>
  );
}
