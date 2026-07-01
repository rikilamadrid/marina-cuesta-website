# Project Gallery & Video Embeds

## Status

Not Started

## Goals

- Extend the project detail page to render the `gallery` array: images (`next/image` + `urlFor()`, lazy-loaded) and video items (`{ videoUrl }`) as responsive Vimeo/YouTube embeds.
- A small helper parses a Vimeo/YouTube URL into an embeddable player (privacy-friendly params where available).
- Responsive, tasteful gallery layout consistent with the monograph aesthetic; images have descriptive alt text.
- Handle a project with no gallery (render nothing) and mixed image/video ordering.
- `npm run build` passes; a seeded project with a video URL renders a playable embed.

## Notes

- **Depends on:** `18` (project detail page exists). Gallery/video is `SanityImage | { videoUrl: string }` per the `Project` interface in `@context/project-overview.md`.
- Media guidance: Sanity image CDN + `next/image`; Vimeo/YouTube embeds for video; lazy-load below the fold (`@context/project-overview.md` → Tech Stack / Performance).
- Seeded projects likely lack real media (placeholders) — test with one manually-added gallery item/video URL in `/studio`.

## Out of Scope

- Lightbox / fullscreen gallery interaction (only if requested).
- OG image generation — Phase 5.
- Motion — Phase 6.
