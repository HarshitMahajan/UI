"use client";

import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cn } from "../lib/cn.ts";

/**
 * FIELD BEHAVIOR (shared by Input, Textarea and Select trigger)
 *  rest     white, 1px strong border, soft 1px shadow
 *  hover    border darkens
 *  focus    accent border + soft accent ring (no outline)
 *  invalid  danger border (set by FormField / Base UI Field)
 *  disabled sunken background, 50% opacity, not-allowed cursor
 */
export const fieldStyles = cn(
  "w-full min-w-0 rounded-control border border-border-strong bg-surface px-3 text-base text-fg shadow-xs",
  "motion-fast transition-[border-color,box-shadow]",
  "placeholder:text-fg-subtle hover:border-fg-subtle",
  "focus-visible:border-accent focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent-soft",
  "data-[invalid]:border-danger data-[invalid]:focus-visible:ring-danger-soft",
  "data-[disabled]:cursor-not-allowed data-[disabled]:bg-sunken data-[disabled]:opacity-50",
  "disabled:cursor-not-allowed disabled:bg-sunken disabled:opacity-50",
);

export function Input({
  className,
  ...props
}: Omit<React.ComponentProps<typeof BaseInput>, "className"> & { className?: string }) {
  return <BaseInput className={cn(fieldStyles, "h-(--control-h-md)", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(fieldStyles, "min-h-24 resize-y py-2 aria-[invalid=true]:border-danger", className)}
      {...props}
    />
  );
}
