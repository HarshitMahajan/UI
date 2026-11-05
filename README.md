# 1126 Labs UI

Internal design system: Base UI components + one token file. Package: `@harshitmahajan/ui` (not yet published).

## Layout
- `packages/ui`: the library (`src/styles/*.css` = all design decisions, `src/components/*` = components, `rules/` = Cursor rules for consuming apps)
- `apps/playground`: a Next.js app that consumes the *built* package (integration test + visual reference)
- `apps/docs`: the docs site (component pages with preview, usage and source) and the **block registry** (`registry/blocks/*.tsx` built to `public/r/*.json` with `shadcn build`; `/r/*` is token-protected by `src/proxy.ts` when `REGISTRY_TOKEN` is set)
- `PLAN.md`: full build plan and roadmap

## Commands (bun)
```bash
bun install
bun run build         # build the library into packages/ui/dist
bun run --filter docs build   # builds the docs site and the registry
bun run dev           # playground at http://localhost:3000 (rebuild the library after editing it)
bun run typecheck
bun run check:styles  # fails on hex colors, default palette classes, arbitrary sizes
```

## Using the library in an app
```css
/* app/globals.css */
@import "tailwindcss";
@import "@harshitmahajan/ui/styles.css";
@source "../node_modules/@harshitmahajan/ui/dist";   /* path relative to this file */
```
Optional fonts (Inter + Newsreader): install `@fontsource-variable/inter` and `@fontsource-variable/newsreader`, then import them in the root layout.

Re-theme by overriding tokens after the import (colors, radii, density), never by editing components.

## Status
Done: tokens, build, ~25 components, playground. Next: Storybook, tests, charts, DataTable, date picker, publishing (needs the `1126labs` GitHub org). See PLAN.md.

## Two ways things reach an app
1. **Package** (`bun add @harshitmahajan/ui`): tokens and all core components. Upgrading updates every app.
2. **Registry** (`npx shadcn@latest add @1126/list-page`): page blocks copied into the app and then editable (still bound by the style rules). Add to the app's `components.json`:
```json
"registries": { "@1126": { "url": "https://<docs-domain>/r/{name}.json", "headers": { "Authorization": "Bearer ${REGISTRY_TOKEN}" } } }
```
and put `REGISTRY_TOKEN` in `.env.local`.
