# Performance Pass

## Status

Not Started

## Goals

- `next/image` for the headshot and all covers with Sanity CDN width/quality params; lazy-load below the fold; correct `sizes`.
- `next/font` preloads the display weight; `font-display: swap`; avoid layout shift.
- Minimize client JS — confirm search/filter is the main interactive island; everything else server-rendered.
- Cap `backdrop-filter` to nav only; keep motion on transform/opacity.
- SSG/ISR everywhere appropriate.
- Hit the budget: **Lighthouse Performance, SEO, Best Practices ≥ 95**; **LCP < 2.0s on mobile**. Record scores.

## Notes

- **Depends on:** `27`, `28` and all pages. Measure with Lighthouse (mobile) and fix regressions.
- Budget + guidance: `@context/project-overview.md` → Performance. Core Web Vitals also feed the "top of Google" goal.
- The hero headshot is the likely LCP element — ensure it's optimized/prioritized appropriately.

## Out of Scope

- Responsive QA on a real phone — feature `30`.
- New features/content.
