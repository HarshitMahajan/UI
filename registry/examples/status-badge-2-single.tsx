import { ShieldCheck, TriangleAlert } from "lucide-react";

import { StatusBadge2, StatusBadge2Primary } from "@/components/kit/status-badge-2";

export function StatusBadge2Single() {
  return (
    <>
      <StatusBadge2>
        <StatusBadge2Primary>
          <ShieldCheck className="text-success" aria-hidden="true" />
          Protected
        </StatusBadge2Primary>
      </StatusBadge2>
      <StatusBadge2>
        <StatusBadge2Primary>
          <TriangleAlert className="text-warning" aria-hidden="true" />
          Needs review
        </StatusBadge2Primary>
      </StatusBadge2>
    </>
  );
}
