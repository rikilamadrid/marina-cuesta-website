import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "name",
      title: "Your name",
      type: "string",
      description: "Displayed everywhere and used for search results. e.g. Marina Cuesta.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jobTitle",
      title: "Job title",
      type: "string",
      description: "Your professional title, shown under your name. e.g. Executive Creative Director.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headshot",
      title: "Headshot",
      type: "image",
      description:
        "Your professional photo. This is the ONE place it's set — it flows to the homepage, About page, and the photo Google shows next to your name. Drag the crop dot to control how it's framed.",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortBio",
      title: "Hero statement",
      type: "text",
      rows: 3,
      description: "One or two sentences that appear at the top of the homepage, beside your name.",
    }),
    defineField({
      name: "longBio",
      title: "Full bio",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      description: "The longer bio for your About page, in your own voice. Use paragraphs and styling as needed.",
    }),
    defineField({
      name: "careerArc",
      title: "Career arc",
      type: "array",
      description: "Key roles or milestones, in the order you want them shown.",
      of: [
        defineArrayMember({
          type: "object",
          name: "careerStep",
          fields: [
            defineField({
              name: "org",
              title: "Organization or role",
              type: "string",
              description: "e.g. Grey, Ogilvy, or a title you held.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "string",
              description: "A short line about what you did there.",
            }),
          ],
          preview: {
            select: { title: "org", subtitle: "note" },
          },
        }),
      ],
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      description: "The email address shown on your Contact section.",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      description: "Your profiles — LinkedIn, Behance, Instagram, Vimeo, etc. Shown in the Contact section.",
      of: [
        defineArrayMember({
          type: "object",
          name: "social",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "The name of the platform, e.g. LinkedIn.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "url",
              description: "The full web address, starting with https://",
              validation: (Rule) =>
                Rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Search & Sharing (SEO)",
      type: "seo",
      description: "Default title and description for Google and social previews across the site.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "jobTitle", media: "headshot" },
  },
});
