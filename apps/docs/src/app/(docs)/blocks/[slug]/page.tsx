import { notFound } from "next/navigation";
import { Card, Page, PageHeader, Section, Tabs, TabsList, TabsPanel, TabsTab } from "@1126labs/ui";
import { CodeBlock } from "@/components/code-block";
import { blocks } from "@/blocks";
import sources from "@/generated/sources.json";

export function generateStaticParams() {
  return Object.keys(blocks).map((slug) => ({ slug }));
}

export default async function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const block = blocks[slug];
  const source = (sources.blocks as Record<string, string>)[slug];
  if (!block || !source) notFound();
  const { Component } = block;

  return (
    <Page width="wide">
      <PageHeader title={block.title} description={block.description} />
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTab value="preview">Preview</TabsTab>
          <TabsTab value="install">Install</TabsTab>
          <TabsTab value="source">Source</TabsTab>
        </TabsList>
        <TabsPanel value="preview">
          <Card className="h-160 overflow-auto bg-canvas">
            <Component />
          </Card>
        </TabsPanel>
        <TabsPanel value="install">
          <Section>
            <CodeBlock label="Terminal" code={`npx shadcn@latest add @1126/${slug}`} />
            <p className="mt-3 text-sm text-fg-muted">
              The file lands in your app&apos;s components folder. It imports from @1126labs/ui, so install the
              package first. Edit it freely, but keep using library components and token classes.
            </p>
          </Section>
        </TabsPanel>
        <TabsPanel value="source">
          <CodeBlock label={`registry/blocks/${slug}.tsx`} code={source} />
        </TabsPanel>
      </Tabs>
    </Page>
  );
}
