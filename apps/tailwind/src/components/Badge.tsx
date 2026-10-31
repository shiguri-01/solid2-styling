import type { JSX } from "@solidjs/web";
export function Badge(props: { children: JSX.Element; tone?: "neutral" | "success" | "warning" }) {
  return (
    <span
      class="inline-flex w-fit whitespace-nowrap rounded border border-line px-2 py-0.5 text-xs text-ink data-[tone=success]:bg-success-tint data-[tone=success]:text-brand data-[tone=warning]:bg-warning-tint data-[tone=warning]:text-warning"
      data-tone={props.tone ?? "neutral"}
    >
      {props.children}
    </span>
  );
}
