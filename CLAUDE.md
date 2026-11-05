# CLAUDE.md: 1126 Labs UI library

Handoff from the claude.ai session of 2026-11-06. Read this first, then `PLAN.md` (full roadmap). Update this file when decisions change.

## What this is
Harshit's internal design system for ERP-level web apps (his own company, internal tools only). Next.js + TypeScript + Tailwind v4 + **Base UI** (shadcn's Base UI flavour). Light theme only, English only. Visual reference: Granola (warm neutral palette, serif page titles, big radii, pill buttons, hairline borders, soft fills, no heavy shadows). A backend-leaning dev plus Cursor will build apps from it, so the system must make off-style UI hard to write.

## Working with Harshit
- He is not a frontend or tooling expert: explain choices in plain words, avoid jargon, and say what you need from him.
- He delegates technical decisions. Make the call, state it in one or two lines, move on.
- Design components **one at a time**: build, take screenshots of every state (playwright + system Chrome works), show him, adjust until he approves, then next.
- Verify before claiming done: typecheck, build, `bun run check:styles`, and look at screenshots.

## Decisions (settled)
- **Hybrid distribution.** Tokens + core components ship as an npm package; page-level **blocks** (list/detail/form page) ship through a shadcn-style registry and are copied into apps, where they can be edited but must still follow the style rules.
- Repo: `github.com/HarshitMahajan/UI` (private, personal account). Package: **`@harshitmahajan/ui`** (GitHub Packages requires scope == owner, lowercase). Earlier notes about a `1126labs` org / `@1126labs/ui` are obsolete. Branding stays "1126 Labs"; the shadcn registry namespace is `@1126`.
- Free hosting only. **No Vercel for the docs site** (Hobby is personal non-commercial and cannot deploy private org repos). Docs run locally. Intended plan: commit built registry JSON and serve blocks from the private repo with a read token (**untested**).
- Package manager: **bun**. Build: plain `tsc` (per-file ESM, `.tsx` import extensions rewritten, `"use client"` preserved and checked by `packages/ui/scripts/build.mjs`).
- Closed Tailwind theme: default palette/radius/shadow/font/text are wiped in `theme.css`, so only token classes exist.
- Apps will be edited by Cursor; rules for it ship in `packages/ui/rules/1126-ui.mdc` and `AGENTS.md`.

## Layout
- `packages/ui`: the library. `src/styles/{tokens,theme,base,utilities,index,fonts}.css` hold ALL design decisions (3 layers: primitives, semantic, component/density). `src/components/*.tsx` one file per component group. `scripts/check-styles.mjs` fails on hex/rgb, default palette classes, arbitrary sizes, inline styles.
- `apps/playground`: Next app consuming the **built** package (integration test, visual reference).
- `apps/docs`: docs site (Preview/Usage/Source per component, blocks with Install) and the registry (`registry.json`, `registry/blocks/*.tsx`, `shadcn build` to `public/r`, token check in `src/proxy.ts`). `src/generated/` and `public/r/` are generated and git-ignored.

## Commands
```bash
bun install
bun run build            # library (must be rebuilt after editing it; apps use dist/)
bun run typecheck
bun run check:styles
bun run --filter docs build
bun run dev              # playground
```
CI (`.github/workflows/ci.yml`) runs all of the above; `release.yml` publishes to GitHub Packages on a `v*` tag (untested).

## Conventions
- Components use only semantic tokens and component tokens (`bg-surface`, `text-fg-muted`, `rounded-control|button|card|popover`, `h-(--control-h-md)`, `motion-fast`). Never raw colors or arbitrary sizes. Density is global (`data-density="compact"`).
- Flat shadcn-style names (`Dialog`, `DialogContent`), `className` merged with `cn` (custom-token aware), variants via `cva`, state via Base UI data attributes, no `next/*` imports in the library (router links via `render` prop).
- Relative imports inside `packages/ui/src` use explicit `.tsx`/`.ts` extensions.
- Every component needs a written behavior spec (hover, press, focus, disabled, loading, invalid, empty) in its doc comment, a demo in `apps/docs/src/demos.tsx`, and screenshots checked.

## Status
Done: tokens, 25 components (button, input, textarea, form-field, checkbox, switch, radio, select, slider, progress, badge, card/stat, separator, spinner, skeleton, avatar, tooltip, tabs, accordion, dialog, popover, menu, table (static), empty-state, breadcrumb, app-shell/sidebar/page/page-header/section), playground, docs site with 3 blocks, CI green.

## Next (Harshit's priority: ERP screens)
1. **DataTable** (TanStack Table): sorting, filters, column visibility/pinning/resizing, row selection + bulk-action bar, pagination, virtualization, loading/empty/error states, inline edit.
2. **Charts** (Recharts wrapped; chart color tokens `--chart-1..8` with contrast checks; tooltip/legend/empty/loading/error; data-table fallback for accessibility).
3. Date picker / range picker (react-day-picker styled with tokens), Combobox, NumberField/CurrencyInput (en-IN formatting), Toast, AlertDialog, Drawer (right side panel), Command palette.
4. Dashboard and page templates (more registry blocks), Storybook or tests (Vitest + Testing Library), `init` CLI + component manifest + ESLint plugin for consuming apps.

## Known issues / open items
- Docs home and `registry.json` still show placeholder host `ui.1126labs.com`; fix once block serving is decided.
- `shadcn add` copy-to-disk step was not verifiable in the sandbox (needs ui.shadcn.com); test once on a normal machine against the real block files.
- Blocks import from `@harshitmahajan/ui`, so the package must be published (or workspace-linked) before `add` can install its dependency.
- Playground nav links `/orders`, `/inventory`, `/customers` are 404 placeholders.
- Consuming apps need `NPM_TOKEN` (classic PAT, `read:packages`) in `.env`/CI/Vercel to install the private package; GitHub Packages free quota is 500 MB storage / 1 GB transfer per month.
