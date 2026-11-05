import * as React from "react";
import { cn } from "../lib/cn.ts";

/** Loading placeholder. Size it with layout classes (h-4 w-40). Use instead of spinners for content. */
export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-control bg-border", className)}
      {...props}
    />
  );
}
