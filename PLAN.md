# Internal UI Library: Build Plan

Audience: Claude Code (executing), Harshit (reviewing).
Goal: one internal, versioned component library that every ERP-class app installs with `bun add`. Built on **Base UI** (the shadcn Base UI flavour), restyled through a single token file. A backend-leaning dev plus Cursor should produce consistent UI by composing these components and changing only tokens.

Confirmed by Harshit (2026-11-06): English only (no i18n/RTL; en-IN number/date formatting is enough); package name `@1126labs/ui`; repos live on GitHub; apps deploy on Vercel; charts are required; scope is "everything" (all phases below are in scope, none are optional extras).

---

## 1. Principles (these decide every later choice)

1. **Tokens are the only styling input.** Components never contain raw colors, pixel values or ad-hoc radii. Everything reads a named token.
2. **Closed system.** The Tailwind theme is wiped (`--color-*: initial`, etc.), so off-system classes like `bg-red-500` do not exist. Compliance is enforced by tooling, not goodwill.
3. **We own the source, consumers own nothing.** Apps install a package; they do not copy component files. Updating the look = bump the version.
4. **Behavior is specified, not implied.** Every component has a written state matrix (hover, press, focus, disabled, loading, invalid, empty) and a story for each state.
5. **Agent-first.** The package ships rules, a component manifest and lint config so Cursor/Claude Code follow the system automatically.
6. **Framework-light.** The library depends on React and Tailwind only. No `next/*` imports (links and routers are injected).
7. **ERP-first density.** Comfortable and compact density are both first-class (`data-density` attribute).

Non-goals (for now): dark mode (token names are dark-ready, no dark values shipped), public release, theming per tenant at runtime, mobile-native.

---

## 2. Repo layout (bun workspaces)

```
ui/                              # repo root
  package.json                   # workspaces: ["packages/*", "apps/*"]
  bunfig.toml                    # registry scope + auth (see section 8)
  .changeset/                    # versioning
  .github/workflows/             # ci.yml, release.yml
  packages/
    ui/                          # published as @1126labs/ui
      src/
        components/              # one folder per component: component.tsx, component.stories.tsx, component.test.tsx
        styles/
          tokens.css             # layer 1 primitives + layer 3 component/density tokens
          theme.css              # layer 2 semantic tokens: @theme static { ... }
          base.css               # body, focus ring, selection, reduced-motion
          utilities.css          # motion-*, type-display, type-label, anim-popup, anim-fade
          index.css              # imports the four above in order
        lib/cn.ts                # clsx + tailwind-merge extended with our token names
        index.ts                 # barrel export
      rules/                     # cursor + AGENTS rules shipped to consumers
      bin/init.mjs               # `bunx @1126labs/ui init` copies rules into an app
      scripts/                   # build helpers, manifest generator
      tsup.config.ts
    eslint-plugin/               # optional, @1126labs/eslint-plugin-ui (milestone 5)
  apps/
    storybook/                   # docs + visual states (the "design system website")
    playground/                  # a real Next.js app that consumes the BUILT package
  templates/
    next-starter/                # app template: Next + shell + rules pre-wired
```

Why a `playground` app: it installs the packed tarball like a real consumer, so it catches missing exports, missing `"use client"`, and Tailwind scanning problems that Storybook hides.

---

## 3. Token and theming contract

Three layers, all in `packages/ui/src/styles`:

| Layer | What | Example | Who may change |
|---|---|---|---|
| 1 Primitives | raw values | `--p-stone-900`, `--p-olive-600` | library maintainers, or an app theme override |
| 2 Semantic | meaning, exposed as Tailwind utilities | `--color-canvas`, `--color-fg-muted`, `--color-accent` | same |
| 3 Component | shape, size, density | `--radius-button`, `--control-h-md`, `--row-h` | same |

Rules:
- Components use **only layers 2 and 3**.
- The token names are the public API. Renaming or removing one is a **major** version.
- Consumers retheme by adding one CSS file after the library import that reassigns tokens. No component edits.
- Light theme only. Keep a reserved `[data-theme]` hook so a dark set can be added later by remapping layer 2.

