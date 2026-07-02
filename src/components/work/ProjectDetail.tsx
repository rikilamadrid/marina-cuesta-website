import Link from "next/link";
import { Fragment } from "react";

import PortableText from "@/components/ui/PortableText";
import type { Project } from "@/types/sanity";

type Props = {
  project: Project;
};

// A single labelled meta cell in the client · role · year · market row. Renders
// nothing when its value is empty so absent fields leave no gap.
function Meta({ label, children }: { label: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <div>
      <dt className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-ink-2">
        {label}
      </dt>
      <dd className="mt-1.5 font-display text-[1.05rem] font-normal leading-[1.3] text-ink">
        {children}
      </dd>
    </div>
  );
}

// Editorial project detail layout (presentational). Typographic hero — cover /
// gallery / video visuals belong to feature 19, which builds into this page.
export default function ProjectDetail({ project }: Props) {
  const { title, client, category, role, year, market, summary, body, externalLink } =
    project;

  return (
    <article className="py-[110px] max-[720px]:py-24">
      {/* Shared .wrap + 72px spine-gutter left-inset (see /work, home sections). */}
      <div className="mx-auto w-full max-w-[1240px] px-5 min-[981px]:pl-[72px] min-[981px]:pr-7">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2 no-underline transition-colors hover:text-garnet"
        >
          <span className="transition-transform duration-300 ease-[var(--ease)] group-hover:-translate-x-0.5">
            ←
          </span>
          All work
        </Link>

        <header className="mt-10 max-w-[16ch]">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-garnet">
            <span aria-hidden="true" className="inline-block h-px w-[26px] bg-garnet" />
            {category}
          </p>
          <h1 className="font-display text-[clamp(2.6rem,7vw,5.2rem)] font-normal leading-[0.98] tracking-[-0.02em] text-ink">
            {title}
          </h1>
        </header>

        <dl className="mt-12 grid max-w-[720px] gap-8 border-t border-line pt-8 max-[560px]:grid-cols-2 min-[561px]:grid-cols-4">
          <Meta label="Client">{client}</Meta>
          <Meta label="Role">{role}</Meta>
          <Meta label="Year">{year}</Meta>
          <Meta label="Market">
            {market?.map((m, i) => (
              <Fragment key={m}>
                {i > 0 && <span className="text-ink-2"> · </span>}
                {m}
              </Fragment>
            ))}
          </Meta>
        </dl>

        <div className="mt-14 max-w-[68ch]">
          {summary && (
            <p className="mb-10 font-display text-[clamp(1.35rem,3vw,1.9rem)] font-normal leading-[1.45] tracking-[-0.01em] text-ink">
              {summary}
            </p>
          )}

          <PortableText value={body} />

          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 inline-flex items-center gap-2.5 rounded-full border border-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink no-underline transition-colors duration-300 ease-[var(--ease)] hover:border-garnet hover:bg-garnet hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-garnet"
            >
              View the full project
              <span className="transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
