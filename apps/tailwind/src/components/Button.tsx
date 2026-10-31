import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary";
};
export function Button(props: ButtonProps) {
  const rest = omit(props, "variant", "class");
  return (
    <button
      type="button"
      {...rest}
      class={[
        "min-h-10 rounded border border-line bg-paper px-3 py-[9px] text-sm leading-5 hover:bg-row-hover disabled:cursor-not-allowed disabled:opacity-55 data-[variant=primary]:bg-ink data-[variant=primary]:text-paper data-[variant=primary]:hover:bg-[color-mix(in_srgb,var(--color-ink)_85%,var(--color-paper))]",
        props.class,
      ]}
      data-variant={props.variant ?? "default"}
    />
  );
}
