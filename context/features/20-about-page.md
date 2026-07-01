# About Page (/about)

## Status

Not Started

## Goals

- Build `src/app/about/page.tsx` (server component) rendering the long-form bio in Marina's voice via **PortableText**, alongside her headshot.
- Include the **career arc** table (org → note: TBWA · Madrid, CHINA · Spain, Dieste · USA, The Marketing Arm, Creyentes / We Believers) and recognition/expertise highlights.
- All content from **Site Settings** (`longBio`, `headshot`, `careerArc`); headshot via `next/image` + `urlFor()` with placeholder fallback and descriptive alt ("Marina Cuesta, Executive Creative Director").
- Ensure the home "About" nav link resolves here (and/or the on-home about section links here).
- `npm run build` passes.

## Notes

- **Depends on:** `17` (PortableText), `10` (seeded site settings). Independent of the project detail features.
- Visual + copy source: `@context/screenshots/marina-example4.png` ("02 About", headshot left, bio right, career-arc rows) and seed bio/career-arc in `@context/project-overview.md` → Seed Content.
- **One-photo rule:** same headshot as hero/OG/JSON-LD — read from Site Settings only.
- One `<h1>` on the page; logical heading order (accessibility/SEO).

## Out of Scope

- Per-page metadata / OG — Phase 5 (`22`, `23`).
- The Recognition *section on the home page* — that was `16`; this is the dedicated About page (they may share content but are separate surfaces).
- Motion — Phase 6.
