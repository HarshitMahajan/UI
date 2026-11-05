"use client";

import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

/** Mount once at the root (done in app/layout.tsx). */
export const TooltipProvider = BaseTooltip.Provider;

/**
 * TOOLTIP: short, dark pill. 500ms open delay (set on the provider), scales in.
 * Use for icon-only buttons and truncated text. Never for essential information.
 *
 *   <Tooltip content="Collapse sidebar"><Button size="icon" variant="ghost" /></Tooltip>
 */
export function Tooltip({
  content,
  children,
  side = "top",
}: {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom" | "left" | "right";
}) {
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={6} className="z-50">
          <BaseTooltip.Popup className="anim-popup rounded-sm bg-primary px-2 py-1 text-xs font-medium text-primary-fg shadow-md">
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
