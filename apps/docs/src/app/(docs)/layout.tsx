import { AppShell } from "@1126labs/ui";
import { DocsSidebar } from "@/components/docs-sidebar";
import { blocks } from "@/blocks";
import { demos } from "@/demos";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const componentList = Object.entries(demos).map(([slug, d]) => ({ slug, title: d.title }));
  const blockList = Object.entries(blocks).map(([slug, b]) => ({ slug, title: b.title }));

  return (
    <AppShell
      sidebar={<DocsSidebar components={componentList} blocks={blockList} />}
      sidebarFooter={<div className="truncate px-1 text-sm text-fg-muted">1126 Labs UI</div>}
    >
      {children}
    </AppShell>
  );
}
