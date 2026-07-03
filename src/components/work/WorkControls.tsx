"use client";

import { useMemo, useState } from "react";

import WorkGrid from "@/components/work/WorkGrid";
import type { ProjectCard, ProjectCategory } from "@/types/sanity";

// "All" plus the fixed category set from the project schema (feature 07).
const CATEGORIES: readonly (ProjectCategory | "All")[] = [
  "All",
  "Global Brands",
  "Multicultural",
  "Feminist & Social",
  "Culture & Film",
];

type Props = {
  projects: ProjectCard[];
};

// The site's main interactive island: category chips + live search over a list
// handed down as props from the server component (no client-side fetching).
export default function WorkControls({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState<
    ProjectCategory | "All"
  >("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        !q ||
        `${p.title} ${p.client} ${p.category}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [projects, activeCategory, query]);

  return (
    <>
      <div className="mb-9 flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const active = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-xs font-medium tracking-[0.02em] transition-[color,background-color,border-color] duration-200 ease-[var(--ease)] ${
                  active
                    ? "border-ink bg-ink text-bone"
                    : "border-line bg-transparent text-ink-2 hover:border-ink"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[230px] flex-[0_1_280px]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, clients…"
            aria-label="Search projects"
            className="w-full border-0 border-b border-line bg-transparent py-2.5 pl-1 pr-7 text-[13px] text-ink transition-colors duration-250 placeholder:text-ink-2 focus:border-garnet"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={2}
            className="pointer-events-none absolute right-1 top-1/2 h-[15px] w-[15px] -translate-y-1/2 stroke-ink-2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </div>
      </div>

      <WorkGrid projects={filtered} emptyLabel={query.trim() || activeCategory} />
    </>
  );
}
