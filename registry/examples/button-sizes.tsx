import { Plus } from "lucide-react";

import { Button } from "@/components/kit/button";

export function ButtonSizes() {
  return (
    <>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" variant="outline" aria-label="Add item">
        <Plus size={16} strokeWidth={2} aria-hidden="true" />
      </Button>
    </>
  );
}
