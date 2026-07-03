# Current Feature

Feature 28 - Accessibility Pass

## Status

Complete — implemented on `feature/accessibility-pass`, `npm run build` passes clean. Entry prepended to `CHANGELOG.md`. Ready to merge to main.

## Goals

- Keyboard operability throughout; **visible focus rings** everywhere (do not remove outlines).
- Exactly one `<h1>` per page; logical heading order; landmark regions (`header`/`main`/`footer`/`nav`).
- **AA contrast** verified on paper **and** oxblood fields (bone-on-oxblood must pass).
- Descriptive `alt` on the headshot ("Marina Cuesta, Executive Creative Director") and all project covers.
- `prefers-reduced-motion` honored (cross-check with `27`).
- Mobile menu is accessible (focus trap/return, `aria-expanded`, escape to close).
- Fix issues found; document any deliberate exceptions.

## Notes

- Full spec: `@context/features/28-accessibility-pass.md`.
- **Depends on:** `27` (motion/reduced-motion, now merged) and all pages. Run an audit (axe / Lighthouse a11y) and fix.
- Requirements: `@context/project-overview.md` → Accessibility. Studio is Sanity's own accessible UI — no extra work there.
- Contrast note: the prototype's bone-on-oxblood already passes; keep those exact values.
- Cross-check reduced-motion behavior already added in Feature 27 (`Reveal`, `HeroText`, `template.tsx`, `ProjectCard` `motion-reduce:` variants).

## Out of Scope

- Performance and responsive passes (`29`, `30`).
- New features/content.

## History

The per-feature build log now lives in `CHANGELOG.md` at the repo root. When a feature merges to `main`, prepend its entry there (not here) — this file tracks only the active task.
