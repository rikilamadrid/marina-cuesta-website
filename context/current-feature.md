# Current Feature

Feature 06 — Sanity Schema: Site Settings (Singleton)

## Status

Done

## Goals

- Create `src/sanity/schema/siteSettings.ts` (type `siteSettings`, document) matching the `SiteSettings` interface: `name`, `jobTitle`, `headshot` (image, hotspot/crop on), `shortBio`, `longBio` (Portable Text), `careerArc` (array of `{ org, note }`), `email`, `socials` (array of `{ label, href }`), `seo` (`{ title, description }`).
- Every field gets a plain-language `title` + one-line `description` written for Marina.
- Validation: required `name`/`jobTitle`/`headshot`/`email` (email format), URL format on `socials.href`.
- Create shared `src/sanity/schema/objects/seo.ts` (reused by `project` in feature 07).
- Register via `src/sanity/schema/index.ts`; wire into `sanity.config.ts` `schema.types`.
- Verify the `Site Settings` document type appears and is editable in `/studio`; `npm run build` passes.

## Notes

- Full spec: `@context/features/06-schema-site-settings.md`. Depends on `05` — done.
- **One-photo rule:** `headshot` is set only here → flows to hero, About, `og:image`, `Person` JSON-LD. Hotspot enabled so crops stay controlled across breakpoints.
- **`seo` as a shared object** (`objects/seo.ts`), not inline — anticipating reuse in `project` (07). `careerArc` item + `socials` item kept as inline anonymous objects (specific to this doc).
- Designed as a singleton, but singleton enforcement (hide "create new", pin to top) is feature `09`, not here.
- No `alt` field on `headshot` — alt is deterministic ("Marina Cuesta, Executive Creative Director"), derived at render time; keeps the interface true to spec.
- Seed values (name, hero statement, socials, bio, career arc) live in `@context/project-overview.md` → Seed Content; actual seeding is `10`.
- **Studio access gotchas discovered while verifying (Sanity "Content OS"):** (1) A local Studio must be whitelisted as a **development host** in the dashboard before it can read content — done for `http://localhost:3003` (do the same for any new dev port / the prod URL at deploy). (2) **Login provider identity matters:** the project member `riki.lamadrid@gmail.com` is authed via **GitHub**; signing into the Studio via **Google** with the same email is treated as a *different* account → "Not authorized." Always sign into `/studio` with **GitHub**.

## Out of Scope

- Populating real content / seeding — feature `10`.
- The actual headshot image (client provides; placeholder until then).
- Rendering these fields in the UI — Phase 3+.
- Singleton desk-structure pinning — feature `09`.
- `project` / `pressMention` schemas — features `07`/`08`.

## History

