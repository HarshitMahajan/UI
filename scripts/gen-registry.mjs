// Writes registry.json at the repo root, which is what `shadcn add HarshitMahajan/UI/<item>` reads,
// and src/generated/sources.json, the code the docs site shows.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

// Set only by the local install test, to install from a local server instead of GitHub.
const address = process.env.REGISTRY_ADDRESS ?? "HarshitMahajan/UI/{name}";
const item = (name) => address.replace("{name}", name);
const UI = "registry/kit";
const EXAMPLES = "registry/examples";
const THEME = "registry/styles/theme.css";
const names = (dir) => readdirSync(dir).filter((f) => f.endsWith(".tsx")).map((f) => f.replace(/\.tsx$/, ""));
const readAll = (dir) => Object.fromEntries(names(dir).map((n) => [n, readFileSync(`${dir}/${n}.tsx`, "utf8")]));

const themeCss = readFileSync(THEME, "utf8");

/** Reads `--name: value;` lines from the block after `selector`. Throws if the theme file changes shape. */
function vars(selector) {
  const body = themeCss.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`))?.[1];
  if (!body) throw new Error(`${THEME}: no ${selector} block`);
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
}
const light = vars(":root,\\s*\\.light");
const dark = vars("\\.dark");
const mappings = vars("@theme inline");

// shadcn apps already define everything else. Components adopt those values, so they match the app.
const EXTRA = ["success", "danger", "warning", "info", "destructive-foreground"];
const pick = (from, keys) => Object.fromEntries(keys.map((k) => [k, from[k]]));

const meta = {};
const components = names(UI).map((name) => {
  const code = readFileSync(`${UI}/${name}.tsx`, "utf8");
  const npm = new Set();
  const local = new Set();
  for (const [, spec] of code.matchAll(/from "([^"]+)"/g)) {
    if (spec.startsWith("@/components/kit/")) {
      const dep = spec.split("/").pop();
      if (!existsSync(`${UI}/${dep}.tsx`)) throw new Error(`${name}: imports missing component ${dep}`);
      local.add(dep);
    } else if (spec === "@/lib/utils") continue; // every shadcn app has it
    else if (spec.startsWith(".") || spec.startsWith("@/")) throw new Error(`${name}: unexpected import ${spec}`);
    else if (spec.startsWith("@radix-ui/") || spec === "radix-ui") throw new Error(`${name}: use Base UI, not ${spec}`);
    else if (spec !== "react") npm.add(spec.split("/").slice(0, spec.startsWith("@") ? 2 : 1).join("/"));
  }
  meta[name] = { packages: [...npm], components: [...local] };
  return {
    name,
    type: "registry:component",
    title: name.replace(/(^|-)(\w)/g, (_, s, c) => (s ? " " : "") + c.toUpperCase()),
    dependencies: [...npm],
    registryDependencies: [item("tokens"), ...[...local].map(item)],
    files: [{ path: `${UI}/${name}.tsx`, type: "registry:component", target: `components/kit/${name}.tsx` }],
  };
});

writeFileSync(
  "registry.json",
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "ui-kit",
      homepage: "https://github.com/HarshitMahajan/UI",
      items: [
        {
          name: "tokens",
          type: "registry:item",
          title: "Tokens",
          description: "The few tokens UI Kit components add to a shadcn app. Installed with any component.",
          cssVars: {
            theme: pick(mappings, ["color-success", "color-danger", "color-warning", "color-info", "color-destructive-foreground"]),
            light: pick(light, EXTRA),
            dark: pick(dark, EXTRA),
          },
        },
        {
          name: "theme",
          type: "registry:theme",
          title: "Theme",
          description: "Optional: replaces the app's colors and corners with the full UI Kit look.",
          cssVars: { theme: mappings, light, dark },
        },
        ...components,
      ],
    },
    null,
    2,
  ) + "\n",
);

rmSync("src/generated", { recursive: true, force: true });
mkdirSync("src/generated", { recursive: true });
writeFileSync(
  "src/generated/sources.json",
  JSON.stringify({ meta, tokens: { light, dark }, components: readAll(UI), examples: readAll(EXAMPLES) }, null, 2),
);
console.log(`registry: ${components.length} components, addressed as ${item("<name>")}`);
