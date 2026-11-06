"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const statusVariants = cva(
  "inline-flex w-fit shrink-0 items-center overflow-hidden whitespace-nowrap rounded-md border font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-muted text-muted-foreground **:data-[slot=status-indicator]:bg-muted-foreground",
        success: "border-success/20 bg-success/10 text-success **:data-[slot=status-indicator]:bg-success",
        error: "border-danger/20 bg-danger/10 text-danger **:data-[slot=status-indicator]:bg-danger",
        warning: "border-warning/20 bg-warning/10 text-warning **:data-[slot=status-indicator]:bg-warning",
        info: "border-info/20 bg-info/10 text-info **:data-[slot=status-indicator]:bg-info",
      },
      size: {
        default: "gap-1.5 px-2.5 py-1 text-xs",
        sm: "gap-1 px-1.5 py-0.5 text-[11px]",
        lg: "gap-2 px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type StatusVariant = NonNullable<VariantProps<typeof statusVariants>["variant"]>;
export type StatusSize = NonNullable<VariantProps<typeof statusVariants>["size"]>;

export interface StatusProps extends VariantProps<typeof statusVariants>, useRender.ComponentProps<"div"> {}

export interface StatusIndicatorProps extends React.ComponentProps<"div"> {
  /** Set to false for a still dot, such as a state that isn't live. */
  pulse?: boolean;
}

/** Pass render={<a href="..." />} to show the badge as a link. */
function Status({ className, variant = "default", size = "default", render, ...props }: StatusProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      { "data-slot": "status", "data-variant": variant, className: cn(statusVariants({ variant, size }), className) } as React.ComponentProps<"div">,
      props,
    ),
  });
}

function StatusIndicator({ className, pulse = true, ...props }: StatusIndicatorProps) {
  return (
    <div
      data-slot="status-indicator"
      {...props}
      className={cn(
        "relative flex size-2 shrink-0 rounded-full",
        pulse && "before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-inherit motion-reduce:before:animate-none",
        "after:absolute after:inset-[2px] after:rounded-full after:bg-inherit",
        className,
      )}
    />
  );
}

function StatusLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="status-label" {...props} className={cn("leading-none", className)} />;
}

export { Status, StatusIndicator, StatusLabel, statusVariants };

export default Status;
