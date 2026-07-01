# Sanity Schema — Press Mention

## Status

Not Started

## Goals

- Create `src/sanity/schema/pressMention.ts` (type name `pressMention`) matching the `PressMention` interface in `@context/project-overview.md`:
  - `title` (headline), `outlet` (e.g. Adweek, Cannes Lions), `type` (enum: interview / feature / award / talk / podcast), `date` (ISO), `link`, `order`.
- Plain-language titles + one-line descriptions; validation (required title/outlet/link; URL format on `link`).
- Editor preview shows outlet + headline + type.
- Register in `src/sanity/schema/index.ts`.
- Verify create/edit a press mention in `/studio`.
- `npm run build` passes.

## Notes

- **Depends on:** `05`. Independent of `06`/`07`.
- Press rows render as outlet-label + headline + arrow link (see `@context/screenshots/marina-example5.png`, "Press & Mentions", and prototype `#press` list ~line 470–478).
- Reuse the shared `link` object from `07` if one was created.
- Seed 2–3 placeholder mentions (Cannes See It Be It recognition; an "add your interviews here" prompt) — seeding is `10`.

## Out of Scope

- Drag-to-reorder wiring — feature `09`.
- Seeding — feature `10`.
- The `/press` page and home press teaser rendering — Phase 4 (`21`).