Token groups to define (a working draft exists, see section 14):
surfaces (canvas, sidebar, surface, surface-raised, sunken, overlay), interaction fills (hover, pressed, selected), lines (border, border-strong), text (fg, fg-muted, fg-subtle), primary (ink), accent (olive) plus ring, status (danger/success/warning/info, each: solid, fg-on-solid, soft, fg-on-soft), radii (xs to full plus semantic control/button/badge/card/popover), shadows (xs to lg), chart palette (`--chart-1` to `--chart-8` categorical, a sequential and a diverging ramp, plus grid/axis/tooltip tokens; every color pair contrast-checked, and never color alone: series also differ by marker or dash), type (sans, display serif, mono, and a 7-step size scale), motion (3 durations plus one easing), layout (sidebar widths, topbar height, page padding, content max widths), density (control heights sm/md/lg, row height, card padding, section gap, field gap).

Typography: Inter for UI, a serif (Newsreader) for page titles. Fonts are an **optional** import (`@1126labs/ui/fonts.css` using fontsource, so there is no network fetch at build). Apps with brand fonts just override `--font-sans` / `--font-display`.

---

## 4. Component inventory and phases

Source column: **Base UI** = styled wrapper over a Base UI primitive; **Custom** = we build it (Base UI has no equivalent); **Lib** = built on a third-party headless lib.

Base UI currently provides: Accordion, AlertDialog, Autocomplete, Avatar, Button, Checkbox, CheckboxGroup, Collapsible, Combobox, ContextMenu, Dialog, Drawer, Field, Fieldset, Form, Input, Menu, Menubar, Meter, NavigationMenu, NumberField, OTPField, Popover, PreviewCard, Progress, Radio, RadioGroup, ScrollArea, Select, Separator, Slider, Switch, Tabs, Toast, Toggle, ToggleGroup, Toolbar, Tooltip. It has **no** table, date picker, calendar, sidebar, breadcrumb, pagination or command palette.

### Phase 1: foundation (needed by every screen)
Button (primary, secondary, ghost, danger, link; sm/md/lg/icon), Input, Textarea, FormField (Field), Checkbox, Switch, Radio/RadioGroup, Select, Badge, Card (+Header/Body/Footer, Stat), Separator, Spinner, Skeleton, Avatar, Tooltip, Tabs, Dialog, AlertDialog, Popover, Menu (dropdown), Toast, EmptyState, Table (static), Breadcrumb (Custom), AppShell, SidebarSection/Item, Page, PageHeader, Section.

### Phase 2: ERP forms
NumberField and CurrencyInput (locale aware), Combobox and Autocomplete (async search), DatePicker and DateRangePicker (**Lib**: react-day-picker styled with our tokens, since Base UI has none), Fieldset, FormSection and FormGrid layout helpers, FileUpload, TagInput, Slider, ToggleGroup / SegmentedControl, Accordion, Collapsible.

### Phase 3: data
DataTable (**Lib**: TanStack Table): sorting, column filters, global search, column visibility, pinning, resizing, row selection with bulk-action bar, pagination, virtualization for large sets, density, loading/empty/error states, inline cell editing, export hook. Also FilterBar with saved views, Pagination, Tree, Timeline/AuditLog, Stepper, KPI tiles, formatting helpers (money, date, quantity; en-IN grouping available).

### Phase 3b: charts
**Lib**: Recharts (what shadcn charts are built on), wrapped so no app ever touches raw Recharts styling. A `ChartContainer` that injects our chart tokens, plus `LineChart`, `AreaChart`, `BarChart` (grouped, stacked, horizontal), `PieChart/Donut`, `ComposedChart` (bar + line), `Sparkline`, `Gauge/Meter` (Base UI Meter for simple cases), `Funnel`, `Heatmap` (custom), and shared pieces: `ChartTooltip`, `ChartLegend` (clickable to toggle series), `ChartEmpty/ChartLoading/ChartError` states, axis formatters (money, compact numbers, dates). Rules: tokens only for colors, tooltips follow the Popover look, charts are keyboard reachable and expose a data-table fallback for screen readers, and resize responsively inside Cards. Verify Recharts compatibility with React 19 at M8.

