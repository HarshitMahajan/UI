import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { Example } from "@/components/example";
import { InstallTabs } from "@/components/install-tabs";
import { docs } from "@/docs";
import sources from "@/generated/sources.json";

export function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug }));
}

const heading = "mt-16 scroll-mt-6 text-xl font-semibold tracking-tight";

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = docs[slug];
  const source = (sources.components as Record<string, string>)[slug];
  if (!doc || !source) notFound();
  const meta = (sources.meta as Record<string, { packages: string[]; components: string[] }>)[slug];

  return (
    <>
      <h1 className="text-4xl font-semibold tracking-tight">{doc.title}</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">{doc.description}</p>

      <div className="mt-8">
        <Example {...doc.hero} tall />
      </div>

      <p className="mt-6 max-w-prose text-sm/relaxed">{doc.intro}</p>

      <h2 id="install" className={heading}>
        Installation
      </h2>
      <div className="mt-4">
        <InstallTabs slug={slug} source={source} packages={meta.packages} components={meta.components} />
      </div>

      <h2 className={heading}>Usage</h2>
      <div className="mt-4 flex flex-col gap-3">
        <CodeBlock code={doc.imports} />
        <CodeBlock code={doc.usage} />
      </div>

      <h2 className={heading}>Composition</h2>
      <div className="mt-4">
        <CodeBlock code={doc.composition} />
      </div>

      <h2 className={heading}>Features</h2>
      <ul className="mt-4 flex max-w-prose list-disc flex-col gap-2 pl-5 text-sm/relaxed">
        {doc.features.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      {doc.examples.map((example) => (
        <section key={example.name}>
          <h2 className={heading}>{example.title}</h2>
          {example.description ? <p className="mt-2 max-w-prose text-sm/relaxed">{example.description}</p> : null}
          <div className="mt-4">
            <Example name={example.name} Preview={example.Preview} flush={example.flush} />
          </div>
        </section>
      ))}

      <h2 className={heading}>Accessibility</h2>
      {doc.accessibility.map(({ title, body, code }) => (
        <section key={title} className="mt-5">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="mt-1 max-w-prose text-sm/relaxed text-muted-foreground">{body}</p>
          {code ? (
            <div className="mt-2">
              <CodeBlock code={code} />
            </div>
          ) : null}
        </section>
      ))}

      <h2 className={heading}>API Reference</h2>
      {doc.api.map(({ part, description, props }) => (
        <section key={part} className="mt-8">
          <h3 className="font-mono text-sm font-medium">{part}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          {props?.length ? (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-xl text-left text-sm">
                <thead className="text-muted-foreground">
                  <tr className="border-b">
                    <th className="py-2 pr-4 font-medium">Prop</th>
                    <th className="py-2 pr-4 font-medium">Type</th>
                    <th className="py-2 pr-4 font-medium">Default</th>
                    <th className="py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {props.map((p) => (
                    <tr key={p.name} className="border-b align-top">
                      <td className="py-2 pr-4 font-mono text-[13px]">{p.name}</td>
                      <td className="py-2 pr-4 font-mono text-[13px] text-muted-foreground">{p.type}</td>
                      <td className="py-2 pr-4 font-mono text-[13px] text-muted-foreground">{p.fallback ?? "-"}</td>
                      <td className="py-2">{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ))}
    </>
  );
}
