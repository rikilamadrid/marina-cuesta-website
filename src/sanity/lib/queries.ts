import { defineQuery } from "next-sanity";

// Card-level projection shared by the list queries. Slug flattened to a string.
const PROJECT_CARD_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  client,
  category,
  year,
  market,
  summary,
  cover,
  featured
`;

// Site Settings singleton (fixed document id set by the desk structure).
export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    name,
    jobTitle,
    headshot,
    shortBio,
    longBio,
    careerArc,
    email,
    socials,
    seo
  }
`);

// Featured projects for the homepage Selected Work section.
export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(orderRank asc){
    ${PROJECT_CARD_FIELDS}
  }
`);

// Every project, ordered — for the Work index.
export const allProjectsQuery = defineQuery(`
  *[_type == "project"] | order(orderRank asc){
    ${PROJECT_CARD_FIELDS}
  }
`);

// A single project by its slug — full detail for the project page.
export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    ${PROJECT_CARD_FIELDS},
    role,
    body,
    gallery,
    externalLink
  }
`);

// All press mentions, ordered — for the Press page.
export const allPressQuery = defineQuery(`
  *[_type == "pressMention"] | order(orderRank asc){
    _id,
    title,
    outlet,
    type,
    date,
    link
  }
`);
