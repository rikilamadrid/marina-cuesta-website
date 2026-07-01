# Current Feature

Feature 05 — Sanity Setup & Embedded Studio Route

## Status

Done

## Goals

- Install and configure Sanity + `next-sanity` (verified stable versions: `sanity@6.3.0`, `next-sanity@13.1.1`, `@sanity/vision@6.3.0`, `@sanity/image-url@2.1.1`, `styled-components@6.4.3`).
- Create a Sanity project + dataset; store `projectId`, `dataset`, `apiVersion` in `.env.local` and read them in `src/sanity/env.ts`.
- Create `src/sanity/lib/client.ts` (configured client) and `src/sanity/lib/image.ts` (`urlFor()` image builder).
- Create `sanity.config.ts` and the embedded Studio route at `src/app/studio/[[...tool]]/page.tsx`.
- Ensure Nav/Footer/Spine do NOT render on `/studio` (route group).
- Verify `/studio` loads the Sanity Studio in the browser (login works) with an empty schema.
- `npm run build` passes.

## Notes

- Full spec: `@context/features/05-sanity-setup-and-studio-route.md`. First **Phase 2** feature.
- **Depends on:** Phase 1 complete — done.
- Sanity project/dataset creation done via guided live `sanity login` + create (user chose "Guide me through it live").
- Structure targets for later features: `src/sanity/schema/`, `src/sanity/lib/queries.ts`, `src/sanity/structure.ts`.
- Studio is Sanity's own full-screen UI — isolate the layout chrome (Nav/Footer/Spine) using a route group so the root layout `<html>`/`<body>` + fonts still apply but the chrome doesn't. Done: root `layout.tsx` holds `<html>/<body>` + fonts only; new `src/app/(site)/layout.tsx` holds Spine/Nav/Footer; home page moved to `src/app/(site)/page.tsx`. `/studio/[[...tool]]` sits outside `(site)` → no chrome.
- **Node ≥22.12 required** (Sanity 6 hard-blocks Node 20). Pinned via `.nvmrc` (`22`) + `package.json` `engines.node`. Run `nvm use` before dev/build in this project. Vercel picks up `engines`.
- Sanity project: `dnzlfg96`, dataset `production`. `.env.local` written (gitignored); `.env.example` committed as the template. `@sanity/image-url` v2 exports `SanityImageSource` from the package root (not `/lib/types/types`).
- **Manual step for login to work in-browser:** add CORS origins in sanity.io/manage → API → CORS: `http://localhost:3003` (dev) and the production URL later, with credentials allowed.

## Out of Scope

- Any schema definitions (siteSettings/project/pressMention) — features 06–08.
- Desk structure / orderable lists — `09`.
- GROQ queries & seed content — `10`.
- The revalidation webhook — Phase 5 (`25`).

## History

- **2026-07-01** — Feature 05 (Sanity Setup & Embedded Studio Route) complete. Installed `sanity@6.3.0`, `next-sanity@13.1.1`, `@sanity/vision@6.3.0`, `@sanity/image-url@2.1.1`, `styled-components@6.4.3`. Added `src/sanity/env.ts` (reads `NEXT_PUBLIC_SANITY_*` with `assertValue`), `src/sanity/lib/client.ts` (`useCdn: true`), `src/sanity/lib/image.ts` (`urlFor`; type `SanityImageSource` imported from `@sanity/image-url` root — moved in v2). Added `sanity.config.ts` (structureTool + visionTool, `basePath: /studio`, empty schema) + `sanity.cli.ts`, and the embedded Studio at `src/app/studio/[[...tool]]/page.tsx`. Moved site chrome into a `(site)` route group (`src/app/(site)/layout.tsx` = Spine/Nav/Footer; home page → `src/app/(site)/page.tsx`); root `layout.tsx` reduced to `<html>/<body>` + fonts so `/studio` renders full-screen with no chrome. Pinned Node ≥22.12 via `.nvmrc` + `package.json` engines (Sanity 6 hard-blocks Node 20). Sanity project `dnzlfg96` / dataset `production`; `.env.local` written (gitignored), `.env.example` committed. `/studio` loads and browser login verified; `npm run build` passes. First Phase 2 feature. Merged to main. **Manual follow-up:** CORS origin `http://localhost:3003` added in sanity.io/manage; add the production URL there at deploy time.
- **2026-07-01** — Initial Next.js + Tailwind v4 setup. Scaffolded from Create Next App, removed default boilerplate (demo page, SVGs, README, AGENTS.md), added project context docs. Committed (`chore: initial commit`) and pushed to `rikilamadrid/marina-cuesta-website`. Set dev port to 3003.
- **2026-07-01** — Feature 01 (Design Tokens & Global Styles) complete. Ported all surface/ink/accent/form tokens into `src/app/globals.css` via Tailwind v4 `@theme` (no JS config); set base `body`/`html`/`::selection`. Verified `bg-*`/`text-*`/`font-*` utilities resolve with a throwaway swatch, then removed it. Merged to main.
- **2026-07-01** — Feature 02 (Fonts) complete. Loaded Fraunces (300–600 + italic, `--font-fraunces`) and Hanken Grotesk (300–700, `--font-hanken`) via `next/font/google` in `layout.tsx` with `display: swap` + `preload`. Wired both into `@theme` (`--font-display`/`--font-body`) referencing the next/font vars with prototype fallback stacks, so `font-display`/`font-body` utilities work and Hanken is the body default. Merged to main.
- **2026-07-01** — Feature 04 (Spine & Footer) complete. Built `src/components/layout/Spine.tsx`: decorative (`aria-hidden`) vertical nameplate "Marina Cuesta — Executive Creative Director", `position:fixed` left edge, `writing-mode:vertical-rl` + `rotate-180`, Hanken 600 uppercase `.42em`, white with `mix-blend-mode:difference` so it inverts over paper/oxblood; hidden ≤980px via `min-[981px]:flex`; `pointer-events-none`. Built `src/components/layout/Footer.tsx` (server component): oxblood bg, dynamic `new Date().getFullYear()`, `© {year} Marina Cuesta · Executive Creative Director · Made with intention.`. Both mounted in `layout.tsx` around `{children}`. Verified spine inversion against a temp oxblood section on the home page, then removed it. Completes Phase 1 — Foundations. Merged to main.
- **2026-07-01** — Feature 03 (Root Layout Shell & Nav) complete. Built `src/components/layout/Nav.tsx` (`'use client'`): right-aligned links (Work/About/Recognition/Press/Contact → in-page anchors), outlined STUDIO pill (gear svg) → `/studio`, garnet underline hover. Scroll state (`scrollY > 8`) adds paper/85 bg + backdrop-blur + border, tightens padding. Mobile ≤680px (`min-[681px]`/`max-[680px]` breakpoints) collapses links into an accessible hamburger dropdown (animated burger→X, `aria-expanded`/`aria-controls`, closes on tap). Mounted in `layout.tsx` shell above `{children}`; layout stays a server component. Merged to main.
</content>
