"use client";

import { BookOpen, LayoutGrid, Moon, Palette, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { docs } from "@/docs";
import { cn } from "@/lib/utils";
import {
  Sidebar1,
  Sidebar1Brand,
  Sidebar1Content,
  Sidebar1Footer,
  Sidebar1Group,
  Sidebar1Header,
  Sidebar1Item,
  Sidebar1Search,
  Sidebar1Toggle,
} from "@/components/kit/sidebar-1";

const groups = ["Components", "Blocks"] as const;

function switchTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // Private windows can block storage; the switch still works for this page.
  }
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const [collapsed, setCollapsed] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => setDrawerOpen(false), [pathname]);
  React.useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const entries = Object.entries(docs);
  const matches = entries.filter(([, d]) => d.title.toLowerCase().includes(query.trim().toLowerCase()));
  const pages: Record<string, string> = { "/theming": "Make it yours", "/get-started": "Get started" };
  const current = pages[pathname] ?? entries.find(([slug]) => pathname === `/components/${slug}`)?.[1].title;

  return (
    <div className="flex h-dvh overflow-hidden">
      {drawerOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      ) : null}

      <Sidebar1
        collapsed={collapsed}
        className={cn(
          "z-40 max-md:fixed max-md:inset-y-0 max-md:start-0 max-md:w-72",
          !drawerOpen && "max-md:invisible",
        )}
      >
        <Sidebar1Header>
          <Link href="/" aria-label="UI Kit, all components" className="block rounded-lg">
            <Sidebar1Brand logo="K" title="UI Kit" subtitle="Component library" />
          </Link>
        </Sidebar1Header>
        <Sidebar1Content aria-label="Components">
          <Sidebar1Search
            placeholder="Search components"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Sidebar1Item render={<Link href="/" />} icon={<LayoutGrid />} active={pathname === "/"}>
            All components
          </Sidebar1Item>
          <Sidebar1Item render={<Link href="/get-started" />} icon={<BookOpen />} active={pathname === "/get-started"}>
            Get started
          </Sidebar1Item>
          <Sidebar1Item render={<Link href="/theming" />} icon={<Palette />} active={pathname === "/theming"}>
            Make it yours
          </Sidebar1Item>
          {groups.map((group) => {
            const items = matches.filter(([, d]) => d.group === group);
            if (!items.length) return null;
            return (
              <Sidebar1Group key={group} label={group}>
                {items.map(([slug, d]) => (
                  <Sidebar1Item
                    key={slug}
                    render={<Link href={`/components/${slug}`} />}
                    icon={<d.icon />}
                    active={pathname === `/components/${slug}`}
                  >
                    {d.title}
                  </Sidebar1Item>
                ))}
              </Sidebar1Group>
            );
          })}
          {matches.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">No components match that search.</p>
          ) : null}
        </Sidebar1Content>
        <Sidebar1Footer>
          <Sidebar1Item
            onClick={switchTheme}
            icon={
              <>
                <Sun className="hidden dark:block" />
                <Moon className="dark:hidden" />
              </>
            }
          >
            Switch theme
          </Sidebar1Item>
        </Sidebar1Footer>
      </Sidebar1>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-3">
          <div className="max-md:hidden">
            <Sidebar1Toggle collapsed={collapsed} onClick={() => setCollapsed((value) => !value)} />
          </div>
          <div className="md:hidden">
            <Sidebar1Toggle collapsed={!drawerOpen} onClick={() => setDrawerOpen((value) => !value)} />
          </div>
          <span className="truncate text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              UI Kit
            </Link>
            {current ? (
              <>
                <span className="mx-2">/</span>
                <span aria-current="page" className="font-medium text-foreground">
                  {current}
                </span>
              </>
            ) : null}
          </span>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-4 pt-8 pb-24 md:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
