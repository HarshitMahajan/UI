import { CircleCheck, CircleX } from "lucide-react";

import { StatusBadge2, StatusBadge2Primary, StatusBadge2Secondary } from "@/components/kit/status-badge-2";

export function StatusBadge2Sizes() {
  return (
    <>
      <StatusBadge2 size="sm">
        <StatusBadge2Primary>
          <CircleCheck className="fill-success text-card" aria-hidden="true" />
          Live
        </StatusBadge2Primary>
        <StatusBadge2Secondary>
          <CircleX aria-hidden="true" />
          Audit trails
        </StatusBadge2Secondary>
      </StatusBadge2>
      <StatusBadge2>
        <StatusBadge2Primary>
          <CircleCheck className="fill-success text-card" aria-hidden="true" />
          Live
        </StatusBadge2Primary>
        <StatusBadge2Secondary>
          <CircleX aria-hidden="true" />
          Audit trails
        </StatusBadge2Secondary>
      </StatusBadge2>
    </>
  );
}
