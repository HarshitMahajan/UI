import { CodeBlock } from "@/components/code-block";

const heading = "mt-14 text-xl font-semibold tracking-tight";
const body = "mt-2 max-w-prose text-sm/relaxed";

export default function GetStartedPage() {
  return (
    <>
      <h1 className="text-4xl font-semibold tracking-tight">Get started</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">
        This library sits on top of shadcn/ui. Keep your Next.js and shadcn setup as it is, and add the components you
        want from this repo.
      </p>

      <h2 className={heading}>1. Get access</h2>
      <p className={body}>
        Components install straight from the private GitHub repo, so you need read access to{" "}
        <code className="font-mono">HarshitMahajan/UI</code>. Then sign in to the GitHub CLI once on your computer.
      </p>
      <div className="mt-3">
        <CodeBlock code="gh auth login" />
      </div>

      <h2 className={heading}>2. Have a shadcn project</h2>
      <p className={body}>You need Next.js, Tailwind v4 and a components.json. If the project doesn&apos;t have shadcn yet:</p>
      <div className="mt-3">
        <CodeBlock code="bunx --bun shadcn@latest init" />
      </div>

      <h2 className={heading}>3. Install a component</h2>
      <p className={body}>Each component page shows its command. To see everything available:</p>
      <div className="mt-3 flex flex-col gap-3">
        <CodeBlock code="bunx --bun shadcn@latest list HarshitMahajan/UI" />
        <CodeBlock code="bunx --bun shadcn@latest add HarshitMahajan/UI/sidebar-1" />
      </div>

      <h2 className={heading}>4. Use it</h2>
      <p className={body}>
        Our components live in <code className="font-mono">components/kit/</code>, so they sit beside your{" "}
        <code className="font-mono">components/ui/</code> without replacing anything.
      </p>
      <div className="mt-3">
        <CodeBlock code={`import { Button } from "@/components/ui/button"     // shadcn's, unchanged\nimport { Sidebar1 } from "@/components/kit/sidebar-1" // ours`} />
      </div>

      <h2 className={heading}>What installing does</h2>
      <ul className="mt-2 flex max-w-prose list-disc flex-col gap-2 pl-5 text-sm/relaxed">
        <li>Copies the component&apos;s code into your project, so you commit it and can edit it.</li>
        <li>Installs its packages with bun, because the command detects your bun.lock.</li>
        <li>Adds only the tokens it needs to globals.css. Your colors and corners stay, and components follow them.</li>
      </ul>

      <h2 className={heading}>Deploying your app</h2>
      <p className={body}>
        Nothing changes. The code is in your app&apos;s repo after you install, so your app&apos;s build doesn&apos;t
        need GitHub access to this library or any new environment variable.
      </p>

      <h2 className={heading}>Getting updates</h2>
      <p className={body}>
        Your copy doesn&apos;t change on its own. See what&apos;s different, then replace it if you want the new version.
        Replacing it overwrites your edits to that file, so commit first.
      </p>
      <div className="mt-3 flex flex-col gap-3">
        <CodeBlock code="bunx --bun shadcn@latest add HarshitMahajan/UI/sidebar-1 --diff" />
        <CodeBlock code="bunx --bun shadcn@latest add HarshitMahajan/UI/sidebar-1 --overwrite" />
      </div>

      <h2 className={heading}>Using it in CI</h2>
      <p className={body}>
        Only needed if CI installs components itself. Create a fine-grained token with read access to this repo&apos;s
        contents, and set it as <code className="font-mono">GH_TOKEN</code>.
      </p>
    </>
  );
}
