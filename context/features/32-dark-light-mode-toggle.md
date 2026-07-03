# Dark / Light Mode Toggle

## Status

Not Started

## Goals

- Add a **theme toggle** (light ↔ dark) in the nav, styled to belong to the editorial system — not a generic sun/moon in a rounded box.
- Introduce a **dark theme** built on the existing semantic tokens (`--color-paper`, `--color-bone`, `--color-ink`, `--color-line`, `--color-garnet`, etc.) in `src/app/globals.css`. Define a dark palette by remapping those tokens under a `[data-theme="dark"]` / `.dark` scope — components keep using the semantic names, no per-component color edits.
- **Persist** the choice (localStorage) and respect the OS preference (`prefers-color-scheme`) on first visit. Set `color-scheme` so form controls/scrollbars match.
- **No flash of wrong theme** — inline a tiny pre-hydration script in `layout.tsx` to set the theme attribute before first paint.
- Reconcile with the existing **dark oxblood sections** and nav color inversion (`[data-on-dark]` / `[data-nav-dark]`, Feature 27) so inversion still reads correctly in *both* themes.
- Respect `prefers-reduced-motion` for the theme-transition (keep the cross-fade subtle or instant).

## Notes

- **Depends on:** token system (`01`), nav shell (`03`), motion/nav-inversion (`27`). Tailwind v4 `@theme` block is the token source of truth.
- The brand is deliberately **warm paper + garnet/oxblood** (CLAUDE.md hard "don't"s). Dark mode must stay in that world — warm near-blacks and bones, garnet accents — not a cold gray/blue dark theme.
- The `og:image` / JSON-LD headshot and OG generation are theme-independent — don't touch them.
- Keep the toggle accessible: real `<button>`, `aria-pressed` or `aria-label` reflecting state, keyboard-operable, visible focus ring (which already inverts over dark — verify).

## Open questions to resolve before building

- **Default theme** on first visit: follow OS preference, or always start light (the signature look)? Recommend: follow OS, default light if unknown.
- Does dark mode **invert the whole palette**, or is it a dimmed/muted warm variant that preserves the monograph feel? This defines the design work — worth a quick mock or reference pull from `@context/marina-cuesta.html` before building.
- Should the Sanity Studio (`/studio`) follow the site theme, or keep Sanity's own? (Recommend: leave Studio alone.)

## Out of Scope

- Vercel/CI (`31`) and language toggle (`33`).
- Redesigning any layout — palette/theming only.
