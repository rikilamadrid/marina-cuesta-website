# Current Feature

Feature 07 — Sanity Schema: Project

## Status

Done

## Goals

- Create `src/sanity/schema/project.ts` (type `project`, document) matching the `Project` interface: `title`, `slug` (from title), `client`, `category` (enum: Global Brands · Multicultural · Feminist & Social · Culture & Film), `year`, `market` (multi-select: US / U.S. Hispanic / Europe / Global), `role`, `summary` (card one-liner), `body` (Portable Text), `cover` (image, hotspot, optional), `gallery` (array of image or `{ videoUrl }`), `externalLink`, `featured` (boolean), `order` (number).
- Plain-language titles + one-line descriptions on every field, written for Marina.
- Validation: required `title`/`client`/`category`/`summary`; URL format on `externalLink` (+ gallery `videoUrl`).
- Editor-friendly preview: client + title + category + cover thumbnail.
- Register in `src/sanity/schema/index.ts` (already wired into `sanity.config.ts` via `schemaTypes`).
- Verify create/edit a project in `/studio`; `npm run build` passes.

## Notes

- Full spec: `@context/features/07-schema-project.md`. Depends on `05` — done. Independent of `06`/`08`.
- Category is a fixed set used by the Work filters (All / Global Brands / Multicultural / Feminist & Social / Culture & Film).
- `cover` optional by design — projects with no cover render a gradient tile (built in `13`).
- `externalLink` kept as a simple `url` string to match the `Project` interface (interface types it as `string`, not an object). Not creating the shared `objects/link.ts` yet — press (`08`) uses a plain `link: string` too; revisit if a labelled link object is actually needed.
- Seed project list lives in `@context/project-overview.md` → Seed Content; seeding is `10`.

## Out of Scope

- Drag-to-reorder UI wiring (`@sanity/orderable-document-list`) — feature `09`.
- Seeding real projects — feature `10`.
- Project card / detail rendering — Phase 3 (`13`, `14`) and Phase 4 (`18`).
- Gallery/video rendering — feature `19`.

## History

