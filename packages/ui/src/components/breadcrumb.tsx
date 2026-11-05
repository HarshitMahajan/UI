import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/cn.ts";

export interface BreadcrumbEntry {
  label: string;
  /** a router link element for non-final entries, e.g. <Link href="/orders" /> */
  render?: React.ReactElement<{ className?: string; children?: React.ReactNode }>;
  href?: string;
}

/** Trail of ancestors. The last entry is the current page and is not a link. */
export function Breadcrumb({ items, className }: { items: BreadcrumbEntry[]; className?: string }) {
  const linkStyles = "rounded-sm text-fg-muted motion-fast transition-colors hover:text-fg";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-medium text-fg">
                  {item.label}
                </span>
              ) : item.render ? (
                React.cloneElement(item.render, { className: cn(linkStyles) }, item.label)
              ) : (
                <a href={item.href} className={linkStyles}>
                  {item.label}
                </a>
              )}
              {last ? null : <ChevronRight className="size-3.5 text-fg-subtle" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
