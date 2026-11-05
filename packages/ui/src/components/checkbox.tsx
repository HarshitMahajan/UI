"use client";

import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { Check, Minus } from "lucide-react";
import { cn } from "../lib/cn.ts";

type CheckboxProps = Omit<React.ComponentProps<typeof BaseCheckbox.Root>, "className"> & {
  className?: string;
};

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-xs border border-border-strong bg-surface",
        "motion-fast transition-colors hover:border-fg-subtle",
        "data-[checked]:border-primary data-[checked]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:bg-primary",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="flex text-primary-fg data-[unchecked]:hidden">
        {props.indeterminate ? <Minus className="size-3" /> : <Check className="size-3" />}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

/** Checkbox with a clickable label. */
export function CheckboxField({
  label,
  className,
  ...props
}: CheckboxProps & { label: string }) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2 text-base", className)}>
      <Checkbox {...props} />
      <span>{label}</span>
    </label>
  );
}

type SwitchProps = Omit<React.ComponentProps<typeof BaseSwitch.Root>, "className"> & {
  className?: string;
};

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-border-strong p-0.5",
        "motion-base transition-colors data-[checked]:bg-primary",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb className="block size-4 rounded-full bg-surface shadow-sm motion-base transition-transform data-[checked]:translate-x-4" />
    </BaseSwitch.Root>
  );
}
