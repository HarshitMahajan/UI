import { Inbox, LayoutGrid } from "lucide-react";

import { Sidebar1, Sidebar1Content, Sidebar1Group, Sidebar1Item } from "@/components/kit/sidebar-1";

// In a Next.js app, pass render={<Link href="/inbox" />} to get client-side navigation.
export function Sidebar1Links() {
  return (
    <div className="flex h-60 w-full bg-background text-foreground">
      <Sidebar1>
        <Sidebar1Content aria-label="Main">
          <Sidebar1Group label="Pages" className="mt-0">
            <Sidebar1Item render={<a href="#install" />} icon={<LayoutGrid />} active>
              Home
            </Sidebar1Item>
            <Sidebar1Item render={<a href="#install" />} icon={<Inbox />} badge={3}>
              Inbox
            </Sidebar1Item>
          </Sidebar1Group>
        </Sidebar1Content>
      </Sidebar1>
    </div>
  );
}
