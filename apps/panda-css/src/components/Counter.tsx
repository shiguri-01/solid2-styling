import { createSignal } from "solid-js";
import { css, cva } from "../../styled-system/css";

const card = css({
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3",
  p: "6",
  border: "1px solid",
  borderColor: "line",
  borderRadius: "lg",
  bg: "paper",
});
const label = css({
  color: "muted",
  fontSize: "xs",
  fontWeight: "semibold",
  textTransform: "uppercase",
});
const button = cva({
  base: { px: "6", py: "2", borderRadius: "full", color: "white", fontWeight: "semibold" },
  variants: {
    active: {
      false: { bg: "brand", _hover: { bg: "brand-hover" } },
      true: { bg: "comparison.k700", _hover: { bg: "comparison.k850" } },
    },
  },
});

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const active = () => count() > 0;

  return (
    <div class={card}>
      <span class={label}>Panda CSS</span>
      <button
        class={button({ active: active() })}
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
