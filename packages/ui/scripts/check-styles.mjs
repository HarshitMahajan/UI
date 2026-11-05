// Fails if source files contain off-system styling. Run: bun run check:styles
// Escape hatch for a justified exception: add "ds-allow" in a comment on that line.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = process.argv.slice(2).length ? process.argv.slice(2) : ["packages/ui/src", "apps"];
const skip = new Set(["node_modules", ".next", "dist"]);
const exts = [".ts", ".tsx", ".jsx", ".js", ".mdx"];

const rules = [
  [/(?<![\w&/])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![\w-])/, "raw hex color: use a color token"],
  [/\b(?:rgba?|hsla?|oklch|oklab)\(/, "raw color function: use a color token"],
  [
    /\b(?:bg|text|border|ring|fill|stroke|from|to|via|divide|outline|shadow|accent|caret|decoration)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white)(?:-\d{2,3})?\b/,
    "default Tailwind palette class: use a semantic token (bg-surface, text-fg-muted, ...)",
  ],
  [/\[-?\d*\.?\d+(?:px|rem|em|vh|vw|%)\]/, "arbitrary size value: use a token or a spacing-scale class"],
  [/style=\{\{/, "inline style: use token classes"],
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (exts.some((e) => p.endsWith(e))) yield p;
  }
}

let problems = 0;
for (const root of roots) {
  for (const file of walk(root)) {
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (line.includes("ds-allow")) return;
        for (const [re, msg] of rules) {
          if (re.test(line)) {
            console.error(`${file}:${i + 1}  ${msg}\n    ${line.trim()}`);
            problems++;
          }
        }
      });
  }
}
if (problems) {
  console.error(`\n${problems} off-system style problem(s).`);
  process.exit(1);
}
console.log("styles ok");
