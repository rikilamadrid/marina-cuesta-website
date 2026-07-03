# Current Feature

Feature 32 — Dark / Light Mode Toggle

## Status

In Progress — building. Second of three post-launch features (31 deploy/CI-CD → **32 dark mode** → 33 EN/ES toggle). Feature 31's code is merged to `main`; its remaining steps are owner/dashboard-driven only (see `DEPLOY.md`) — its CHANGELOG entry is in place.

## Decisions (locked)

- **Dark look:** _warm dimmed monograph_ — stay in the brand's warm world (warm near-black paper, warm bone/off-white text, garnet/oxblood accents preserved). Not a cold gray/blue inversion.
- **First-visit default:** _follow OS_ (`prefers-color-scheme`), default light if unknown.
- **Studio (`/studio`):** left on Sanity's own theme — not wired to the site toggle.

## Goals

- Add an accessible **theme toggle** in the nav (real `<button>`, state in `aria-label`, keyboard-operable, visible focus). Editorial contrast glyph — not a generic sun/moon in a rounded box.
- Add a **dark palette** by remapping the existing semantic tokens under `:root[data-theme="dark"]` in `globals.css`. Components keep using semantic names.
- **Persist** to `localStorage`; **respect OS** on first visit; set `color-scheme` for form controls/scrollbars.
- **No flash of wrong theme** — inline a pre-hydration script in `layout.tsx` before first paint.
- Reconcile with the fixed dark oxblood sections + nav color inversion (`[data-nav-dark]`/`[data-on-dark]`, Feature 27) — inversion must still read in both themes.
- Respect `prefers-reduced-motion` for the theme transition.

## Implementation notes

- **Token remap, not per-component edits** — the whole point. Overrides live in one `:root[data-theme="dark"]` block.
- **`bone` is overloaded** and stays *light* in dark mode: it is light-text-on-oxblood in Nav/Manifesto/ContactCTA/ProjectDetail (the majority). The conflicting minority uses are fixed at the call site instead:
  - `bg-ink text-bone` inverted pills → `text-bone`→`text-paper` (WorkControls active chip, skip link). `bg-ink` inverts to a light pill in dark; `text-paper` inverts to dark text — a visual no-op in light mode (paper ≈ bone).
  - `bg-bone` *surfaces* (ProjectCard base, AboutSection band) → new `--color-surface-alt` token (light value = bone; dark value = warm raised near-black). No-op in light, darkens in dark.
- `blush` / `oxblood` / `tile-*` are **not** overridden — they read correctly in both themes (blush/oxblood are already light-text-on-dark or warm accents; tiles are already dark).
- Theme cross-fade via a zero-specificity `:where(body *)` transition on bg/border/color so component transitions still win; reduced-motion CSS safety net already zeroes it.
- `ThemeToggle` reads `<html data-theme>` via **`useSyncExternalStore`** (not `useEffect`+`setState`, which trips the `react-hooks/set-state-in-effect` rule the CI gate enforces); the toggle mutates the attribute + `localStorage` and dispatches a `themechange` event to re-render.

## Verified

- `typecheck` + `lint` + `build` all clean; 31 routes prerender unchanged. No-flash script + dark token block confirmed in the built HTML/CSS. **Not yet done:** live-browser click-through (sandbox blocked the local server) — eyeball the toggle with `npm run start` before merge.

## Files

- `src/app/globals.css` — `--color-surface-alt` token; `:root[data-theme="dark"]` override block; `color-scheme`; theme-transition.
- `src/app/layout.tsx` — pre-hydration no-flash script in `<head>`; `suppressHydrationWarning` on `<html>`.
- `src/components/layout/ThemeToggle.tsx` — new client toggle.
- `src/components/layout/Nav.tsx` — mount `<ThemeToggle />` (uses `text-current` → inverts with the nav).
- `src/components/work/WorkControls.tsx`, `src/app/(site)/layout.tsx` — `text-bone`→`text-paper` on `bg-ink` pills.
- `src/components/work/ProjectCard.tsx`, `src/components/home/AboutSection.tsx` — `bg-bone`→`bg-surface-alt`.

## Out of Scope

- Vercel/CI (`31`, done) and language toggle (`33`, next).
- Any layout redesign — palette/theming only.
- Theming the Sanity Studio.

## Upcoming (spec written, not started)

- **Feature 33 — Language Toggle (EN/ES):** `@context/features/33-language-toggle-en-es.md`. Blocking decision: UI-only vs. full CMS content localization + Sanity field-level vs. document-level i18n.

## History

The per-feature build log lives in `CHANGELOG.md` at the repo root. When a feature merges to `main`, prepend its entry there — this file tracks only the active task.
