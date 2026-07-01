# Project Card & Gradient Tile

## Status

Not Started

## Goals

- Build `src/components/work/ProjectCard.tsx`: a typographic tile showing category label (pill), client (small caps), and title (Fraunces), linking to `/work/[slug]`.
- When a project **has a cover**, render it (`next/image` + `urlFor()`); when it **has no cover**, render a tasteful **client-name-forward gradient tile** (garnet/oxblood/neutral palettes from the prototype) so the grid always looks intentional.
- Deterministic palette selection (e.g. by category or index) so tiles look curated, not random.
- Card is a reusable presentational component that takes a typed `Project` (subset) as props.
- Verify by rendering a small static list of seeded projects on a temporary page; remove the temp page after.
- `npm run build` passes.

## Notes

- **Depends on:** `10` (typed project data). This card is consumed by both the home featured grid (`15`) and the `/work` index (`14`) — build it once, first.
- Visual source: `@context/screenshots/marina-example3.png` (gradient tiles with category pill top-left, client + title bottom-left) and prototype grid/tile CSS + palettes (`@context/marina-cuesta.html`, `.grid`, gradient tile styles).
- Tokens only — no magic hex; palettes from the prototype ported into `tokens.css`/`@theme`.

## Out of Scope

- The `/work` page, filtering, and search — feature `14`.
- Hover motion (lift + shadow bloom + "View project →" slide-in) — Phase 6 (`27`); a basic non-animated hover state is fine here.
- The project detail page — Phase 4 (`18`).
