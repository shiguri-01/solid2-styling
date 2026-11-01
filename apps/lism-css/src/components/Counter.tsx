import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const active = () => count() > 0;

  return (
    <div class="l--stack -g:15 -p:20 b--card">
      <span class="-fz:s -fw:600 -c:text-2 -tt:uppercase">Lism CSS</span>
      <button
        class={["b--button", active() && "b--button--primary"]}
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
