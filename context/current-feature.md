# Current Feature

Feature 03 — Root Layout Shell & Nav

## Status

Done

## Goals

- Finalize `src/app/layout.tsx` as the app shell: fonts applied, `<html lang="en">`, paper background, and slots for Nav + Footer around `{children}`.
- Build `src/components/layout/Nav.tsx`: top nav with links **Work · About · Recognition · Press · Contact** and a pill **STUDIO** button (gear icon) linking to `/studio`.
- Nav is transparent at top of page; on scroll it gains a subtle background + `backdrop-filter` blur (cap backdrop-filter to nav only per perf rules).
- Mobile (≤680px): links collapse into a hamburger menu that toggles an accessible overlay/panel.
- Nav links use in-page anchors on home (`#work`, `#about`, `#recognition`, `#press`, `#contact`) and route to real pages where they exist.
- `npm run build` passes; nav renders on a placeholder home page.

## Notes

- Full spec: `@context/features/03-layout-shell-and-nav.md`.
- **Depends on:** `01`, `02` (both done). Home sections it anchors to are built in Phase 3 — anchors point to not-yet-existing ids for now.
- Nav markup/behavior source: `@context/marina-cuesta.html` L100–120 (`header.nav`, `.nav-links`, `.nav-link`, `.studio-btn`, `.burger`) and L349–362 (markup).
- Scroll state: `header.nav.scrolled` → `background:rgba(250,247,242,.86);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)`; padding tightens 22px→14px.
- Mobile ≤680px: `.nav-links` hidden, `.burger` shown; open panel is absolute dropdown top-right (paper bg, border, radius 12px, shadow).
- Interactivity (scroll state, menu toggle) needs `'use client'` on Nav; keep the shell/layout as server components.
- STUDIO pill: outlined (1px ink), radius 100px, uppercase 11px .12em, gear svg + "Studio"; hover fills garnet.

## Out of Scope

- Nav color inversion over dark (oxblood) sections — Phase 6 (`27-motion-and-nav-states`).
- Spine + Footer — `04-spine-and-footer`.
- Framer Motion transitions (Phase 6).
- Real Studio route (`/studio` may 404 until Phase 2; button links anyway).

## History

- **2026-07-01** — Initial Next.js + Tailwind v4 setup. Scaffolded from Create Next App, removed default boilerplate (demo page, SVGs, README, AGENTS.md), added project context docs. Committed (`chore: initial commit`) and pushed to `rikilamadrid/marina-cuesta-website`. Set dev port to 3003.
- **2026-07-01** — Feature 01 (Design Tokens & Global Styles) complete. Ported all surface/ink/accent/form tokens into `src/app/globals.css` via Tailwind v4 `@theme` (no JS config); set base `body`/`html`/`::selection`. Verified `bg-*`/`text-*`/`font-*` utilities resolve with a throwaway swatch, then removed it. Merged to main.
- **2026-07-01** — Feature 02 (Fonts) complete. Loaded Fraunces (300–600 + italic, `--font-fraunces`) and Hanken Grotesk (300–700, `--font-hanken`) via `next/font/google` in `layout.tsx` with `display: swap` + `preload`. Wired both into `@theme` (`--font-display`/`--font-body`) referencing the next/font vars with prototype fallback stacks, so `font-display`/`font-body` utilities work and Hanken is the body default. Merged to main.
- **2026-07-01** — Feature 03 (Root Layout Shell & Nav) complete. Built `src/components/layout/Nav.tsx` (`'use client'`): right-aligned links (Work/About/Recognition/Press/Contact → in-page anchors), outlined STUDIO pill (gear svg) → `/studio`, garnet underline hover. Scroll state (`scrollY > 8`) adds paper/85 bg + backdrop-blur + border, tightens padding. Mobile ≤680px (`min-[681px]`/`max-[680px]` breakpoints) collapses links into an accessible hamburger dropdown (animated burger→X, `aria-expanded`/`aria-controls`, closes on tap). Mounted in `layout.tsx` shell above `{children}`; layout stays a server component. Merged to main.
</content>
