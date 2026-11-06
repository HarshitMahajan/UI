# UI Kit

Our own component library, on top of shadcn/ui. Browse the site, open a component, and install just that one into a Next.js + shadcn project. The code is copied into the project, and you can edit it there.

Every component is built on [Base UI](https://base-ui.com) and written in strict TypeScript. Radix isn't allowed: `scripts/gen-registry.mjs` fails if a component imports it.

## Use it in an app
You need read access to this repo, and `gh auth login` done once.

```bash
bunx --bun shadcn@latest add HarshitMahajan/UI/sidebar-1
```

```tsx
import { Sidebar1 } from "@/components/kit/sidebar-1";
```

- Components go in `components/kit/`, so your `components/ui/` is never touched.
- They use the shadcn tokens already in your `globals.css`, plus a few they add (`success`, `danger`, `warning`, `info`).
- List everything with `bunx --bun shadcn@latest list HarshitMahajan/UI`.
- App builds and deploys need nothing new, because the code is committed in the app.

## How it fits together
- **Installs** read `registry.json` and the component files straight from GitHub, through the shadcn CLI. No server is involved.
- **The docs site** is only for browsing. It's a static Next.js site and can be hosted anywhere.

## Host the docs on Vercel
Import this repo in Vercel. It detects Next.js and bun, and no settings or environment variables are needed.

The site shows each component's source. Anyone who has its URL can read that code, so turn on Vercel's Deployment Protection if it should stay private. Check that your Vercel plan covers company use and production protection.

## Layout
- `registry/kit/*.tsx`: the components, one file each. They install to `components/kit/`
- `registry/examples/*.tsx`: the live examples on the site
- `registry/styles/theme.css`: the site's tokens, and the optional full UI Kit look
- `registry.json`: generated. Commit it, because installs read it
- `src/docs.ts`: each component's page content
- `scripts/gen-registry.mjs`: builds `registry.json` from the above

## Run it
```bash
bun install
bun run dev
```

## Add a component
1. Add `registry/kit/<name>.tsx`, built on Base UI and tokens. Import other components as `@/components/kit/<other>`, and export a type for each part's props.
2. Add at least one example per variation to `registry/examples/`.
3. Add an entry called `<name>` to `src/docs.ts`, with every section: usage, composition, features, examples, accessibility and API. Its page and gallery tile appear on their own.
4. Run `bun run typecheck` and `bun run build`, check it in a browser in light and dark, then commit `registry.json` with it.
