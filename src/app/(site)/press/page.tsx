import type { Metadata } from "next";

import PressList from "@/components/press/PressList";
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
    <main id="main-content" tabIndex={-1} className="bg-bone py-[110px] max-[720px]:py-24">
      <section className="mx-auto w-full max-w-[1240px] px-5 min-[981px]:pl-[72px] min-[981px]:pr-7">
        <header className="mb-[78px] max-[720px]:mb-12">
          <h1 className="font-display text-[clamp(2.6rem,7vw,5.2rem)] font-normal leading-none tracking-[-0.015em] text-ink">
            <span className="mr-3 align-super font-body text-[0.45em] font-semibold leading-none text-garnet">
              04
            </span>
            Press &amp; Mentions
          </h1>
        </header>

        <PressList press={press} />
      </section>
    </main>
  );
}
