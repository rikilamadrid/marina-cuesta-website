import type { Metadata } from "next";

import WorkControls from "@/components/work/WorkControls";
import { allProjectsQuery } from "@/sanity/lib/queries";
import { sanityFetch, SANITY_TAGS } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Work",
};

export default async function WorkPage() {
  const projects = await sanityFetch({
    query: allProjectsQuery,
    tags: [SANITY_TAGS.project],
  });

  return (
    <main id="main-content" tabIndex={-1} className="py-[110px] max-[720px]:py-20">
      <div className="mx-auto w-full max-w-[1240px] px-5 min-[981px]:pl-[72px] min-[981px]:pr-7">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-[30px]">
          <h1 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-normal leading-none tracking-[-0.015em]">
            Work
          </h1>
        </div>

        <WorkControls projects={projects} />
      </div>
    </main>
  );
}
