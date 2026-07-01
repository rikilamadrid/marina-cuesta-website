# Portable Text Renderer

## Status

Not Started

## Goals

- Build a shared `src/components/ui/PortableText.tsx` that renders Sanity Portable Text (project `body`, site settings `longBio`) with editorial styling.
- Style block types to the design system: paragraphs (Hanken), headings (Fraunces), emphasis/italic (garnet where appropriate), links (garnet, accessible), lists, and blockquotes.
- Handle empty/undefined content gracefully (render nothing, not a crash).
- Verify against seeded `longBio` on a temporary page; remove temp page.
- `npm run build` passes.

## Notes

- **Depends on:** `10` (seeded Portable Text content). First Phase 4 feature because both the project detail (`18`) and About (`20`) pages consume it.
- Use `@portabletext/react` (verify current version) via `next-sanity`.
- Keep typography consistent with the About long-bio treatment in `@context/screenshots/marina-example4.png`.

## Out of Scope

- Custom Portable Text marks for embedded images/video inside body (only if the schema uses them — gallery/video is handled separately in `19`).
- The pages that consume it (`18`, `20`).
