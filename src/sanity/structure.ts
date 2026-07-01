import { CaseIcon, CogIcon, DocumentTextIcon } from "@sanity/icons";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

// Grouped desk: Site Settings (singleton) pinned to top, then the two
// content collections she reorders by hand — Work and Press.
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings"),
        ),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "project",
        title: "Work",
        icon: CaseIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "pressMention",
        title: "Press",
        icon: DocumentTextIcon,
        S,
        context,
      }),
    ]);
