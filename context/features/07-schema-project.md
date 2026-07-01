# Sanity Schema — Project

## Status

Not Started

## Goals

- Create `src/sanity/schema/project.ts` (type name `project`) matching the `Project` interface in `@context/project-overview.md`:
  - `title`, `slug` (from title), `client`, `category` (enum: **Global Brands · Multicultural · Feminist & Social · Culture & Film**), `year`, `market` (multi-select: US / U.S. Hispanic / Europe / Global), `role`, `summary` (card one-liner), `body` (Portable Text), `cover` (image, hotspot enabled, optional), `gallery` (array of image or `{ videoUrl }`), `externalLink`, `featured` (boolean, "Show on homepage"), `order` (number, for manual sort).
- Plain-language titles + one-line descriptions on every field; validation rules (required title/client/category/summary; URL format on links).
- **Editor-friendly preview**: show client + title + category + cover thumbnail.
- Register in `src/sanity/schema/index.ts`.
- Verify create/edit a project in `/studio`.
- `npm run build` passes.

## Notes

- **Depends on:** `05`. Independent of `06`/`08`.
- Category is a fixed set used by the Work filters (`@context/screenshots/marina-example3.png` shows the filter chips: All / Global Brands / Multicultural / Feminist & Social / Culture & Film).
- `cover` is optional by design — projects with no cover render a gradient tile (built in `13`).
- Shared `link` object (`src/sanity/schema/objects/link.ts`) may be reused by press; create it here if convenient and note it.
- Seed project list (category → client → title) is in `@context/project-overview.md` → Seed Content; seeding happens in `10`.

## Out of Scope

- Drag-to-reorder UI wiring (`@sanity/orderable-document-list`) — feature `09`.
- Seeding real projects — feature `10`.
- Project card / detail rendering — Phase 3 (`13`, `14`) and Phase 4 (`18`).
- Gallery/video rendering — Phase 4 (`19`).
