---
description: 1126 Labs design system rules. Apply to every UI change.
alwaysApply: true
---

# UI rules (@1126labs/ui)

All UI is built from `@1126labs/ui`. Do not hand-style anything the library already provides.

## Hard rules
1. Import components only from `@1126labs/ui`. Never import `@base-ui/react/*` directly in app code.
2. Use only token classes: `bg-canvas|surface|sunken|sidebar`, `text-fg|fg-muted|fg-subtle`, `border-border`, `rounded-control|button|card|popover`, `shadow-xs|sm|md|lg`, status tokens (`bg-danger-soft text-danger-soft-fg`, ...).
3. Never write hex/rgb colors, default Tailwind palette classes (`bg-red-500`, `text-white`), arbitrary values (`w-[317px]`, `text-[13px]`) or inline `style`. Run `bun run check:styles` before finishing.
4. Use spacing-scale classes (`gap-4`, `p-6`) for layout only. Never restyle a library component with `className` (margin, width and flex placement are fine; colors, radius, font and shadow are not).
5. Every screen renders inside `AppShell`, starts with `Page` + `PageHeader`, and uses `Section` for vertical rhythm. Wide data screens use `<Page width="wide">`.
6. Forms: wrap every input in `FormField` (label, hint, error). Buttons: one `primary` per view; secondary actions use `secondary` or `ghost`; destructive actions use `danger` and confirm in a `Dialog`.
7. Every list, table or panel that can be empty renders `EmptyState`. Loading content uses `Skeleton`; loading actions use `<Button loading>`.
8. Status is shown with `Badge` and a tone: neutral=draft, accent=in progress, success=done, warning=needs attention, danger=failed/overdue, info=informational.
9. Icon-only buttons need `aria-label` and a `Tooltip`.
10. Density is global (`data-density="compact"` on `<html>`). Never hard-code heights.

## When something is missing
Do not invent a styled `div`. Check the component list in the package README. If no component fits, stop and ask for one to be added to the library.
