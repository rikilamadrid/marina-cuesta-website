# Current Feature

Feature 27 - Motion Pass & Nav Color Inversion

## Status

Complete - branch `feature/motion-and-nav-states`; verified, ready for review.

## Goals

- Add Framer Motion and implement the refined motion system:
  - Hero name **mask-up reveal**, line by line, on load.
  - Section **scroll-triggered fade + rise** (`whileInView`).
  - Work tile hover: gentle lift + shadow bloom + slow gradient scale; "View project →" slides in.
  - Manifesto: soft fade of quote + credo (calm, not flashy).
  - Soft **page transition** (fade) between home and `/work/[slug]`.
- Implement **Nav color inversion**: nav links + STUDIO pill invert to bone over dark (oxblood) sections, back to ink over paper — driven by scroll position over manifesto/contact.
- **Respect `prefers-reduced-motion`**: disable reveals/ambient effects, keep state changes instant.
- `npm run build` passes; motion on transform/opacity only.

## Notes

- Full spec: `@context/features/27-motion-and-nav-states.md`.
- Motion spec: `@context/project-overview.md` → Motion (per-element table) + Reduced-motion note.
- Port prototype behavior: `.reveal` fade+rise (`marina-cuesta.html` ~272), hero `.ln i` mask-up (~144), `darkSections` nav inversion (~672), reduced-motion block (~334).
- Nav inversion was intentionally deferred from feature `03`; lands here.
- First Phase 6 feature. Framer Motion latest is 12.42.2 (supports React 19.2 / Next 16.2.9).

### Implementation

- Installed `framer-motion@^12.42.2`.
- New `src/components/ui/Reveal.tsx` (client): shared scroll fade+rise (`whileInView`, `once`, amount 0.14; opacity 0 / y 26 → settle, 0.9s `--ease`). `useReducedMotion` → renders a plain `div`, content instantly visible. Wrap **inner content**, never the section, so full-bleed backgrounds stay put. Used in Manifesto (2 beats), FeaturedWork, Recognition, ContactCTA.
- New `src/components/home/HeroText.tsx` (client): hero on-load choreography — each name line masks up (`translateY 105%` → 0 behind `overflow-hidden`, staged 0.25s/0.4s), then statement + stat row rise. Shared `HeroBody` so the reduced-motion and animated paths can't drift. STATS moved here from `Hero.tsx`; `Hero.tsx` stays a server component (keeps `next/image priority` headshot server-side) and just mounts `<HeroText>`.
- New `src/app/(site)/template.tsx` (client): re-mounts per navigation → soft cross-page fade (0.4s). Nav/Spine/Footer live in `layout.tsx` (outside), so chrome stays put. Reduced motion → passthrough.
- `Nav.tsx`: added scroll-driven **color inversion**. Scans `[data-nav-dark]` elements (tagged on Manifesto + ContactCTA); when the nav overlaps one, links + STUDIO pill invert to bone and the paper backdrop is suppressed (stays transparent so bone reads); over paper it shows the backdrop with ink links. Links/burger use `text-current`; mobile menu panel stays its own paper card. Added `resize` listener.
- `ProjectCard.tsx`: hover now scales the cover image / gradient tile `1.01 → 1.06` (0.7s `--ease`, CSS transform only) and the "View project →" label slides in (`-translate-x-1.5` → 0). All hover motion guarded with `motion-reduce:` variants.

### Verification

- `npm run build` passes clean (only pre-existing `@sanity/image-url` default-export deprecation warnings); home stays `○ Static`, all routes unchanged.
- Real-browser checks (headless Chrome via CDP, real wall-clock time — headless `--virtual-time-budget` does NOT drive framer's rAF, so it falsely shows content at opacity 0; ignore that path):
  - Hero animated path settles fully visible (name masked up, statement/stats/headshot present).
  - Forced `prefers-reduced-motion` → hero fully visible, no animation.
  - Scrolled over the oxblood Manifesto: nav link color = `rgb(243,236,227)` (bone), header bg transparent; visually the links + STUDIO pill + spine all invert and the Manifesto reveal has fired.
  - `/`, `/about`, `/press`, `/work`, `/work/[slug]` all return 200 (template wrapper didn't break routing).

## Out of Scope

- New content or layout changes — motion/inversion only.
- The a11y, performance, and responsive passes — features `28`–`30`.

## History

The per-feature build log now lives in `CHANGELOG.md` at the repo root. When a feature merges to `main`, prepend its entry there (not here) — this file tracks only the active task.
