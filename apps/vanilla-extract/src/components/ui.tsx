import { createUniqueId, omit } from "solid-js";
import { Dynamic, type JSX } from "@solidjs/web";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as s from "./ui.css";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary";
};
export function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      {...omit(props, "variant", "class")}
      class={[s.button[props.variant ?? "default"], props.class]}
    />
  );
}
type CardElementProps =
  | (JSX.HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "article" | "aside" })
  | (JSX.FormHTMLAttributes<HTMLFormElement> & { as: "form" });
type CardProps = CardElementProps & {
  variant?: "outlined" | "plain";
  spacing?: "default" | "roomy";
  selected?: boolean;
};
export function Card(props: CardProps) {
  return (
    <Dynamic
      component={props.as ?? "div"}
      {...omit(props, "as", "variant", "spacing", "selected", "class")}
      class={[
        s.card,
        s.cardVariant[props.variant ?? "outlined"],
        s.cardSpacing[props.spacing ?? "default"],
        props.selected && s.selectedCard,
        props.class,
      ]}
    />
  );
}
export function Badge(props: { children: JSX.Element; tone?: "neutral" | "success" | "warning" }) {
  return <span class={s.badge[props.tone ?? "neutral"]}>{props.children}</span>;
}
export function Empty(props: { children: JSX.Element }) {
  return <p class={s.empty}>{props.children}</p>;
}
export type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement>;
export function TextInput(props: TextInputProps) {
  return <input {...omit(props, "class")} class={[s.control, s.field, props.class]} />;
}
export type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement>;
export function Select(props: SelectProps) {
  return <select {...omit(props, "class")} class={[s.control, s.select, props.class]} />;
}
export function PageHeading(props: { title: string; description: string; children?: JSX.Element }) {
  return (
    <header class={s.heading}>
      <div>
        <p class={s.kicker}>DESIGN ENGINEERING / Q4</p>
        <h1 class={s.title}>{props.title}</h1>
        <p class={s.description}>{props.description}</p>
      </div>
      <div>{props.children}</div>
    </header>
  );
}
export function Progress(props: { value: number; label: string }) {
  return (
    <div
      class={s.progress}
      role="progressbar"
      aria-label={props.label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={props.value}
    >
      <span
        class={s.progressFill}
        style={assignInlineVars({ [s.progressValue]: `${props.value}%` })}
      />
    </div>
  );
}
type SwitchProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "role" | "children"> & {
  label: string;
  description: string;
};
export function Switch(props: SwitchProps) {
  const id = createUniqueId();
  return (
    <label class={s.switchRow}>
      <span>
        <strong class={s.switchLabel}>{props.label}</strong>
        <small class={s.switchDescription} id={id}>
          {props.description}
        </small>
      </span>
      <input
        {...omit(props, "label", "description", "class")}
        type="checkbox"
        role="switch"
        class={[s.switchControl, props.class]}
        aria-describedby={`${id} ${props["aria-describedby"] ?? ""}`}
      />
    </label>
  );
}
