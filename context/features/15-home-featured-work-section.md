# Home — Featured Work Section

## Status

Not Started

## Goals

- Add the "01 Selected Work" section to the home page (`src/app/page.tsx`, id `work`) rendering **featured projects only** (`featured == true`, sorted by `order`) via `ProjectCard`.
- Use the numbered section index treatment ("01 Selected Work").
- Include a clear link/CTA to the full `/work` index ("View all work →").
- Data fetched server-side from the featured-projects GROQ query.
- Responsive grid consistent with the `/work` grid.
- `npm run build` passes; featured tiles render on home and link to detail pages.

## Notes

- **Depends on:** `13` (ProjectCard), `14` (grid conventions), `10` (featured query). Featured set is driven by the Studio toggle "Show on homepage".
- Home featured work is a curated subset; the full body of work lives at `/work` (`@context/project-overview.md` → Pages & Sections).
- Numbered section index ("01/02/03…") is legitimate because the work is genuinely a catalog (`@context/project-overview.md` → Signature Elements). Hero is implicitly the top; number the on-home sections consistently (Selected Work = 01, About = 02, Recognition = 03, Press = 04 per the screenshots).
- Reference `@context/screenshots/marina-example.png` ("SELECTED WORK" divider) and `marina-example3.png` (tiles).

## Out of Scope

- Search/filter on home (that's `/work` only).
- The full `/work` index (feature `14`).
- Reveal/hover motion — Phase 6.
