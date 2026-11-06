import { FolderKanban, Users } from "lucide-react";

import { Sidebar1, Sidebar1Collapsible, Sidebar1Content, Sidebar1Item } from "@/components/kit/sidebar-1";

export function Sidebar1Nested() {
  return (
    <div className="flex h-80 w-full bg-background text-foreground">
      <Sidebar1>
        <Sidebar1Content aria-label="Main">
          <Sidebar1Collapsible icon={<FolderKanban />} label="Projects" defaultOpen>
            <Sidebar1Item active>Active</Sidebar1Item>
            <Sidebar1Item>Archived</Sidebar1Item>
          </Sidebar1Collapsible>
          <Sidebar1Collapsible icon={<Users />} label="Team">
            <Sidebar1Item>Members</Sidebar1Item>
            <Sidebar1Item>Roles</Sidebar1Item>
          </Sidebar1Collapsible>
        </Sidebar1Content>
      </Sidebar1>
    </div>
  );
}
