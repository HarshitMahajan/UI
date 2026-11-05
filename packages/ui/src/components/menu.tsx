"use client";

import * as React from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Check } from "lucide-react";
import { cn } from "../lib/cn.ts";

export const Menu = BaseMenu.Root;
export const MenuTrigger = BaseMenu.Trigger;

/**
 * MENU BEHAVIOR (dropdown of actions)
 *  opens below trigger, arrows move highlight, Enter activates, Esc closes
 *  type-ahead jumps to items, highlighted item gets the hover fill
 */
export function MenuContent({
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
    <BaseMenu.Portal>
      <BaseMenu.Positioner side={side} align={align} sideOffset={6} className="z-50 outline-none">
        <BaseMenu.Popup
          className={cn(
            "anim-popup min-w-48 rounded-popover border border-border bg-surface-raised p-1 shadow-md outline-none",
            className,
          )}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

const itemStyles =
  "flex min-h-(--control-h-sm) cursor-default select-none items-center gap-2 rounded-sm px-2 text-base outline-none data-[highlighted]:bg-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

export function MenuItem({
  className,
  tone = "default",
  ...props
}: Omit<React.ComponentProps<typeof BaseMenu.Item>, "className"> & {
  className?: string;
  tone?: "default" | "danger";
}) {
  return (
    <BaseMenu.Item
      className={cn(itemStyles, tone === "danger" && "text-danger-soft-fg", className)}
      {...props}
    />
  );
}

export function MenuCheckboxItem({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof BaseMenu.CheckboxItem>, "className"> & { className?: string }) {
  return (
    <BaseMenu.CheckboxItem className={cn(itemStyles, "justify-between", className)} {...props}>
      <span>{children}</span>
      <BaseMenu.CheckboxItemIndicator className="flex text-accent">
        <Check className="size-4" />
      </BaseMenu.CheckboxItemIndicator>
    </BaseMenu.CheckboxItem>
  );
}

export function MenuSeparator({ className }: { className?: string }) {
  return <BaseMenu.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} />;
}

export function MenuLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("type-label px-2 py-1", className)} {...props} />;
}
