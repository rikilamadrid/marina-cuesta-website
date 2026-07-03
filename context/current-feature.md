# Current Feature

Feature 31 - Vercel Deploy & CI/CD

## Status

In Progress — code deliverables done; remaining steps are owner/dashboard-driven. First of three post-launch features (31 deploy/CI-CD → 32 dark mode → 33 EN/ES toggle). Working them one at a time.

**Code done (this branch, `feature/vercel-deploy-and-cicd`):**

- `.github/workflows/ci.yml` — CI gate on PR→`main` and push→`main`: `npm ci` → `typecheck` → `lint` → `build`. Verification only; does not deploy. Node from `.nvmrc` (22); build env pulls public Sanity config from repo Variables with sensible fallbacks.
- Added `typecheck` script (`tsc --noEmit`) to `package.json`. Verified `typecheck` + `lint` + `build` all pass locally.
- `DEPLOY.md` — owner runbook: Vercel project + env vars, GitHub Actions Variables, Sanity CORS for `/studio`, revalidate webhook, DNS for `marinacuesta.com`, ship checklist.

**Owner/dashboard-driven (cannot be done from code — see `DEPLOY.md`):** Vercel import + env vars + Node 22, GitHub Actions Variable `NEXT_PUBLIC_SANITY_PROJECT_ID`, Sanity CORS origin, point webhook at live URL + test publish, DNS + SSL for `marinacuesta.com`.

**Open questions resolved:**

- Env-var names (grepped): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_SITE_URL`, `SANITY_REVALIDATE_SECRET`. `SANITY_API_WRITE_TOKEN` is seed-only (never in prod). **No runtime read token** — client uses `useCdn: true` on the public dataset, so the spec's "API read token" doesn't apply.
- DNS: `SEO-CHECKLIST.md` doesn't cover DNS; `DEPLOY.md` documents the registrar records, treating DNS as owner-driven.

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
- Vercel deploy install failed with `npm ERR! E401` because `package-lock.json` had tarball URLs pinned to a private Azure npm registry (`pkgs.dev.azure.com/BLDR/...`). Regenerate the lockfile against `https://registry.npmjs.org/` and confirm those URLs are gone.
- GitHub Actions failed on `main` after merge because the Linux runner could not resolve `lightningcss-linux-x64-gnu` from the cleaned lockfile. Add the missing optional native package entry and keep CI's public Sanity project ID fallback set to `dnzlfg96`.
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
