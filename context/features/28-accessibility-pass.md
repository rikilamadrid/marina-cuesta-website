# Accessibility Pass

## Status

Not Started

## Goals

- Keyboard operability throughout; **visible focus rings** everywhere (do not remove outlines).
- Exactly one `<h1>` per page; logical heading order; landmark regions (`header`/`main`/`footer`/`nav`).
- **AA contrast** verified on paper **and** oxblood fields (bone-on-oxblood must pass).
- Descriptive `alt` on the headshot ("Marina Cuesta, Executive Creative Director") and all project covers.
- `prefers-reduced-motion` honored (cross-check with `27`).
- Mobile menu is accessible (focus trap/return, `aria-expanded`, escape to close).
- Fix issues found; document any deliberate exceptions.

## Notes

- **Depends on:** `27` (motion/reduced-motion) and all pages. Run an audit (axe / Lighthouse a11y) and fix.
- Requirements: `@context/project-overview.md` → Accessibility. Studio is Sanity's own accessible UI — no extra work there.
- Contrast note: the prototype's bone-on-oxblood already passes; keep those exact values.

## Out of Scope

- Performance and responsive passes (`29`, `30`).
- New features/content.
