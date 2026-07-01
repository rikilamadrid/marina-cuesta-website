# OG Image Generation (@vercel/og)

## Status

Not Started

## Goals

- Build `src/app/api/og/route.tsx` using `@vercel/og` (verify current version) to generate dynamic OG images on the editorial brand (paper/oxblood, Fraunces).
- Support a **profile/default card** (Marina's headshot + name + title) and a **per-project card** (project title + client + category).
- Provide square + landscape variants as needed for `og:image`.
- Wire the generated URLs into `generateMetadata` (`og:image`, `twitter:image`) from feature `22`; the profile card uses the **same headshot** as the JSON-LD image.
- Verify rendered OG images in a link preview / by hitting the endpoint.
- `npm run build` passes.

## Notes

- **Depends on:** `22` (metadata wiring). `og:image` = her headshot site-wide (`@context/project-overview.md` → SEO On-page).
- Fonts inside `@vercel/og` must be loaded explicitly (it doesn't inherit `next/font`) — load Fraunces/Hanken for the card.
- Keep the card composition consistent with the site's look (see hero `@context/screenshots/marina-example.png`).

## Out of Scope

- Sitemap/robots (`24`), revalidate webhook (`25`), checklist (`26`).
- Non-OG social embeds beyond Twitter/OG tags.
