# 1126 Labs UI

Internal design system: Base UI components + one token file. Package: `@1126labs/ui` (not yet published).

## Layout
- `packages/ui`: the library (`src/styles/*.css` = all design decisions, `src/components/*` = components, `rules/` = Cursor rules for consuming apps)
- `apps/playground`: a Next.js app that consumes the *built* package (integration test + visual reference)
- `PLAN.md`: full build plan and roadmap

## Commands (bun)
```bash
bun install
bun run build         # build the library into packages/ui/dist
bun run dev           # playground at http://localhost:3000 (rebuild the library after editing it)
bun run typecheck
bun run check:styles  # fails on hex colors, default palette classes, arbitrary sizes
```

## Using the library in an app
```css
/* app/globals.css */
@import "tailwindcss";
@import "@1126labs/ui/styles.css";
@source "../node_modules/@1126labs/ui/dist";   /* path relative to this file */
```
Optional fonts (Inter + Newsreader): install `@fontsource-variable/inter` and `@fontsource-variable/newsreader`, then import them in the root layout.

Re-theme by overriding tokens after the import (colors, radii, density), never by editing components.

## Status
Done: tokens, build, ~25 components, playground. Next: Storybook, tests, charts, DataTable, date picker, publishing (needs the `1126labs` GitHub org). See PLAN.md.
