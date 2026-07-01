import { SearchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "Search & Sharing (SEO)",
  type: "object",
  icon: SearchIcon,
  description:
    "Controls how this appears in Google results and when shared on social media.",
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      description:
        "The headline shown in Google and browser tabs. Keep it under ~60 characters. Leave blank to use the default.",
      validation: (Rule) =>
        Rule.max(70).warning("Long titles get cut off in search results."),
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "text",
      rows: 3,
      description:
        "One or two sentences that appear under the title in Google and social previews. Aim for ~155 characters.",
      validation: (Rule) =>
        Rule.max(200).warning("Long descriptions get cut off in search results."),
    }),
  ],
});
