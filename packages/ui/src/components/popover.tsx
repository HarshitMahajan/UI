"use client";

import * as React from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { cn } from "../lib/cn.ts";

export const Popover = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverClose = BasePopover.Close;

/**
 * POPOVER: floating panel anchored to a trigger. Scales in (120ms), closes on
 * Esc or outside click, returns focus to the trigger. Use for filters, pickers
 * and small forms. For a list of actions use Menu instead.
 */
export function PopoverContent({
  side = "bottom",
  align = "start",
  className,
  children,
}: {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner side={side} align={align} sideOffset={6} className="z-50 outline-none">
        <BasePopover.Popup
          className={cn(
            "anim-popup w-72 rounded-popover border border-border bg-surface-raised p-(--card-p) shadow-md outline-none",
            className,
          )}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export function PopoverTitle({ className, ...props }: React.ComponentProps<typeof BasePopover.Title>) {
  return <BasePopover.Title className={cn("text-base font-medium", className as string)} {...props} />;
}
