# Current Feature

Feature 02 — Fonts (Fraunces + Hanken Grotesk)

## Status

Done

## Goals

- Load **Fraunces** (display; weights 300–600, include italic) and **Hanken Grotesk** (body; 300–700) via `next/font/google` in `src/app/layout.tsx`.
- Expose each as a CSS variable (`--font-display`, `--font-body`) and wire them into the `@theme` in `globals.css` so `font-display` / `font-body` utilities work.
- Apply Hanken Grotesk as the default body font; Fraunces available for headings/display.
- Use `font-display: swap`; preload the display weight used above the fold.
- Render a quick sample (`<h1>` in Fraunces italic garnet + body paragraph in Hanken) to confirm both load, then remove the sample.
- `npm run build` passes.

## Notes

- Full spec: `@context/features/02-fonts-setup.md`.
- **Depends on:** `01-design-tokens-and-globals` (done — `@theme` block exists with `--font-display` / `--font-body` placeholders).
- Prototype (`@context/marina-cuesta.html` L64–65) uses `--display:'Fraunces',Georgia,serif` and `--sans:'Hanken Grotesk',...`. Mirror that fallback stack.
- Google Fonts axes in prototype: `Fraunces:ital,opsz,wght@0,9..144,300;...600;1,...400;1,...500` + `Hanken Grotesk:wght@300;400;500;600;700`.
- Italic Fraunces often in garnet for emphasis (hero "Cuesta", manifesto voice).

## Out of Scope

- Type scale / heading component system — apply inline per section as built; no global heading abstraction yet.
- The hero mask-up reveal animation (Phase 6 motion).
- Uppercase eyebrow/label letter-spacing polish beyond a sensible default.

## History

- **2026-07-01** — Initial Next.js + Tailwind v4 setup. Scaffolded from Create Next App, removed default boilerplate (demo page, SVGs, README, AGENTS.md), added project context docs. Committed (`chore: initial commit`) and pushed to `rikilamadrid/marina-cuesta-website`. Set dev port to 3003.
- **2026-07-01** — Feature 01 (Design Tokens & Global Styles) complete. Ported all surface/ink/accent/form tokens into `src/app/globals.css` via Tailwind v4 `@theme` (no JS config); set base `body`/`html`/`::selection`. Verified `bg-*`/`text-*`/`font-*` utilities resolve with a throwaway swatch, then removed it. Merged to main.
- **2026-07-01** — Feature 02 (Fonts) complete. Loaded Fraunces (300–600 + italic, `--font-fraunces`) and Hanken Grotesk (300–700, `--font-hanken`) via `next/font/google` in `layout.tsx` with `display: swap` + `preload`. Wired both into `@theme` (`--font-display`/`--font-body`) referencing the next/font vars with prototype fallback stacks, so `font-display`/`font-body` utilities work and Hanken is the body default. Verified both render (Fraunces roman + italic garnet, Hanken body) via a throwaway sample, then removed it. `npm run build` passes.
</content>
</invoke>
