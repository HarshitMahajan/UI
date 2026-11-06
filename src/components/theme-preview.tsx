"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/kit/button";
import { Status, StatusIndicator, StatusLabel } from "@/components/kit/status-badge-1";

const presets: { name: string; vars: Record<string, string> }[] = [
  { name: "Default", vars: {} },
  { name: "Sharp", vars: { "--radius": "0px" } },
  {
    name: "Soft indigo",
    vars: {
      "--radius": "0.875rem",
      "--primary": "hsl(243 75% 59%)",
      "--primary-foreground": "hsl(0 0% 100%)",
      "--ring": "hsl(243 75% 59%)",
    },
  },
  {
    name: "Forest",
    vars: {
      "--radius": "0.25rem",
      "--primary": "hsl(150 60% 22%)",
      "--primary-foreground": "hsl(0 0% 100%)",
      "--ring": "hsl(150 60% 22%)",
      "--success": "hsl(150 60% 34%)",
    },
  },
];

/** The same components under different token values: nothing but the values changes. */
export function ThemePreview() {
  const [preset, setPreset] = React.useState(presets[0]);

  return (
    <div className="overflow-hidden rounded-lg border">
      <div role="group" aria-label="Choose a look" className="flex flex-wrap gap-1 border-b p-1">
        {presets.map((p) => (
          <Button
            key={p.name}
            size="sm"
            variant="ghost"
            aria-pressed={p === preset}
            className={cn(p === preset && "bg-accent text-accent-foreground")}
            onClick={() => setPreset(p)}
          >
            {p.name}
          </Button>
        ))}
      </div>
      <div style={preset.vars as React.CSSProperties} className="flex flex-col items-center gap-5 p-8">
        <div className="flex flex-wrap justify-center gap-3">
          <Button>Save changes</Button>
          <Button variant="secondary">Duplicate</Button>
          <Button variant="outline">Export</Button>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          <Status variant="success">
            <StatusIndicator />
            <StatusLabel>Online</StatusLabel>
          </Status>
          <Status variant="warning">
            <StatusIndicator />
            <StatusLabel>Pending</StatusLabel>
          </Status>
          <Status variant="error">
            <StatusIndicator />
            <StatusLabel>Failed</StatusLabel>
          </Status>
        </div>
      </div>
    </div>
  );
}
