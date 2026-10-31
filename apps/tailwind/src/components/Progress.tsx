export function Progress(props: { value: number; label: string }) {
  return (
    <div
      class="h-1.5 overflow-hidden rounded-[3px] bg-line"
      role="progressbar"
      aria-label={props.label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={props.value}
    >
      <span
        class="block h-full w-(--progress) bg-brand transition-[width] duration-180 ease-[ease] motion-reduce:transition-none"
        style={{ "--progress": `${props.value}%` }}
      />
    </div>
  );
}
