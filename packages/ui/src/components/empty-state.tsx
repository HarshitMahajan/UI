import * as React from "react";
import { cn } from "../lib/cn.ts";
import { Card } from "./card.tsx";

/**
 * EMPTY STATE: dashed border, centered icon, one line of text, optional action.
 * Every list, table and panel that can be empty MUST render this, never blank space.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      variant="dashed"
      className={cn("flex flex-col items-center justify-center gap-2 px-6 py-12 text-center", className)}
    >
      {icon ? <div className="text-fg-subtle [&>svg]:size-6">{icon}</div> : null}
      <div className="text-base font-medium text-fg-muted">{title}</div>
      {description ? <p className="max-w-sm text-sm text-fg-subtle">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </Card>
  );
}
