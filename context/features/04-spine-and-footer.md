# Spine (Vertical Nameplate) & Footer

## Status

Not Started

## Goals

- Build `src/components/layout/Spine.tsx`: the signature vertical nameplate "MARINA CUESTA — EXECUTIVE CREATIVE DIRECTOR" fixed to the left edge on desktop, rotated, using `mix-blend-mode: difference` so it stays legible over both paper and oxblood.
- Spine is `aria-hidden` (decorative) and **hidden at ≤980px**.
- Build `src/components/layout/Footer.tsx`: `© [year] Marina Cuesta · Executive Creative Director · Made with intention.` with the year computed dynamically.
- Mount both in the layout shell around `{children}`.
- Verify the spine visually inverts when scrolled over a dark block (drop a temporary oxblood section to test, then remove).
- `npm run build` passes.

## Notes

- **Depends on:** `03-layout-shell-and-nav` (shell exists to mount into).
- Spine source: `@context/marina-cuesta.html` line 347 (`<div class="spine">`) and the `mix-blend-mode` handling near line 672 (`darkSections`). The vertical nameplate is visible along the left edge in `@context/screenshots/marina-example3.png` and `marina-example5.png`.
- Footer source: prototype line 493; footer visible at bottom of `@context/screenshots/marina-example6.png`.
- This completes **Phase 1 — Foundations**: tokens, fonts, Nav, Spine, Footer all ported from the prototype.

## Out of Scope

- Site name/title coming from Sanity — the spine and footer text are brand chrome; hardcoding "Marina Cuesta" here is acceptable (it's not editable content). Revisit only if it must read from siteSettings.
- Any page content between Nav and Footer (Phase 3+).
- Motion on the spine.
