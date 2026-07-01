# Project Detail Page (/work/[slug])

## Status

Not Started

## Goals

- Build `src/app/work/[slug]/page.tsx` with `generateStaticParams` from Sanity slugs (SSG/SSR) and a single-project GROQ query.
- Render: project hero (title, client, category), meta row (client · role · year · market), `summary`, the long write-up via the **PortableText** renderer, and the external link CTA (Behance / case study / film) when present.
- Build `src/components/work/ProjectDetail.tsx` for the layout.
- Graceful `notFound()` for unknown slugs; try/catch around the fetch.
- Soft page treatment consistent with the editorial system.
- `npm run build` passes; a seeded project renders at its slug.

## Notes

- **Depends on:** `17` (PortableText), `10` (queries/seed), `13`-era types. Category/role/year/market come from schema `07`.
- Route + behavior per `@context/project-overview.md` → Pages & Sections / Routing (SSR/SSG project detail, `generateStaticParams`).
- No dedicated detail screenshot exists — follow the editorial system (paper surface, Fraunces title, garnet accents) and the About page composition in `@context/screenshots/marina-example4.png` for tone.

## Out of Scope

- Gallery + video embeds — feature `19` (built right after, into this page).
- Per-page metadata, `CreativeWork` JSON-LD, and OG image — Phase 5 (`22`, `23`).
- Page-transition animation (soft fade home ↔ detail) — Phase 6.
