export function ToolStatusPill({
  ok,
  empty,
  emptyLabel = "Awaiting input",
  okLabel = "Valid",
  errorLabel = "Invalid",
}: {
  ok: boolean;
  empty: boolean;
  emptyLabel?: string;
  okLabel?: string;
  errorLabel?: string;
}) {
  if (empty) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground">
        <span className="size-1.5 rounded-full bg-muted-foreground/60" />
        {emptyLabel}
      </span>
    );
  }
  if (ok) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        {okLabel}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
      <span className="size-1.5 rounded-full bg-destructive" />
      {errorLabel}
    </span>
  );
}
