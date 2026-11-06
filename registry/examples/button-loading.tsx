import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/kit/button";

export function ButtonLoading() {
  return (
    <Button disabled>
      <LoaderCircle className="-ms-1 me-2 animate-spin" size={16} aria-hidden="true" />
      Saving
    </Button>
  );
}
