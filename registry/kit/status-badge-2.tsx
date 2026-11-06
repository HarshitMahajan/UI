import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const statusBadge2Variants = cva(
  "inline-flex w-fit items-center whitespace-nowrap rounded-lg border bg-card [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default: "h-9 gap-3 px-3 text-sm [&_svg]:size-4.5",
        sm: "h-7 gap-2 px-2 text-xs [&_svg]:size-3.5",
      },
    },
    defaultVariants: { size: "default" },
  },
);

export interface StatusBadge2Props extends React.ComponentProps<"div">, VariantProps<typeof statusBadge2Variants> {}

/** Two related facts side by side: a main state on the left, a secondary one on the right. */
function StatusBadge2({ className, size, ...props }: StatusBadge2Props) {
  return <div className={cn(statusBadge2Variants({ size }), className)} {...props} />;
}

function StatusBadge2Primary({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center gap-[0.5em] font-medium text-foreground", className)} {...props} />;
}

function StatusBadge2Secondary({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-[0.5em] border-s ps-[0.75em] text-muted-foreground", className)} {...props} />
  );
}

export { StatusBadge2, StatusBadge2Primary, StatusBadge2Secondary };
