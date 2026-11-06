import { CopyButton } from "./copy-button";

export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative rounded-lg border">
      <pre tabIndex={0} className="max-h-96 overflow-auto p-4 pr-14 font-mono text-[13px]/relaxed">
        <code>{code}</code>
      </pre>
      <div className="absolute top-1.5 right-1.5 rounded-lg bg-background">
        <CopyButton text={code} />
      </div>
    </div>
  );
}
