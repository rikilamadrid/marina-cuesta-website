import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { ProjectCard as ProjectCardData } from "@/types/sanity";

// The 6 curated tile gradients from the prototype `palettes` array, expressed
// as [c1, c2] pairs of theme tokens (no magic hex — see globals.css @theme).
// A gradient tile stands in whenever a project has no cover image so the grid
// always reads as intentional, never as a broken-image gap.
const PALETTES = [
  ["var(--color-oxblood)", "var(--color-garnet-deep)"],
  ["var(--color-ink)", "var(--color-tile-umber)"],
  ["var(--color-garnet-deep)", "var(--color-garnet)"],
  ["var(--color-tile-espresso)", "var(--color-ink-2)"],
  ["var(--color-tile-wine)", "var(--color-tile-clay)"],
  ["var(--color-tile-bark)", "var(--color-oxblood)"],
] as const;

type Props = {
  project: ProjectCardData;
  // Position within its grid. Combined with the client name to vary the palette
  // deterministically so adjacent (and same-category) tiles don't collide.
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: Props) {
  const { title, slug, client, category, cover } = project;
  const hasCover = Boolean(cover?.asset);

  // Deterministic, curated-not-random: same input always yields the same tile.
  const [c1, c2] = PALETTES[(client.length + index) % PALETTES.length];

  return (
    <Link
      href={`/work/${slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[3px] border border-line bg-bone p-6 no-underline transition-[transform,box-shadow] duration-500 ease-[var(--ease)] hover:-translate-y-1 hover:shadow-[var(--shadow)]"
    >
      {hasCover ? (
        <>
          <Image
            src={urlFor(cover!).width(640).height(800).fit("crop").url()}
            alt={`${title} — ${client}`}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
            className="object-cover [filter:grayscale(0.12)_contrast(1.02)]"
          />
          {/* Bottom-up scrim keeps the client/title legible over any photo. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,23,20,0.72),rgba(26,23,20,0.05)_55%,transparent)]"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          style={{ ["--c1" as string]: c1, ["--c2" as string]: c2 }}
          className="absolute inset-0 bg-[linear-gradient(160deg,var(--c1),var(--c2))] opacity-[0.92]"
        />
      )}

      <span className="relative z-[2] mb-auto self-start rounded-full border border-white/30 px-2.5 py-[5px] text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
        {category}
      </span>

      <span className="relative z-[2] mb-1.5 text-[11px] uppercase tracking-[0.16em] text-white/[0.78]">
        {client}
      </span>

      <span className="relative z-[2] font-display text-[1.5rem] font-normal leading-[1.08] text-white">
        {title}
      </span>

      <span className="relative z-[2] mt-3.5 flex items-center gap-2 text-[12px] text-white/85 opacity-0 transition-opacity duration-300 ease-[var(--ease)] group-hover:opacity-100">
        View project →
      </span>
    </Link>
  );
}
