# Current Feature

Dashboard UI — Phase 1: Layout Foundation

## Status

In Progress

## Goals

- Initialize shadcn/ui and install required components
- Create `/dashboard` route
- Set up main dashboard layout with global styles
- Dark mode by default
- Top bar with search input and "New Item" button (display only)
- Sidebar and main content area placeholders (h2 "Sidebar" / "Main")

## Notes

- Reference screenshot: `@context/screenshots/dashboard-ui-main.png`
- Phase 2 and 3 specs are in `@context/features/`
- Mock data available at `@src/lib/mock-data.ts`

## History

- **2026-06-28** — Initial Next.js + Tailwind CSS v4 setup. Scaffolded from Create Next App, removed default boilerplate (SVGs, AGENTS.md), added project context docs. Committed (`chore: initial nextjs and tailwind set up`) and pushed to remote `rikilamadrid/devstash`.
- **2026-06-29** — Added mock data (`src/lib/mock-data.ts`) and dashboard screenshots. Committed (`feat: add mock data and dashboard screenshots`).
