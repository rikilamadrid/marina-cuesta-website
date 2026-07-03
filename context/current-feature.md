# Current Feature

Feature 31 - Vercel Deploy & CI/CD

## Status

Not Started — spec written. First of three post-launch features (31 deploy/CI-CD → 32 dark mode → 33 EN/ES toggle). Working them one at a time.

## Goals

- Deploy to **Vercel** wired to the GitHub repo, serving production from `main`.
- Configure production **env vars** on Vercel (Sanity project ID/dataset, read token, revalidate secret, site URL).
- Confirm the **revalidate webhook** (`/api/revalidate`) works against the live deployment.
- Add a **GitHub Actions** workflow gating PRs and `main` on typecheck + `next build`.
- Vercel owns deploy (preview per PR, prod on merge); Actions owns verification — no duplication.
- Point **marinacuesta.com** at Vercel (DNS + SSL), or document owner-driven DNS steps.

## Notes

- Full spec: `@context/features/31-vercel-deploy-and-cicd.md`.
- Next 16 / React 19 / Node ≥22. Pin Node in Vercel + Actions.
- Add the production `/studio` URL to Sanity CORS/dev-host whitelist (memory `sanity-studio-access`); confirm login on live `/studio`.
- Watch for cloud-sync `' 2'` duplicate files (memory `cloud-sync-duplicate-files`) — keep them out of commits/deploys.
- Reconcile domain steps with `@context/SEO-CHECKLIST.md`.

## Predecessor note

Feature 30 (Responsive QA & Handoff) is **merged to `main`** (`PressList.tsx` date fix + `HANDOFF.md`); its branch is deleted and its CHANGELOG entry is in place. This branch (`feature/vercel-deploy-and-cicd`) is cut fresh from `main`.

## Upcoming (specs written, not started)

- **Feature 32 — Dark/Light Mode Toggle:** `@context/features/32-dark-light-mode-toggle.md`. Open decision: full palette inversion vs. dimmed warm variant.
- **Feature 33 — Language Toggle (EN/ES):** `@context/features/33-language-toggle-en-es.md`. Blocking decision: UI-only vs. full CMS content localization + Sanity field-level vs. document-level i18n.

## Out of Scope

- Dark mode (`32`) and language toggle (`33`) — separate features, later.

## History

The per-feature build log lives in `CHANGELOG.md` at the repo root. When a feature merges to `main`, prepend its entry there — this file tracks only the active task.
