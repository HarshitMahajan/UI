"use client";

import { Tabs } from "@base-ui/react/tabs";
import { CodeBlock } from "./code-block";

const runners = [
  { id: "bun", label: "bun", run: "bunx --bun shadcn@latest" },
  { id: "pnpm", label: "pnpm", run: "pnpm dlx shadcn@latest" },
  { id: "npm", label: "npm", run: "npx shadcn@latest" },
];

const tabStyles =
  "cursor-pointer border-b-2 border-transparent px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring/70 data-active:border-foreground data-active:text-foreground";

/** Command or by hand: the two ways to get a component into a project. */
export function InstallTabs({ slug, source, packages, components }: { slug: string; source: string; packages: string[]; components: string[] }) {
  const all = [...packages].join(" ");

  return (
    <Tabs.Root defaultValue="command">
      <Tabs.List className="flex border-b">
        <Tabs.Tab value="command" className={tabStyles}>
          Command
        </Tabs.Tab>
        <Tabs.Tab value="manual" className={tabStyles}>
          Manual
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="command" className="pt-3">
        <Tabs.Root defaultValue="bun">
          <Tabs.List className="mb-2 flex gap-1">
            {runners.map((r) => (
              <Tabs.Tab
                key={r.id}
                value={r.id}
                className="cursor-pointer rounded-md px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring/70 data-active:bg-accent data-active:text-foreground"
              >
                {r.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {runners.map((r) => (
            <Tabs.Panel key={r.id} value={r.id}>
              <CodeBlock code={`${r.run} add HarshitMahajan/UI/${slug}`} />
            </Tabs.Panel>
          ))}
        </Tabs.Root>
        <p className="mt-3 max-w-prose text-sm text-muted-foreground">
          Copies the code to <code className="font-mono">components/kit/{slug}.tsx</code>
          {components.length ? ` along with ${components.join(", ")}, which it uses,` : ""} installs its packages, and adds
          the tokens it needs to your <code className="font-mono">globals.css</code>. Your existing shadcn components
          aren&apos;t touched.
        </p>
      </Tabs.Panel>
      <Tabs.Panel value="manual" className="pt-3">
        <ol className="flex list-inside list-decimal flex-col gap-4 text-sm">
          <li>
            Install the packages.
            <div className="mt-2">
              <CodeBlock code={`bun add ${all}`} />
            </div>
          </li>
          {components.length ? (
            <li>Add {components.join(", ")} the same way, since this component uses them.</li>
          ) : null}
          <li>
            Copy this into <code className="font-mono">components/kit/{slug}.tsx</code>.
            <div className="mt-2">
              <CodeBlock code={source} />
            </div>
          </li>
          <li>
            Add the <code className="font-mono">success</code>, <code className="font-mono">danger</code>,{" "}
            <code className="font-mono">warning</code> and <code className="font-mono">info</code> tokens to your{" "}
            <code className="font-mono">globals.css</code>. They&apos;re listed on the Make it yours page.
          </li>
        </ol>
      </Tabs.Panel>
    </Tabs.Root>
  );
}
