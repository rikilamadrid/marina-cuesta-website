import Hero from "@/components/home/Hero";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { sanityFetch, SANITY_TAGS } from "@/sanity/lib/fetch";

export default async function Home() {
  const settings = await sanityFetch({
    query: siteSettingsQuery,
    tags: [SANITY_TAGS.siteSettings],
  });

  if (!settings) return null;

  return (
    <main>
      <Hero settings={settings} />
    </main>
  );
}
