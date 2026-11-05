"use client";

import * as React from "react";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn.ts";

const avatarStyles = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-sunken font-medium text-fg-muted ring-1 ring-border",
  {
    variants: {
      size: { sm: "size-6 text-xs", md: "size-8 text-sm", lg: "size-10 text-base" },
    },
    defaultVariants: { size: "md" },
  },
);

/** Image with initials fallback: <Avatar src={url} name="Harshit Mahajan" /> */
export function Avatar({
  src,
  name,
  size,
  className,
}: { src?: string; name: string; className?: string } & VariantProps<typeof avatarStyles>) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <BaseAvatar.Root className={cn(avatarStyles({ size }), className)}>
      {src ? <BaseAvatar.Image src={src} alt={name} className="size-full object-cover" /> : null}
      <BaseAvatar.Fallback>{initials}</BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
