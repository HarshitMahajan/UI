import { Button } from "@/components/kit/button";

export function ButtonVariants() {
  return (
    <>
      <Button>Save changes</Button>
      <Button variant="secondary">Duplicate</Button>
      <Button variant="outline">Export</Button>
      <Button variant="ghost">Skip</Button>
      <Button variant="link">View details</Button>
      <Button variant="destructive">Delete</Button>
    </>
  );
}