- **2026-07-01** — Feature 07 (Sanity Schema: Project) complete. Added `src/sanity/schema/project.ts` (type `project`, document): fields in editor-thinking order — `title`, `slug` (from `title`, maxLength 96), `client`, `category` (radio: Global Brands · Multicultural · Feminist & Social · Culture & Film), `year`, `market` (multi-select checklist: US / U.S. Hispanic / Europe / Global), `role`, `summary` (required card one-liner), `body` (Portable Text `block[]`), `cover` (image, `hotspot: true`, optional → gradient-tile fallback in `13`), `gallery` (array of image **or** named `videoEmbed` `{ videoUrl }` object), `externalLink` (`url`), `featured` (boolean "Show on homepage", `initialValue: false`), `order` (number). Validation: required `title`/`client`/`category`/`summary`; http/https URL scheme on `externalLink` + gallery `videoUrl`. Preview shows `client — title`, category subtitle, cover thumbnail. `externalLink` kept as a plain `url` string (interface types it `string`); did **not** create `objects/link.ts` — press (`08`) also uses a bare `link: string`. Registered in `src/sanity/schema/index.ts`. `npm run build` passes; Studio create/edit verified. Merged to main.
- **2026-07-01** — Feature 06 (Sanity Schema: Site Settings singleton) complete. Added shared `src/sanity/schema/objects/seo.ts` (`title`/`description` with editor-friendly max-length warnings) and `src/sanity/schema/siteSettings.ts` (type `siteSettings`, document): fields in editor-thinking order — `name`, `jobTitle`, `headshot` (image, `hotspot: true`, one-photo-rule description), `shortBio` (hero statement), `longBio` (Portable Text `block[]`), `careerArc` (`{ org, note }[]` with preview), `email`, `socials` (`{ label, href }[]`, `href` type `url` with preview), `seo` (shared object). Validation: required `name`/`jobTitle`/`headshot`/`email` (+ `.email()`), URL scheme http/https on socials. No `alt` field (alt derived from name+jobTitle at render). Registered via `src/sanity/schema/index.ts` → `sanity.config.ts` `schema.types`. `npm run build` passes; Studio verified (Site Settings editable) after resolving two Sanity Content-OS access gates: added `localhost:3003` as a **development host**, and signed into `/studio` via **GitHub** (the identity that is the project member — Google w/ same email is a distinct, unauthorized account). Merged to main.
- **2026-07-01** — Feature 05 (Sanity Setup & Embedded Studio Route) complete. Installed `sanity@6.3.0`, `next-sanity@13.1.1`, `@sanity/vision@6.3.0`, `@sanity/image-url@2.1.1`, `styled-components@6.4.3`. Added `src/sanity/env.ts` (reads `NEXT_PUBLIC_SANITY_*` with `assertValue`), `src/sanity/lib/client.ts` (`useCdn: true`), `src/sanity/lib/image.ts` (`urlFor`; type `SanityImageSource` imported from `@sanity/image-url` root — moved in v2). Added `sanity.config.ts` (structureTool + visionTool, `basePath: /studio`, empty schema) + `sanity.cli.ts`, and the embedded Studio at `src/app/studio/[[...tool]]/page.tsx`. Moved site chrome into a `(site)` route group (`src/app/(site)/layout.tsx` = Spine/Nav/Footer; home page → `src/app/(site)/page.tsx`); root `layout.tsx` reduced to `<html>/<body>` + fonts so `/studio` renders full-screen with no chrome. Pinned Node ≥22.12 via `.nvmrc` + `package.json` engines (Sanity 6 hard-blocks Node 20). Sanity project `dnzlfg96` / dataset `production`; `.env.local` written (gitignored), `.env.example` committed. `/studio` loads and browser login verified; `npm run build` passes. First Phase 2 feature. Merged to main. **Manual follow-up:** CORS origin `http://localhost:3003` added in sanity.io/manage; add the production URL there at deploy time.
- **2026-07-01** — Initial Next.js + Tailwind v4 setup. Scaffolded from Create Next App, removed default boilerplate (demo page, SVGs, README, AGENTS.md), added project context docs. Committed (`chore: initial commit`) and pushed to `rikilamadrid/marina-cuesta-website`. Set dev port to 3003.
- **2026-07-01** — Feature 01 (Design Tokens & Global Styles) complete. Ported all surface/ink/accent/form tokens into `src/app/globals.css` via Tailwind v4 `@theme` (no JS config); set base `body`/`html`/`::selection`. Verified `bg-*`/`text-*`/`font-*` utilities resolve with a throwaway swatch, then removed it. Merged to main.
- **2026-07-01** — Feature 02 (Fonts) complete. Loaded Fraunces (300–600 + italic, `--font-fraunces`) and Hanken Grotesk (300–700, `--font-hanken`) via `next/font/google` in `layout.tsx` with `display: swap` + `preload`. Wired both into `@theme` (`--font-display`/`--font-body`) referencing the next/font vars with prototype fallback stacks, so `font-display`/`font-body` utilities work and Hanken is the body default. Merged to main.
- **2026-07-01** — Feature 04 (Spine & Footer) complete. Built `src/components/layout/Spine.tsx`: decorative (`aria-hidden`) vertical nameplate "Marina Cuesta — Executive Creative Director", `position:fixed` left edge, `writing-mode:vertical-rl` + `rotate-180`, Hanken 600 uppercase `.42em`, white with `mix-blend-mode:difference` so it inverts over paper/oxblood; hidden ≤980px via `min-[981px]:flex`; `pointer-events-none`. Built `src/components/layout/Footer.tsx` (server component): oxblood bg, dynamic `new Date().getFullYear()`, `© {year} Marina Cuesta · Executive Creative Director · Made with intention.`. Both mounted in `layout.tsx` around `{children}`. Verified spine inversion against a temp oxblood section on the home page, then removed it. Completes Phase 1 — Foundations. Merged to main.
- **2026-07-01** — Feature 03 (Root Layout Shell & Nav) complete. Built `src/components/layout/Nav.tsx` (`'use client'`): right-aligned links (Work/About/Recognition/Press/Contact → in-page anchors), outlined STUDIO pill (gear svg) → `/studio`, garnet underline hover. Scroll state (`scrollY > 8`) adds paper/85 bg + backdrop-blur + border, tightens padding. Mobile ≤680px (`min-[681px]`/`max-[680px]` breakpoints) collapses links into an accessible hamburger dropdown (animated burger→X, `aria-expanded`/`aria-controls`, closes on tap). Mounted in `layout.tsx` shell above `{children}`; layout stays a server component. Merged to main.
</content>
