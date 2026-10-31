import { css } from "../../styled-system/css";
export function Progress(props: { value: number; label: string }) {
  return (
    <div
      class={css({ height: "1.5", bg: "progress", rounded: "full", overflow: "hidden" })}
      role="progressbar"
      aria-label={props.label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={props.value}
    >
      <span
        class={css({ display: "block", height: "full", bg: "brand", width: "var(--progress)" })}
        style={{ "--progress": `${props.value}%` }}
      />
    </div>
  );
}
