# Coding Standards

## TypeScript

- Strict mode enabled
- No `any` types - use proper typing or `unknown`
- Define interfaces for all props, API responses, and data models
- Use type inference where obvious, explicit types where helpful

## React

- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused - one job per component
- Extract reusable logic into custom hooks

## Next.js

- Server components by default
- Only use `'use client'` when needed (interactivity, hooks, browser APIs — e.g. the work search/filter, the Studio nav state)
- Use Server Actions for form submissions and simple mutations (e.g. the contact form, if one is added)
- Use API routes when you need:
  - Webhooks (Sanity's on-demand revalidation webhook)
  - Dynamic OG image generation (`/api/og`)
  - Specific HTTP status codes or headers
  - Third-party integrations
- Otherwise, fetch content directly in server components via Sanity
- Dynamic routes for project pages (`/work/[slug]`)

## Tailwind CSS v4

**CRITICAL**: We are using Tailwind CSS v4, which uses CSS-based configuration.

- **DO NOT** create `tailwind.config.ts` or `tailwind.config.js` files (those are for v3)
- All theme configuration must be done in CSS using the `@theme` directive in `src/app/globals.css`
- Use CSS custom properties for colors, spacing, etc. — port the tokens from `context/marina-cuesta.html` (paper/bone/blush surfaces, ink, garnet/oxblood accents, Fraunces/Hanken Grotesk)
- No JavaScript-based config allowed

Example v4 configuration:

```css
@import "tailwindcss";

@theme {
  --color-garnet: #B11E3A;
  --color-oxblood: #3D0D17;
  --color-paper: #FAF7F2;
}
```

## File Organization

- Components: `src/components/[feature]/ComponentName.tsx`
- Pages: `src/app/[route]/page.tsx`
- Server Actions: `src/actions/[feature].ts`
- Types: `src/types/[feature].ts`
- Lib/Utils: `src/lib/[utility].ts`
- Sanity schemas: `src/sanity/schema/[type].ts`
- Sanity queries: `src/sanity/lib/queries.ts` (GROQ, one exported query per data need)
- Sanity client/image helpers: `src/sanity/lib/client.ts`, `src/sanity/lib/image.ts`

## Naming

- Components: PascalCase (`ProjectCard.tsx`)
- Files: Match component name or kebab-case
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase (no prefix)
- Sanity schema type names: camelCase (`project`, `pressMention`, `siteSettings`)

## Styling

- Tailwind CSS for all styling
- No inline styles
- Editorial light theme by default (paper/bone surfaces, warm ink) — this is not a dark-mode-first product; the one deliberate dark moment is the oxblood manifesto/contact sections, not a global mode
- No shadcn/ui — the design is bespoke (Fraunces + Hanken Grotesk, garnet/oxblood palette); don't reach for a component library that fights the editorial aesthetic

## Content (Sanity CMS)

- Sanity is the **only** source of content — projects, press mentions, bio, career arc, headshot, socials, SEO defaults. Never hardcode this content in a component.
- Schemas live in `src/sanity/schema/`: `project`, `pressMention`, `siteSettings` (singleton), plus shared objects (`link`, `seo`) as needed
- `siteSettings` is a singleton — hide "create new" in the Studio desk structure (`src/sanity/structure.ts`)
- Every field needs a plain-language `title` and a one-line `description` written for a non-technical editor (Marina), not a developer
- Use `@sanity/orderable-document-list` for manual drag-to-reorder on `project` and `pressMention`
- Enable image hotspot/crop on the headshot and project cover fields so crops stay controlled across breakpoints
- Embed the Studio at `/studio` in the same Next.js app — one deploy, one login
- Validate authored content with Sanity's own schema `validation` rules (required fields, string length, URL format) rather than duplicating validation client-side

## Data Fetching

- Server components fetch directly via the Sanity client + GROQ queries from `src/sanity/lib/queries.ts`
- Use `next-sanity`'s `sanityFetch` (or equivalent) with tags so on-demand revalidation can target specific content
- `/api/revalidate` receives Sanity's webhook and calls `revalidateTag`/`revalidatePath` — no full redeploy needed for a content edit
- Client components (search/filter on `/work`) receive data as props from the server component; don't fetch Sanity content from the client
- Validate any user-submitted input (e.g. a future contact form) with Zod — this is separate from Sanity's authoring-side validation

## Error Handling

- Use try/catch around Sanity fetches in server components; fail gracefully (empty state, not a crash) if a query returns nothing
- Use try/catch in Server Actions
- Return `{ success, data, error }` pattern from actions
- Display user-friendly error messages via toast

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible