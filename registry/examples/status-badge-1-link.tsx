import { Status, StatusIndicator, StatusLabel } from "@/components/kit/status-badge-1";

export function StatusBadge1Link() {
  return (
    <Status variant="error" render={<a href="#install" />} className="hover:bg-danger/20">
      <StatusIndicator />
      <StatusLabel>2 builds failed</StatusLabel>
    </Status>
  );
}
