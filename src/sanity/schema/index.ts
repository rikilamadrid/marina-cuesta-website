import type { SchemaTypeDefinition } from "sanity";

import { seo } from "./objects/seo";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  siteSettings,
  // Shared objects
  seo,
];