### Phase 4: page patterns and templates
ListPage, DetailPage, FormPage, SettingsPage, Wizard, master-detail split with resizable panes, right-hand side panel (Drawer), command palette (Cmd+K), notification center.

---

## 5. Component standards (definition of done)

Every component must have all of these before merge:

**API conventions**
- Named exports, shadcn-style flat names (`Dialog`, `DialogContent`, `DialogFooter`) so Cursor already knows the shape.
- `className` accepted and merged with `cn()`; consumers may add layout classes (margin, width) but not restyle.
- React 19: `ref` is a normal prop. Spread remaining props onto the Base UI part.
- Variants via `cva`, and the `cva` function is exported (`buttonStyles`) so a link can look like a button.
- Polymorphism through Base UI's `render` prop. No `asChild`, no `next/link` inside the library.
- State styling through Base UI data attributes (`data-[checked]`, `data-[disabled]`, `data-[popup-open]`, `data-[invalid]`), never JS class toggling.
- `"use client"` only on files that need it. Static components (Card, Badge, Table) stay server-safe.

**Behavior spec (written in the component's doc comment and its story)**
hover, pressed, keyboard focus, disabled, loading (if relevant), invalid (if relevant), empty (if relevant), plus motion (which duration token, which property).

**Accessibility (WCAG 2.2 AA)**
Keyboard operable, correct roles/labels, visible focus, contrast checked on every token pair, `prefers-reduced-motion` respected.

**Verification**
A story per state, a behavior test (Vitest + Testing Library), an a11y check in Storybook, a visual snapshot in comfortable and compact density.

---

## 6. Build and packaging

- Build: **plain `tsc`** (not tsup), implemented and verified. Source files import siblings with explicit `.tsx`/`.ts` extensions and `rewriteRelativeImportExtensions` rewrites them to `.js`. Output is per-file ESM plus `.d.ts` in `dist/`, which keeps tree-shaking and preserves `"use client"` automatically. `scripts/build.mjs` also fails the build if a client file loses its directive.
- **`"use client"` preservation** is verified by that script and by the playground importing the built package into server components.
- Styles: ship the CSS **as source** (not compiled) in `dist/styles/*.css`, because consumers run Tailwind themselves.
- `package.json` essentials:
  - `"type": "module"`, `"sideEffects": ["**/*.css"]`
  - `exports`: `"."`, `"./styles.css"`, `"./fonts.css"` (optional), `"./rules/*"`, plus per-component subpaths if useful
  - `peerDependencies`: `react`, `react-dom`, `tailwindcss` (v4), `@base-ui/react`, `lucide-react`
  - dependencies: `class-variance-authority`, `clsx`, `tailwind-merge`
  - `bin`: `{ "1126-ui": "./bin/init.mjs" }`
- Validate every build with `publint` and `@arethetypeswrong/cli` against the packed tarball.
- `bun pm pack` produces the tarball that `playground` and the starter template install in CI.

Verified versions at planning time (2026-11-06): next 16.4.5, react 19.3.1, `@base-ui/react` 1.9.0, tailwindcss 4.3.4, tailwind-merge 3.7.0, class-variance-authority 0.7.1. Pin ranges from these, re-check at start.

---

## 7. Consumer contract (Tailwind v4)

An app's `globals.css` is three lines:

```css
@import "tailwindcss";
@import "@1126labs/ui/styles.css";
@source "../node_modules/@1126labs/ui/dist";   /* lets Tailwind see the library's class names */
@import "./theme-overrides.css";          /* optional: the app's token overrides */
```

Verified in `apps/playground` (Next 16, Turbopack, bun workspace): the `@source` path through the workspace symlink works, and library classes (`rounded-button`, `type-display`, `bg-sidebar`) appear in the generated CSS. Still to confirm against a real registry install:
- the `@source` path is correct for bun workspaces and for a flat install;
- the wiped Tailwind theme applies app-wide (intended), so app code can only use token utilities;
- the optional fonts import works without network access.

---

## 8. Distribution and hosting (internal only)

**Decision: GitHub Packages (npm registry).** Your repos are on GitHub, it is private, needs no new infrastructure, and access follows GitHub permissions. Alternatives considered: Verdaccio (you would operate it), paid private npm/Cloudsmith (cost), git dependency (weak versioning, needs a committed `dist`).

Hard constraints to verify first (M6):
- **The npm scope must match the GitHub owner.** `@1126labs/ui` requires the repo to be owned by a GitHub org or user named exactly `1126labs`. If the org has a different name, either rename the scope to match or move the repo. Settle this before anything is published.
- `package.json` of the library needs `"repository"` pointing at the repo and `"publishConfig": { "registry": "https://npm.pkg.github.com" }`.
- GitHub Packages historically only accepts **classic personal access tokens** for installs (`read:packages`), not fine-grained ones. Check current GitHub docs; if still true, create the token under a machine/bot account, not a person's account.

Bun config in the library repo and in every consuming app (verify syntax against current Bun docs):

```toml
# bunfig.toml (committed; contains no secret, the token is read from the environment)
[install.scopes]
"@1126labs" = { token = "$NPM_TOKEN", url = "https://npm.pkg.github.com/" }
```

Tokens:
- **Developers (local):** `NPM_TOKEN` in their shell profile, read-only.
- **GitHub Actions (library repo):** publishes with the built-in `GITHUB_TOKEN` (`packages: write`).
- **GitHub Actions (app repos):** `NPM_TOKEN` as a repository or org secret, read-only.
- **Vercel (every app project):** add `NPM_TOKEN` under Project Settings, Environment Variables, enabled for Production, Preview and Development. Without it, installs fail with a 401 on `@1126labs/ui`. Vercel uses Bun when it finds `bun.lock`; confirm the installed Bun version honors `bunfig.toml` scopes on Vercel, and as a fallback add an `.npmrc` with the same scope.
- Use an org-level secret so a new app does not need token setup from scratch.

Vercel hosting for the library's own sites:
- Deploy `apps/storybook` as its own Vercel project, with Vercel Authentication (deployment protection) on so docs stay internal.
- Every library PR gets a preview Storybook URL; the visual-regression job runs against it.
- Consider a Vercel Ignored Build Step so doc deploys only run when `packages/ui` or `apps/storybook` change.

Publishing: Changesets drives versioning; confirm whether the final step uses `bun publish` or `npm publish` (Bun supports publish, but verify it handles the GitHub Packages registry and provenance as needed).

---

## 9. Docs and playground

- **Storybook** (react-vite builder, Tailwind v4 plugin, a11y addon, interactions/test addon). It is the living spec.
- Foundations pages: principles, color, typography, spacing and density, radii, elevation, motion, layout and shell anatomy.
- Component pages: usage guidance, do and don't, the behavior spec table, every state as a story, and the props table generated from TypeScript.
- A "Granola-style app" reference story composing shell, list page and detail page, to show the intended feel.
- `playground` is a Next.js App Router app that consumes the built tarball and is the integration test.

---

## 10. Quality gates (CI must pass to merge)

1. `tsc --noEmit` strict, for all packages
2. Lint: ESLint with a Tailwind v4 plugin (candidate: `eslint-plugin-better-tailwindcss`, verify it supports our closed theme) plus a custom rule or script that fails on hex colors, `rgb()/hsl()` and arbitrary pixel values outside `styles/`
3. Unit tests (Vitest + Testing Library)
4. Storybook a11y checks (axe) on every story
5. Visual regression (Playwright screenshots of stories, comfortable and compact)
6. Build, then `publint` and `attw`
7. Packed tarball installed into `playground` and `templates/next-starter`, both must `next build`
8. Bundle size budget per entry

---

## 11. Guardrails for Cursor and other agents

Three enforcement layers, strongest first:
1. **Impossible:** closed Tailwind theme (off-system classes do not exist).
2. **Flagged:** lint rules (no raw colors, no arbitrary values, no direct `@base-ui/react` imports in apps, no hand-rolled `<button>` styling).
3. **Instructed:** rules shipped with the package.

Shipped artifacts:
- `rules/1126-ui.mdc` (Cursor, `alwaysApply: true`) and `rules/AGENTS.md`. Content: the hard rules, "import from `@1126labs/ui` only", how to compose a page (shell, PageHeader, Section, Card), the behavior spec, and a "before you build a new component, check the manifest" step.
- `bunx @1126labs/ui init` copies those into the app's `.cursor/rules/` and `AGENTS.md`, and prints the three-line CSS setup.
- A generated **component manifest** (`components.json` or `llms.txt`): every component, its props and variants, one correct usage example and one anti-example. The rules tell the agent to read it first.
- Version stamp inside the rules, so `init` can detect stale rules after an upgrade.

---

## 12. Release and versioning

- **Changesets** for versioning and changelogs, one changeset per PR.
- Semver policy: token rename/removal, prop removal, behavior change = **major**. New component, variant or token = **minor**. Bug fix = **patch**. A deliberate visual change (new radius, new accent) ships as **minor** with before/after screenshots in the PR and a changelog line, since it changes every app.
- Prerelease channel (`next` tag, canary versions) for trying changes in one app first.
- Release workflow: merge to main, Changesets opens a "Version Packages" PR, merging it publishes.
- Consumers: caret ranges plus Renovate or Dependabot PRs, so UI updates land as reviewable PRs.

---

## 13. Adoption

- `templates/next-starter`: Next.js, TypeScript, Tailwind v4, the library, the shell, an example list page, rules pre-installed. New apps start from it.
- Existing apps: install, add the three CSS lines, run `init`, then replace local components gradually.
- Onboarding doc for the backend dev: "compose pages from `@1126labs/ui`; if something is missing, ask for a component, do not style one."

---

## 14. Execution plan for Claude Code (milestones with acceptance criteria)

**M0 Repo bootstrap.** Bun workspaces, strict tsconfig base, lint/format, Changesets, CI skeleton. *Accept:* `bun install && bun run build && bun run typecheck` green on a clean clone.

**M1 Styles.** Create `styles/*.css` from the token contract. *Accept:* `playground` renders a page using only token utilities; changing one primitive in an override file visibly re-themes it; density attribute works.

**M2 Phase 1 components.** Seed from the existing prototype (section 15), add missing ones, make SidebarItem router-agnostic. *Accept:* every Phase 1 component meets section 5, has stories and tests.

**M3 Packaging.** tsup, exports map, `"use client"` preservation, d.ts, publint/attw. *Accept:* the packed tarball installs into a fresh `bun create next-app` project, builds, and renders a server component that uses `Card` and a client component that uses `Dialog`.

**M4 Docs.** Storybook with foundations and component pages. *Accept:* every component and every state is visible and passes a11y.

**M5 Agent guardrails.** Rules, `init` CLI, manifest generator, lint rules. *Accept:* in a scratch app, Cursor given "build an orders list page" produces only library components and no lint errors; adding `bg-red-500` or `#fff` fails lint.

**M6 Release pipeline.** Registry setup, tokens in CI, Changesets publish, canary channel. *Accept:* a test version publishes and installs through bun on a clean machine and on the deploy platform.

**M7 Phase 2 components.** **M8 DataTable and charts (Phase 3 and 3b).** **M9 Page patterns and starter template (Phase 4).** Same acceptance bar as M2. Additional M6 acceptance: a throwaway Vercel project with only `NPM_TOKEN` set installs `@1126labs/ui` and deploys the starter template. Additional M8 acceptance: every chart type renders from the same token set, passes contrast checks, and has loading/empty/error states.

---

## 15. Current build status (updated 2026-11-06)

Repo scaffolded locally at `1126labs-ui/` (bun 1.4.4 workspaces). Done and verified (typecheck, library build, `next build` of the playground, screenshots in comfortable and compact density, dialog/select/menu opened in a real browser):

- `packages/ui/src/styles/`: `tokens.css`, `theme.css`, `base.css`, `utilities.css`, `index.css`, optional `fonts.css`
- 25 components: Button, Input, Textarea, FormField, Checkbox, Switch, RadioGroup, Select, Slider, Progress, Badge, Card (+Stat), Separator, Spinner, Skeleton, Avatar, Tooltip, Tabs, Accordion, Dialog, Popover, Menu, Table, EmptyState, Breadcrumb, AppShell (+Sidebar, Page, PageHeader, Section). The shell has no router dependency (`render` prop for links).
- `scripts/check-styles.mjs` (bans hex/rgb, default palette classes, arbitrary sizes, inline styles; negative-tested), `rules/1126-ui.mdc` + `AGENTS.md` for consuming apps
- `apps/playground`: a composed home page and a components page

Not done yet (in plan order): Storybook and tests (M4), `init` CLI and component manifest and ESLint plugin (M5), publishing and Vercel token setup (M6, needs the `1126labs` GitHub org), toasts, AlertDialog, Combobox, NumberField, date picker, DataTable, charts, dashboards and page templates, command palette (M7 to M9).

Known small issues: playground nav links to `/orders`, `/inventory`, `/customers` 404 (they are placeholders); Slider, Progress, Menu and Accordion have been rendered but only lightly exercised.

---

## 16. Decisions to confirm (defaults in brackets)

Settled:
1. Package name: `@1126labs/ui`.
2. Registry: GitHub Packages. Deploy: Vercel (see section 8).
3. Charts: required (Phase 3b, Recharts).
4. Scope: everything in phases 1 to 4.

Still open (defaults in brackets, Claude Code should use the default unless told otherwise):
5. Does a GitHub org or user named exactly `1126labs` exist, and does it own the library repo? [must be true for the scope to work; see section 8]
6. Docs tool [Storybook, hosted on Vercel behind deployment protection].
7. Date picker [react-day-picker, restyled with tokens].
8. DataTable engine [TanStack Table].
9. Fonts [Inter + Newsreader via optional fontsource import; swap if you have brand fonts].
10. Locale needs [en-IN number/date formatting helpers in Phase 3; confirm other locales or RTL].
11. Also publish the ESLint plugin and starter template [yes, after M4].
12. Accessibility bar [WCAG 2.2 AA].
13. Seed with the shadcn CLI Base UI style if the current CLI supports it, otherwise port by hand [verify at M2].

Versions checked on npm at planning time (2026-11-06), re-check at M0: recharts 3.10.1, @tanstack/react-table 9.3.1, react-day-picker 10.0.2.

---

## 17. Docs site and block registry (built 2026-11-06)

Decision: **hybrid**. Core components and tokens ship in the npm package; page-level blocks ship through a shadcn-style registry and are copied into apps, where they may be edited under the style rules.

Built in `apps/docs`: a Next.js site (dogfoods the library) with a page per component (Preview, Usage, Source tabs with copy buttons) and per block (Preview, Install, Source); three blocks (list page, detail page, form page); `registry.json` built by `shadcn build` into `public/r/`; registry auth via `src/proxy.ts` (Bearer `REGISTRY_TOKEN`, open when unset).

Verified: docs build (30 static pages), screenshots, auth responses (401 without or with a wrong token, 200 with the right one), and the shadcn CLI resolved `@1126/list-page` from the registry with the header. Not verifiable in the sandbox: the last copy-to-disk step, because the CLI also needs shadcn's own color data from ui.shadcn.com, which the sandbox blocks. Run it once on a normal machine.

Open items: blocks import from `@1126labs/ui`, so the package must be published (or linked) before `add` can install its dependency; add syntax highlighting; add registry items for the tokens CSS if an app wants an eject path; decide how docs-site access is restricted on Vercel (the `/r` routes already have their own token check).
