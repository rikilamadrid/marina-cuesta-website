# Metadata & JSON-LD (Person + CreativeWork)

## Status

Not Started

## Goals

- Create `src/lib/seo.ts` with helpers for metadata + JSON-LD, populated from **Site Settings**.
- Add **`Person` JSON-LD** in the root layout: `name`, `jobTitle`, `image` (absolute URL to her headshot), `url`, `sameAs` (LinkedIn/Behance/Instagram/Vimeo), `knowsLanguage` (en/es), `award`, `worksFor`, `alumniOf`.
- Add **`CreativeWork` JSON-LD** on each `/work/[slug]`.
- Add per-page metadata via `generateMetadata` (title, description, canonical) for home, `/work/[slug]`, `/about`, `/press`.
- Semantic HTML audit: exactly one `<h1>` per page; descriptive headshot alt text.
- `npm run build` passes; JSON-LD validates (Rich Results / schema.org validator).

## Notes

- **Depends on:** Phases 3–4 pages exist; `10` for Site Settings data. First Phase 5 feature.
- Requirements: `@context/project-overview.md` → SEO, Google & the "AI Résumé" Photo (On-page).
- **One-photo rule:** JSON-LD `image` and `og:image` are the **same** headshot from Site Settings, as an absolute URL. OG image generation is the next feature (`23`) — reference it from metadata here.
- Absolute URLs need the deployed base URL — read from an env var (e.g. `NEXT_PUBLIC_SITE_URL`).

## Out of Scope

- The dynamic OG image endpoint itself — feature `23`.
- `sitemap.ts` / `robots.ts` — feature `24`.
- The off-page SEO checklist doc — feature `26`.
