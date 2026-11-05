import * as React from "react";
import { cn } from "../lib/cn.ts";

/**
 * CARD: the one container. Large radius, hairline border, almost no shadow.
 * Compose with CardHeader / CardBody / CardFooter. Never build a custom box.
 * Use `variant="inset"` for a quieter nested panel (Granola's inner event area).
 */
export function Card({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: "default" | "inset" | "dashed" }) {
  return (
    <div
      className={cn(
        "rounded-card border",
        variant === "default" && "border-border bg-surface shadow-xs",
        variant === "inset" && "border-border bg-sunken",
        variant === "dashed" && "border-dashed border-border-strong bg-transparent",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-start justify-between gap-4 px-(--card-p) pt-(--card-p)", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("text-lg font-medium text-fg", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("mt-0.5 text-sm text-fg-muted", className)} {...props} />;
}

export function CardBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-(--card-p) not-first:pt-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 border-t border-border px-(--card-p) py-3",
        className,
      )}
      {...props}
    />
  );
}

/** Big-number tile for dashboards. */
export function Stat({
  label,
  value,
  hint,
  className,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("p-(--card-p)", className)}>
      <div className="type-label">{label}</div>
      <div className="mt-1 text-2xl font-medium tracking-tight">{value}</div>
      {hint ? <div className="mt-1 text-sm text-fg-muted">{hint}</div> : null}
    </Card>
  );
}
