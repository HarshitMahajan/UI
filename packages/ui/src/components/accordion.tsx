"use client";

import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn.ts";

export function Accordion({
  className,
  ...props
}: Omit<React.ComponentProps<typeof BaseAccordion.Root>, "className"> & { className?: string }) {
  return (
    <BaseAccordion.Root
      className={cn("divide-y divide-border rounded-card border border-border bg-surface", className)}
      {...props}
    />
  );
}

/** One row: <AccordionItem value="a" title="Shipping">...content...</AccordionItem> */
export function AccordionItem({
  title,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof BaseAccordion.Item>, "className" | "title"> & {
  title: string;
  className?: string;
}) {
  return (
    <BaseAccordion.Item className={className} {...props}>
      <BaseAccordion.Header>
        <BaseAccordion.Trigger
          className={cn(
            "group flex w-full items-center justify-between gap-4 px-(--card-p) py-3 text-left text-base font-medium",
            "motion-fast transition-colors hover:bg-hover",
          )}
        >
          {title}
          <ChevronDown className="size-4 text-fg-muted motion-base transition-transform group-data-[panel-open]:rotate-180" />
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel className="h-(--accordion-panel-height) overflow-hidden motion-base transition-[height] data-[ending-style]:h-0 data-[starting-style]:h-0">
        <div className="px-(--card-p) pb-(--card-p) text-base text-fg-muted">{children}</div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
}
