import { createSignal } from "solid-js";
import { badge, buttonVariants, card, defaultTheme } from "./Counter.css";

export default function Counter(props: { intent?: "idle" | "active" }) {
  const [count, setCount] = createSignal(0);
  const currentIntent = () => props.intent ?? (count() > 0 ? "active" : "idle");

  return (
    <div class={`${defaultTheme} ${card}`}>
      <span class={badge}>vanilla-extract</span>
      <button
        class={buttonVariants[currentIntent()]}
        onClick={() => setCount(count() + 1)}
        type="button"
      >
        Clicks: {count()}
      </button>
    </div>
  );
}
