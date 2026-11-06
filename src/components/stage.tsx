"use client";

import { Moon, Sun } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/kit/button";

/** A surface for a live component, with its own light/dark switch that leaves the page alone. */
export function Stage({ className, children }: { className?: string; children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<"light" | "dark">();
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={cn("overflow-hidden rounded-lg border bg-background text-foreground", theme)}>
      <div className="flex justify-end border-b p-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Switch this preview between light and dark"
          onClick={() => setTheme(getComputedStyle(ref.current!).colorScheme === "dark" ? "light" : "dark")}
        >
          <Sun size={16} aria-hidden="true" className="hidden dark:block" />
          <Moon size={16} aria-hidden="true" className="dark:hidden" />
        </Button>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}
