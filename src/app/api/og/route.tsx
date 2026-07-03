import { ImageResponse } from "next/og";

import { sanityFetch, SANITY_TAGS } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { optimizedImageUrl } from "@/sanity/lib/image";

// Dynamic OG card generator (feature 23). Two modes:
//   /api/og                                        → profile card (name + title + headshot)
//   /api/og?type=project&title=&client=&category=  → per-project card
// Landscape 1200×630 — the standard og:image / Twitter summary_large_image size.
// Fonts are loaded explicitly here; ImageResponse (satori) does not inherit
// next/font. The headshot flows from Site Settings (one-photo rule).
export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;

// Design tokens, mirrored from styles/tokens.css (@theme in globals.css).
const PAPER = "#faf7f2";
const BONE = "#f3ece3";
const INK = "#1a1714";
const INK_2 = "#5a524b";
const GARNET = "#b11e3a";
const OXBLOOD = "#3d0d17";

const SITE_NAME = "Marina Cuesta";
const SITE_ROLE = "Executive Creative Director";

// Fetch one weight/style of a Google font as an ArrayBuffer, subset to `text`
// so Spanish accents render and the payload stays tiny. A plain fetch (no
// modern UA) makes Google serve a TTF/OTF that satori can parse.
async function loadGoogleFont(opts: {
  family: string;
  weight: number;
  italic?: boolean;
  text: string;
}): Promise<ArrayBuffer> {
  const { family, weight, italic, text } = opts;
  const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;
  const url =
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${axis}` +
    `&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
  if (!src) throw new Error(`Could not parse font CSS for ${family}`);
  const res = await fetch(src[1]);
  if (!res.ok) throw new Error(`Could not fetch ${family} (${res.status})`);
  return res.arrayBuffer();
}

// Load the Fraunces/Hanken weights the card uses, subset to the rendered text.
// Guarded per-font so a transient Google Fonts hiccup degrades to satori's
// default face rather than 500-ing the endpoint.
async function loadFonts(text: string) {
  const glyphs = text + SITE_NAME + SITE_ROLE + " ·—";
  const specs = [
    { name: "Fraunces", family: "Fraunces", weight: 500 as const },
    { name: "Fraunces", family: "Fraunces", weight: 500 as const, italic: true },
    { name: "Hanken Grotesk", family: "Hanken Grotesk", weight: 600 as const },
  ];

  const results = await Promise.allSettled(
    specs.map((s) =>
      loadGoogleFont({
        family: s.family,
        weight: s.weight,
        italic: s.italic,
        text: glyphs,
      }),
    ),
  );

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 500 | 600;
    style: "normal" | "italic";
  }[] = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      fonts.push({
        name: specs[i].name,
        data: r.value,
        weight: specs[i].weight,
        style: specs[i].italic ? "italic" : "normal",
      });
    }
  });
  return fonts;
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

// Profile card: name (last word italic garnet) + role eyebrow + headshot, on
// oxblood — the site's closing/hero register.
async function profileCard() {
  const settings = await getSettings();
  const name = settings?.name ?? SITE_NAME;
  const role = settings?.jobTitle ?? SITE_ROLE;
  const photo = settings?.headshot?.asset
    ? optimizedImageUrl({
        source: settings.headshot,
        width: 560,
        height: 700,
        quality: 88,
      })
    : null;

  const words = name.trim().split(/\s+/);
  const last = words.length > 1 ? words.pop()! : null;
  const lead = words.join(" ");

  const fonts = await loadFonts(name + role);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: OXBLOOD,
          color: BONE,
          padding: 80,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Hanken Grotesk",
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: GARNET,
            }}
          >
            {role}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "Fraunces",
              fontWeight: 500,
              fontSize: 116,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            <span>{lead}</span>
            {last && (
              <span
                style={{
                  fontStyle: "italic",
                  color: GARNET,
                  marginLeft: 24,
                }}
              >
                {last}
              </span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Hanken Grotesk",
              fontWeight: 600,
              fontSize: 22,
              letterSpacing: 2,
              color: "rgba(243,236,227,0.65)",
            }}
          >
            marinacuesta.com
          </div>
        </div>

        {photo && (
          <div style={{ display: "flex", marginLeft: 64 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              width={320}
              height={400}
              style={{
                objectFit: "cover",
                borderRadius: 4,
                border: "1px solid rgba(243,236,227,0.18)",
              }}
              alt=""
            />
          </div>
        )}
      </div>
    ),
    { width: WIDTH, height: HEIGHT, fonts },
  );
}

// Per-project card: category eyebrow + title + client, on paper.
async function projectCard(params: {
  title: string;
  client?: string;
  category?: string;
}) {
  const { title, client, category } = params;
  const fonts = await loadFonts(
    `${title} ${client ?? ""} ${category ?? ""}`,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {category && (
            <div
              style={{
                display: "flex",
                fontFamily: "Hanken Grotesk",
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: GARNET,
                marginBottom: 28,
              }}
            >
              {category}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontWeight: 500,
              fontSize: 88,
              lineHeight: 1.04,
              letterSpacing: -1.5,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {client && (
            <div
              style={{
                display: "flex",
                fontFamily: "Hanken Grotesk",
                fontWeight: 600,
                fontSize: 26,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: INK_2,
                marginTop: 28,
              }}
            >
              {client}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "Hanken Grotesk",
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: 2,
            color: INK_2,
          }}
        >
          <span style={{ color: GARNET, marginRight: 14 }}>—</span>
          {`${SITE_NAME} · ${SITE_ROLE}`}
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT, fonts },
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get("type") === "project") {
    const title = searchParams.get("title")?.trim() || SITE_NAME;
    return projectCard({
      title,
      client: searchParams.get("client")?.trim() || undefined,
      category: searchParams.get("category")?.trim() || undefined,
    });
  }

  return profileCard();
}
