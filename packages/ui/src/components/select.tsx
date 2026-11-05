"use client";

import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../lib/cn.ts";
import { fieldStyles } from "./input.tsx";

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * SELECT BEHAVIOR
 *  trigger looks and focuses exactly like Input
 *  popup opens 6px below, matches trigger width, scales in (120ms)
 *  highlighted item gets the hover fill, selected item shows a check
 *  keyboard: arrows move, type-ahead jumps, Enter selects, Esc closes
 */
export function Select({
  options,
  placeholder = "Select...",
  className,
  ...props
}: {
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}) {
  return (
    <BaseSelect.Root items={options} {...props}>
      <BaseSelect.Trigger
        className={cn(
          fieldStyles,
          "inline-flex h-(--control-h-md) items-center justify-between gap-2 text-left",
          "data-[popup-open]:border-accent",
          className,
        )}
      >
        <BaseSelect.Value placeholder={placeholder} className="truncate data-[placeholder]:text-fg-subtle" />
        <BaseSelect.Icon className="flex text-fg-muted">
          <ChevronDown className="size-4" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={6} alignItemWithTrigger={false} className="z-50 outline-none">
          <BaseSelect.Popup className="anim-popup min-w-(--anchor-width) rounded-popover border border-border bg-surface-raised p-1 shadow-md outline-none">
            <BaseSelect.List className="outline-none">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  className="flex min-h-(--control-h-sm) cursor-default select-none items-center justify-between gap-3 rounded-sm px-2 text-base outline-none data-[highlighted]:bg-hover data-[selected]:font-medium"
                >
                  <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator className="flex text-accent">
                    <Check className="size-4" />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
