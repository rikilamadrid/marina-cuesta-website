# Fonts (Fraunces + Hanken Grotesk)

## Status

Not Started

## Goals

- Load **Fraunces** (display; weights 300–600, include italic) and **Hanken Grotesk** (body; 300–700) via `next/font/google` in `src/app/layout.tsx`.
- Expose each as a CSS variable (`--font-display`, `--font-body`) and wire them into the `@theme` in `globals.css` so `font-display` / `font-body` utilities work.
- Apply Hanken Grotesk as the default body font; Fraunces available for headings/display.
- Use `font-display: swap`; preload the display weight used above the fold.
- Render a quick sample (`<h1>` in Fraunces italic garnet + body paragraph in Hanken) to confirm both load, then remove the sample.
- `npm run build` passes.

## Notes

- **Depends on:** `01-design-tokens-and-globals` (the `@theme` block must exist).
- Typography intent (`@context/project-overview.md` → Typography): Fraunces is high-contrast fashion-editorial, used with restraint; italic Fraunces often in garnet for emphasis. Hanken is the clean humanist grotesque for body/UI/labels.
- See the hero in `@context/screenshots/marina-example.png` ("Marina" roman + "Cuesta" italic garnet in Fraunces) and the manifesto `@context/screenshots/marina-example2.png` for the display voice.
- Prototype uses `--display` / `--body` CSS vars — mirror that naming intent.

## Out of Scope

- Type scale / heading component system — apply inline per section as built; no global heading abstraction yet.
- The hero mask-up reveal animation (Phase 6 motion).
- Uppercase eyebrow/label letter-spacing polish beyond a sensible default.
