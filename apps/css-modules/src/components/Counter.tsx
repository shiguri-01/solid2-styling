import { createSignal } from "solid-js";
import styles from "./Counter.module.css";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const active = () => count() > 0;

  return (
    <div class={styles.card}>
      <span class={styles.label}>CSS Modules</span>
      <button
        class={active() ? styles.active : styles.button}
        aria-pressed={active() ? "true" : "false"}
        onClick={() => {
          setCount(count() + 1);
        }}
        type="button"
      >
        Clicks: {count()}
      </button>
    </div>
  );
}
