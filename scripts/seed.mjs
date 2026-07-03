// Repeatable seed script for Marina Cuesta's site content.
//
// Run from the project root with the write token loaded from .env.local:
//
//   node --env-file=.env.local scripts/seed.mjs
//
// Requires SANITY_API_WRITE_TOKEN (Editor/write access) in .env.local alongside
// the public NEXT_PUBLIC_SANITY_* vars. Idempotent: every document uses a fixed
// _id and createOrReplace, so re-running overwrites the seed rather than
// duplicating it. Content comes from context/project-overview.md → Seed Content.
//
// NOTE: the headshot is intentionally left empty — it's a client-provided asset.
// Site Settings will show a "required" warning in the Studio until Marina uploads
// it, which is the clearly-marked placeholder.

import { randomUUID } from "node:crypto";

import { createClient } from "@sanity/client";
import { LexoRank } from "lexorank";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET. Run with: node --env-file=.env.local scripts/seed.mjs",
  );
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN. Create an Editor token at sanity.io/manage → API → Tokens and add it to .env.local.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

// --- helpers ---------------------------------------------------------------

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

// A Portable Text paragraph block.
const para = (text) => ({
  _type: "block",
  _key: key(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

// Ascending LexoRank strings — the same field the Studio's drag-to-reorder
// list writes to, so seeded order matches the list order and stays draggable.
function rankSequence(count) {
  const ranks = [];
  let rank = LexoRank.min().genNext();
  for (let i = 0; i < count; i++) {
    ranks.push(rank.toString());
    rank = rank.genNext();
  }
  return ranks;
}

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents (é → e)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// --- Site Settings (singleton) ---------------------------------------------

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  name: "Marina Cuesta",
  jobTitle: "Executive Creative Director",
  // headshot intentionally omitted — client to provide (see note above).
  shortBio:
    "Executive Creative Director with twenty years across the U.S., Hispanic and European markets, building thoughtful work for global brands and opening doors for the women coming next.",
  longBio: [
    para(
      "Marina Cuesta is an Executive Creative Director with more than twenty years of experience across North American, U.S. Hispanic and European markets. She has led integrated campaigns for Apple, McDonald's, GOYA Foods, Chevrolet, FritoLay and Sony, with a career shaped by TBWA, CHINA, Dieste, The Marketing Arm and Creyentes / We Believers in the United States. Her work is grounded in empathy, cultural fluency and clear creative standards. She is also a committed mentor and advocate for the women reshaping the industry. Outside the work, she finds energy in travel, new cultures and her family.",
    ),
  ],
  careerArc: [
    { _key: key(), org: "TBWA · Madrid", note: "Copywriter for McDonald's and Apple at Media Arts Lab" },
    { _key: key(), org: "CHINA · Spain", note: "Creative Director for Levi's, Schweppes, KFC and Sitges" },
    { _key: key(), org: "Dieste · USA", note: "Creative Director for GOYA, P&G, Dunkin' and The Wild Detectives" },
    { _key: key(), org: "The Marketing Arm", note: "Group Creative Director" },
    { _key: key(), org: "Creyentes / We Believers", note: "Executive Creative Director" },
  ],
  email: "hello@marinacuesta.com",
  socials: [
    { _key: key(), label: "LinkedIn", href: "https://www.linkedin.com/in/marina-cuesta-tovar-a20b0a24/" },
    { _key: key(), label: "Behance", href: "https://www.behance.net/marinacuesta" },
    { _key: key(), label: "Instagram", href: "https://www.instagram.com/marinacuestat/" },
    { _key: key(), label: "Vimeo", href: "https://vimeo.com/user79280541" },
  ],
  seo: {
    title: "Marina Cuesta — Executive Creative Director",
    description:
      "Executive Creative Director with twenty years across North American, U.S. Hispanic and European markets, creating thoughtful work for global brands.",
  },
};

// --- Projects (category → client → title) ----------------------------------

const projectData = [
  // Feminist & Social
  { client: "P&G", title: "The Pattern Bra", category: "Feminist & Social", featured: true, summary: "Rethinking the everyday bra around real bodies and inclusive design." },
  { client: "NTARUPT", title: "The Pull Out Game", category: "Feminist & Social", featured: true, summary: "A frank, funny campaign confronting teen pregnancy in Dallas head-on." },
  { client: "NTARUPT", title: "Talk About It Dallas", category: "Feminist & Social", summary: "Getting a city to talk openly about sex, health, and young people." },
  { client: "The Wild Detectives", title: "Shequel", category: "Feminist & Social", featured: true, summary: "Reclaiming the stories that left women out." },
  // Multicultural
  { client: "GOYA", title: "Prodigal Son", category: "Multicultural", featured: true, summary: "A modern parable for GOYA, told with heart and heritage." },
  { client: "GOYA", title: "Real-Life Chefs", category: "Multicultural", summary: "Everyday cooks become the face of a kitchen staple." },
  { client: "GOYA", title: "Oda a la Mezcla", category: "Multicultural", summary: "Una oda a la mezcla, celebrating the blend of cultures on every plate." },
  { client: "Dunkin'", title: "Hispanic Heritage Month", category: "Multicultural", summary: "Dunkin' toasts Hispanic heritage, one cup at a time." },
  { client: "Inter Miami CF", title: "Inter Miami CF", category: "Multicultural", summary: "Building a bilingual voice for a club with a global fanbase." },
  // Global Brands
  { client: "Apple", title: "Apple", category: "Global Brands", featured: true, summary: "Work for Apple at Media Arts Lab, where craft is measured in millimeters." },
  { client: "McDonald's", title: "McDonald's", category: "Global Brands", summary: "Global-scale ideas for the world's most recognizable brand." },
  { client: "FritoLay", title: "SmartFood", category: "Global Brands", summary: "Giving a snack brand a smarter, sharper personality." },
  { client: "Schweppes", title: "First Time", category: "Global Brands", featured: true, summary: "Schweppes and the electric feeling of a first time." },
  { client: "KFC", title: "KFC", category: "Global Brands", summary: "Bringing appetite and wit to a fast-food icon." },
  { client: "Lululemon", title: "FEEL", category: "Global Brands", featured: true, summary: "Lululemon and the language of how movement actually feels." },
  { client: "Chevrolet", title: "Chevrolet", category: "Global Brands", summary: "Driving a storied auto brand into new cultural territory." },
  // Culture & Film
  { client: "The Wild Detectives", title: "Litbaits", category: "Culture & Film", summary: "Literature disguised as clickbait for a bookshop with a point of view." },
  { client: "The Wild Detectives", title: "Drunken Literature", category: "Culture & Film", summary: "The classics read aloud, one drink in, as a bookshop ritual." },
  { client: "Sitges International Film Festival", title: "Sitges", category: "Culture & Film", featured: true, summary: "Identity and campaign for Europe's premier fantastic film festival." },
  { client: "FIU", title: "Miss Hivaria", category: "Culture & Film", summary: "A bold university campaign that refuses to look away." },
];

const projectRanks = rankSequence(projectData.length);
const usedSlugs = new Set();
const projects = projectData.map((p, i) => {
  let base = slugify(`${p.client} ${p.title}`);
  let slug = base;
  let n = 2;
  while (usedSlugs.has(slug)) slug = `${base}-${n++}`;
  usedSlugs.add(slug);
  return {
    // NOTE: no dots in _id — dotted IDs are treated as private and are NOT
    // readable by the anonymous public role, which would hide them from the site.
    _id: `project-${slug}`,
    _type: "project",
    title: p.title,
    slug: { _type: "slug", current: slug },
    client: p.client,
    category: p.category,
    summary: p.summary,
    featured: Boolean(p.featured),
    orderRank: projectRanks[i],
  };
});

// --- Press (2–3 placeholders) ----------------------------------------------

const pressData = [
  {
    title: "See It Be It",
    outlet: "Cannes Lions",
    type: "award",
    date: "2016-06-01",
    link: "https://www.canneslions.com/",
  },
  {
    title: "Add your interviews, features, and talks here",
    outlet: "Placeholder. Replace in the Studio",
    type: "feature",
    link: "https://www.linkedin.com/in/marina-cuesta-tovar-a20b0a24/",
  },
];

const pressRanks = rankSequence(pressData.length);
const press = pressData.map((p, i) => ({
  _id: `press-${slugify(p.outlet + " " + p.title)}`,
  _type: "pressMention",
  title: p.title,
  outlet: p.outlet,
  type: p.type,
  ...(p.date ? { date: p.date } : {}),
  link: p.link,
  orderRank: pressRanks[i],
}));

// --- Run -------------------------------------------------------------------

async function run() {
  const docs = [siteSettings, ...projects, ...press];
  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  await tx.commit();

  console.log(
    `Seeded: 1 site settings, ${projects.length} projects (${projects.filter((p) => p.featured).length} featured), ${press.length} press mentions.`,
  );
  console.log("Reminder: upload Marina's headshot in Site Settings — it's intentionally empty.");
}

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
