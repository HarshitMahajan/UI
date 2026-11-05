"use client";

import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cn } from "../lib/cn.ts";

/**
 * SLIDER BEHAVIOR
 *  one thumb for a value, two for a range (pass an array to value/defaultValue)
 *  thumb: white, hairline ring, grows slightly on hover/drag, global focus ring
 *  keyboard: arrows step, PageUp/PageDown big step, Home/End jump to ends
 */
export function Slider({
  className,
  ...props
}: Omit<React.ComponentProps<typeof BaseSlider.Root>, "className"> & { className?: string }) {
  const current = props.value ?? props.defaultValue;
  const thumbCount = Array.isArray(current) ? current.length : 1;

  return (
    <BaseSlider.Root className={cn("w-full", className)} {...props}>
      <BaseSlider.Control className="flex h-(--control-h-sm) w-full touch-none items-center select-none">
        <BaseSlider.Track className="h-1.5 w-full rounded-full bg-border-strong">
          <BaseSlider.Indicator className="rounded-full bg-primary" />
          {Array.from({ length: thumbCount }, (_, index) => (
            <BaseSlider.Thumb
              key={index}
              index={thumbCount > 1 ? index : undefined}
              className={cn(
                "size-4 rounded-full border border-border-strong bg-surface shadow-sm",
                "motion-fast transition-[scale] hover:scale-110 data-[dragging]:scale-110",
                "data-[disabled]:opacity-50",
              )}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
