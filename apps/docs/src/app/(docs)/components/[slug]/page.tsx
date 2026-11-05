import { notFound } from "next/navigation";
import { Card, CardBody, Page, PageHeader, Section, Tabs, TabsList, TabsPanel, TabsTab } from "@harshitmahajan/ui";
import { CodeBlock } from "@/components/code-block";
import { demos } from "@/demos";
import sources from "@/generated/sources.json";

export function generateStaticParams() {
  return Object.keys(demos).map((slug) => ({ slug }));
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = demos[slug];
  const source = (sources.components as Record<string, string>)[slug];
  if (!demo || !source) notFound();

  return (
    <Page>
      <PageHeader title={demo.title} description={demo.description} />
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTab value="preview">Preview</TabsTab>
          <TabsTab value="usage">Usage</TabsTab>
          <TabsTab value="source">Source</TabsTab>
        </TabsList>
        <TabsPanel value="preview">
          <Card>
            <CardBody className="flex min-h-40 items-center justify-center py-10">{demo.preview}</CardBody>
          </Card>
        </TabsPanel>
        <TabsPanel value="usage">
          <Section>
            <CodeBlock label="Import" code={`import { ${demo.title.split(" ")[0]} } from "@harshitmahajan/ui";`} />
            <div className="mt-3">
              <CodeBlock label="Example" code={demo.usage} />
            </div>
          </Section>
        </TabsPanel>
        <TabsPanel value="source">
          <CodeBlock label={`packages/ui/src/components/${slug}.tsx`} code={source} />
        </TabsPanel>
      </Tabs>
    </Page>
  );
}
