import type { ReactNode } from "react";

export function ToolPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-gradient-to-b from-background via-background to-muted/40 text-foreground">
      {children}
    </div>
  );
}
