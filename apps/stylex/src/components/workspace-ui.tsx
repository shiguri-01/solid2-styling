import { omit, createUniqueId } from "solid-js";
import { Dynamic, type JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "../tokens.stylex";
const s = stylex.create({
  control: {
    boxSizing: "border-box",
    minWidth: 0,
    maxWidth: "100%",
    minHeight: 40,
    lineHeight: "20px",
    paddingBlock: "9px",
    paddingInline: tokens.spaceMd,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tokens.control,
    borderRadius: tokens.radiusSm,
    backgroundColor: tokens.surface,
    color: tokens.text,
    font: "inherit",
    outlineColor: tokens.brand,
    outlineOffset: 3,
  },
  button: {
    cursor: { default: "pointer", ":disabled": "not-allowed" },
    opacity: { default: 1, ":disabled": 0.55 },
    backgroundColor: { default: tokens.surface, ":hover": tokens.surfaceHover },
  },
  primary: {
    backgroundColor: { default: tokens.primary, ":hover": tokens.primary },
    color: tokens.primaryInk,
    borderColor: tokens.primary,
  },
  card: {
    boxSizing: "border-box",
    minWidth: 0,
    padding: { default: 20, "@media (max-width:700px)": 16 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tokens.border,
    borderRadius: tokens.radiusMd,
    backgroundColor: tokens.surface,
  },
  plain: { borderWidth: 0 },
  roomy: { padding: { default: 24, "@media (max-width:700px)": 16 } },
  selected: { borderColor: tokens.brand, backgroundColor: tokens.surfaceSelected },
  badge: {
    display: "inline-block",
    width: "fit-content",
    paddingBlock: "2px",
    paddingInline: tokens.spaceSm,
    borderRadius: tokens.radiusSm,
    fontSize: "12px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tokens.border,
    whiteSpace: "nowrap",
    color: tokens.text,
  },
  success: {
    backgroundColor: `color-mix(in srgb, ${tokens.brand} 8%, transparent)`,
    color: tokens.brand,
  },
  warning: {
    backgroundColor: `color-mix(in srgb, ${tokens.warning} 8%, transparent)`,
    color: tokens.warning,
  },
  empty: {
    paddingBlock: 40,
    paddingInline: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: tokens.border,
    textAlign: "center",
    color: tokens.textMuted,
  },
  heading: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spaceLg,
    marginBottom: 28,
  },
  title: { marginBlock: 4, fontSize: "26px", fontWeight: 600, letterSpacing: "-.03em" },
  description: { color: tokens.textMuted, margin: 0 },
  kicker: { color: tokens.textMuted, fontSize: "12px", margin: 0 },
  progress: {
    height: 6,
    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: tokens.border,
  },
  fill: (value: number) => ({
    display: "block",
    height: "100%",
    width: `${value}%`,
    backgroundColor: tokens.brand,
  }),
  switchRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spaceLg,
  },
  switchLabel: { display: "block", fontWeight: 500 },
  switchDescription: { display: "block", color: tokens.textMuted, fontSize: "12px" },
  field: { width: "100%" },
  select: {
    width: "100%",
    appearance: "none",
    paddingRight: 36,
    backgroundImage: tokens.chevron,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    backgroundSize: "16px 16px",
  },
  switchChecked: {
    backgroundColor: tokens.brand,
    borderColor: tokens.brand,
    "::before": { transform: "translateX(14px)", backgroundColor: tokens.bg },
  },
  switchControl: {
    appearance: "none",
    boxSizing: "border-box",
    margin: 0,
    padding: 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tokens.textMuted,
    borderRadius: 10,
    backgroundColor: tokens.surface,
    "::before": {
      content: '""',
      display: "block",
      width: 14,
      height: 14,
      borderRadius: "50%",
      backgroundColor: tokens.textMuted,
    },
    width: 34,
    height: 20,
    flexShrink: 0,
    accentColor: tokens.brand,
    outlineColor: tokens.brand,
    outlineOffset: 3,
  },
});
export type XStyle = { xstyle?: stylex.StyleXStyles };
export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  XStyle & { variant?: "default" | "primary" };
export function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      {...omit(props, "xstyle", "variant", "class")}
      class={
        stylex.attrs(s.control, s.button, props.variant === "primary" && s.primary, props.xstyle)
          .class
      }
    />
  );
}
type ElementProps =
  | (JSX.HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "article" | "aside" })
  | (JSX.FormHTMLAttributes<HTMLFormElement> & { as: "form" });
export function Card(
  props: ElementProps &
    XStyle & { variant?: "outlined" | "plain"; spacing?: "default" | "roomy"; selected?: boolean },
) {
  return (
    <Dynamic
      component={props.as ?? "div"}
      {...omit(props, "as", "xstyle", "variant", "spacing", "selected", "class")}
      class={
        stylex.attrs(
          s.card,
          props.variant === "plain" && s.plain,
          props.spacing === "roomy" && s.roomy,
          props.selected && s.selected,
          props.xstyle,
        ).class
      }
    />
  );
}
export function TextInput(props: JSX.InputHTMLAttributes<HTMLInputElement> & XStyle) {
  return (
    <input
      {...omit(props, "xstyle", "class")}
      class={stylex.attrs(s.control, s.field, props.xstyle).class}
    />
  );
}
export function Select(props: JSX.SelectHTMLAttributes<HTMLSelectElement> & XStyle) {
  return (
    <select
      {...omit(props, "xstyle", "class")}
      class={stylex.attrs(s.control, s.field, s.select, props.xstyle).class}
    />
  );
}
export function Badge(props: { children: JSX.Element; tone?: "neutral" | "success" | "warning" }) {
  return (
    <span
      class={
        stylex.attrs(
          s.badge,
          props.tone === "success" && s.success,
          props.tone === "warning" && s.warning,
        ).class
      }
    >
      {props.children}
    </span>
  );
}
export function Empty(props: { children: JSX.Element }) {
  return <p class={stylex.attrs(s.empty).class}>{props.children}</p>;
}
export function PageHeading(props: { title: string; description: string; children?: JSX.Element }) {
  return (
    <header class={stylex.attrs(s.heading).class}>
      <div>
        <p class={stylex.attrs(s.kicker).class}>DESIGN ENGINEERING / Q4</p>
        <h1 class={stylex.attrs(s.title).class}>{props.title}</h1>
        <p class={stylex.attrs(s.description).class}>{props.description}</p>
      </div>
      {props.children}
    </header>
  );
}
export function Progress(props: { value: number; label: string }) {
  return (
    <div
      class={stylex.attrs(s.progress).class}
      role="progressbar"
      aria-label={props.label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={props.value}
    >
      <span {...stylex.attrs(s.fill(props.value))} />
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
    <label class={stylex.attrs(s.switchRow).class}>
      <span>
        <strong class={stylex.attrs(s.switchLabel).class}>{props.label}</strong>
        <small id={id} class={stylex.attrs(s.switchDescription).class}>
          {props.description}
        </small>
      </span>
      <input
        {...omit(props, "label", "description", "class")}
        type="checkbox"
        role="switch"
        class={stylex.attrs(s.switchControl, props.checked && s.switchChecked).class}
        aria-describedby={`${id} ${props["aria-describedby"] ?? ""}`}
      />
    </label>
  );
}
