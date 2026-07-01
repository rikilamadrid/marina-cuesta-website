# Motion Pass & Nav Color Inversion

## Status

Not Started

## Goals

- Add Framer Motion (verify current version) and implement the refined motion system:
  - Hero name **mask-up reveal**, line by line, on load.
  - Section **scroll-triggered fade + rise** (`whileInView` / IntersectionObserver).
  - Work tile hover: gentle lift + shadow bloom + slow gradient scale; "View project →" slides in.
  - Manifesto: soft fade of quote + credo (calm, not flashy).
  - Soft **page transition** (fade) between home and `/work/[slug]`.
- Implement **Nav color inversion**: nav links + STUDIO pill invert to bone over dark (oxblood) sections, back to ink over paper — driven by scroll position over the manifesto/contact blocks.
- **Respect `prefers-reduced-motion`**: disable reveals/ambient effects, keep state changes instant.
- `npm run build` passes; motion is smooth on transform/opacity only.

## Notes

- **Depends on:** all sections/pages exist (Phases 3–4). First Phase 6 feature.
- Motion spec: `@context/project-overview.md` → Motion (per-element table) and Reduced-motion note. Prototype already handles reduced motion (`darkSections` inversion at `@context/marina-cuesta.html` line 672) — port the behavior.
- Nav inversion was intentionally deferred from `03`; this is where it lands.
- Keep motion on transform/opacity; cap `backdrop-filter` to nav only (`@context/project-overview.md` → Performance).

## Out of Scope

- New content or layout changes — motion/inversion only.
- The a11y, performance, and responsive passes — features `28`–`30`.
