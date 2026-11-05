"use client";

import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "../lib/cn.ts";

/**
 * TABS: underline style. A single indicator slides between tabs (180ms).
 * Keyboard: arrows move focus, Home/End jump, activation follows focus.
 */
export function Tabs({ className, ...props }: Omit<React.ComponentProps<typeof BaseTabs.Root>, "className"> & { className?: string }) {
  return <BaseTabs.Root className={cn("flex flex-col", className)} {...props} />;
}

export function TabsList({ className, children, ...props }: Omit<React.ComponentProps<typeof BaseTabs.List>, "className"> & { className?: string }) {
  return (
    <BaseTabs.List className={cn("relative flex gap-1 border-b border-border", className)} {...props}>
      {children}
      <BaseTabs.Indicator className="absolute bottom-0 left-(--active-tab-left) h-0.5 w-(--active-tab-width) bg-primary motion-base transition-[left,width]" />
    </BaseTabs.List>
  );
}

export function TabsTab({ className, ...props }: Omit<React.ComponentProps<typeof BaseTabs.Tab>, "className"> & { className?: string }) {
  return (
    <BaseTabs.Tab
      className={cn(
        "h-(--control-h-md) rounded-t-control px-3 text-base text-fg-muted motion-fast transition-colors",
        "hover:text-fg data-[active]:font-medium data-[active]:text-fg",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function TabsPanel({ className, ...props }: Omit<React.ComponentProps<typeof BaseTabs.Panel>, "className"> & { className?: string }) {
  return <BaseTabs.Panel className={cn("pt-4 outline-none", className)} {...props} />;
}
