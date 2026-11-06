"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { Input } from "@base-ui/react/input";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/kit/button";

const CollapsedContext = React.createContext(false);

const rowStyles =
  "flex h-10 w-full shrink-0 items-center gap-3 overflow-hidden whitespace-nowrap rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring/70 [&_svg]:size-5 [&_svg]:shrink-0";

export interface Sidebar1Props extends React.ComponentProps<"aside"> {
  collapsed?: boolean;
}

export interface Sidebar1ItemProps extends useRender.ComponentProps<"button"> {
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
}

export interface Sidebar1CollapsibleProps {
  icon?: React.ReactNode;
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

/** The sidebar frame. When collapsed it shrinks to a rail that shows only icons. */
function Sidebar1({ collapsed = false, className, children, ...props }: Sidebar1Props) {
  return (
    <CollapsedContext.Provider value={collapsed}>
      <aside
        data-collapsed={collapsed}
        className={cn(
          "flex h-full shrink-0 flex-col overflow-hidden border-e bg-sidebar text-foreground transition-[width] duration-200 ease-out",
          collapsed ? "w-15" : "w-72",
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </CollapsedContext.Provider>
  );
}

/** The button that collapses and expands the sidebar. It usually sits in the page header. */
function Sidebar1Toggle({ collapsed, ...props }: ButtonProps & { collapsed: boolean }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-expanded={!collapsed}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      {...props}
    >
      {collapsed ? <PanelLeftOpen size={18} aria-hidden="true" /> : <PanelLeftClose size={18} aria-hidden="true" />}
    </Button>
  );
}

/** Logo, name and a line under it. Pass onClick to make it a switcher with a chevron. */
function Sidebar1Brand({
  logo,
  title,
  subtitle,
  onClick,
}: {
  logo: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      {...(onClick ? { type: "button" as const, onClick } : {})}
      className={cn(
        "flex w-full shrink-0 items-center gap-3 overflow-hidden rounded-lg p-1 text-start whitespace-nowrap",
        onClick && "transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring/70",
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
        {logo}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{title}</span>
        {subtitle ? <span className="block truncate text-xs text-muted-foreground">{subtitle}</span> : null}
      </span>
      {onClick ? <ChevronDown className="me-2 shrink-0 text-muted-foreground" size={16} aria-hidden="true" /> : null}
    </Comp>
  );
}

function Sidebar1Header({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("shrink-0 px-2 pt-3 pb-2", className)} {...props} />;
}

function Sidebar1Content({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav className={cn("flex min-h-0 flex-1 flex-col gap-0.5 overflow-x-hidden overflow-y-auto p-2 [scrollbar-width:none]", className)} {...props} />;
}

function Sidebar1Footer({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex shrink-0 flex-col gap-0.5 border-t p-2", className)} {...props} />;
}

/** A labeled set of items. The label fades out when the sidebar collapses. */
function Sidebar1Group({ label, className, children, ...props }: React.ComponentProps<"div"> & { label: string }) {
  const collapsed = React.useContext(CollapsedContext);
  return (
    <div className={cn("mt-4 flex flex-col gap-0.5", className)} {...props}>
      <div
        className={cn(
          "px-3 pb-1 text-xs font-medium tracking-wider whitespace-nowrap text-muted-foreground/70 uppercase transition-opacity",
          collapsed && "opacity-0",
        )}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

/** A filter field styled as a row. */
function Sidebar1Search({ className, placeholder = "Search", ...props }: Omit<Input.Props, "className"> & { className?: string }) {
  return (
    <label className={cn(rowStyles, "cursor-text focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-ring/70", className)}>
      <Search aria-hidden="true" />
      <Input
        type="search"
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
        {...props}
      />
    </label>
  );
}

/** One row. Renders a button, or pass render={<a href="..." />} to make it a link. */
function Sidebar1Item({
  icon,
  active = false,
  badge,
  render,
  className,
  children,
  ...props
}: Sidebar1ItemProps) {
  const collapsed = React.useContext(CollapsedContext);
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        type: render ? undefined : "button",
        "aria-current": active ? "page" : undefined,
        className: cn(rowStyles, active && "bg-accent font-medium text-foreground", className),
        children: (
          <>
            {icon}
            {children}
            {badge !== undefined && !collapsed ? (
              <span className="ms-auto flex size-6 shrink-0 items-center justify-center rounded-md bg-accent text-xs font-medium text-foreground">
                {badge}
              </span>
            ) : null}
          </>
        ),
      },
      props,
    ),
  });
}

/** A row that opens to show sub-items. It closes while the sidebar is collapsed. */
function Sidebar1Collapsible({ icon, label, defaultOpen = false, children }: Sidebar1CollapsibleProps) {
  const collapsed = React.useContext(CollapsedContext);
  const [open, setOpen] = React.useState(defaultOpen);
  const shown = open && !collapsed;

  return (
    <Collapsible.Root open={shown} onOpenChange={(next) => !collapsed && setOpen(next)}>
      <Collapsible.Trigger className={rowStyles}>
        {icon}
        {label}
        <ChevronRight className={cn("ms-auto transition-transform duration-200", shown && "rotate-90")} aria-hidden="true" />
      </Collapsible.Trigger>
      <Collapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
        <div className="flex flex-col gap-0.5 ps-8">{children}</div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

export {
  Sidebar1,
  Sidebar1Brand,
  Sidebar1Collapsible,
  Sidebar1Content,
  Sidebar1Footer,
  Sidebar1Group,
  Sidebar1Header,
  Sidebar1Item,
  Sidebar1Search,
  Sidebar1Toggle,
};
