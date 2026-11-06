"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/kit/button";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
    </Button>
  );
}
