import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const active = () => count() > 0;

  return (
    <div class="inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6">
      <span class="text-xs font-semibold uppercase tracking-wide text-muted">Tailwind CSS</span>
      <button
        class={[
          "rounded-full px-6 py-2 font-semibold text-white transition-colors",
          active() ? "bg-green-ink hover:opacity-90" : "bg-brand hover:opacity-90",
        ]}
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
