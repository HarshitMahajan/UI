import { Archive, Download } from "lucide-react";

import { Button } from "@/components/kit/button";

export function ButtonWithIcon() {
  return (
    <>
      <Button>
        <Archive className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        Archive
      </Button>
      <Button variant="outline">
        Download
        <Download className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
      </Button>
    </>
  );
}
