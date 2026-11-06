import { Status, StatusIndicator, StatusLabel } from "@/components/kit/status-badge-1";

export function StatusBadge1Still() {
  return (
    <>
      <Status variant="success">
        <StatusIndicator pulse={false} />
        <StatusLabel>Paid</StatusLabel>
      </Status>
      <Status variant="warning">
        <StatusIndicator pulse={false} />
        <StatusLabel>Overdue</StatusLabel>
      </Status>
      <Status variant="default">
        <StatusIndicator pulse={false} />
        <StatusLabel>Draft</StatusLabel>
      </Status>
    </>
  );
}
