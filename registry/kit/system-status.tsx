"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDown, ChevronUp, Circle, CircleCheck, TriangleAlert } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/kit/button";
import { cn } from "@/lib/utils";

export type ServiceState = "operational" | "degraded" | "down";

export interface SystemStatusService {
  name: string;
  state: ServiceState;
  /** Date of the last incident, shown on the right. */
  lastIncident?: string;
  /** One entry per day, oldest first. true means the service was up. */
  history: boolean[];
}

export interface SystemStatusIncident {
  service: string;
  date: string;
  summary: string;
}

export interface SystemStatusProps extends React.ComponentProps<"section"> {
  title?: string;
  services: SystemStatusService[];
  /** With none, the incident history and its Hide button don't appear. */
  incidents?: SystemStatusIncident[];
  /** Whether the incident history starts open. */
  defaultOpen?: boolean;
}

const states: Record<ServiceState, { label: string; Icon: React.ElementType; color: string }> = {
  operational: { label: "Operational", Icon: CircleCheck, color: "text-success" },
  degraded: { label: "Degraded", Icon: TriangleAlert, color: "text-warning" },
  down: { label: "Down", Icon: Circle, color: "text-danger" },
};

function SystemStatus({
  title = "System Status",
  services,
  incidents = [],
  defaultOpen = true,
  className,
  ...props
}: SystemStatusProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      render={<section className={cn("w-full max-w-2xl rounded-xl border bg-card p-6 sm:p-10", className)} {...props} />}
    >
      <div className="flex min-h-9 items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {incidents.length > 0 ? (
          <Collapsible.Trigger render={<Button variant="secondary" />}>
            {open ? (
              <ChevronUp className="-ms-1 me-2" size={16} aria-hidden="true" />
            ) : (
              <ChevronDown className="-ms-1 me-2" size={16} aria-hidden="true" />
            )}
            {open ? "Hide" : "Show"}
          </Collapsible.Trigger>
        ) : null}
      </div>

      <ul className="mt-6 flex flex-col gap-5">
        {services.map((service) => {
          const { label, Icon, color } = states[service.state];
          const upDays = service.history.filter(Boolean).length;
          return (
            <li key={service.name}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <Icon className={cn("self-center", color)} size={18} aria-hidden="true" />
                <span className="font-medium">{service.name}</span>
                <span className="text-sm text-muted-foreground">{label}</span>
                {service.lastIncident ? (
                  <span className="ms-auto text-sm text-muted-foreground">Last: {service.lastIncident}</span>
                ) : null}
              </div>
              <div
                role="img"
                aria-label={`${service.name}: up ${upDays} of the last ${service.history.length} days`}
                className="mt-2 flex h-7 gap-0.5"
              >
                {service.history.map((up, day) => (
                  <span key={day} className={cn("max-w-[5px] min-w-px flex-1 rounded-full", up ? "bg-success" : "bg-danger")} />
                ))}
              </div>
            </li>
          );
        })}
      </ul>

      {incidents.length > 0 ? (
        <Collapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
          <div className="mt-8 rounded-lg bg-muted p-5">
            <h3 className="font-medium">Incident History</h3>
            <ul className="mt-3 divide-y divide-border">
              {incidents.map((incident) => (
                <li key={`${incident.service}-${incident.date}`} className="py-3 last:pb-0">
                  <p className="text-sm font-medium">
                    {incident.service} - {incident.date}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{incident.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </Collapsible.Panel>
      ) : null}
    </Collapsible.Root>
  );
}

export { SystemStatus };
