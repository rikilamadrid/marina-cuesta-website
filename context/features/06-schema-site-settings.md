# Sanity Schema — Site Settings (Singleton)

## Status

Not Started

## Goals

- Create `src/sanity/schema/siteSettings.ts` (type name `siteSettings`) matching the `SiteSettings` interface in `@context/project-overview.md`:
  - `name`, `jobTitle`, `headshot` (image, **hotspot/crop enabled**), `shortBio`, `longBio` (Portable Text), `careerArc` (array of `{ org, note }`), `email`, `socials` (array of `{ label, href }`), `seo` (`{ title, description }`).
- Every field has a plain-language `title` and a one-line `description` written for Marina (non-technical), not a developer.
- Add Sanity `validation` rules (required name/jobTitle/headshot/email, URL format on socials).
- Register the schema in `src/sanity/schema/index.ts`.
- Verify the document type appears and is editable in `/studio`.
- `npm run build` passes.

## Notes

- **Depends on:** `05-sanity-setup-and-studio-route`.
- **One-photo rule:** `headshot` is set only here and later flows to hero, About, `og:image`, and `Person` JSON-LD. Enable hotspot so crops stay controlled across breakpoints.
- Singleton enforcement (hide "create new", pin to top) is done in the desk structure feature `09`, not here — but design the schema as a singleton.
- Add a shared `seo` object here or as `src/sanity/schema/objects/seo.ts` if reused later — small call; note which you chose.
- Seed values for these fields (name, hero statement, socials, bio, career arc) live in `@context/project-overview.md` → Seed Content; actual seeding is `10`.

## Out of Scope

- Populating real content / seeding (feature `10`).
- The actual headshot image (client to provide; leave placeholder — noted in seed).
- Rendering any of these fields in the UI (Phase 3+).
- Singleton desk-structure pinning (feature `09`).
