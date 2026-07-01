# Home — Recognition & Contact Sections

## Status

Not Started

## Goals

- Build `src/components/home/Recognition.tsx` (id `recognition`, section "03 Recognition"): agencies & clients wordmark row (TBWA · CHINA · Dieste · … · Apple · McDonald's · GOYA · Lululemon · etc.) plus recognition highlights (50+ awards, Cannes See It Be It 2016, festival juries, mentorship).
- Build `src/components/home/ContactCTA.tsx` (id `contact`): full-bleed **oxblood** field, centered display line "Let's make something that *matters*." (*matters* in garnet italic), the email as a bordered link, and social links (LinkedIn · Behance · Instagram · Vimeo).
- Email and socials come from **Site Settings**; agencies/recognition content sourced from Site Settings/seed (note where each lives).
- Place both on the home page in order (… featured work → recognition → contact) with the Footer after.
- AA contrast on the oxblood contact field.
- `npm run build` passes.

## Notes

- **Depends on:** Phase 1, `10` (site settings for email/socials). Recognition data: decide between a Site Settings field vs. static seed and note it.
- Visual sources: recognition/agencies row + "Press & Mentions" header in `@context/screenshots/marina-example5.png`; contact/footer in `@context/screenshots/marina-example6.png`; prototype `#recognition` (~lines 453–468) and `.contact` (~lines 259–264, 480–491).
- **One-photo/one-place rule:** email and socials must read from Site Settings, not be hardcoded.
- This completes the home page skeleton (hero → manifesto → featured work → recognition → contact). About/Press teasers link to their dedicated pages built in Phase 4.

## Out of Scope

- The `/about` and `/press` dedicated pages — Phase 4 (`20`, `21`).
- A working contact form (the CTA is an email link + socials; no form in v1 unless requested).
- Fade-in motion — Phase 6.
