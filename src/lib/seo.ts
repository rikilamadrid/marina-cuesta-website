import type { Metadata } from "next";

import { urlFor } from "@/sanity/lib/image";
import type { Project, SiteSettings } from "@/types/sanity";

// Absolute base URL for canonical links, OG tags, and JSON-LD `image`/`url`.
// Set NEXT_PUBLIC_SITE_URL per environment; falls back to the production domain.
// Trailing slash stripped so `absoluteUrl` composes cleanly.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://marinacuesta.com"
).replace(/\/+$/, "");

// Resolve a site-relative path (e.g. "/about") to an absolute URL.
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

// The one headshot (Site Settings) as an absolute URL, sized for OG (1.91:1).
// Feature 23 will swap this for the dynamic /api/og endpoint — the *source*
// photo stays the same (one-photo rule). Returns null when no headshot is set.
export function ogImageUrl(
  settings: SiteSettings | null | undefined,
): string | null {
  if (!settings?.headshot?.asset) return null;
  return urlFor(settings.headshot).width(1200).height(630).fit("crop").url();
}

// Alt text for the headshot, derived from name + jobTitle (no separate alt
// field — one-photo rule). Mirrors the Hero/About derivation.
function headshotAlt(settings: SiteSettings | null | undefined): string {
  if (!settings) return "Marina Cuesta";
  return `${settings.name}, ${settings.jobTitle}`;
}

// Build per-page metadata: canonical URL, Open Graph, and Twitter card, with the
// site headshot as the default OG image (or an explicit `image` override, e.g. a
// project cover). Pass `settings` so the OG image and card copy stay data-driven.
export function buildMetadata({
  settings,
  title,
  description,
  path = "/",
  image,
}: {
  settings?: SiteSettings | null;
  title?: string;
  description?: string;
  path?: string;
  image?: string | null;
}): Metadata {
  const ogImage = image ?? ogImageUrl(settings);
  const images = ogImage
    ? [{ url: ogImage, width: 1200, height: 630, alt: headshotAlt(settings) }]
    : undefined;

  return {
    ...(title !== undefined && { title }),
    ...(description && { description }),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: absoluteUrl(path),
      ...(description && { description }),
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      ...(description && { description }),
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

// `Person` JSON-LD for the root layout — the strong, unambiguous source that
// tells Google/AI which face and facts are Marina's. Populated entirely from
// Site Settings; every optional field is omitted when its data is absent.
export function personJsonLd(settings: SiteSettings) {
  const image = settings.headshot?.asset
    ? urlFor(settings.headshot).width(1200).height(1200).fit("crop").url()
    : undefined;

  // careerArc is ordered oldest→newest, so the last entry is her current org.
  const currentOrg = settings.careerArc?.at(-1)?.org;
  const sameAs = settings.socials?.map((s) => s.href).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.name,
    jobTitle: settings.jobTitle,
    ...(image && { image }),
    url: SITE_URL,
    ...(sameAs?.length && { sameAs }),
    knowsLanguage: ["en", "es"],
    ...(currentOrg && {
      worksFor: { "@type": "Organization", name: currentOrg },
    }),
    ...(settings.email && { email: `mailto:${settings.email}` }),
  };
}

// `CreativeWork` JSON-LD for a single project detail page, with Marina as the
// creator. Cover art (when present) doubles as the item image.
export function creativeWorkJsonLd(
  project: Project,
  settings?: SiteSettings | null,
) {
  const image = project.cover?.asset
    ? urlFor(project.cover).width(1200).height(1500).fit("crop").url()
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    url: absoluteUrl(`/work/${project.slug}`),
    ...(project.summary && { abstract: project.summary }),
    ...(image && { image }),
    ...(project.year && { dateCreated: String(project.year) }),
    ...(project.category && { genre: project.category }),
    creator: {
      "@type": "Person",
      name: settings?.name ?? "Marina Cuesta",
      ...(settings?.jobTitle && { jobTitle: settings.jobTitle }),
    },
    ...(project.client && {
      sourceOrganization: { "@type": "Organization", name: project.client },
    }),
  };
}
