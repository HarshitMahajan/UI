"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, FileText, House, Palette, Users } from "lucide-react";
import { SidebarItem, SidebarSection } from "@harshitmahajan/ui";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/** App-specific navigation: the only place nav items are defined. */
export function AppSidebar() {
  const pathname = usePathname();
  const item = (href: string, label: string, icon: React.ReactNode) => (
    <SidebarItem render={<Link href={href} />} active={isActive(pathname, href)} icon={icon}>
      {label}
    </SidebarItem>
  );

  return (
    <>
      <SidebarSection>{item("/", "Home", <House />)}</SidebarSection>
      <SidebarSection label="Operations">
        {item("/orders", "Orders", <FileText />)}
        {item("/inventory", "Inventory", <Boxes />)}
        {item("/customers", "Customers", <Users />)}
      </SidebarSection>
      <SidebarSection label="System">{item("/components", "Components", <Palette />)}</SidebarSection>
    </>
  );
}
