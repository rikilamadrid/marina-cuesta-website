# Manifesto Section (Oxblood Point-of-View)

## Status

Not Started

## Goals

- Build `src/components/home/Manifesto.tsx` and place it on the home page after the hero (id `pov`).
- Full-bleed **oxblood** field with `bone` text; eyebrow "THE POINT OF VIEW"; the big display quote ("I don't make ads. I build platforms where culture, craft and *conviction* meet — and where the next woman can see herself at the head of the table.") with *conviction* in garnet italic.
- A 4-up credo row beneath: **Ideas first · Empathy as strategy · Culture, not clichés · Women, leading**, each with its one-line description.
- The faint **"JEFA" ghost watermark** behind the section (very low-opacity italic Fraunces).
- Ensure bone-on-oxblood text passes AA contrast.
- `npm run build` passes.

## Notes

- **Depends on:** Phase 1 (tokens/fonts). Content is fixed editorial brand copy — acceptable to hardcode (it is the brand thesis, not CMS content); confirm this is not expected in Sanity.
- Visual + copy source: `@context/screenshots/marina-example2.png` and prototype `.manifesto` (`@context/marina-cuesta.html` lines ~162–171 for styles, ~394–406 for markup; JEFA watermark at line 164).
- The Spine's `mix-blend-mode` should already invert correctly over this oxblood block (built in `04`) — sanity-check it here.

## Out of Scope

- Fade-in motion on the quote/credo — Phase 6.
- The contact section (also oxblood) — feature `16`.
- Making the manifesto copy CMS-editable (out unless explicitly requested).
