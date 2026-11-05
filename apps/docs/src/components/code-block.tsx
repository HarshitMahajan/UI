import { CopyButton } from "./copy-button";

/** Plain code panel with a copy button. */
export function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-sunken">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="type-label">{label ?? "Code"}</span>
        <CopyButton text={code} />
      </div>
      <pre className="max-h-128 overflow-auto p-4 font-mono text-sm text-fg">
        <code>{code}</code>
      </pre>
    </div>
  );
}
