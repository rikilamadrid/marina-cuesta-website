# Deploy & CI/CD Runbook

How this site ships. **Vercel owns deploy** (a preview URL per pull request, production on merge to `main`); **GitHub Actions owns verification** (typecheck + lint + build gate — it never deploys). Content edits go live via the Sanity revalidate webhook with no redeploy.

Most of this is one-time dashboard setup done by the repo owner. The code side (the CI workflow, the env-var contract) is already in the repo.

---

## Environment variables

The code reads exactly these (see `.env.example`, `src/sanity/env.ts`, `src/lib/seo.ts`, `src/app/api/revalidate/route.ts`):

| Variable | Where set | Required? | Notes |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Vercel + GitHub Actions | **Yes** | Use `dnzlfg96`. Public value; CI falls back to this production project ID if the repo Variable is unset. |
| `NEXT_PUBLIC_SANITY_DATASET` | Vercel + GitHub Actions | **Yes** | Use `production`. `src/sanity/env.ts` asserts it. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Vercel (optional) | No | Defaults to `2025-01-01` in code and in the CI workflow. |
| `NEXT_PUBLIC_SITE_URL` | Vercel | Recommended | `https://marinacuesta.com`, no trailing slash. Falls back to that value if unset. |
| `SANITY_REVALIDATE_SECRET` | Vercel (**Secret**) | **Yes** | Must equal the secret on the Sanity webhook. Without it `/api/revalidate` returns 500. |
| `SANITY_API_WRITE_TOKEN` | **nowhere in prod** | No | Seed-script only (`scripts/seed.mjs`). Never set on Vercel — the site needs no write token at runtime. |

There is **no runtime read token**: the Sanity client uses `useCdn: true` against the public `production` dataset (`src/sanity/lib/client.ts`).

---

## 1. Vercel project

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new). Framework preset auto-detects **Next.js**; leave build/output defaults.
2. **Settings → General → Node.js Version → 22.x** (repo pins Node 22 via `.nvmrc`; `package.json` requires `>=22.12`).
3. **Settings → Environment Variables** — add the Production (and Preview) values from the table above. Mark `SANITY_REVALIDATE_SECRET` as sensitive.
4. Production branch = `main` (default). Every PR gets a preview deploy; merges to `main` deploy production.

## 2. GitHub Actions CI (already in repo: `.github/workflows/ci.yml`)

Runs on every PR to `main` and every push to `main`: `npm ci` → `typecheck` → `lint` → `build`. A red run blocks the merge.

- The build step needs the public Sanity config. You can add it as repo **Variables** (not Secrets), at **Settings → Secrets and variables → Actions → Variables**:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` — optional override; the workflow falls back to `dnzlfg96`.
  - `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_SITE_URL` — optional; the workflow falls back to `production` / `2025-01-01` / `https://marinacuesta.com`.
- Optional: **Settings → Branches → Branch protection** on `main` → require the "Typecheck, lint & build" check to pass before merge.

## 3. Sanity Studio on the live domain

The Studio is served at `marinacuesta.com/studio`. In [sanity.io/manage](https://www.sanity.io/manage) → the project → **API**:

- **CORS Origins** — add `https://marinacuesta.com` (allow credentials). Add the Vercel preview origin too if the Studio is used from preview deploys.
- Confirm login on the live `/studio` (GitHub login, not Google — see the `sanity-studio-access` note). Studio requires Node ≥22, already pinned.

## 4. Revalidate webhook (instant publish)

Confirm the existing webhook (from Feature 25) points at production. In sanity.io/manage → **API → Webhooks**:

- **URL:** `https://marinacuesta.com/api/revalidate`
- **Method:** `POST`, **HTTP** dataset trigger on create/update/delete
- **Filter:** `_type in ["siteSettings", "project", "pressMention"]`
- **Projection:** `{ _id, _type, "slug": slug.current }`
- **Secret:** the same value as `SANITY_REVALIDATE_SECRET` on Vercel (the route validates the signature via `next-sanity/webhook`).

Verify: publish a small edit in the Studio and confirm it appears on the live site within seconds without a redeploy. The webhook response JSON lists the revalidated `tag` and `targets`.

## 5. Custom domain — marinacuesta.com

In **Vercel → Settings → Domains**, add `marinacuesta.com` and `www.marinacuesta.com`, then follow Vercel's DNS instructions at the registrar:

- **Apex** `marinacuesta.com` → Vercel `A` record `76.76.21.21` (use Vercel's shown value), or move nameservers to Vercel for a Domain-level setup.
- **`www`** → `CNAME` to `cname.vercel-dns.com`.
- SSL is issued automatically by Vercel once DNS resolves.

> **If DNS access is owner-driven:** hand the registrar owner the exact records Vercel displays for `marinacuesta.com` under Settings → Domains. That screen is the source of truth for the values.

Once the domain resolves and SSL is live, continue with the post-launch SEO steps in [`SEO-CHECKLIST.md`](SEO-CHECKLIST.md) (Search Console property — prefer a Domain property if DNS is controllable — sitemap submission, indexing).

---

## Ship checklist

- [ ] Vercel project imported, Node 22.x, production branch `main`
- [ ] Production env vars set on Vercel (incl. `SANITY_REVALIDATE_SECRET`)
- [ ] GitHub Actions CI green on `main`
- [ ] (Optional) Branch protection requires the CI check
- [ ] Sanity CORS origin added; live `/studio` login works
- [ ] Revalidate webhook points at the live URL; a test publish goes live in seconds
- [ ] `marinacuesta.com` + `www` added in Vercel; DNS records set; SSL active
- [ ] Post-launch SEO per `SEO-CHECKLIST.md`
