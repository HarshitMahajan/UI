"use client";

import * as React from "react";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cn } from "../lib/cn.ts";

const tones = {
  primary: "bg-primary",
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
} as const;

/** Linear progress. Omit `value` (null) for an indeterminate state. */
export function Progress({
  className,
  tone = "primary",
  ...props
}: Omit<React.ComponentProps<typeof BaseProgress.Root>, "className"> & {
  className?: string;
  tone?: keyof typeof tones;
}) {
  return (
    <BaseProgress.Root className={cn("w-full", className)} {...props}>
      <BaseProgress.Track className="h-1.5 w-full overflow-hidden rounded-full bg-border">
        <BaseProgress.Indicator
          className={cn("h-full rounded-full motion-slow transition-[width]", tones[tone])}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
