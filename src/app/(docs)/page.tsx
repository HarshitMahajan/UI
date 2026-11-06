import Link from "next/link";
import { Stage } from "@/components/stage";
import { docs } from "@/docs";

export default function HomePage() {
  return (
    <>
      <h1 className="text-4xl font-semibold tracking-tight text-balance">Pick a component, install only that one.</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">
        Built on Base UI, on top of your shadcn setup. The code lands in your project, and it is yours to edit.{" "}
        <Link href="/get-started" className="underline underline-offset-4 hover:text-foreground">
          Get started
        </Link>
      </p>

      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2">
        {Object.entries(docs).map(([slug, { title, description, hero, scaleInGallery }]) => (
          <div key={slug}>
            <Stage className="relative aspect-4/3 overflow-hidden">
              {scaleInGallery ? (
                <div inert className="absolute top-0 left-0 flex h-[200%] w-[200%] origin-top-left scale-50 items-start justify-center p-8">
                  <hero.Preview />
                </div>
              ) : (
                <div className="flex h-full flex-wrap items-center justify-center gap-3 p-6">
                  <hero.Preview />
                </div>
              )}
            </Stage>
            <h2 className="mt-3 font-medium">
              <Link href={`/components/${slug}`} className="underline-offset-4 hover:underline">
                {title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
