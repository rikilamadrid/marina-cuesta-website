import type { Metadata } from "next";

import ContactCTA from "@/components/home/ContactCTA";
import FeaturedWork from "@/components/home/FeaturedWork";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import Recognition from "@/components/home/Recognition";
import {
  featuredProjectsQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import { sanityFetch, SANITY_TAGS } from "@/sanity/lib/fetch";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: siteSettingsQuery,
    tags: [SANITY_TAGS.siteSettings],
  });
  // No `title` → inherits the root layout's absolute default ("Name — Role"),
  // the strongest ranking title for the home page.
  return buildMetadata({
    settings,
    description: settings?.seo?.description ?? settings?.shortBio,
    path: "/",
  });
}

export default async function Home() {
  const [settings, featured] = await Promise.all([
    sanityFetch({
      query: siteSettingsQuery,
      tags: [SANITY_TAGS.siteSettings],
    }),
    sanityFetch({
      query: featuredProjectsQuery,
      tags: [SANITY_TAGS.project],
    }),
  ]);

  if (!settings) return null;

  return (
    <main>
      <Hero settings={settings} />
      <Manifesto />
      <FeaturedWork projects={featured} />
      <Recognition />
      <ContactCTA settings={settings} />
    </main>
  );
}
