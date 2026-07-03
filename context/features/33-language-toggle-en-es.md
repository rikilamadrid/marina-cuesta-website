# Language Toggle (English / Spanish)

## Status

Not Started

## Goals

- Add a **language toggle** (EN ↔ ES) in the nav, styled to the editorial system, that switches the **whole site** — UI chrome *and* content.
- Translate two distinct layers:
  1. **UI strings** — nav labels, section headings, buttons, filter chips, "View project", contact CTA, footer, form/empty states. These live in code → move to a small typed dictionary (`en` / `es`), no hardcoded copy.
  2. **CMS content** — project titles/summaries/write-ups, press headlines, bio, career arc, hero statement. This is Sanity data and is the real weight of the feature (see decision below).
- **Persist** the choice and reflect it in the **URL / routing** so pages are linkable, shareable, and indexable per language.
- **SEO per language**: correct `<html lang>`, `hreflang` alternates, localized metadata, and per-language sitemap entries. This feeds the "top of Google" goal — don't regress Features 22/24.
- Respect the "Bilingual with intention" rule (CLAUDE.md): Spanish is **deliberate, human, never machine-translated filler**. Marina must be able to write/edit the Spanish herself.

## Notes

- **Depends on:** Sanity schemas (`06`–`08`), GROQ queries (`10`), metadata/JSON-LD (`22`), sitemap (`24`). This is the largest of the three features.
- Editor-first is non-negotiable: whatever localization approach we pick, Marina must be able to add/edit Spanish content from the Studio in the same one-minute flow (CLAUDE.md rule #1). A code-only i18n that leaves CMS content English-only does **not** satisfy "the whole website in Spanish."
- Next.js 16 App Router i18n: likely a `[lang]` segment or middleware-based locale routing — verify the current recommended pattern against Next 16 docs before choosing (CLAUDE.md: don't assume from training data).
- Sanity localization options to evaluate: **field-level i18n** (`@sanity/document-internationalization` or `internationalizedArray`) vs. **document-level** (separate ES documents). Pick based on how Marina thinks about editing, not storage convenience.

## Open questions to resolve before building (blocking — decide first)

- **Content translation scope:** UI strings only, or UI + full CMS content? The user asked for "the whole website in Spanish," which implies CMS content too — confirm.
- **Sanity approach:** field-level localized fields vs. separate localized documents. This is the core architectural decision and drives schema migration, GROQ, and the Studio editing experience.
- **Who writes the Spanish?** If Marina writes it, we build empty localized fields and she fills them; if not, we need a translation source before launch (not machine filler).
- **Routing shape:** `/es/...` path prefix (best for SEO, recommended) vs. cookie/state-only.

## Out of Scope

- Machine-translated placeholder copy.
- Vercel/CI (`31`) and dark mode (`32`).
- Additional languages beyond EN/ES.
