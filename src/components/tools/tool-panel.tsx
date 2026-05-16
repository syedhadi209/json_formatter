import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { formatBytes } from "@/lib/format/text-stats";

export type ToolPanelStats = {
  chars: number;
  lines: number;
  bytes: number;
};

type ToolPanelProps = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  stats: ToolPanelStats;
  tone: "ok" | "error" | "muted";
  children: ReactNode;
  className?: string;
};

export function ToolPanel({
  title,
  subtitle,
  icon,
  stats,
  tone,
  children,
  className,
}: ToolPanelProps) {
  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-colors",
        tone === "error" && "border-destructive/40",
        tone === "ok" && "border-emerald-500/20",
        className
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b bg-background/60 px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            {icon}
          </span>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-medium">{title}</div>
            <div className="truncate text-[11px] text-muted-foreground">{subtitle}</div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-muted-foreground sm:gap-3">
          <span>{stats.lines} ln</span>
          <span>{stats.chars} ch</span>
          <span>{formatBytes(stats.bytes)}</span>
        </div>
      </header>
      {children}
    </section>
  );
}

export const toolPanelBodyClassName =
  "relative flex h-[50vh] min-h-[260px] overflow-hidden rounded-b-xl bg-muted/30 sm:h-[55vh] sm:min-h-[340px] lg:h-[60vh] lg:min-h-[420px]";

export const toolPanelScrollBodyClassName =
  "relative flex h-[50vh] min-h-[260px] overflow-auto rounded-b-xl bg-muted/30 sm:h-[55vh] sm:min-h-[340px] lg:h-[60vh] lg:min-h-[420px]";
