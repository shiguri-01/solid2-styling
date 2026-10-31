import { css, styled } from "@yak/solid";
import { createUniqueId, omit } from "solid-js";
import { Dynamic, type JSX } from "@solidjs/web";

const Control = css`
  box-sizing: border-box;
  min-width: 0;
  min-height: 2.5rem;
  padding: 9px 12px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--paper);
  color: var(--ink);
  font: inherit;
  line-height: 20px;
  &:focus-visible {
    outline: 2px solid var(--brand);
    outline-offset: 3px;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
  &[aria-invalid="true"] {
    border-color: var(--danger);
  }
`;
const ButtonRoot = styled.button<{ $primary?: boolean }>`
  ${Control};
  cursor: pointer;
  &:hover:not(:disabled) {
    background: var(--hover);
  }
  ${(p) =>
    p.$primary &&
    css`
      background: var(--ink);
      color: var(--paper);
      &:hover:not(:disabled) {
        background: color-mix(in srgb, var(--ink) 85%, var(--paper));
      }
    `}
`;
export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary";
};
export function Button(props: ButtonProps) {
  return (
    <ButtonRoot type="button" {...omit(props, "variant")} $primary={props.variant === "primary"} />
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
function CardElement(props: CardElementProps) {
  return <Dynamic component={props.as ?? "div"} {...omit(props, "as")} />;
}
const CardRoot = styled(CardElement)<{ $plain: boolean; $roomy: boolean; $selected: boolean }>`
  min-width: 0;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 1.25rem;
  background: var(--paper);
  ${(p) =>
    p.$plain &&
    css`
      border-width: 0;
    `}
  ${(p) =>
    p.$roomy &&
    css`
      padding: 1.5rem;
    `}
  ${(p) =>
    p.$selected &&
    css`
      border-color: var(--brand);
      background: var(--selected);
    `}
  @media (max-width: 700px) {
    padding: 16px;
  }
`;
export function Card(props: CardProps) {
  return (
    <CardRoot
      {...omit(props, "variant", "spacing", "selected")}
      $plain={props.variant === "plain"}
      $roomy={props.spacing === "roomy"}
      $selected={!!props.selected}
    />
  );
}
const BadgeRoot = styled.span<{ $tone: "neutral" | "success" | "warning" }>`
  display: inline-block;
  width: fit-content;
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 12px;
  white-space: nowrap;
  ${(p) =>
    p.$tone === "success" &&
    css`
      color: var(--brand);
      background: color-mix(in srgb, var(--brand) 8%, transparent);
    `}
  ${(p) =>
    p.$tone === "warning" &&
    css`
      color: var(--warning);
      background: color-mix(in srgb, var(--warning) 8%, transparent);
    `}
`;
export function Badge(props: { children: JSX.Element; tone?: "neutral" | "success" | "warning" }) {
  return <BadgeRoot $tone={props.tone ?? "neutral"}>{props.children}</BadgeRoot>;
}
export const TextInput = styled.input`
  ${Control} width: 100%;
  background: var(--control);
  &::placeholder {
    color: var(--muted);
  }
`;
export const Select = styled.select`
  ${Control} width: 100%;
  background-color: var(--control);
  appearance: none;
  padding-right: 36px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='m4.5 6.25 3.5 3.5 3.5-3.5' stroke='%237c8880' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px 16px;
  cursor: pointer;
`;
export const Empty = styled.p`
  padding: 40px 20px;
  border: 1px dashed var(--line);
  color: var(--muted);
  text-align: center;
`;
const HeadingRoot = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
`;
export const Heading = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
`;
export const Description = styled.p`
  margin: 0;
  color: var(--muted);
`;
const PageTitle = styled.h1`
  margin: 0.25rem 0;
  font-size: 26px;
  letter-spacing: -0.03em;
  font-weight: 600;
`;
const Kicker = styled.p`
  margin: 0;
  color: var(--muted);
  font-size: 0.75rem;
`;
export function PageHeading(props: { title: string; description: string; children?: JSX.Element }) {
  return (
    <HeadingRoot>
      <div>
        <Kicker>Design engineering / Q4</Kicker>
        <PageTitle>{props.title}</PageTitle>
        <Description>{props.description}</Description>
      </div>
      <div>{props.children}</div>
    </HeadingRoot>
  );
}
const ProgressRoot = styled.div`
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
  background: var(--line);
`;
const ProgressFill = styled.span<{ $value: number }>`
  display: block;
  height: 100%;
  width: ${(p) => p.$value}%;
  background: var(--brand);
`;
export function Progress(props: { value: number; label: string }) {
  return (
    <ProgressRoot
      role="progressbar"
      aria-label={props.label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={props.value}
    >
      <ProgressFill $value={props.value} />
    </ProgressRoot>
  );
}
const SwitchRow = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-block: 8px;
`;
const SwitchLabel = styled.strong`
  display: block;
  font-weight: 500;
`;
const SwitchDescription = styled.small`
  display: block;
  margin-top: 0.25rem;
  color: var(--muted);
`;
const SwitchControl = styled.input`
  appearance: none;
  width: 34px;
  height: 20px;
  margin: 0;
  flex-shrink: 0;
  border: 1px solid var(--muted);
  border-radius: 10px;
  padding: 2px;
  background: var(--control);
  cursor: pointer;
  &::before {
    content: "";
    display: block;
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 50%;
    background: var(--muted);
  }
  &:checked {
    background: var(--brand);
    border-color: var(--brand);
  }
  &:checked::before {
    transform: translateX(14px);
    background: var(--ground);
  }
  &:focus-visible {
    outline: 2px solid var(--brand);
    outline-offset: 3px;
  }
  @media (forced-colors: active) {
    appearance: auto;
    &::before {
      display: none;
    }
  }
`;
type SwitchProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "role" | "children"> & {
  label: string;
  description: string;
};
export function Switch(props: SwitchProps) {
  const id = createUniqueId();
  return (
    <SwitchRow>
      <span>
        <SwitchLabel>{props.label}</SwitchLabel>
        <SwitchDescription id={id}>{props.description}</SwitchDescription>
      </span>
      <SwitchControl
        {...omit(props, "label", "description")}
        type="checkbox"
        role="switch"
        aria-describedby={`${id} ${props["aria-describedby"] ?? ""}`}
      />
    </SwitchRow>
  );
}
