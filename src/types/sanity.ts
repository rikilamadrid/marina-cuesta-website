import type { PortableTextBlock } from "@portabletext/types";

// Shape of an image field as it comes back from GROQ (asset reference kept
// intact so `urlFor` can build URLs). Optional hotspot/crop from `hotspot: true`.
export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface CareerStep {
  _key: string;
  org: string;
  note?: string;
}

export interface Social {
  _key: string;
  label: string;
  href: string;
}

export interface Seo {
  title?: string;
  description?: string;
}

export interface SiteSettings {
  name: string;
  jobTitle: string;
  headshot?: SanityImage;
  shortBio?: string;
  longBio?: PortableTextBlock[];
  careerArc?: CareerStep[];
  email: string;
  socials?: Social[];
  seo?: Seo;
}

export type ProjectCategory =
  | "Global Brands"
  | "Multicultural"
  | "Feminist & Social"
  | "Culture & Film";

export type Market = "US" | "U.S. Hispanic" | "Europe" | "Global";

export interface VideoEmbed {
  _type: "videoEmbed";
  _key: string;
  videoUrl: string;
}

export type GalleryItem = (SanityImage & { _key: string }) | VideoEmbed;

// Fields shared by the card (list) view — kept lean so list queries stay cheap.
export interface ProjectCard {
  _id: string;
  title: string;
  slug: string;
  client: string;
  category: ProjectCategory;
  year?: number;
  market?: Market[];
  summary: string;
  cover?: SanityImage;
  featured?: boolean;
}

// Full project as returned for the detail page.
export interface Project extends ProjectCard {
  role?: string;
  body?: PortableTextBlock[];
  gallery?: GalleryItem[];
  externalLink?: string;
}

export type PressType = "interview" | "feature" | "award" | "talk" | "podcast";

export interface PressMention {
  _id: string;
  title: string;
  outlet: string;
  type?: PressType;
  date?: string;
  link: string;
}
