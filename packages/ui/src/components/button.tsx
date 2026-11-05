"use client";

import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn.ts";
import { Spinner } from "./spinner.tsx";

/**
 * BUTTON BEHAVIOR
 *  hover    background shifts one step (120ms)
 *  press    scales to 0.98
 *  focus    global 2px ring (keyboard only)
 *  disabled 50% opacity, no pointer events
 *  loading  spinner replaces the leading icon, width is kept, clicks are
 *           ignored, button stays focusable so keyboard users do not lose place
 */
export const buttonStyles = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap",
    "rounded-button font-medium",
    "motion-fast transition-[background-color,color,border-color,scale]",
    "active:scale-[0.98]",
    "data-[disabled]:pointer-events-none not-data-[loading]:data-[disabled]:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-fg hover:bg-primary-hover",
        secondary:
          "border border-border-strong bg-surface text-fg shadow-xs hover:bg-hover",
        ghost: "text-fg-muted hover:bg-hover hover:text-fg",
        danger: "bg-danger text-danger-fg hover:bg-danger-hover",
        link: "h-auto rounded-sm px-0 text-accent hover:text-accent-hover hover:underline",
      },
      size: {
        sm: "h-(--control-h-sm) px-3 text-sm",
        md: "h-(--control-h-md) px-4 text-base",
        lg: "h-(--control-h-lg) px-5 text-lg",
        icon: "size-(--control-h-md) p-0 text-base",
        "icon-sm": "size-(--control-h-sm) p-0 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends Omit<React.ComponentProps<typeof BaseButton>, "className">,
    VariantProps<typeof buttonStyles> {
  className?: string;
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cn(buttonStyles({ variant, size }), className)}
      disabled={disabled || loading}
      focusableWhenDisabled={loading}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <Spinner /> : null}
      {children}
    </BaseButton>
  );
}
