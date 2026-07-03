import type { Metadata } from "next";

import AboutSection from "@/components/home/AboutSection";
import { sanityFetch, SANITY_TAGS } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: siteSettingsQuery,
    tags: [SANITY_TAGS.siteSettings],
  });
  return buildMetadata({
    settings,
    title: "About",
    description: settings?.seo?.description ?? settings?.shortBio,
    path: "/about",
  });
}

export default async function AboutPage() {
  const settings = await sanityFetch({
    query: siteSettingsQuery,
    tags: [SANITY_TAGS.siteSettings],
  });

  if (!settings) return null;

  return (
    <main id="main-content" tabIndex={-1}>
      <AboutSection settings={settings} as="h1" priority />
    </main>
  );
}
