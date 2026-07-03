import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

import JsonLd from "@/components/seo/JsonLd";
import { sanityFetch, SANITY_TAGS } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { ogProfileImageUrl, personJsonLd, SITE_URL } from "@/lib/seo";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
});

// Fetch Site Settings once, tolerant of a transient failure — metadata and the
// Person JSON-LD both read from it, and neither should ever break the render.
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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const name = settings?.name ?? "Marina Cuesta";
  const description = settings?.seo?.description ?? settings?.shortBio;
  const ogImage = ogProfileImageUrl();

  return {
    metadataBase: new URL(SITE_URL),
    // "%s" pages become "About — Marina Cuesta"; the home page sets an absolute
    // title so it stays "Marina Cuesta — …" without the suffix.
    title: {
      default: settings?.jobTitle ? `${name} — ${settings.jobTitle}` : name,
      template: `%s — ${name}`,
    },
    ...(description && { description }),
    openGraph: {
      type: "website",
      siteName: name,
      url: SITE_URL,
      ...(description && { description }),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: settings ? `${name}, ${settings.jobTitle}` : name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {settings && <JsonLd data={personJsonLd(settings)} />}
        {children}
      </body>
    </html>
  );
}
