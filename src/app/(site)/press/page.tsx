import type { Metadata } from "next";

import PressSection from "@/components/press/PressSection";
import { sanityFetch, SANITY_TAGS } from "@/sanity/lib/fetch";
import { allPressQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import type { PressMention } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: siteSettingsQuery,
    tags: [SANITY_TAGS.siteSettings],
  });
  return buildMetadata({
    settings,
    title: "Press",
    description: `Interviews, features, awards, and talks featuring ${
      settings?.name ?? "Marina Cuesta"
    }.`,
    path: "/press",
  });
}

export default async function PressPage() {
  let press: PressMention[] = [];
  try {
    press = await sanityFetch({
      query: allPressQuery,
      tags: [SANITY_TAGS.pressMention],
    });
  } catch {
    // Fail soft — the list renders its own empty state below.
    press = [];
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <PressSection press={press} as="h1" />
    </main>
  );
}
