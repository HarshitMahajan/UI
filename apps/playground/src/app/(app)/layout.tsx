import { Plus } from "lucide-react";
import { AppShell, Button } from "@harshitmahajan/ui";
import { AppSidebar } from "@/components/app-sidebar";
import { DensityToggle } from "@/components/density-toggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      sidebar={<AppSidebar />}
      sidebarFooter={<div className="truncate px-1 text-sm text-fg-muted">1126 Labs</div>}
      topbar={
        <>
          <DensityToggle />
          <Button variant="secondary" size="sm">
            <Plus className="size-4" />
            New order
          </Button>
        </>
      }
    >
      {children}
    </AppShell>
  );
}
