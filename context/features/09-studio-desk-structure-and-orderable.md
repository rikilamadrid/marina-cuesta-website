# Studio Desk Structure & Orderable Lists

## Status

Not Started

## Goals

- Create `src/sanity/structure.ts` and wire it into the Studio config: group the desk as **Site Settings** (singleton, pinned to top), **Work**, **Press**.
- Enforce the **Site Settings singleton**: hide "create new" / duplicate; open the single document directly.
- Install and configure `@sanity/orderable-document-list` (verify current version) for drag-to-reorder on **Work** (`project`) and **Press** (`pressMention`), driving the `order` field.
- Verify in `/studio`: Site Settings opens as one doc; Work and Press are reorderable by drag; new-doc creation is sensible.
- `npm run build` passes.

## Notes

- **Depends on:** `06`, `07`, `08` (all three schemas must exist).
- Desk-structure requirements: `@context/project-overview.md` → The Studio ("Desk structure") and `@context/coding-standards.md` → Content.
- The bar to clear: editing must feel **at least as easy as Behance** — friendly grouping, obvious labels, drag to order.
- This completes the editor experience for **Phase 2** except seeding.

## Out of Scope

- GROQ queries and seed content — feature `10`.
- Any front-end rendering.
- On-demand revalidation webhook — Phase 5 (`25`).
