"use client";

import {
  Activity,
  Blocks,
  Calendar,
  CreditCard,
  FolderKanban,
  Globe,
  Inbox,
  LayoutGrid,
  LogOut,
  Settings,
  Terminal,
  Users,
} from "lucide-react";
import { useState } from "react";

import {
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
} from "@/components/kit/sidebar-1";

export function Sidebar1Demo() {
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState("Home");
  const item = (name: string, icon: React.ReactNode, badge?: number) => (
    <Sidebar1Item icon={icon} badge={badge} active={page === name} onClick={() => setPage(name)}>
      {name}
    </Sidebar1Item>
  );
  const subItem = (name: string) => (
    <Sidebar1Item active={page === name} onClick={() => setPage(name)}>
      {name}
    </Sidebar1Item>
  );

  return (
    <div className="flex h-180 w-full bg-background text-foreground">
      <Sidebar1 collapsed={collapsed}>
        <Sidebar1Header>
          <Sidebar1Brand logo="A" title="Acme Corp" subtitle="Pro Plan" onClick={() => setPage("Home")} />
        </Sidebar1Header>
        <Sidebar1Content aria-label="Main">
          <Sidebar1Search />
          {item("Home", <LayoutGrid />)}
          {item("Inbox", <Inbox />, 12)}
          {item("Analytics", <Activity />)}
          <Sidebar1Group label="Workspace">
            <Sidebar1Collapsible icon={<FolderKanban />} label="Projects">
              {subItem("Active")}
              {subItem("Archived")}
            </Sidebar1Collapsible>
            {item("Calendar", <Calendar />)}
            <Sidebar1Collapsible icon={<Users />} label="Team">
              {subItem("Members")}
              {subItem("Roles")}
            </Sidebar1Collapsible>
            <Sidebar1Collapsible icon={<Globe />} label="Customers">
              {subItem("Accounts")}
              {subItem("Invoices")}
            </Sidebar1Collapsible>
            {item("Finance", <CreditCard />)}
          </Sidebar1Group>
          <Sidebar1Group label="Developers">
            {item("API Keys", <Terminal />)}
            {item("Webhooks", <Blocks />)}
          </Sidebar1Group>
        </Sidebar1Content>
        <Sidebar1Footer>
          {item("Settings", <Settings />)}
          <Sidebar1Item icon={<LogOut />}>Log out</Sidebar1Item>
        </Sidebar1Footer>
      </Sidebar1>

      <div className="flex min-w-0 flex-1 flex-col max-sm:hidden">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-3">
          <Sidebar1Toggle collapsed={collapsed} onClick={() => setCollapsed((value) => !value)} />
          <span className="truncate text-sm text-muted-foreground">
            Acme Corp <span className="mx-1">/</span> <span className="font-medium text-foreground">{page}</span>
          </span>
        </header>
        <div className="flex flex-1 flex-col gap-5 overflow-hidden p-6" aria-hidden="true">
          <div className="h-8 w-48 rounded-lg bg-muted" />
          <div className="grid h-32 shrink-0 grid-cols-2 gap-5">
            <div className="rounded-xl border bg-card" />
            <div className="rounded-xl border bg-card" />
          </div>
          <div className="flex flex-1 flex-col gap-3 rounded-xl border bg-card p-5">
            <div className="h-5 w-40 rounded-md bg-muted" />
            <div className="h-11 rounded-lg bg-muted" />
            <div className="h-11 rounded-lg bg-muted" />
            <div className="h-11 rounded-lg bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
