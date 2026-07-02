import { CaseIcon } from "@sanity/icons";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: CaseIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "title",
      title: "Project title",
      type: "string",
      description: "The name of the work, shown on the card and at the top of its page.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description:
        "The end of the page's link, e.g. /work/goya-relatable. Click Generate to create it from the title.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      description: "The brand or organization this work was for. e.g. GOYA, P&G.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Which area this work belongs to. Used by the filters on the Work page.",
      options: {
        list: [
          { title: "Global Brands", value: "Global Brands" },
          { title: "Multicultural", value: "Multicultural" },
          { title: "Feminist & Social", value: "Feminist & Social" },
          { title: "Culture & Film", value: "Culture & Film" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      description: "The year the work was made. e.g. 2023.",
    }),
    defineField({
      name: "market",
      title: "Market",
      type: "array",
      description: "Where this work ran. Pick all that apply.",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "US", value: "US" },
          { title: "U.S. Hispanic", value: "U.S. Hispanic" },
          { title: "Europe", value: "Europe" },
          { title: "Global", value: "Global" },
        ],
      },
    }),
    defineField({
      name: "role",
      title: "Your role",
      type: "string",
      description: "What you did on this project. e.g. Executive Creative Director.",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 2,
      description: "One line that appears on the project card. Keep it short and vivid.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Full write-up",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      description: "The longer story of the work, shown on the project's own page. Use paragraphs and styling as needed.",
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      description:
        "The main image for this work. Optional — projects without one show a colored tile instead. Drag the crop dot to control framing.",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      description: "More images, and video links, shown on the project's page.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
        defineArrayMember({
          type: "object",
          name: "videoEmbed",
          title: "Video",
          fields: [
            defineField({
              name: "videoUrl",
              title: "Video link",
              type: "url",
              description: "A YouTube or Vimeo link to embed. Starts with https://",
              validation: (Rule) =>
                Rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
          preview: {
            select: { title: "videoUrl" },
            prepare: ({ title }) => ({ title: title ?? "Video", subtitle: "Video" }),
          },
        }),
      ],
    }),
    defineField({
      name: "externalLink",
      title: "External link",
      type: "url",
      description:
        "Link out to a case study, Behance project, or the film. Optional. Starts with https://",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "featured",
      title: "Show on homepage",
      type: "boolean",
      description: "Turn on to feature this work in the Selected Work section of the homepage.",
      initialValue: false,
    }),
    // Managed by the drag-to-reorder list in the Studio (hidden from the form).
    orderRankField({ type: "project" }),
  ],
  preview: {
    select: {
      title: "title",
      client: "client",
      category: "category",
      media: "cover",
    },
    prepare: ({ title, client, category, media }) => ({
      title: client ? `${client} — ${title}` : title,
      subtitle: category,
      media,
    }),
  },
});
