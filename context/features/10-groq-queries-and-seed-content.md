# GROQ Queries & Seed Content

## Status

Not Started

## Goals

- Create `src/sanity/lib/queries.ts` with one exported GROQ query per data need: site settings (singleton), featured projects (`featured == true`, ordered), all projects (ordered), single project by slug, all press mentions (ordered).
- Type the query results (interfaces in `src/types/` or co-located) so front-end consumers are strongly typed.
- Seed Sanity with the real content from `@context/project-overview.md` → Seed Content:
  - Site Settings (name, job title, hero statement, email placeholder `hello@marinacuesta.com`, the four socials, **headshot placeholder clearly marked**, long bio, career arc, SEO defaults).
  - ~18 projects (category → client → title as listed); mark `featured: true` on the suggested ~6–8 (Pattern Bra, GOYA Prodigal Son, Apple, Shequel, Lululemon FEEL, NTARUPT, Schweppes First Time, Sitges).
  - 2–3 press placeholders.
- Verify a server component (temporary page) can fetch and log site settings + projects, then remove the temp page.
- `npm run build` passes.

## Notes

- **Depends on:** `06`, `07`, `08`, `09` (schemas + structure). Last Phase 2 feature — after this, real content exists to render in Phase 3.
- Seeding can be a scripted import (`@sanity/client` script) or manual entry in `/studio`; a repeatable script is preferred — note which you used.
- Bilingual accents are **chosen, not machine-translated** (`@context/coding-standards.md`). Use the exact copy from the seed section (e.g. "Directora Creativa", "Oda a la Mezcla").
- Use `next-sanity`'s `sanityFetch` (or equivalent) with cache tags now so the revalidation webhook (`25`) can target them later.

## Out of Scope

- The revalidate webhook itself — Phase 5.
- Real headshot / real cover images — placeholders only until the client provides them.
- Any UI — Phase 3 begins consuming these queries.
