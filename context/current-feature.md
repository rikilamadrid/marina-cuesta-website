# Current Feature

Feature 01 — Design Tokens & Global Styles

## Status

Done

## Goals

- Port every design token from `@context/marina-cuesta.html` into `src/app/globals.css` using the Tailwind v4 `@theme` directive (NO `tailwind.config.*` file).
- Surfaces: `--color-paper #FAF7F2`, `--color-bone #F3ECE3`, `--color-blush #EBD9D2`.
- Ink: `--color-ink #1A1714`, `--color-ink-2 #5A524B`, `--color-line #E6DED3`.
- Accent: `--color-garnet #B11E3A`, `--color-garnet-deep #7C0B1B`, `--color-oxblood #3D0D17`.
- Form tokens: `--radius 3px`, `--shadow`, `--ease cubic-bezier(.22,.61,.36,1)`.
- Base `body`: paper background, ink text, line-height 1.5, antialiasing.
- Verify tokens resolve as Tailwind utilities (`bg-paper`, `text-garnet`) with a throwaway swatch, then remove it.
- `npm run build` passes.

## Notes

- Full spec: `@context/features/01-design-tokens-and-globals.md`.
- Token source of truth: `:root` block in `@context/marina-cuesta.html` (lines 54–68) and Design System in `@context/project-overview.md`.
- Tailwind **v4**, CSS-based config via `@theme` in `globals.css`. No JS/TS Tailwind config.
- Fonts wired in Feature 02 — leave `--font-display` / `--font-body` as `@theme` placeholders only.

## History

- **2026-07-01** — Initial Next.js + Tailwind v4 setup. Scaffolded from Create Next App, removed default boilerplate (demo page, SVGs, README, AGENTS.md), added project context docs. Committed (`chore: initial commit`) and pushed to `rikilamadrid/marina-cuesta-website`. Set dev port to 3003.
- **2026-07-01** — Feature 01 (Design Tokens & Global Styles) complete. Ported all surface/ink/accent/form tokens into `src/app/globals.css` via Tailwind v4 `@theme` (no JS config); set base `body`/`html`/`::selection`. Verified `bg-*`/`text-*`/`font-*` utilities resolve with a throwaway swatch, then removed it. Merged to main.
