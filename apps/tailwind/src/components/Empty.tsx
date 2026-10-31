import type { JSX } from "@solidjs/web";
export function Empty(props: { children: JSX.Element }) {
  return (
    <p class="border border-dashed border-line px-5 py-10 text-center text-sm text-muted">
      {props.children}
    </p>
  );
}