- **2026-07-01** — Feature 06 (Sanity Schema: Site Settings singleton) complete. Added shared `src/sanity/schema/objects/seo.ts` (`title`/`description` with editor-friendly max-length warnings) and `src/sanity/schema/siteSettings.ts` (type `siteSettings`, document): fields in editor-thinking order — `name`, `jobTitle`, `headshot` (image, `hotspot: true`, one-photo-rule description), `shortBio` (hero statement), `longBio` (Portable Text `block[]`), `careerArc` (`{ org, note }[]` with preview), `email`, `socials` (`{ label, href }[]`, `href` type `url` with preview), `seo` (shared object). Validation: required `name`/`jobTitle`/`headshot`/`email` (+ `.email()`), URL scheme http/https on socials. No `alt` field (alt derived from name+jobTitle at render). Registered via `src/sanity/schema/index.ts` → `sanity.config.ts` `schema.types`. `npm run build` passes; Studio verified (Site Settings editable) after resolving two Sanity Content-OS access gates: added `localhost:3003` as a **development host**, and signed into `/studio` via **GitHub** (the identity that is the project member — Google w/ same email is a distinct, unauthorized account). Merged to main.
- **2026-07-01** — Feature 05 (Sanity Setup & Embedded Studio Route) complete. Installed `sanity@6.3.0`, `next-sanity@13.1.1`, `@sanity/vision@6.3.0`, `@sanity/image-url@2.1.1`, `styled-components@6.4.3`. Added `src/sanity/env.ts` (reads `NEXT_PUBLIC_SANITY_*` with `assertValue`), `src/sanity/lib/client.ts` (`useCdn: true`), `src/sanity/lib/image.ts` (`urlFor`; type `SanityImageSource` imported from `@sanity/image-url` root — moved in v2). Added `sanity.config.ts` (structureTool + visionTool, `basePath: /studio`, empty schema) + `sanity.cli.ts`, and the embedded Studio at `src/app/studio/[[...tool]]/page.tsx`. Moved site chrome into a `(site)` route group (`src/app/(site)/layout.tsx` = Spine/Nav/Footer; home page → `src/app/(site)/page.tsx`); root `layout.tsx` reduced to `<html>/<body>` + fonts so `/studio` renders full-screen with no chrome. Pinned Node ≥22.12 via `.nvmrc` + `package.json` engines (Sanity 6 hard-blocks Node 20). Sanity project `dnzlfg96` / dataset `production`; `.env.local` written (gitignored), `.env.example` committed. `/studio` loads and browser login verified; `npm run build` passes. First Phase 2 feature. Merged to main. **Manual follow-up:** CORS origin `http://localhost:3003` added in sanity.io/manage; add the production URL there at deploy time.
- **2026-07-01** — Initial Next.js + Tailwind v4 setup. Scaffolded from Create Next App, removed default boilerplate (demo page, SVGs, README, AGENTS.md), added project context docs. Committed (`chore: initial commit`) and pushed to `rikilamadrid/marina-cuesta-website`. Set dev port to 3003.
- **2026-07-01** — Feature 01 (Design Tokens & Global Styles) complete. Ported all surface/ink/accent/form tokens into `src/app/globals.css` via Tailwind v4 `@theme` (no JS config); set base `body`/`html`/`::selection`. Verified `bg-*`/`text-*`/`font-*` utilities resolve with a throwaway swatch, then removed it. Merged to main.
- **2026-07-01** — Feature 02 (Fonts) complete. Loaded Fraunces (300–600 + italic, `--font-fraunces`) and Hanken Grotesk (300–700, `--font-hanken`) via `next/font/google` in `layout.tsx` with `display: swap` + `preload`. Wired both into `@theme` (`--font-display`/`--font-body`) referencing the next/font vars with prototype fallback stacks, so `font-display`/`font-body` utilities work and Hanken is the body default. Merged to main.
- **2026-07-01** — Feature 04 (Spine & Footer) complete. Built `src/components/layout/Spine.tsx`: decorative (`aria-hidden`) vertical nameplate "Marina Cuesta — Executive Creative Director", `position:fixed` left edge, `writing-mode:vertical-rl` + `rotate-180`, Hanken 600 uppercase `.42em`, white with `mix-blend-mode:difference` so it inverts over paper/oxblood; hidden ≤980px via `min-[981px]:flex`; `pointer-events-none`. Built `src/components/layout/Footer.tsx` (server component): oxblood bg, dynamic `new Date().getFullYear()`, `© {year} Marina Cuesta · Executive Creative Director · Made with intention.`. Both mounted in `layout.tsx` around `{children}`. Verified spine inversion against a temp oxblood section on the home page, then removed it. Completes Phase 1 — Foundations. Merged to main.
- **2026-07-01** — Feature 03 (Root Layout Shell & Nav) complete. Built `src/components/layout/Nav.tsx` (`'use client'`): right-aligned links (Work/About/Recognition/Press/Contact → in-page anchors), outlined STUDIO pill (gear svg) → `/studio`, garnet underline hover. Scroll state (`scrollY > 8`) adds paper/85 bg + backdrop-blur + border, tightens padding. Mobile ≤680px (`min-[681px]`/`max-[680px]` breakpoints) collapses links into an accessible hamburger dropdown (animated burger→X, `aria-expanded`/`aria-controls`, closes on tap). Mounted in `layout.tsx` shell above `{children}`; layout stays a server component. Merged to main.
</content>
