import { ChartColumn, House, Settings, ShoppingCart } from "lucide-react";

import { Sidebar2, Sidebar2Brand, Sidebar2Item, Sidebar2User } from "@/components/kit/sidebar-2";

export function Sidebar2Navigation() {
  return (
    <div className="flex h-96 w-full justify-center bg-background">
      <Sidebar2 aria-label="Main" className="border-s">
        <Sidebar2Brand logo={<ShoppingCart aria-hidden="true" />} title="Acme Store" />
        <Sidebar2Item icon={<House />} active>
          Dashboard
        </Sidebar2Item>
        <Sidebar2Item icon={<ChartColumn />}>Analytics</Sidebar2Item>
        <Sidebar2Item icon={<Settings />}>Settings</Sidebar2Item>
        <Sidebar2User name="Jordan Diaz" email="jordan@example.com" />
      </Sidebar2>
    </div>
  );
}
