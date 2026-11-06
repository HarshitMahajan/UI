import { Status, StatusLabel } from "@/components/kit/status-badge-1";

export function StatusBadge1LabelOnly() {
  return (
    <>
      <Status variant="info">
        <StatusLabel>Beta</StatusLabel>
      </Status>
      <Status variant="error">
        <StatusLabel>Deprecated</StatusLabel>
      </Status>
    </>
  );
}
