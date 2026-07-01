# Work Index — Live Search & Category Filter

## Status

Not Started

## Goals

- Build the `/work` route (`src/app/work/page.tsx`) as a server component that fetches **all** projects (SSG) and passes them to client components.
- Build `src/components/work/WorkGrid.tsx` (renders `ProjectCard` list) and `src/components/work/WorkControls.tsx` (`'use client'`): category filter chips (**All · Global Brands · Multicultural · Feminist & Social · Culture & Film**) + a **live search** input (matches title/client) filtering the grid instantly.
- Filter + search state lives client-side; data arrives as props (no client-side Sanity fetching).
- Empty state when no results match.
- Responsive grid: multi-column desktop → 2-col ≤980px → 1-col ≤680px.
- `npm run build` passes; filtering and search work in the browser.

## Notes

- **Depends on:** `13` (ProjectCard) and `10` (queries). Uses the fixed category set from schema `07`.
- Visual + interaction source: `@context/screenshots/marina-example3.png` (chip row + "Search projects, clients…" input top-right) and prototype `#work` (`@context/marina-cuesta.html` lines ~408–423: `.filters`, `#search`, `.grid`).
- Search/filter is the site's **main interactive island** — keep client JS minimal (`@context/project-overview.md` → Performance).
- Data-fetching pattern: server component fetches, client component receives props (`@context/coding-standards.md` → Data Fetching).

## Out of Scope

- The home page's *featured* work section — that is `15` (different data set: `featured == true`).
- Project detail pages — Phase 4.
- Filter/search enter/exit animation — Phase 6.
