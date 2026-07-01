# Hero Section

## Status

Not Started

## Goals

- Build `src/components/home/Hero.tsx` and render it as the top of the home page (`src/app/page.tsx`, id `top`).
- Layout (desktop): bilingual eyebrow "EXECUTIVE CREATIVE DIRECTOR · DIRECTORA CREATIVA" in garnet; the name as a typographic monument — "Marina" (Fraunces roman) + "Cuesta" (Fraunces italic, garnet); the one-line hero statement; a stat row (**20+ Years · 50+ Awards · 3 Markets · Cannes See It Be It**); and a **framed editorial headshot beside the name** (deliberately secondary, not a large glossy face).
- Data comes from **Sanity Site Settings** (`name`, `jobTitle`, `shortBio`, `headshot`) — never hardcode content.
- Headshot uses `next/image` + Sanity `urlFor()`; show a clearly-marked placeholder when no headshot is set.
- Responsive: on mobile the portrait drops to a modest image at the top; type scale tightens.
- `npm run build` passes; hero renders with seeded content.

## Notes

- **Depends on:** Phase 1 (tokens/fonts/shell) and `10` (queries + seeded site settings).
- Visual source of truth: `@context/screenshots/marina-example.png` and prototype `#top` (`@context/marina-cuesta.html` lines ~365–392, `hero-portrait` line 382). Desktop layout sketch in `@context/project-overview.md` → UI/UX.
- **One-photo rule:** this is the same headshot that later feeds About, `og:image`, and JSON-LD — read it only from Site Settings.
- Stats: the "20+ / 50+ / 3 / Cannes" figures — decide whether they're static brand copy or Site Settings fields; note the choice (prototype treats them as static).

## Out of Scope

- The hero mask-up line-by-line reveal animation — Phase 6 motion (`27`).
- Manifesto, work grid, recognition, contact — separate Phase 3 features.
- Nav color inversion — Phase 6.
