import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
export type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement>;
export function TextInput(props: TextInputProps) {
  const rest = omit(props, "class");
  return (
    <input
      {...rest}
      class={[
        "w-full min-h-10 min-w-0 rounded-4px border border-line bg-control px-3 py-[9px] text-sm leading-5 placeholder:text-muted aria-[invalid=true]:border-red-ink",
        props.class,
      ]}
    />
  );
}
