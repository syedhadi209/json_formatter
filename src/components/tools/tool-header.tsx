import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/theme-toggle";

type ToolHeaderProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  status: ReactNode;
};

export function ToolHeader({ icon, title, subtitle, status }: ToolHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Back to home"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            {icon}
          </div>
          <div className="min-w-0 leading-tight">
            <h1 className="truncate text-sm font-semibold tracking-tight sm:text-lg">
              {title}
            </h1>
            <p className="hidden truncate text-xs text-muted-foreground sm:block sm:text-sm">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden md:block">{status}</div>
          <ThemeToggle />
        </div>
      </div>
      <div className="border-t bg-background/60 px-3 py-1.5 md:hidden">{status}</div>
    </header>
  );
}
