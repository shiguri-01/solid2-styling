import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
export type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement>;
export function Select(props: SelectProps) {
  const rest = omit(props, "class");
  return (
    <select
      {...rest}
      class={[
        "comparison-select w-full min-h-10 min-w-0 rounded border border-line bg-control py-[9px] pl-3 pr-9 text-sm leading-5",
        props.class,
      ]}
    />
  );
}
