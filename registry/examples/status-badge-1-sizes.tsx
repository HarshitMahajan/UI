import { Status, StatusIndicator, StatusLabel } from "@/components/kit/status-badge-1";

export function StatusBadge1Sizes() {
  return (
    <>
      <Status variant="success" size="sm">
        <StatusIndicator />
        <StatusLabel>Small</StatusLabel>
      </Status>
      <Status variant="success">
        <StatusIndicator />
        <StatusLabel>Default</StatusLabel>
      </Status>
      <Status variant="success" size="lg">
        <StatusIndicator />
        <StatusLabel>Large</StatusLabel>
      </Status>
    </>
  );
}
