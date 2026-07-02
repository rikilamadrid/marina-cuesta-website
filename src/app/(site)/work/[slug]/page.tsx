import { notFound } from "next/navigation";

import ProjectDetail from "@/components/work/ProjectDetail";
import { allProjectsQuery, projectBySlugQuery } from "@/sanity/lib/queries";
import { sanityFetch, SANITY_TAGS } from "@/sanity/lib/fetch";
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
  const project = await getProject(slug);

  if (!project) notFound();

  return (
    <main>
      <ProjectDetail project={project} />
    </main>
  );
}
