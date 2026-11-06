import { Button } from "@/components/kit/button";

export function ButtonDisabled() {
  return (
    <>
      <Button disabled>Save changes</Button>
      <Button disabled variant="outline">
        Export
      </Button>
    </>
  );
}
