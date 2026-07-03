import type { Metadata } from "next";

import AboutSection from "@/components/home/AboutSection";
import ContactCTA from "@/components/home/ContactCTA";
import FeaturedWork from "@/components/home/FeaturedWork";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import Recognition from "@/components/home/Recognition";
import PressSection from "@/components/press/PressSection";
import {
  allPressQuery,
  featuredProjectsQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import { sanityFetch, SANITY_TAGS } from "@/sanity/lib/fetch";
import { buildMetadata } from "@/lib/seo";
import type { PressMention } from "@/types/sanity";

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
  const [settings, featured, pressResult] = await Promise.all([
    sanityFetch({
      query: siteSettingsQuery,
      tags: [SANITY_TAGS.siteSettings],
    }),
    sanityFetch({
      query: featuredProjectsQuery,
      tags: [SANITY_TAGS.project],
    }),
    sanityFetch({
      query: allPressQuery,
      tags: [SANITY_TAGS.pressMention],
    }).catch(() => [] as PressMention[]),
  ]);

  if (!settings) return null;

  return (
    <main id="main-content" tabIndex={-1}>
      <Hero settings={settings} />
      <Manifesto />
      <FeaturedWork projects={featured} />
      <AboutSection settings={settings} />
      <Recognition />
      <PressSection press={pressResult} />
      <ContactCTA settings={settings} />
    </main>
  );
}
