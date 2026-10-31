import type { JSX } from "@solidjs/web";
export function PageHeading(props: { title: string; description: string; children?: JSX.Element }) {
  return (
    <header class="mb-7 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-xs text-muted">DESIGN ENGINEERING / Q4</p>
        <h1 class="my-1 text-[26px] font-semibold tracking-[-0.03em]">{props.title}</h1>
        <p class="text-muted">{props.description}</p>
      </div>
      <div>{props.children}</div>
    </header>
  );
}
