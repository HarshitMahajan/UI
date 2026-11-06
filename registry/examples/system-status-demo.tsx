import { SystemStatus } from "@/components/kit/system-status";

const days = (...downDays: number[]) => Array.from({ length: 30 }, (_, day) => !downDays.includes(day));

export function SystemStatusDemo() {
  return (
    <SystemStatus
      services={[
        { name: "API", state: "operational", lastIncident: "2024-05-01", history: days(27) },
        { name: "Database", state: "degraded", lastIncident: "2024-04-28", history: days(22, 23) },
        { name: "Auth", state: "operational", history: days() },
        { name: "Email", state: "down", lastIncident: "2024-05-02", history: days(21, 22, 23) },
      ]}
      incidents={[
        { service: "Email", date: "2024-05-02", summary: "Email delivery outage. Resolved in 2h." },
        { service: "Database", date: "2024-04-28", summary: "Performance issues. Resolved in 1h." },
        { service: "API", date: "2024-05-01", summary: "Minor outage. Resolved in 30m." },
      ]}
    />
  );
}
