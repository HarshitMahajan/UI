import { SystemStatus } from "@/components/kit/system-status";

const days = (...downDays: number[]) => Array.from({ length: 90 }, (_, day) => !downDays.includes(day));

export function SystemStatusLongHistory() {
  return (
    <SystemStatus
      title="Last 90 days"
      services={[
        { name: "API", state: "operational", lastIncident: "2024-05-01", history: days(12, 60, 61) },
        { name: "Email", state: "degraded", lastIncident: "2024-05-02", history: days(40, 41, 42, 88) },
      ]}
    />
  );
}
