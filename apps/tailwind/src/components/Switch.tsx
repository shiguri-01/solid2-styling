import { createUniqueId, omit } from "solid-js";
import type { JSX } from "@solidjs/web";
type SwitchProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "role" | "children"> & {
  label: string;
  description: string;
};
export function Switch(props: SwitchProps) {
  const id = createUniqueId();
  const rest = omit(props, "label", "description", "class");
  return (
    <label class="flex items-center justify-between gap-5 py-2">
      <span>
        <strong class="block font-medium">{props.label}</strong>
        <small id={id} class="mt-1 block text-xs text-muted">
          {props.description}
        </small>
      </span>
      <input
        {...rest}
        type="checkbox"
        role="switch"
        class={[
          "h-5 w-[34px] shrink-0 cursor-pointer appearance-none rounded-full border border-muted bg-control p-0.5 before:block before:size-[14px] before:rounded-full before:bg-muted checked:border-brand checked:bg-brand checked:before:translate-x-[14px] checked:before:bg-ground",
          props.class,
        ]}
        aria-describedby={`${id} ${props["aria-describedby"] ?? ""}`}
      />
    </label>
  );
}
