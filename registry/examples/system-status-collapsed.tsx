import { SystemStatus } from "@/components/kit/system-status";

const days = (...downDays: number[]) => Array.from({ length: 30 }, (_, day) => !downDays.includes(day));

export function SystemStatusCollapsed() {
  return (
    <SystemStatus
      defaultOpen={false}
      services={[{ name: "API", state: "operational", lastIncident: "2024-05-01", history: days(27) }]}
      incidents={[{ service: "API", date: "2024-05-01", summary: "Minor outage. Resolved in 30m." }]}
    />
  );
}
