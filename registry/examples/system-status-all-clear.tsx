import { SystemStatus } from "@/components/kit/system-status";

const allUp = Array.from({ length: 30 }, () => true);

export function SystemStatusAllClear() {
  return (
    <SystemStatus
      title="All systems operational"
      services={[
        { name: "API", state: "operational", history: allUp },
        { name: "Auth", state: "operational", history: allUp },
      ]}
    />
  );
}
