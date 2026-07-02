import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/seo/JsonLd";
import ProjectDetail from "@/components/work/ProjectDetail";
import {
  allProjectsQuery,
  projectBySlugQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import { sanityFetch, SANITY_TAGS } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { buildMetadata, creativeWorkJsonLd } from "@/lib/seo";
import type { ProjectCard } from "@/types/sanity";

// Single-project fetch, tolerant of a transient failure so a slow/unavailable
// dataset yields a clean 404 rather than an unhandled error.
async function getProject(slug: string) {
  try {
    return await sanityFetch({
      query: projectBySlugQuery,
      params: { slug },
      tags: [SANITY_TAGS.project],
    });
  } catch {
    return null;
  }
}

async function getSettings() {
  try {
    return await sanityFetch({
      query: siteSettingsQuery,
      tags: [SANITY_TAGS.siteSettings],
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProject(slug),
    getSettings(),
  ]);

  if (!project) return {};

  // A project's OG image is its cover art when present, else the headshot.
  const cover = project.cover?.asset
    ? urlFor(project.cover).width(1200).height(630).fit("crop").url()
    : null;

  return buildMetadata({
    settings,
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: cover,
  });
}

// Pre-render every project at build time (SSG). Slugs come from the same tagged
// query the /work index uses, so new projects appear after a revalidate.
export async function generateStaticParams() {
  try {
    const projects: ProjectCard[] = await sanityFetch({
      query: allProjectsQuery,
      tags: [SANITY_TAGS.project],
    });
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    // Never fail the build over a fetch hiccup — pages fill in on demand.
    return [];
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProject(slug),
    getSettings(),
  ]);

  if (!project) notFound();

  return (
    <main>
      <JsonLd data={creativeWorkJsonLd(project, settings)} />
      <ProjectDetail project={project} />
    </main>
  );
}
