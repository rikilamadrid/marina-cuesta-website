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
import { buildMetadata, creativeWorkJsonLd, ogProjectImageUrl } from "@/lib/seo";
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

  // A project's OG image is its dynamic per-project card (title/client/category
  // on the editorial brand) — consistent and always present, cover or not.
  return buildMetadata({
    settings,
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: ogProjectImageUrl(project),
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
