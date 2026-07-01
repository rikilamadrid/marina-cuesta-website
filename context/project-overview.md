# Marina Cuesta — Project Overview

> **A portfolio that behaves like a statement: an editorial monograph for an Executive Creative Director with serious taste — elegant, multicultural, feminist, fast, and effortless for her to keep up to date herself.**

---

## Table of Contents

- [Vision](#vision)
- [Target Audience](#target-audience)
- [The Core Concept](#the-core-concept)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Content Models (Sanity + TypeScript)](#content-models-sanity--typescript)
- [Pages & Sections](#pages--sections)
- [Design System](#design-system)
- [The Studio (Marina's CMS)](#the-studio-marinas-cms)
- [SEO, Google & the "AI Résumé" Photo](#seo-google--the-ai-résumé-photo)
- [Motion](#motion)
- [UI / UX](#ui--ux)
- [Routing & Deep Links](#routing--deep-links)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Build Phases](#build-phases)
- [Seed Content](#seed-content)
- [Conventions & Rules](#conventions--rules)
- [Things To Avoid](#things-to-avoid)
- [Reference Prototype](#reference-prototype)

---

## Vision

The current site (`marinacuesta.com`) is an Adobe Portfolio template: functional, but flat and forgettable. It does not reflect who Marina is — a Cannes-recognized Executive Creative Director with 20+ years of work for the world's biggest brands and a clear feminist point of view. This rebuild replaces the template with a **statement**.

When someone lands, they should immediately feel taste, confidence, and craft. The takeaway: *"This is a creative leader at the top of her field — and she made room for the women coming after her."*

| Goal | Description |
| --- | --- |
| **A statement, not a template** | Reads like a fashion/art monograph, not a portfolio builder |
| **Unmistakably her** | Elegant, multicultural (EN/ES), feminist — specific to Marina, not generic |
| **Top of Google** | Ranks for "Marina Cuesta" and shows **her** face in the Google/AI knowledge card |
| **She owns it** | Marina updates projects, press, and her headshot herself — no developer, no code |
| **Fast & smooth** | SSR/SSG, mobile-first, buttery on a phone, instant to load |

This is also a **gift**. The bar is delight: she should be proud to send the link.

---

## Target Audience

| Persona | What they should feel |
| --- | --- |
| **Agency leadership / recruiters** | "This is a senior creative leader with range and taste." |
| **Brands & potential clients** | "I want her leading my creative." |
| **Press, juries, festival programmers** | "Credible, awarded, quotable — here's her work and bio." |
| **Women in the industry / mentees** | "She champions us, and she's proof it's possible." |
| **Anyone Googling her** | Lands on the real site (and the right photo), not a stale third-party profile |

Primary measures of success: **search visibility for her name**, **the correct headshot in Google/AI summaries**, and **how easily she keeps it current**.

---

## The Core Concept

The site is an **editorial monograph** — a designed catalog of a body of work, with a strong bilingual, feminist editorial voice.

- **The work is the hero.** A curated, categorized, instantly searchable index of real campaigns.
- **A point-of-view manifesto** anchors the middle: a bold, full-bleed oxblood moment that states what she stands for.
- **Bilingual by design.** English-first with deliberate Spanish accents (she is Spanish/Latina, US Hispanic market leader). Never Google-translated; chosen, tasteful.
- **A signature nameplate** runs vertically down the page edge and inverts against whatever it scrolls over.
- **She runs it from a Studio.** A private CMS (Sanity) lets her add projects, paste interviews/press links, reorder work, and swap her headshot — as easily as Behance, which is the only reason she's resisted a custom site until now.

> Every decision answers one question: *"Does this make Marina look like the statement she is — and is it still trivially easy for her to update?"*

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js (App Router, latest stable) — SSR/SSG for SEO + speed |
| **UI Runtime** | React (latest stable) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 + CSS custom properties for design tokens |
| **CMS** | **Sanity** (embedded Studio at `/studio`) — Marina's editor |
| **Data layer** | `next-sanity` + GROQ; ISR with on-demand revalidation via Sanity webhook |
| **Media** | Sanity image CDN + `next/image`; Vimeo/YouTube embeds for video |
| **Motion** | Framer Motion |
| **Fonts** | Fraunces (display) + Hanken Grotesk (body) via `next/font` |
| **OG images** | `@vercel/og` (per-project + profile card) |
| **Deployment** | Vercel |

> **CMS-first rule (differs from a static site):** the admin experience is a **v1 requirement**, not a future nice-to-have. Marina must be able to publish a new project or press link in under a minute, from her phone if she wants, with zero code. Sanity Studio is embedded in the same app and deploys with it, so there's one URL, one login, one deploy.

> **Version rule:** verify the current stable version of every dependency against its official docs before installing. Do not assume versions from memory.

> **One-photo rule:** Marina's headshot is set in **one** place (Site Settings in Sanity) and flows everywhere — the **hero portrait (above the fold)**, the About page, `og:image`, and the `Person` JSON-LD. See [SEO & the AI Résumé Photo](#seo-google--the-ai-résumé-photo).

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout, fonts, JSON-LD, default metadata
│   ├── page.tsx                   # Home (hero → manifesto → featured work → about → recognition → press → contact)
│   ├── globals.css                # Tailwind + token imports
│   ├── sitemap.ts                 # Generated from Sanity content
│   ├── robots.ts
│   ├── work/
│   │   ├── page.tsx               # Full searchable/filterable work index (SSG + client filter)
│   │   └── [slug]/page.tsx        # Dedicated SSR project page (hero, write-up, gallery, links)
│   ├── about/page.tsx             # Long-form bio, career arc, recognition
│   ├── press/page.tsx             # Press & mentions index
│   ├── studio/[[...tool]]/page.tsx# Embedded Sanity Studio (Marina's CMS)
│   └── api/
│       ├── og/route.tsx           # @vercel/og dynamic OG images
│       └── revalidate/route.ts    # Sanity webhook → on-demand ISR
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx                # Top nav + scroll/dark states + mobile menu
│   │   ├── Spine.tsx             # Signature inverting vertical nameplate
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Manifesto.tsx          # Oxblood point-of-view moment
│   │   ├── Recognition.tsx
│   │   └── ContactCTA.tsx
│   ├── work/
│   │   ├── WorkGrid.tsx           # Renders ProjectCard list
│   │   ├── WorkControls.tsx       # Filters + live search (client component)
│   │   ├── ProjectCard.tsx        # Typographic gradient tile (or cover image)
│   │   └── ProjectDetail.tsx
│   ├── press/PressList.tsx
│   └── ui/                        # Reveal, buttons, primitives
│
├── sanity/
│   ├── schema/
│   │   ├── index.ts
│   │   ├── project.ts
│   │   ├── pressMention.ts
│   │   ├── siteSettings.ts        # headshot, bio, socials, SEO defaults
│   │   └── objects/               # link, seo, category (shared objects)
│   ├── lib/
│   │   ├── client.ts
│   │   ├── image.ts               # urlFor() image builder
│   │   └── queries.ts             # GROQ queries
│   ├── env.ts
│   └── structure.ts               # Studio desk structure (friendly, grouped)
│
├── lib/
│   ├── seo.ts                     # metadata + JSON-LD helpers
│   └── utils.ts
│
└── styles/
    └── tokens.css                 # All design tokens as CSS variables
```

---

## Content Models (Sanity + TypeScript)

Content lives in Sanity and is strongly typed on the front end. These are the single source of truth; UI renders from them. Schemas should be written so the editing UI is **obvious and pleasant** for a non-technical editor (clear titles, helpful descriptions, sensible field order, previews).

```ts
// Project ───────────────────────────────────────────────
export type ProjectCategory =
  | "Global Brands" | "Multicultural" | "Feminist & Social" | "Culture & Film";

export interface Project {
  _id: string;
  title: string;
  slug: string;                 // → /work/[slug]
  client: string;               // e.g. "GOYA", "P&G"
  category: ProjectCategory;
  year?: number;
  market?: ("US" | "U.S. Hispanic" | "Europe" | "Global")[];
  role?: string;                // e.g. "Executive Creative Director"
  summary: string;              // one line for the card
  body?: PortableText;          // long write-up for the detail page
  cover?: SanityImage;          // optional hero/cover; falls back to gradient tile
  gallery?: (SanityImage | { videoUrl: string })[];
  externalLink?: string;        // Behance / case study / film
  featured: boolean;            // shown on home
  order: number;                // manual sort (drag in Studio)
}

// Press Mention ─────────────────────────────────────────
export interface PressMention {
  _id: string;
  title: string;                // headline of the piece
  outlet: string;               // "Adweek", "Cannes Lions", "LinkedIn"
  type: "interview" | "feature" | "award" | "talk" | "podcast";
  date?: string;                // ISO
  link: string;
  order: number;
}

// Site Settings (singleton) ─────────────────────────────
export interface SiteSettings {
  name: string;                 // "Marina Cuesta"
  jobTitle: string;             // "Executive Creative Director"
  headshot: SanityImage;        // THE photo — drives hero, og:image, JSON-LD
  shortBio: string;             // hero statement
  longBio: PortableText;        // about page
  careerArc: { org: string; note: string }[];
  email: string;
  socials: { label: string; href: string }[];
  seo: { title: string; description: string };  // defaults; ogImage = headshot
}
```

Requirements:

- **Singleton Site Settings**: one document; structure builder hides "create new".
- **Image hotspots**: enable hotspot/crop so Marina controls how her headshot and covers crop responsively.
- **Drag-to-reorder** projects and press via `order` (use `@sanity/orderable-document-list`).
- **Sensible previews**: project preview shows client + title + category + cover thumbnail.

---

## Pages & Sections

| Page / Section | Route | Behavior |
| --- | --- | --- |
| **Home** | `/` | Hero → Manifesto → Featured work → About teaser → Recognition → Press teaser → Contact. SSG, fully crawlable. |
| **Hero** | `/#top` | Name as typographic monument, bilingual eyebrow, one-line statement, key stats (20+ yrs, 50+ awards, Cannes), and a **framed editorial headshot beside the name** — present above the fold, deliberately secondary to the name (not a large glossy face). Drops to a modest portrait at the top on mobile. |
| **Manifesto** | `/#pov` | Full-bleed oxblood point-of-view moment + a 4-up credo. The brand's thesis. |
| **Work (index)** | `/work` | All projects, category filters + **live search**, gradient/cover tiles. |
| **Project detail** | `/work/[slug]` | SSR page: hero, summary, write-up, gallery/video, client/role/year, external link. Per-page metadata + OG. |
| **About** | `/about` | Long bio in her voice, headshot, career arc, recognition, expertise. |
| **Press** | `/press` | Interviews, features, awards, talks — each a link. |
| **Contact** | `/#contact` | Elegant CTA, email, real socials (LinkedIn, Behance, Instagram, Vimeo). |
| **Studio** | `/studio` | Embedded Sanity Studio — Marina's private editor (auth required). |

> Featured work on the home page is driven by `featured: true` + `order`. The full body of work lives at `/work`.

---

## Design System

The visual language is an **editorial monograph** — high-contrast display typography, generous whitespace, a confident garnet/oxblood palette nodding to Marina's Spanish roots, with restraint everywhere except one bold color moment. **Port these tokens directly from the reference prototype** (`marina-cuesta.html`).

### Core Tokens (`styles/tokens.css`)

```css
:root {
  /* Surfaces */
  --paper:#FAF7F2;     /* warm white, primary */
  --bone:#F3ECE3;      /* secondary surface */
  --blush:#EBD9D2;     /* soft tertiary fill */

  /* Ink */
  --ink:#1A1714;       /* near-black, warm */
  --ink-2:#5A524B;     /* muted text */
  --line:#E6DED3;      /* hairlines */

  /* Accent — Spanish garnet, the single bold color */
  --garnet:#B11E3A;
  --garnet-deep:#7C0B1B;
  --oxblood:#3D0D17;   /* the full-bleed manifesto/contact field */

  /* Form */
  --radius:3px;        /* crisp, gallery-like, not bubbly */
  --shadow:0 24px 50px -24px rgba(61,13,23,.5);
  --ease:cubic-bezier(.22,.61,.36,1);
}
```

### Color Direction

| Use | Direction |
| --- | --- |
| **Base** | Warm white / bone paper, near-black warm ink |
| **Accent** | One garnet/oxblood family — used for rules, eyebrows, hovers, and one full-bleed moment |
| **Forbidden** | Generic terracotta-on-cream cliché, neon, cool tech-blue, rainbow gradients, heavy shadows everywhere |

### Typography

| Role | Font | Notes |
| --- | --- | --- |
| **Display / name / headers** | **Fraunces** (300–600, incl. italic) | High-contrast, characterful, fashion-editorial; used with restraint |
| **Body / UI / labels** | **Hanken Grotesk** (300–700) | Clean humanist grotesque; readable, breathes |

Strong type scale, tight tracking on display, wide tracking on uppercase eyebrows/labels. Italic Fraunces (often in garnet) for editorial emphasis.

### Signature Elements

- **Inverting vertical nameplate** (`Spine.tsx`): fixed to the left edge on desktop, `mix-blend-mode: difference` so it stays legible over both paper and oxblood. Hidden on mobile.
- **Numbered section index** (01 / 02 …): legitimate here because the work genuinely is a catalog/sequence.
- **Gradient project tiles**: when a project has no cover image, render a tasteful client-name-forward gradient tile (palettes from the prototype) so the grid always looks intentional.
- **"JEFA" ghost type** behind the manifesto (her Tumblr is *jefas* — "female bosses"). A quiet feminist watermark.

---

## The Studio (Marina's CMS)

This is the feature that makes the whole project viable — it's why Marina will actually say yes. Treat it as a first-class deliverable.

- **One embedded Studio** at `/studio`, same app, same deploy, one login.
- **Plain-language schema**: fields named the way Marina thinks ("Client", "Headline", "Outlet", "Link", "Show on homepage"), each with a one-line description.
- **Three things she does most, made trivial:**
  1. **Add a project** — title, client, category, optional cover/video, link, toggle "Featured", drag to order.
  2. **Add a press mention** — headline, outlet, type, link.
  3. **Swap her headshot** — one image field in Site Settings, with crop/hotspot; updates the whole site + SEO photo.
- **Instant publish**: a Sanity webhook hits `/api/revalidate` so edits go live within seconds (on-demand ISR), no rebuild, no redeploy.
- **Mobile-friendly Studio**: she can post from her phone.
- **Desk structure** (`structure.ts`): group as **Site Settings** (singleton, pinned top), **Work**, **Press**. Orderable lists for Work and Press.

> Reassurance baked into the brief: this must feel *at least* as easy as uploading to Behance — that's the bar she set.

---

## SEO, Google & the "AI Résumé" Photo

Two concrete outcomes the client cares about: (1) the site **ranks at the top for "Marina Cuesta"**, and (2) the **Google/AI knowledge card shows Marina's face**, not a former colleague's. The wrong photo today comes from Google's Knowledge Graph picking an image from a weak source; the fix is to make *this site* the strong, unambiguous source and align her other profiles to it.

### On-page (build these)

- **`Person` JSON-LD** in the root layout, populated from Site Settings — `name`, `jobTitle`, `image` (her headshot), `url`, `sameAs` (LinkedIn, Behance, Instagram, Vimeo), `knowsLanguage` (en/es), `award`, `worksFor`, `alumniOf`. The `image` must be an absolute URL to her headshot.
- **`CreativeWork` JSON-LD** on each `/work/[slug]`.
- **`og:image` = her headshot** site-wide (square + landscape variants via `@vercel/og`); same photo as JSON-LD.
- **Per-page metadata** via `generateMetadata` (title, description, canonical) for home, `/work/[slug]`, `/about`, `/press`.
- **Semantic HTML**, one `<h1>` per page, descriptive alt text on the headshot ("Marina Cuesta, Executive Creative Director").
- **`sitemap.ts` + `robots.ts`**, generated from Sanity.
- **Fast Core Web Vitals** (Google ranking factor) — see [Performance](#performance).

### Off-page (document as a checklist for the client — not code)

Include a short `SEO-CHECKLIST.md` in the repo with these steps:

1. Launch with the headshot wired into JSON-LD + `og:image`.
2. Set the **same** photo as her **LinkedIn** and **Behance** profile picture (consistency tells Google which face is hers).
3. Submit the site in **Google Search Console**; request indexing.
4. Once a knowledge panel appears for her, **claim it** ("Claim this knowledge panel" → verify via a linked profile).
5. Consider a **Wikidata** entry with her image — Wikidata feeds Google's Knowledge Graph and AI summaries directly, and is the most reliable lever for the photo.
6. Make sure agency/Cannes/festival bios point to `marinacuesta.com`.

---

## Motion

Refined and intentional — this is an elegant brand, not a playground. Use Framer Motion.

| Element | Motion |
| --- | --- |
| **Hero name** | Mask-up reveal, line by line (Fraunces), on load |
| **Sections** | Scroll-triggered fade + rise (IntersectionObserver / `whileInView`) |
| **Work tiles** | Gentle lift + shadow bloom + slow gradient scale on hover; "View project →" slides in |
| **Manifesto** | Soft fade-in of quote and credo; the oxblood field is calm, not flashy |
| **Nav** | Background/blur appears on scroll; link color inverts over dark sections |
| **Page transitions** | Soft fade between home and `/work/[slug]` |

> **Reduced motion:** honor `prefers-reduced-motion` — disable reveals and ambient effects, keep state changes instant. Already handled in the prototype; preserve it.

---

## UI / UX

### Home layout (desktop)

```
│ MARINA CUESTA (vertical spine, left edge)        Work About Recognition Press · Studio │
│                                                                                         │
│   Executive Creative Director · Directora Creativa                          ┌─────────┐ │
│   M A R I N A                                                               │ headshot│ │
│   C U E S T A   (italic, garnet)                                            │ (framed,│ │
│   Twenty years of good ideas across three markets, told in two languages…   │ subtle) │ │
│   20+ yrs   50+ awards   3 markets   Cannes See It Be It                    └─────────┘ │
│                                                                                         │
│  ░░░░░░░░░ OXBLOOD MANIFESTO ░░░░░░░░░  "I don't make ads. I build platforms…"  (JEFA)   │
│                                                                                         │
│  01 Selected Work     [All][Global][Multicultural][Feminist & Social][Culture]  🔍search │
│  ┌─────┐ ┌─────┐ ┌─────┐                                                                 │
│  │tile │ │tile │ │tile │  …                                                              │
│  └─────┘ └─────┘ └─────┘                                                                 │
```

### Principles

- Elegant, confident, generous whitespace; every element earns its place.
- The work and the manifesto carry the page; chrome stays quiet.
- Bilingual accents are deliberate, never decorative noise.

### Responsive

| Breakpoint | Behavior |
| --- | --- |
| **Desktop** | Vertical spine visible; multi-column work grid; full nav |
| **≤980px** | Spine hidden; 2-col grid |
| **≤680px** | 1-col grid; hamburger menu; tighter type scale; everything thumb-friendly |

---

## Routing & Deep Links

| Route | Description |
| --- | --- |
| `/` | Home (SSG) |
| `/work` | Full work index (SSG + client-side filter/search) |
| `/work/[slug]` | SSR/SSG project detail; `generateStaticParams` from Sanity |
| `/about` | Bio + recognition |
| `/press` | Press & mentions |
| `/studio` | Embedded Sanity Studio (auth) |
| `/api/og` | Dynamic OG images |
| `/api/revalidate` | Sanity webhook → on-demand ISR |

---

## Accessibility

- Keyboard operable throughout; visible focus rings (don't remove outlines).
- One `<h1>` per page; logical heading order; landmark regions.
- AA contrast on paper **and** oxblood fields (the bone text on oxblood already passes — keep it).
- Descriptive alt text on the headshot and project covers.
- Respect `prefers-reduced-motion`.
- Studio is Sanity's own accessible UI — no extra work.

---

## Performance

> The site must feel **instant** — Core Web Vitals are also a Google ranking factor, which ties directly to the "top of Google" goal.

- SSG/ISR everywhere; minimal client JS (search/filter is the main interactive island).
- `next/image` for the headshot and covers; Sanity CDN with width/quality params; lazy-load below the fold.
- `next/font` (Fraunces, Hanken Grotesk) — preload display weight, `font-display: swap`.
- Cap `backdrop-filter` usage (nav only); keep motion on transform/opacity.
- Budget: **Lighthouse Performance, SEO, and Best Practices ≥ 95**; LCP < 2.0s on mobile.

---

## Build Phases

| Phase | Deliverable |
| --- | --- |
| **1 — Foundations** | Next.js + TS + Tailwind v4 + tokens; fonts; Nav, Spine, Footer; port design system from prototype |
| **2 — Sanity** | Schemas (project, pressMention, siteSettings), embedded Studio, desk structure, orderable lists, seed content |
| **3 — Home + Work** | Hero, Manifesto, Recognition, Contact; Work index with live search/filter; project cards |
| **4 — Detail + About + Press** | `/work/[slug]`, `/about`, `/press`; portable text rendering; galleries/video |
| **5 — SEO + AI photo** | JSON-LD, per-page metadata, OG images, sitemap/robots, `SEO-CHECKLIST.md`, revalidate webhook |
| **6 — Polish** | Motion pass, a11y pass, performance pass, responsive QA on real phone; hand Marina her Studio login |

---

## Seed Content

Use the real content below to seed Sanity so the site is populated on first run.

### Site Settings

- **Name:** Marina Cuesta
- **Job title:** Executive Creative Director
- **Hero statement:** "Twenty years of good ideas across three markets, told in two languages — for the world's biggest brands and for the women who deserve to see themselves leading."
- **Email:** placeholder (`hello@marinacuesta.com` — confirm real address)
- **Socials:** LinkedIn `https://www.linkedin.com/in/marina-cuesta-tovar-a20b0a24/` · Behance `https://www.behance.net/marinacuesta` · Instagram `https://www.instagram.com/marinacuestat/` · Vimeo `https://vimeo.com/user79280541`
- **Headshot:** *client to provide a professional headshot — leave a clearly-marked placeholder until then.*

### Long bio (her voice, paraphrased from her current site)

> Driven by a vocation for powerful ideas, recognized as one of the most influential female voices in advertising. For more than twenty years I've led integrated platforms and campaigns across North American, U.S. Hispanic and European markets — for clients including Apple, McDonald's, GOYA Foods, Chevrolet, FritoLay and Sony. My path runs through TBWA, CHINA, Dieste and The Marketing Arm, and most recently launching Creyentes / We Believers in the United States. I lead with empathy, inspiration and purpose, collaborating across countries and cultures, and I'm a committed advocate for mentorship, diversity, inclusion, and the women reshaping this industry. A lover of cultures and new adventures, I find joy in travel — often alongside my greatest creative project: my family.

### Career arc

| Org | Note |
| --- | --- |
| TBWA · Madrid | Copywriter → McDonald's, Apple at Media Arts Lab |
| CHINA · Spain | Creative Director → Levi's, Schweppes, KFC, Sitges |
| Dieste · USA | Creative Director → GOYA, P&G, Dunkin', The Wild Detectives |
| The Marketing Arm | Group Creative Director |
| Creyentes / We Believers | Executive Creative Director |

### Recognition

- 50+ international advertising awards
- Cannes Lions **See It Be It** (2016)
- International festival juries
- Mentor, speaker & coach — focus on women in creative

### Projects (category → client → title)

**Feminist & Social:** P&G — *The Pattern Bra* · NTARUPT — *The Pull Out Game* · NTARUPT — *Talk About It Dallas* · The Wild Detectives — *Shequel*
**Multicultural:** GOYA — *Prodigal Son* · GOYA — *Real-Life Chefs* · GOYA — *Oda a la Mezcla* · Dunkin' — *Hispanic Heritage Month* · Inter Miami CF
**Global Brands:** Apple · McDonald's · FritoLay — *SmartFood* · Schweppes — *First Time* · KFC · Lululemon — *FEEL* · Chevrolet
**Culture & Film:** The Wild Detectives — *Litbaits* · The Wild Detectives — *Drunken Literature* · Sitges International Film Festival · FIU — *Miss Hivaria*

> Marina will refine copy, add covers/video, and reorder in the Studio. Seed `featured: true` on ~6–8 of the strongest (suggest: The Pattern Bra, GOYA Prodigal Son, Apple, Shequel, Lululemon FEEL, NTARUPT, Schweppes First Time, Sitges).

### Press

Seed 2–3 placeholders (Cannes See It Be It recognition; an "add your interviews here" prompt) so the section renders; Marina fills the rest.

---

## Conventions & Rules

- **Production quality:** typed (strict), accessible, responsive, maintainable, component-driven.
- **Data-driven:** all work/press/bio/headshot come from Sanity; never hardcode content in components.
- **Tokens, not magic numbers:** colors, radii, shadows, easing live in `tokens.css` / Tailwind theme — ported from the prototype.
- **One photo, one place:** the headshot is set only in Site Settings and flows to hero, OG, and JSON-LD.
- **Editor-first schemas:** every field readable by a non-technical person; helpful descriptions; sensible order; previews.
- **Instant publish:** content edits go live via on-demand revalidation, no redeploy.
- **Verify dependency versions** against official docs before installing.
- **Bilingual with intention:** Spanish accents are chosen, never machine-translated filler.

---

## Things To Avoid

- Another portfolio template, or anything that looks like Adobe Portfolio / a builder.
- The generic AI look: terracotta-on-cream, one big number + gradient, broadsheet hairlines everywhere.
- Walls of text; corporate "About Me" filler.
- Skill bars, star ratings, rigid timelines, logo soup as decoration.
- Loud gradients, neon, heavy drop shadows, motion for its own sake.
- Anything that makes updating the site require a developer. If Marina can't do it herself in under a minute, it's wrong.
- Hardcoded content that bypasses the CMS.

> Quality over quantity. The result should make Marina proud to send the link — and make other creatives wish their site looked like this.

---

## Reference Prototype

A working single-file prototype (`marina-cuesta.html`) already demonstrates the intended look, copy, and interactions: the inverting vertical nameplate, the mask-up hero reveal, the oxblood manifesto with the "JEFA" watermark, the categorized + **live-searchable** work grid with gradient tiles, the about/recognition/press/contact sections, scroll reveals, mobile layout, and a **working "Studio" demo** that shows exactly how Marina adds a project, adds a press link, and swaps her headshot.

**Treat the prototype as the visual, copy, and interaction source of truth.** It need not be matched pixel-for-pixel — port its design tokens, typography, layout, copy, and feel into the production Next.js + Tailwind + Sanity + Framer Motion architecture above, then refine. The prototype's in-browser "Studio" is a *demo*; the production Studio is Sanity (real, persistent, instant-publish).
