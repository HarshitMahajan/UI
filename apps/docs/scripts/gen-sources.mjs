// Collects component and block source text so pages can show code without runtime fs access.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const read = (dir) =>
  Object.fromEntries(
    readdirSync(dir)
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => [f.replace(/\.tsx$/, ""), readFileSync(join(dir, f), "utf8")]),
  );

mkdirSync("src/generated", { recursive: true });
writeFileSync(
  "src/generated/sources.json",
  JSON.stringify({ components: read("../../packages/ui/src/components"), blocks: read("registry/blocks") }, null, 2),
);
console.log("sources generated");
