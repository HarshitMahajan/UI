import { Activity, Inbox, LayoutGrid, Settings } from "lucide-react";

import { Sidebar1, Sidebar1Brand, Sidebar1Content, Sidebar1Footer, Sidebar1Header, Sidebar1Item } from "@/components/kit/sidebar-1";

export function Sidebar1Rail() {
  return (
    <div className="flex h-80 w-full bg-background text-foreground">
      <Sidebar1 collapsed>
        <Sidebar1Header>
          <Sidebar1Brand logo="A" title="Acme Corp" />
        </Sidebar1Header>
        <Sidebar1Content aria-label="Main">
          <Sidebar1Item icon={<LayoutGrid />} active aria-label="Home">
            Home
          </Sidebar1Item>
          <Sidebar1Item icon={<Inbox />} badge={12} aria-label="Inbox, 12 new">
            Inbox
          </Sidebar1Item>
          <Sidebar1Item icon={<Activity />} aria-label="Analytics">
            Analytics
          </Sidebar1Item>
        </Sidebar1Content>
        <Sidebar1Footer>
          <Sidebar1Item icon={<Settings />} aria-label="Settings">
            Settings
          </Sidebar1Item>
        </Sidebar1Footer>
      </Sidebar1>
    </div>
  );
}
