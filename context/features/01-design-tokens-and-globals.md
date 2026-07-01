# Design Tokens & Global Styles

## Status

Not Started

## Goals

- Port every design token from `@context/marina-cuesta.html` into `src/app/globals.css` using the Tailwind v4 `@theme` directive (NO `tailwind.config.*` file).
- Surfaces: `--color-paper #FAF7F2`, `--color-bone #F3ECE3`, `--color-blush #EBD9D2`.
- Ink: `--color-ink #1A1714`, `--color-ink-2 #5A524B`, `--color-line #E6DED3`.
- Accent: `--color-garnet #B11E3A`, `--color-garnet-deep #7C0B1B`, `--color-oxblood #3D0D17`.
- Form tokens: `--radius 3px`, `--shadow 0 24px 50px -24px rgba(61,13,23,.5)`, `--ease cubic-bezier(.22,.61,.36,1)`.
- Set base `body` styles: `paper` background, `ink` text, sensible default line-height and antialiasing.
- Verify tokens resolve as Tailwind utilities (e.g. `bg-paper`, `text-garnet`) by rendering a throwaway swatch block, then remove it.
- `npm run build` passes.

## Notes

- **First feature in the whole project** — nothing depends on anything except the existing Create-Next-App scaffold (`src/app/{layout,page,globals}.tsx/css`).
- Coding standard is explicit: Tailwind **v4**, CSS-based config via `@theme` in `globals.css`. Do not create a JS/TS Tailwind config (that's v3). See `@context/coding-standards.md`.
- Token source of truth: the `:root` block in `@context/project-overview.md` (Design System) and the `<style>` block at the top of `@context/marina-cuesta.html`.
- Fonts are wired up in the **next** feature — leave `--font-display` / `--font-body` as `@theme` placeholders here if convenient, but don't load fonts yet.
- Every screenshot (`@context/screenshots/marina-example*.png`) uses these exact surfaces/accents; get the hex values exact.

## Out of Scope

- Loading fonts (Fraunces / Hanken Grotesk) — that is `02-fonts-setup`.
- Any component (Nav, Spine, Footer, Hero) — later features.
- Motion tokens beyond `--ease` (Framer Motion is Phase 6).
- Dark-mode theming — this is a light editorial theme; the only dark moments are the oxblood manifesto/contact sections, handled per-section later.
