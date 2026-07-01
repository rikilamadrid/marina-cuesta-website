# Root Layout Shell & Nav

## Status

Not Started

## Goals

- Finalize `src/app/layout.tsx` as the app shell: fonts applied, `<html lang="en">`, paper background, and slots for Nav + Footer around `{children}`.
- Build `src/components/layout/Nav.tsx`: top nav with links **Work · About · Recognition · Press · Contact** and a pill **STUDIO** button (gear icon) linking to `/studio`.
- Nav is transparent at top of page; on scroll it gains a subtle background + `backdrop-filter` blur (cap backdrop-filter to nav only per perf rules).
- Mobile (≤680px): links collapse into a hamburger menu that toggles an accessible overlay/panel.
- Nav links use in-page anchors on home (`#work`, `#about`, `#recognition`, `#press`, `#contact`) and route to real pages where they exist.
- `npm run build` passes; nav renders on a placeholder home page.

## Notes

- **Depends on:** `01`, `02`. Home sections it anchors to are built in Phase 3 — anchors can point to not-yet-existing ids for now (note this).
- Nav markup/behavior source: `@context/marina-cuesta.html` lines ~349–362 (`.nav`, `.nav-links`, `.studio-btn`, `.burger`).
- Visual reference: nav bar visible in all screenshots (`@context/screenshots/marina-example.png` etc.) — right-aligned links, outlined STUDIO pill top-right.
- Interactivity (scroll state, menu toggle) requires `'use client'` on Nav; keep the rest of the shell as server components.

## Out of Scope

- **Nav color inversion over dark (oxblood) sections** — that scroll-driven color logic is Phase 6 (`27-motion-and-nav-states`). Here, nav just needs scroll background + mobile menu.
- The Spine and Footer components — `04-spine-and-footer`.
- Framer Motion transitions (Phase 6).
- Real Studio route (`/studio` may 404 until Phase 2; button can link anyway).
