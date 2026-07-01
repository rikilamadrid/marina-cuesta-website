# Sitemap & Robots

## Status

Not Started

## Goals

- Build `src/app/sitemap.ts` generating entries from Sanity content: home, `/work`, every `/work/[slug]`, `/about`, `/press` (exclude `/studio` and API routes).
- Build `src/app/robots.ts` allowing crawl of public pages, disallowing `/studio` and `/api/*`, and pointing to the sitemap.
- Use the absolute base URL from env (`NEXT_PUBLIC_SITE_URL`).
- Verify `/sitemap.xml` and `/robots.txt` output the expected URLs including seeded project slugs.
- `npm run build` passes.

## Notes

- **Depends on:** `10` (project slugs from Sanity) and pages from Phases 3–4. Independent of `22`/`23`.
- Requirement: `sitemap.ts` + `robots.ts` generated from Sanity (`@context/project-overview.md` → SEO On-page). Feeds the "top of Google" goal.

## Out of Scope

- Submitting to Google Search Console — that's an off-page manual step in the checklist (`26`).
- The revalidate webhook (`25`).
