"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItem, SidebarSection } from "@harshitmahajan/ui";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function DocsSidebar({
  components,
  blocks,
}: {
  components: { slug: string; title: string }[];
  blocks: { slug: string; title: string }[];
}) {
  const pathname = usePathname();
  const item = (href: string, label: string) => (
    <SidebarItem key={href} render={<Link href={href} />} active={isActive(pathname, href)}>
      {label}
    </SidebarItem>
  );

  return (
    <>
      <SidebarSection>{item("/", "Overview")}</SidebarSection>
      <SidebarSection label="Blocks">{blocks.map((b) => item(`/blocks/${b.slug}`, b.title))}</SidebarSection>
      <SidebarSection label="Components">
        {components.map((c) => item(`/components/${c.slug}`, c.title))}
      </SidebarSection>
    </>
  );
}
