import { Sidebar2, Sidebar2Person, Sidebar2Section } from "@/components/kit/sidebar-2";

export function Sidebar2Initials() {
  return (
    <div className="flex h-64 w-full justify-center bg-background">
      <Sidebar2 aria-label="Team" className="border-s">
        <Sidebar2Section label="Your team" className="mt-1">
          <Sidebar2Person name="Sarah Kim" role="Design" online />
          <Sidebar2Person name="John Doe" role="Engineering" online />
          <Sidebar2Person name="Lisa Park" />
        </Sidebar2Section>
      </Sidebar2>
    </div>
  );
}
