"use client";

import * as React from "react";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cn } from "../lib/cn.ts";

export function RadioGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof BaseRadioGroup>, "className"> & { className?: string }) {
  return <BaseRadioGroup className={cn("flex flex-col gap-2", className)} {...props} />;
}

/** A radio with its label. Must sit inside RadioGroup. */
export function RadioField({
  label,
  className,
  ...props
}: Omit<React.ComponentProps<typeof BaseRadio.Root>, "className"> & {
  label: string;
  className?: string;
}) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2 text-base", className)}>
      <BaseRadio.Root
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface",
          "motion-fast transition-colors hover:border-fg-subtle",
          "data-[checked]:border-primary data-[checked]:bg-primary",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        )}
        {...props}
      >
        <BaseRadio.Indicator className="size-1.5 rounded-full bg-primary-fg data-[unchecked]:hidden" />
      </BaseRadio.Root>
      <span>{label}</span>
    </label>
  );
}
