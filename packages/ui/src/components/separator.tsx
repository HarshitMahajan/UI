"use client";

import * as React from "react";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cn } from "../lib/cn.ts";

/** Hairline divider. Horizontal by default; vertical fills the height of its flex parent. */
export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: Omit<React.ComponentProps<typeof BaseSeparator>, "className"> & { className?: string }) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch",
        className,
      )}
      {...props}
    />
  );
}
