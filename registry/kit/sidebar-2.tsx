"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";

import { cn } from "@/lib/utils";

export interface Sidebar2ItemProps extends useRender.ComponentProps<"button"> {
  icon?: React.ReactNode;
  active?: boolean;
}

export interface Sidebar2PersonProps {
  name: string;
  role?: string;
  avatar?: string;
  online?: boolean;
}

export interface Sidebar2UserProps {
  name: string;
  email?: string;
  avatar?: string;
}

function Sidebar2({ className, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside
      className={cn("flex h-full w-72 shrink-0 flex-col gap-1 overflow-y-auto border-e bg-sidebar p-3 text-foreground [scrollbar-width:none]", className)}
      {...props}
    />
  );
}

function Sidebar2Brand({ logo, title }: { logo: React.ReactNode; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-3 px-1">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground [&_svg]:size-5">
        {logo}
      </span>
      <span className="truncate text-base font-semibold">{title}</span>
    </div>
  );
}

/** One row. Renders a button, or pass render={<a href="..." />} to make it a link. */
function Sidebar2Item({
  icon,
  active = false,
  render,
  className,
  children,
  ...props
}: Sidebar2ItemProps) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        type: render ? undefined : "button",
        "aria-current": active ? "page" : undefined,
        className: cn(
          "flex h-9 w-full shrink-0 items-center gap-3 rounded-lg px-3 text-sm text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring/70 [&_svg]:size-4.5 [&_svg]:shrink-0",
          active && "bg-accent font-semibold",
          className,
        ),
        children: (
          <>
            {icon}
            {children}
          </>
        ),
      },
      props,
    ),
  });
}

function Sidebar2Section({ label, className, children, ...props }: React.ComponentProps<"section"> & { label: string }) {
  return (
    <section className={cn("mt-6 flex flex-col gap-1", className)} {...props}>
      <h3 className="mb-1 px-3 text-xs font-medium text-muted-foreground">{label}</h3>
      {children}
    </section>
  );
}

function Avatar({ name, src, online }: { name: string; src?: string; online?: boolean }) {
  return (
    <span className="relative size-8 shrink-0">
      {src ? (
        <img src={src} alt="" width={32} height={32} className="size-8 rounded-lg object-cover" />
      ) : (
        <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-lg bg-muted text-xs font-medium">
          {name.slice(0, 1)}
        </span>
      )}
      {online ? (
        <span className="absolute -end-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-sidebar bg-success">
          <span className="sr-only">Online</span>
        </span>
      ) : null}
    </span>
  );
}

/** A teammate: picture, name, and a short role on the right. */
function Sidebar2Person({ name, role, avatar, online }: Sidebar2PersonProps) {
  return (
    <div className="flex items-center gap-3 px-3 py-1 text-sm">
      <Avatar name={name} src={avatar} online={online} />
      <span className="min-w-0 flex-1 truncate">{name}</span>
      {role ? <span className="shrink-0 text-xs text-muted-foreground">{role}</span> : null}
    </div>
  );
}

/** The signed-in person, pinned to the bottom. */
function Sidebar2User({ name, email, avatar }: Sidebar2UserProps) {
  return (
    <div className="mt-auto flex items-center gap-3 px-3 pt-4 pb-1">
      <Avatar name={name} src={avatar} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{name}</span>
        {email ? <span className="block truncate text-xs text-muted-foreground">{email}</span> : null}
      </span>
    </div>
  );
}

export { Sidebar2, Sidebar2Brand, Sidebar2Item, Sidebar2Person, Sidebar2Section, Sidebar2User };
