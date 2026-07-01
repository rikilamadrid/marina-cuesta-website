"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schema";
import { structure } from "./src/sanity/structure";

// Site Settings is a singleton: exactly one document she edits in place.
const SINGLETON_TYPES = new Set(["siteSettings"]);
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Marina Cuesta",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  document: {
    // Keep the singleton out of the global "Create new" menu.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((template) => !SINGLETON_TYPES.has(template.templateId))
        : prev,
    // For the singleton, drop create/duplicate/delete — leave only publish/discard/restore.
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : prev,
  },
});
