# On-Demand Revalidation Webhook

## Status

Not Started

## Goals

- Build `src/app/api/revalidate/route.ts` to receive Sanity's webhook and call `revalidateTag` / `revalidatePath` so content edits go live within seconds (on-demand ISR, no redeploy).
- Verify the webhook signature/secret (Sanity webhook secret in env) before revalidating.
- Ensure server fetches use `next-sanity`'s `sanityFetch` with **cache tags** so revalidation can target specific content (site settings, projects, press).
- Configure the webhook in Sanity to hit the deployed endpoint on document publish.
- Verify: edit a project/press mention/headshot in `/studio` → change appears on the live site within seconds without a rebuild.
- `npm run build` passes.

## Notes

- **Depends on:** `10` (fetches exist to tag) and deployed content pages. This is the feature that fulfills the **instant publish** promise (`@context/project-overview.md` → The Studio; `@context/coding-standards.md` → Data Fetching).
- If tags weren't added back in `10`, add/normalize them here.
- Requires a deployment (Vercel) reachable by Sanity's webhook — note that full end-to-end verification needs the deployed URL.

## Out of Scope

- Full deploy/hosting setup beyond what's needed to test the webhook.
- Studio auth configuration (handled by Sanity in Phase 2).
- The SEO checklist (`26`).
