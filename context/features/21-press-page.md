# Press Page (/press)

## Status

Not Started

## Goals

- Build `src/app/press/page.tsx` (server component) fetching all press mentions (ordered) and `src/components/press/PressList.tsx` to render them.
- Each row: outlet label (garnet small caps) · headline (Fraunces) · type · external arrow link — full-row is a link to the piece.
- Graceful empty state; try/catch around the fetch.
- Ensure the "Press" nav link resolves here (and/or the on-home press teaser links here).
- `npm run build` passes; seeded press placeholders render as links.

## Notes

- **Depends on:** `08` (schema), `10` (queries/seed). Independent of About/detail.
- Visual source: "Press & Mentions" list in `@context/screenshots/marina-example5.png` (outlet label + headline + top-right arrow) and prototype `#press` list (`@context/marina-cuesta.html` ~lines 470–478).
- Press types come from schema `08` (interview / feature / award / talk / podcast).
- This completes **Phase 4** — all dedicated pages (`/work/[slug]`, `/about`, `/press`) exist.

## Out of Scope

- Per-page metadata / OG — Phase 5.
- Filtering/sorting press by type (only if requested).
- Motion — Phase 6.
