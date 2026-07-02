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
