# Responsive QA & Studio Handoff

## Status

Not Started

## Goals

- QA every breakpoint against the spec: **desktop** (spine visible, multi-column grid, full nav) → **≤980px** (spine hidden, 2-col grid) → **≤680px** (1-col grid, hamburger, tighter type, thumb-friendly targets).
- Test on a **real phone**: hero, manifesto, work grid + search/filter, project detail, about, press, contact — everything readable, tappable, and smooth.
- Confirm Marina can post from her phone in the **Studio** (`/studio`): add a project, add a press mention, swap her headshot — each in under a minute.
- Fix any responsive/mobile issues found.
- Prepare the **handoff**: confirm her Studio login works and write brief "how to update your site" notes for Marina.

## Notes

- **Depends on:** everything (final feature). Responsive spec: `@context/project-overview.md` → Responsive; Studio ease-of-use bar ("at least as easy as Behance").
- No mobile screenshots are provided — derive mobile from the responsive rules and the desktop screenshots (`@context/screenshots/marina-example*.png`).
- This is the final gate before the site is "gift-ready" — Marina should be proud to send the link.

## Out of Scope

- New features or redesigns — QA, fixes, and handoff only.
- The off-page SEO steps (owner's task; documented in `26`).
