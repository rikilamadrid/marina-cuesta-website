# Current Feature

Feature 04 — Spine (Vertical Nameplate) & Footer

## Status

In Progress

## Goals

- Build `src/components/layout/Spine.tsx`: the signature vertical nameplate "Marina Cuesta — Executive Creative Director" fixed to the left edge on desktop, rotated, using `mix-blend-mode: difference` so it stays legible over both paper and oxblood.
- Spine is `aria-hidden` (decorative) and **hidden at ≤980px**.
- Build `src/components/layout/Footer.tsx`: `© [year] Marina Cuesta · Executive Creative Director · Made with intention.` with the year computed dynamically.
- Mount both in the layout shell around `{children}`.
- Verify the spine visually inverts when scrolled over a dark block (drop a temporary oxblood section to test, then remove).
- `npm run build` passes.

## Notes

- Full spec: `@context/features/04-spine-and-footer.md`. Completes **Phase 1 — Foundations**.
- **Depends on:** `03` (shell exists to mount into) — done.
- Spine source: `@context/marina-cuesta.html` L88–94 (`.spine` / `.spine span`) + markup L347. `position:fixed;left:18px;top:0;height:100vh;width:34px;z-index:60;mix-blend-mode:difference`; span `writing-mode:vertical-rl;rotate(180deg);` Hanken 600, .42em, 12px, uppercase, `color:#fff`.
- Spine hides at `@media(max-width:980px)` (L311) → use `max-[980px]:hidden` equivalent (`min-[981px]:flex`).
- Footer source: L269 + markup L493. `background:var(--oxblood);color:rgba(243,236,227,.55);padding:30px 0;text-align:center;font-size:11px;letter-spacing:.08em;border-top:1px solid rgba(243,236,227,.12)`.
- Footer year computed dynamically (server component, `new Date().getFullYear()`).

## Out of Scope

- Site name/title from Sanity — spine/footer text is brand chrome; hardcoding "Marina Cuesta" is acceptable (not editable content).
- Any page content between Nav and Footer (Phase 3+).
- Motion on the spine.

## History

- **2026-07-01** — Initial Next.js + Tailwind v4 setup. Scaffolded from Create Next App, removed default boilerplate (demo page, SVGs, README, AGENTS.md), added project context docs. Committed (`chore: initial commit`) and pushed to `rikilamadrid/marina-cuesta-website`. Set dev port to 3003.
- **2026-07-01** — Feature 01 (Design Tokens & Global Styles) complete. Ported all surface/ink/accent/form tokens into `src/app/globals.css` via Tailwind v4 `@theme` (no JS config); set base `body`/`html`/`::selection`. Verified `bg-*`/`text-*`/`font-*` utilities resolve with a throwaway swatch, then removed it. Merged to main.
- **2026-07-01** — Feature 02 (Fonts) complete. Loaded Fraunces (300–600 + italic, `--font-fraunces`) and Hanken Grotesk (300–700, `--font-hanken`) via `next/font/google` in `layout.tsx` with `display: swap` + `preload`. Wired both into `@theme` (`--font-display`/`--font-body`) referencing the next/font vars with prototype fallback stacks, so `font-display`/`font-body` utilities work and Hanken is the body default. Merged to main.
- **2026-07-01** — Feature 03 (Root Layout Shell & Nav) complete. Built `src/components/layout/Nav.tsx` (`'use client'`): right-aligned links (Work/About/Recognition/Press/Contact → in-page anchors), outlined STUDIO pill (gear svg) → `/studio`, garnet underline hover. Scroll state (`scrollY > 8`) adds paper/85 bg + backdrop-blur + border, tightens padding. Mobile ≤680px (`min-[681px]`/`max-[680px]` breakpoints) collapses links into an accessible hamburger dropdown (animated burger→X, `aria-expanded`/`aria-controls`, closes on tap). Mounted in `layout.tsx` shell above `{children}`; layout stays a server component. Merged to main.
</content>
