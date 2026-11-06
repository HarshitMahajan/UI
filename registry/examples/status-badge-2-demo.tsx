import { CircleCheck, CircleX, ShieldCheck } from "lucide-react";

import {
  StatusBadge2,
  StatusBadge2Primary,
  StatusBadge2Secondary,
} from "@/components/kit/status-badge-2";

export function StatusBadge2Demo() {
  return (
    <>
      <StatusBadge2>
        <StatusBadge2Primary>
          <ShieldCheck className="text-success" aria-hidden="true" />
          Protection
        </StatusBadge2Primary>
        <StatusBadge2Secondary>
          <CircleX aria-hidden="true" />
          SSO login
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
      <StatusBadge2>
        <StatusBadge2Primary>
          <CircleX className="fill-danger text-card" aria-hidden="true" />
          Safety checks
        </StatusBadge2Primary>
        <StatusBadge2Secondary>
          <ShieldCheck aria-hidden="true" />
          Production
        </StatusBadge2Secondary>
      </StatusBadge2>
    </>
  );
}
