# CLAUDE.md: UI Kit

Read `README.md` for layout, commands and how to add a component.

## What this is
Harshit's own UI library, used on top of shadcn/ui in Next.js apps that use bun. Developers browse the docs site and install one component at a time. It's not an ERP design system or an npm package. Older components and plans are in git history.

## Working with Harshit
- Harshit is not a frontend or tooling expert: explain choices in plain words and say what you need from them.
- Harshit delegates technical decisions. Make the call, state it in a line or two, move on.
- Harshit brings components from reference sites. Understand how each one behaves, then build it on our foundations. References set look and behavior, never the implementation.
- Harshit dislikes anything that looks generated: no card grids, gradients or decorative labels on the site.
- Verify before claiming done: typecheck, build, a real install into a shadcn app, and the browser in light and dark.

## Decisions
- **Install from GitHub:** `bunx --bun shadcn@latest add HarshitMahajan/UI/<item>`. The repo is private, and access is GitHub read access. `registry.json` at the root is committed. Vercel hosts only the docs.
- **On top of shadcn, never replacing it:** components install to `components/kit/` and import `cn` from `@/lib/utils`, which every shadcn app has. Don't ship a `utils` item: it would prompt to overwrite the app's file.
- **Tokens:** components use the app's shadcn tokens. The `tokens` item adds only `success`, `danger`, `warning`, `info` and `destructive-foreground`, and adding more components keeps customized values. The optional `theme` item replaces the whole look and overwrites values.
- **Base UI only, never Radix.** Rewrite pasted Radix or `asChild` code on Base UI (`render` prop, `useRender`, `Collapsible`, ...). The generator fails on Radix imports.
- **Tokens only.** Components never use fixed colors like `bg-green-500`.
- **Strict TypeScript.** Export a props type for each part with options, and union types for variants.
- **Docs follow shadcn's component pages:** Installation (Command and Manual), Usage, Composition, Features, one section per variation with a live example, Accessibility and API Reference per part. Model: https://ui.shadcn.com/docs/components/base/attachment
- Shape: square-rounded. `rounded-lg` for controls and rows, `rounded-md` for small badges, `rounded-xl` only for outer containers. No pills. Status dots stay round.
- Numbered names for alternatives of the same thing: `sidebar-1`, `sidebar-2`, `status-badge-1`, `status-badge-2`.
- Every preview sits on a `Stage` (`src/components/stage.tsx`) with its own light/dark switch. The site's navigation is `sidebar-1`.
- Reference code written for Tailwind v3 gets translated to v4 where a name changed, such as v3 `shadow-sm` to v4 `shadow-xs`.

## Testing an install
Installing from GitHub reads what's pushed. To test unpushed changes, run `gen-registry.mjs` with `REGISTRY_ADDRESS='http://localhost:3100/r/{name}.json'`, then `shadcn build -o <dir>/r`, serve `<dir>`, and run `shadcn add http://localhost:3100/r/<item>.json` in a test app made with `create-next-app --use-bun` and `shadcn init --defaults`. Run the generator again without the variable before committing, or `registry.json` will contain the test address.

## Next
More components, as Harshit provides them.
