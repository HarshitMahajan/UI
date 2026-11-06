import { Status, StatusIndicator, StatusLabel } from "@/components/kit/status-badge-1";

const groups = [
  { title: "Success", variant: "success", labels: ["Online", "Active", "Connected"] },
  { title: "Error", variant: "error", labels: ["Offline", "Disconnected", "Failed"] },
  { title: "Warning", variant: "warning", labels: ["Away", "Busy", "Pending"] },
  { title: "Info", variant: "info", labels: ["Idle", "In Progress", "Syncing"] },
  { title: "Default", variant: "default", labels: ["Unknown", "Not Set", "N/A"] },
] as const;

export function StatusBadge1Demo() {
  return (
    <div className="flex flex-col gap-6">
      {groups.map(({ title, variant, labels }) => (
        <div key={title} className="flex flex-col gap-3">
          <h3 className="font-medium text-sm">{title}</h3>
          <div className="flex flex-wrap items-center gap-2.5">
            {labels.map((label) => (
              <Status key={label} variant={variant}>
                <StatusIndicator />
                <StatusLabel>{label}</StatusLabel>
              </Status>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
