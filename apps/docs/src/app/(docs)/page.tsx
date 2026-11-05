import Link from "next/link";
import { Card, CardBody, CardDescription, CardHeader, CardTitle, Page, PageHeader, Section } from "@harshitmahajan/ui";
import { CodeBlock } from "@/components/code-block";
import { blocks } from "@/blocks";
import { demos } from "@/demos";

const cssSetup = `/* app/globals.css */
@import "tailwindcss";
@import "@harshitmahajan/ui/styles.css";
@source "../node_modules/@harshitmahajan/ui/dist";`;

const registrySetup = `// components.json  (add this key)
{
  "registries": {
    "@1126": {
      "url": "https://ui.1126labs.com/r/{name}.json",
      "headers": { "Authorization": "Bearer \${REGISTRY_TOKEN}" }
    }
  }
}

# then, for a block:
npx shadcn@latest add @1126/list-page`;

export default function OverviewPage() {
  return (
    <Page>
      <PageHeader title="1126 UI" description="Components you install as a package, blocks you copy into an app." />

      <Section>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>{Object.keys(demos).length} components</CardTitle>
                <CardDescription>Installed with bun, updated by upgrading the package.</CardDescription>
              </div>
            </CardHeader>
            <CardBody>
              <Link className="text-accent hover:underline" href="/components/button">Browse components</Link>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <div>
                <CardTitle>{Object.keys(blocks).length} blocks</CardTitle>
                <CardDescription>Page templates copied into your app with one command, then edited.</CardDescription>
              </div>
            </CardHeader>
            <CardBody>
              <Link className="text-accent hover:underline" href="/blocks/list-page">Browse blocks</Link>
            </CardBody>
          </Card>
        </div>
      </Section>

      <Section title="1. Use the components">
        <CodeBlock label="Terminal" code="bun add @harshitmahajan/ui" />
        <div className="mt-3">
          <CodeBlock label="CSS" code={cssSetup} />
        </div>
      </Section>

      <Section title="2. Copy in a block">
        <CodeBlock label="Setup and command" code={registrySetup} />
      </Section>
    </Page>
  );
}
