import { CodeBlock } from "./code-block";
import { Stage } from "./stage";
import type { Example as ExampleData } from "@/docs";
import sources from "@/generated/sources.json";

/** A live component on a stage, with its code one click away. */
export function Example({ name, Preview, flush, tall }: Pick<ExampleData, "name" | "Preview" | "flush"> & { tall?: boolean }) {
  const code = (sources.examples as Record<string, string>)[name];

  return (
    <div>
      <Stage
        className={
          flush
            ? "flex"
            : `flex flex-wrap items-center justify-center gap-3 p-4 sm:p-8 ${tall ? "min-h-72" : "min-h-40"}`
        }
      >
        <Preview />
      </Stage>
      <details className="mt-2">
        <summary className="inline-block cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground">
          View code
        </summary>
        <div className="mt-2">
          <CodeBlock code={code} />
        </div>
      </details>
    </div>
  );
}
