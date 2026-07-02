import type { QueryParams } from "next-sanity";

import { client } from "./client";

// Cache tags let the revalidation webhook (feature 25) bust exactly the right
// content on publish. Every fetch is tagged, so `revalidateTag(tag)` refreshes it.
export const SANITY_TAGS = {
  siteSettings: "siteSettings",
  project: "project",
  pressMention: "pressMention",
} as const;

export type SanityTag = (typeof SANITY_TAGS)[keyof typeof SANITY_TAGS];

// Thin wrapper over `client.fetch` that always attaches cache tags. Return type
// is inferred from the `defineQuery`-typed query string passed in.
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  tags,
}: {
  query: QueryString;
  params?: QueryParams;
  tags: SanityTag[];
}) {
  return client.fetch(query, params, {
    next: { tags },
  });
}
