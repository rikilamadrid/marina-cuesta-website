# CLAUDE.md — Working Conventions for This Project

> Read this before every session. It keeps decisions consistent as work continues across multiple Claude Code sessions. Full spec lives in `context/project-overview.md` — this file is the short, load-bearing summary plus rules that are easy to drift on.

---

## What this project is

Marina Cuesta's portfolio site. A statement, not a template. Editorial monograph aesthetic (Fraunces + Hanken Grotesk, garnet/oxblood palette, warm paper surfaces). Next.js App Router + TypeScript strict + Tailwind v4 + Sanity CMS + Framer Motion, deployed on Vercel at `marinacuesta.com`.

Two things this project cannot ship without:
1. **She edits it herself.** No project, press link, or headshot swap should ever require a developer or a code change. If a feature can't be done from the Sanity Studio in under a minute, it's built wrong.
2. **SEO/AI headshot fix.** Her photo lives in exactly one place (Sanity Site Settings) and flows to the hero, About, `og:image`, and `Person` JSON-LD. Never hardcode the headshot path in a component.

---

## Context folder

All working context lives in `@context/`. Read the relevant files before starting work — don't rely on memory from earlier sessions.

```
context/
├── current-feature.md      # What's being built right now — status, goals, notes (active task only)
├── features/                # Specs for phases/features not yet started or already completed
├── screenshots/              # Reference screenshots for UI being built (e.g. dashboard-ui-main.png)
├── project-overview.md      # Full project spec: stack, content models, design system, phases, seed content
├── marina-cuesta.html       # Visual/copy/interaction reference prototype
└── SEO-CHECKLIST.md         # Post-launch SEO + domain + Google Knowledge Panel steps
```

- **`current-feature.md`** is the single source of truth for what's in progress. Update it as work happens — Status, Goals, Notes. It tracks only the active task; the per-feature build log lives in `CHANGELOG.md` at the repo root — prepend an entry there once a feature is merged. Don't start work not described in `current-feature.md` without asking.
- **`features/`** holds specs for other phases (past or upcoming) — check here before assuming a phase hasn't been planned yet.
- **`screenshots/`** holds visual references for whatever UI is being built. If `current-feature.md` references a screenshot, look at it before writing markup.
- **`marina-cuesta.html`** is the design/copy source of truth for the whole site, not just one feature — check it for tokens, layout, and interaction patterns regardless of which feature is active.

---

## Before starting any phase

- Read `context/current-feature.md` first — it's the actual current task, status, and notes. `context/project-overview.md` is the full spec; re-read the relevant section, don't work from memory of earlier sessions.
- Check `context/screenshots/` for any screenshot referenced in `current-feature.md`, and `context/marina-cuesta.html` for the exact visual/copy target. Match its tokens, don't reinvent them.
- Check `context/features/` for specs on other phases before assuming something hasn't been planned.
- Verify current stable versions of Next.js, Sanity, Tailwind, Framer Motion against their official docs before installing anything. Don't assume versions from training data.
- Work one Build Phase at a time. Don't jump ahead to a later phase while the current one is unfinished.

## While building

