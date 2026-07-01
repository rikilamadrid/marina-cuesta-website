import type { SchemaTypeDefinition } from "sanity";

import { seo } from "./objects/seo";
import { project } from "./project";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  siteSettings,
  project,
  // Shared objects
  seo,
];
