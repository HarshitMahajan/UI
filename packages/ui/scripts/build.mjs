// Build: tsc emits per-file ESM + .d.ts (keeps "use client" directives and rewrites
// .tsx import extensions to .js), then CSS is copied as source for consumers' Tailwind.
import { execSync } from "node:child_process";
import { cpSync, rmSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

rmSync("dist", { recursive: true, force: true });
execSync("npx tsc -p tsconfig.build.json", { stdio: "inherit" });
cpSync("src/styles", "dist/styles", { recursive: true });

// Sanity check: every source file that starts with "use client" must still do so in dist.
function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
let missing = 0;
for (const src of walk("src").filter((f) => f.endsWith(".tsx"))) {
  if (!/^["']use client["']/.test(readFileSync(src, "utf8"))) continue;
  const out = src.replace(/^src/, "dist").replace(/\.tsx$/, ".js");
  if (!/^["']use client["']/.test(readFileSync(out, "utf8"))) {
    console.error(`MISSING "use client" in ${out}`);
    missing++;
  }
}
if (missing) process.exit(1);
console.log("build ok");
