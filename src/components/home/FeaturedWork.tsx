import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import WorkGrid from "@/components/work/WorkGrid";
import type { ProjectCard as ProjectCardData } from "@/types/sanity";

type Props = {
  projects: ProjectCardData[];
};

// Home "01 Selected Work": a curated subset (featured == true) rendered with the
// same ProjectCard grid as /work. The full catalog lives at /work — this section
// links there. Presentational: featured projects arrive as a server-fetched prop.
export default function FeaturedWork({ projects }: Props) {
  // Featured is a curated set that's normally non-empty; if the toggle is off
  // everywhere, skip the section entirely rather than render a bare heading.
  if (projects.length === 0) return null;

  return (
    <section id="work" className="py-[110px] max-[720px]:py-20">
      {/* Shared .wrap + 72px spine-gutter left-inset (see /work, Manifesto). */}
      <Reveal className="mx-auto w-full max-w-[1240px] px-5 min-[981px]:pl-[72px] min-[981px]:pr-7">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-[30px]">
          <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-normal leading-none tracking-[-0.015em]">
            {/* Numbered section index — the work is genuinely a catalog. */}
            <span className="mr-1.5 align-super font-body text-[0.5em] font-semibold tracking-normal text-garnet">
              01
            </span>
            Selected Work
          </h2>

          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-garnet"
          >
            View all work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        <WorkGrid projects={projects} />
      </Reveal>
    </section>
  );
}
