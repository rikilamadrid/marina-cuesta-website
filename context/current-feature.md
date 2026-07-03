# Current Feature

Feature 29 - Performance Pass

## Status

Complete — implementation pass done and Lighthouse measured against the production build (all category budgets met).

## Goals

- `next/image` for the headshot and all covers with Sanity CDN width/quality params; lazy-load below the fold; correct `sizes`.
- `next/font` preloads the display weight; `font-display: swap`; avoid layout shift.
- Minimize client JS — confirm search/filter is the main interactive island; everything else server-rendered.
- Cap `backdrop-filter` to nav only; keep motion on transform/opacity.
- SSG/ISR everywhere appropriate.
- Hit the budget: **Lighthouse Performance, SEO, Best Practices ≥ 95**; **LCP < 2.0s on mobile**. Record scores.

## Notes

- Full spec: `@context/features/29-performance-pass.md`.
- **Depends on:** `27`, `28` (both merged) and all pages. Measure with Lighthouse (mobile) and fix regressions.
- Budget + guidance: `@context/project-overview.md` → Performance. Core Web Vitals also feed the "top of Google" goal.
- The hero headshot is the likely LCP element — ensure it's optimized/prioritized appropriately.
- Carry-forward fix from user feedback: About and Press now render as normal homepage sections while `/about` and `/press` remain available for direct links and SEO; build passed before starting Feature 29.
- Image pass: Sanity image URLs now use the named `createImageUrlBuilder` export, `auto=format`, explicit quality, and bounded dimensions for hero, About, project covers, gallery images, JSON-LD images, and OG profile images.
- LCP pass: hero headshot remains the only priority image and now uses explicit `fetchPriority="high"`; below-the-fold About headshot is lazy on home and priority only on the dedicated About route.
- Font pass: `next/font` now preloads only used weights (`Fraunces` 400/500 normal+italic; `Hanken Grotesk` 300/400/500/600) with `display: swap`.
- CMS copy pass: existing Sanity content was patched so hero/about/project/press copy reflects the more natural professional language instead of only updating the seed script.
- Verification: `npm run build` passes and all public routes remain static/SSG as expected; production header smoke test shows `/` prerender cache HIT.
- **Lighthouse (production build, `next start`, `/` home):** Performance **95**, Accessibility **96**, Best Practices **100**, SEO **100** — all category budgets (≥ 95) met. LCP is the remaining opportunity (largest score contributor, ~+20 headroom) but Performance still cleared 95; the headshot is already prioritized (`priority` + `fetchPriority="high"`). Any further LCP improvement would be a follow-up, not a budget miss.

## Out of Scope

- Responsive QA on a real phone — feature `30`.
- New features/content.

## History

The per-feature build log now lives in `CHANGELOG.md` at the repo root. When a feature merges to `main`, prepend its entry there (not here) — this file tracks only the active task.
