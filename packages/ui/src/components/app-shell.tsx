"use client";

import * as React from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "../lib/cn.ts";
import { Button } from "./button.tsx";
import { Tooltip } from "./tooltip.tsx";

/**
 * APP SHELL: left sidebar + (top bar, scrolling content).
 *
 *  sidebar  one step darker than the page, hairline right border, collapses to
 *           an icon rail (280ms). Navigation on top, account pinned at bottom.
 *  top bar  no background or border; holds page-level actions on the right.
 *  content  scrolls independently of the sidebar.
 *
 * Every authenticated route renders inside this. Do not build another layout.
 * The library has no router dependency: pass your framework's Link via `render`
 * on SidebarItem and compute `active` in the app.
 */
export function AppShell({
  sidebar,
  sidebarFooter,
  topbar,
  children,
  defaultCollapsed = false,
}: {
  sidebar: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  topbar?: React.ReactNode;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <div className="flex h-dvh overflow-hidden bg-canvas">
      <aside
        data-collapsed={collapsed || undefined}
        className={cn(
          "group/sidebar flex shrink-0 flex-col border-r border-border bg-sidebar",
          "w-(--sidebar-w) motion-slow transition-[width] data-[collapsed]:w-(--sidebar-w-collapsed)",
        )}
      >
        <div className="flex h-(--topbar-h) items-center px-3">
          <Tooltip content={collapsed ? "Expand sidebar" : "Collapse sidebar"} side="right">
            <Button
              variant="ghost"
              size="icon"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed((c) => !c)}
            >
              <PanelLeft className="size-4" />
            </Button>
          </Tooltip>
        </div>
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-3">{sidebar}</nav>
        {sidebarFooter ? <div className="border-t border-border p-3">{sidebarFooter}</div> : null}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-(--topbar-h) shrink-0 items-center justify-end gap-2 px-(--page-px)">
          {topbar}
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

/** A labelled group of nav items ("Operations", "System", ...). */
export function SidebarSection({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5 not-first:mt-5">
      {label ? (
        <div className="type-label px-2.5 pb-1 group-data-[collapsed]/sidebar:hidden">{label}</div>
      ) : null}
      {children}
    </div>
  );
}

/**
 * One navigation row. Active = soft filled rounded rectangle, nothing else
 * (no accent bar, no color change).
 *
 *   <SidebarItem render={<Link href="/orders" />} active={pathname === "/orders"} icon={<FileText />}>
 *     Orders
 *   </SidebarItem>
 */
export function SidebarItem({
  render,
  href,
  active = false,
  icon,
  children,
}: {
  /** a router link element, e.g. <Link href="/orders" />. Falls back to <a href>. */
  render?: React.ReactElement<{ className?: string; children?: React.ReactNode }>;
  href?: string;
  active?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const className = cn(
    "flex h-(--control-h-md) items-center gap-2.5 rounded-control px-2.5 text-base text-fg-muted",
    "motion-fast transition-colors hover:bg-hover hover:text-fg",
    "data-[active]:bg-selected data-[active]:font-medium data-[active]:text-fg",
  );
  const content = (
    <>
      {icon ? <span className="flex shrink-0 [&>svg]:size-4">{icon}</span> : null}
      <span className="truncate group-data-[collapsed]/sidebar:hidden">{children}</span>
    </>
  );
  const common = {
    className,
    "data-active": active || undefined,
    "aria-current": active ? ("page" as const) : undefined,
  };

  return render ? React.cloneElement(render, common, content) : (
    <a href={href} {...common}>
      {content}
    </a>
  );
}

/**
 * Page: centered column with max width. Use width="wide" for tables and boards,
 * width="full" for canvases. Always the direct child of the shell.
 */
export function Page({
  width = "default",
  className,
  children,
}: {
  width?: "default" | "wide" | "full";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-(--page-px) pb-16",
        width === "default" && "max-w-(--content-max)",
        width === "wide" && "max-w-(--content-max-wide)",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Serif title, optional description, actions on the right. */
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex items-end justify-between gap-6 pb-(--section-gap) pt-2">
      <div className="min-w-0">
        <h1 className="type-display text-fg">{title}</h1>
        {description ? <p className="mt-1 text-base text-fg-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}

/** Vertical rhythm between page sections. */
export function Section({
  title,
  actions,
  children,
}: {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="not-first:mt-(--section-gap)">
      {title || actions ? (
        <div className="mb-3 flex items-center justify-between gap-4">
          {title ? <h2 className="text-lg font-medium">{title}</h2> : <span />}
          {actions}
        </div>
      ) : null}
      {children}
    </section>
  );
}
