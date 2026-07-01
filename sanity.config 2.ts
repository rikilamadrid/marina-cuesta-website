"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  name: "default",
  title: "Marina Cuesta",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: [],
  },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
