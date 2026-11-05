"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTab } from "@harshitmahajan/ui";

/** Switches the whole app between comfortable and compact density. */
export function DensityToggle() {
  const [value, setValue] = React.useState("comfortable");

  React.useEffect(() => {
    document.documentElement.dataset.density = value;
  }, [value]);

  return (
    <Tabs value={value} onValueChange={(v) => setValue(String(v))}>
      <TabsList className="border-b-0">
        <TabsTab value="comfortable">Comfortable</TabsTab>
        <TabsTab value="compact">Compact</TabsTab>
      </TabsList>
    </Tabs>
  );
}
