# Vercel Deploy & CI/CD

## Status

Not Started

## Goals

- Deploy the site to **Vercel**, wired to the GitHub repo, serving the production branch (`main`).
- Configure the production **environment variables** on Vercel (Sanity project ID/dataset, API read token, revalidate secret, site URL) — nothing hardcoded.
- Confirm the **revalidate webhook** (`/api/revalidate`, Feature 25) works against the live deployment so Marina's publishes go live in seconds with no redeploy.
- Add a **GitHub Actions** workflow that runs on every PR and push to `main`: install → typecheck → `next build` (lint if configured). Red build = blocked merge.
- Let **Vercel own deploy** (preview deploy per PR, production deploy on merge to `main`); GitHub Actions owns **verification** (build/typecheck gate). Don't duplicate the build-and-deploy in Actions.
- Point the custom domain **marinacuesta.com** at the Vercel deployment (DNS + SSL) — or document the exact steps if DNS access is owner-driven.

## Notes

- **Depends on:** site is feature-complete through Feature 30; revalidate webhook exists (Feature 25); SEO/domain steps live in `@context/SEO-CHECKLIST.md` — reconcile with it, don't contradict it.
- Stack: Next.js 16, React 19, Node ≥22 (Sanity Studio requires it — see memory `sanity-studio-access`). Pin the Node version in both Vercel and the Actions workflow.
- The Sanity Studio at `/studio` needs its production URL added to the **CORS origins / dev-host whitelist** in the Sanity project (memory `sanity-studio-access`) — confirm login works on the live `/studio`, not just locally.
- Beware the cloud-sync `' 2'`-suffixed duplicate files (memory `cloud-sync-duplicate-files`) — make sure none get committed or deployed.
- Secrets (Sanity token, revalidate secret) go in Vercel/GitHub secret stores, never in the repo.

## Open questions to resolve before building

- Is DNS for `marinacuesta.com` already at a registrar we control, or is that step owner-driven?
- Confirm the exact env-var names the code already reads (grep `process.env`) so Vercel matches them precisely.

## Out of Scope

- Off-page SEO / Google Knowledge Panel steps (owner-driven; `@context/SEO-CHECKLIST.md`).
- Dark mode (`32`) and language toggle (`33`).
