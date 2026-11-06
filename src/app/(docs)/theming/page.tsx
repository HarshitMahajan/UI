import { CodeBlock } from "@/components/code-block";
import { ThemePreview } from "@/components/theme-preview";
import sources from "@/generated/sources.json";

const heading = "mt-16 text-xl font-semibold tracking-tight";

const example = `:root {
  --radius: 0.25rem;
  --primary: hsl(243 75% 59%);
  --primary-foreground: hsl(0 0% 100%);
}`;

export default function ThemingPage() {
  const light = sources.tokens.light as Record<string, string>;
  const dark = sources.tokens.dark as Record<string, string>;

  return (
    <>
      <h1 className="text-4xl font-semibold tracking-tight">Make it yours</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">
        Components take their colors and corners only from tokens, so one small set of values sets the whole look.
        Pick a look below. These are the same components with different values.
      </p>

      <div className="mt-8">
        <ThemePreview />
      </div>

      <h2 className={heading}>Change one app</h2>
      <p className="mt-2 max-w-prose text-sm/relaxed">
        Components use the shadcn tokens already in your app&apos;s <code className="font-mono">globals.css</code>, so
        they match it from the first install. Edit a value there, and every component follows, including ours. Adding
        more components keeps your values.
      </p>
      <div className="mt-4">
        <CodeBlock code={example} />
      </div>

      <h2 className={heading}>Change one component</h2>
      <p className="mt-2 max-w-prose text-sm/relaxed">
        Installing copies the component to <code className="font-mono">components/kit/</code>. It&apos;s your code, so
        edit its classes or markup directly. Installing it again asks before replacing a changed file.
      </p>

      <h2 className={heading}>Use the full UI Kit look</h2>
      <p className="mt-2 max-w-prose text-sm/relaxed">
        This replaces the colors and corners in your <code className="font-mono">globals.css</code> with the values
        below, and it overwrites any you changed. Commit first so you can review the change.
      </p>
      <div className="mt-4">
        <CodeBlock code="bunx --bun shadcn@latest add HarshitMahajan/UI/theme" />
      </div>

      <h2 className={heading}>Change the house style</h2>
      <p className="mt-2 max-w-prose text-sm/relaxed">
        Edit <code className="font-mono">registry/styles/theme.css</code> in this library&apos;s repo and push. This
        site and later theme installs then use the new values. Apps keep their own values until they install it again.
      </p>

      <h2 className={heading}>All tokens</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-xl text-left text-sm">
          <thead className="text-muted-foreground">
            <tr className="border-b">
              <th className="py-2 pr-4 font-medium">Token</th>
              <th className="py-2 pr-4 font-medium">Light</th>
              <th className="py-2 font-medium">Dark</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(light).map(([name, value]) => (
              <tr key={name} className="border-b font-mono text-[13px]">
                <td className="py-2 pr-4">--{name}</td>
                <td className="py-2 pr-4 text-muted-foreground">{value}</td>
                <td className="py-2 text-muted-foreground">{dark[name] ?? "same as light"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
