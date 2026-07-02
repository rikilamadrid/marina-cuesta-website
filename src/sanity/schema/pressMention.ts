import { DocumentTextIcon } from "@sanity/icons";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const pressMention = defineType({
  name: "pressMention",
  title: "Press Mention",
  type: "document",
  icon: DocumentTextIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      description: "The title of the piece, as it appears in the article, award, or talk.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "outlet",
      title: "Outlet",
      type: "string",
      description: "Where it appeared. e.g. Adweek, Cannes Lions, LinkedIn.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      description: "What kind of mention this is.",
      options: {
        list: [
          { title: "Interview", value: "interview" },
          { title: "Feature", value: "feature" },
          { title: "Award", value: "award" },
          { title: "Talk", value: "talk" },
          { title: "Podcast", value: "podcast" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "When it was published or happened. Optional.",
      options: { dateFormat: "MMMM YYYY" },
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "The link to the article, award page, or recording. Starts with https://",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    // Managed by the drag-to-reorder list in the Studio (hidden from the form).
    orderRankField({ type: "pressMention" }),
  ],
  preview: {
    select: {
      title: "title",
      outlet: "outlet",
      type: "type",
    },
    prepare: ({ title, outlet, type }) => ({
      title: outlet ? `${outlet} — ${title}` : title,
      subtitle: type,
    }),
  },
});
