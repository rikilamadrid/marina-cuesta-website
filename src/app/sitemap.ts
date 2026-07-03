import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { sanityFetch, SANITY_TAGS } from "@/sanity/lib/fetch";
import { allProjectsQuery } from "@/sanity/lib/queries";
import type { ProjectCard } from "@/types/sanity";

const STATIC_ROUTES = ["/", "/work", "/about", "/press"] as const;

async function getProjectSlugs(): Promise<string[]> {
  try {
    const projects: ProjectCard[] = await sanityFetch({
      query: allProjectsQuery,
      tags: [SANITY_TAGS.project],
    });
    return projects.map((project) => project.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = await getProjectSlugs();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const projectEntries = projectSlugs.map((slug) => ({
    url: absoluteUrl(`/work/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