- **Tokens, not magic numbers.** Colors, radii, shadows, easing curves come from `styles/tokens.css` / the Tailwind theme, ported from the prototype — never hardcoded hex values in components.
- **Data-driven, always.** Projects, press mentions, bio copy, career arc, headshot — all come from Sanity. If you catch yourself typing Marina's bio text directly into a `.tsx` file, stop and put it in Sanity instead.
- **Editor-first schema design.** Every Sanity field needs a plain-language title and a one-line description written for Marina, not a developer. Field order should match how she thinks about the content, not how it's stored.
- **Instant publish.** Content changes go live via the `/api/revalidate` webhook — no redeploy required for a content edit. Only code changes need a redeploy.
- **Bilingual with intention.** Spanish accents in copy are chosen deliberately (she's a US Hispanic market leader), never machine-translated filler text.
- **Motion is restrained.** Mask-up hero reveal, scroll fade/rise, gentle hover lifts — elegant, not flashy. Always respect `prefers-reduced-motion`.

## Before ending a session

- Confirm the build still runs (`next build`) with no type errors.
- If you touched Sanity schemas, confirm the Studio at `/studio` still loads and the new/changed fields render sensibly.
- Update `context/current-feature.md`: refresh Notes/Status, and if the feature is complete, mark it done and prepend an entry to `CHANGELOG.md` (repo root).
- Leave a short note (in your final message, not committed to a file) on what was completed and what the next session should pick up.

---

## Workflow

Same workflow for every feature/fix:

1. **Document** — describe the feature/fix in `context/current-feature.md` before writing code.
2. **Branch** — new branch per feature/fix: `feature/[name]` or `fix/[name]`.
3. **Implement** — build exactly what's documented; nothing extra.
4. **Test** — verify in the browser; run `npm run build` and fix any errors before moving on.
5. **Iterate** — adjust based on feedback.
6. **Commit** — only after the build passes and it's confirmed working. Ask before committing — never auto-commit.
7. **Merge** — merge to main once approved.
8. **Delete branch** — ask before deleting.
9. **Review** — periodically review AI-generated code for security (auth/input validation), performance, logic edge cases, and consistency with existing patterns.
10. **Close out** — mark the feature complete in `context/current-feature.md`, prepend its entry to the **Detailed build log** in `CHANGELOG.md`, and add a line under `[Unreleased]` in the Keep a Changelog section (see *Versioning & releases* below).

## Versioning & releases

This project follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`) and a [Keep a Changelog](https://keepachangelog.com/) top section in `CHANGELOG.md`. Current version lives in `package.json` (`1.0.0` = first public release, 2026-07-03).

**Which number to bump:**

- **PATCH** (`1.0.0 → 1.0.1`) — backward-compatible bug fix (a `fix:` commit).
- **MINOR** (`1.0.0 → 1.1.0`) — backward-compatible new feature (a `feat:` commit).
- **MAJOR** (`1.0.0 → 2.0.0`) — a breaking change (removed/renamed public route or Sanity field the CMS depends on, incompatible data-model change). Rare on this project.

**Per feature/fix (at close-out):** add a bullet under `## [Unreleased]` in the correct group — **Added / Changed / Fixed / Removed / Deprecated / Security**. Write it human-readable; don't paste git logs. Keep the per-feature detail in the Detailed build log below it.

**At release (when you cut a version):**

1. Decide the bump from the accumulated `[Unreleased]` entries (highest-impact change wins: any feature → MINOR, only fixes → PATCH).
2. Rename `## [Unreleased]` to `## [x.y.z] — YYYY-MM-DD`, add a fresh empty `## [Unreleased]` above it.
3. Run the matching script — `npm run version:patch` | `version:minor` | `version:major` — which bumps `package.json`, commits, and git-tags `vx.y.z`.
4. Push with tags: `git push --follow-tags`.

Newest version stays at the top; never rewrite a released section.

## Communication & code-change discipline

- Be concise and direct; explain non-obvious decisions briefly.
- Ask before large refactors or architectural changes.
- Don't add features not described in `current-feature.md` or `project-overview.md`.
- Never delete files without asking first.
- Make minimal changes to accomplish the task — don't refactor unrelated code unless asked.
- Preserve existing patterns in the codebase.
- If something isn't working after 2–3 attempts, stop and explain the issue rather than continuing to try fixes.
- Conventional commit messages (`feat:`, `fix:`, `chore:`); one feature/fix per commit.
- **No AI attribution in commit messages.** Commits must read as if written by the repository maintainer. Never add co-author trailers, generated-by footers, or any similar attribution — including `Co-authored-by: Claude`, `Generated with Claude Code`, `AI-assisted-by`, or any variant. No exceptions.

---

## Hard "don't"s

- Don't hardcode any content that belongs in Sanity (bio, projects, press, headshot, socials).
- Don't add a second place where the headshot can be set.
- Don't introduce a UI pattern that isn't in the prototype or explicitly described in `project-overview.md` without flagging it first.
- Don't use generic AI-portfolio defaults: terracotta-on-cream, one-big-stat-plus-gradient hero, skill bars, star ratings, logo-soup decoration.
- Don't skip the SEO metadata/JSON-LD work — it's a Phase 5 requirement, not optional polish.
- Don't assume a package version — verify against current docs.

---

## Reference files in this repo

| File | Purpose |
| --- | --- |
| `context/current-feature.md` | The active task — status, goals, notes (active task only) |
| `CHANGELOG.md` | Keep a Changelog release notes (`[Unreleased]` + versions) on top; per-feature Detailed build log below, newest first |
| `context/features/` | Specs for other phases/features, past or upcoming |
| `context/screenshots/` | Reference screenshots for UI being built |
| `context/project-overview.md` | Full spec: stack, content models, design system, phases, seed content |
| `context/marina-cuesta.html` | Visual/copy/interaction reference prototype — match its feel |
| `context/SEO-CHECKLIST.md` | Post-launch SEO + domain + Google Knowledge Panel steps (mostly manual, not code) |
| `CLAUDE.md` | This file |
