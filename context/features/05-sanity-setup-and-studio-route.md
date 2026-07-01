# Sanity Setup & Embedded Studio Route

## Status

Not Started

## Goals

- Install and configure Sanity + `next-sanity` (verify current stable versions against official docs before installing — do not assume from memory).
- Create a Sanity project + dataset; store `projectId`, `dataset`, `apiVersion` in env (`.env.local`) and read them in `src/sanity/env.ts`.
- Create `src/sanity/lib/client.ts` (configured client) and `src/sanity/lib/image.ts` (`urlFor()` image builder).
- Create `sanity.config.ts` and the embedded Studio route at `src/app/studio/[[...tool]]/page.tsx`.
- Verify `/studio` loads the Sanity Studio in the browser (login works) with an empty schema.
- `npm run build` passes.

## Notes

- **Depends on:** Phase 1 complete (app shell exists). First Phase 2 feature.
- CMS-first is a **v1 requirement** — one embedded Studio, same app, one deploy, one login (`@context/project-overview.md` → The Studio). The STUDIO button from `03` links here.
- Structure targets (build them in later features): `src/sanity/schema/`, `src/sanity/lib/queries.ts`, `src/sanity/structure.ts`.
- Nav/Footer/Spine should probably NOT render on `/studio` (Studio is Sanity's own full-screen UI) — handle via route group or conditional layout; note the approach for later polish.
- Version rule and editor-first schema rules: `@context/coding-standards.md` (Content section).

## Out of Scope

- Any schema definitions (siteSettings/project/pressMention) — next three features.
- Desk structure / orderable lists — `09`.
- GROQ queries & seed content — `10`.
- The revalidation webhook — Phase 5 (`25`).
