import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn.ts";

/**
 * Status chip. Tone carries meaning, never decoration:
 *  neutral = default/draft, accent = in progress, success = done/paid,
 *  warning = needs attention, danger = failed/overdue, info = informational.
 */
const badgeStyles = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-badge px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      tone: {
        neutral: "bg-sunken text-fg-muted border border-border",
        accent: "bg-accent-soft text-accent-soft-fg",
        success: "bg-success-soft text-success-soft-fg",
        warning: "bg-warning-soft text-warning-soft-fg",
        danger: "bg-danger-soft text-danger-soft-fg",
        info: "bg-info-soft text-info-soft-fg",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeStyles> {
  /** show a small status dot before the label */
  dot?: boolean;
}

export function Badge({ className, tone, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeStyles({ tone }), className)} {...props}>
      {dot ? <span className="size-1.5 rounded-full bg-current" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
