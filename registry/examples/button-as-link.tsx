import { Button } from "@/components/kit/button";

export function ButtonAsLink() {
  return (
    <Button render={<a href="#install" />} nativeButton={false} variant="outline">
      Go to install
    </Button>
  );
}
