"use client";

import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "../lib/cn.ts";
import { Button } from "./button.tsx";

/**
 * DIALOG BEHAVIOR
 *  backdrop fades (180ms), popup scales from 0.97 and fades (120ms)
 *  focus is trapped, Esc and backdrop click close, focus returns to trigger
 *  Title is required (it labels the dialog for screen readers)
 *
 *   <Dialog>
 *     <DialogTrigger render={<Button />}>Open</DialogTrigger>
 *     <DialogContent title="Delete order" description="This cannot be undone.">
 *       ...body...
 *       <DialogFooter>...</DialogFooter>
 *     </DialogContent>
 *   </Dialog>
 */
export const Dialog = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;

const sizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
} as const;

export function DialogContent({
  title,
  description,
  size = "md",
  className,
  children,
}: {
  title: string;
  description?: string;
  size?: keyof typeof sizes;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="anim-fade fixed inset-0 z-40 bg-overlay" />
      <BaseDialog.Popup
        className={cn(
          "anim-popup fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
          "rounded-popover border border-border bg-surface-raised shadow-lg outline-none",
          sizes[size],
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 px-(--card-p) pt-(--card-p)">
          <div>
            <BaseDialog.Title className="text-lg font-medium">{title}</BaseDialog.Title>
            {description ? (
              <BaseDialog.Description className="mt-0.5 text-sm text-fg-muted">
                {description}
              </BaseDialog.Description>
            ) : null}
          </div>
          <BaseDialog.Close render={<Button variant="ghost" size="icon-sm" aria-label="Close" />}>
            <X className="size-4" />
          </BaseDialog.Close>
        </div>
        <div className="px-(--card-p) py-4">{children}</div>
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mt-2 flex items-center justify-end gap-2", className)} {...props} />;
}
