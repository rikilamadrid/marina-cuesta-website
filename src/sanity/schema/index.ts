import type { SchemaTypeDefinition } from "sanity";

import { seo } from "./objects/seo";
import { pressMention } from "./pressMention";
import { project } from "./project";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  siteSettings,
  project,
  pressMention,
  // Shared objects
  seo,
];
