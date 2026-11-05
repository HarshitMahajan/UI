import * as React from "react";
import { cn } from "../lib/cn.ts";

/**
 * TABLE: row height follows density (--row-h), header is a quiet sunken band,
 * rows get the hover fill, selected rows get the selected fill via
 * data-selected. Sorting/filtering/pagination are NOT here yet (see roadmap).
 */
export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="overflow-x-auto rounded-card border border-border bg-surface shadow-xs">
      <table className={cn("w-full border-collapse text-base", className)} {...props} />
    </div>
  );
}

export function TableHead({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("bg-sunken", className)} {...props} />;
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={className} {...props} />;
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "border-b border-border last:border-b-0 motion-fast transition-colors",
        "hover:bg-hover data-[selected]:bg-selected",
        className,
      )}
      {...props}
    />
  );
}

export function TableHeaderCell({
  className,
  align = "left",
  ...props
}: React.ComponentProps<"th"> & { align?: "left" | "right" | "center" }) {
  return (
    <th
      className={cn(
        "type-label h-(--control-h-md) whitespace-nowrap border-b border-border px-4 font-medium",
        align === "left" && "text-left",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({
  className,
  align = "left",
  ...props
}: React.ComponentProps<"td"> & { align?: "left" | "right" | "center" }) {
  return (
    <td
      className={cn(
        "h-(--row-h) px-4 align-middle",
        align === "left" && "text-left",
        align === "right" && "text-right tabular-nums",
        align === "center" && "text-center",
        className,
      )}
      {...props}
    />
  );
}
