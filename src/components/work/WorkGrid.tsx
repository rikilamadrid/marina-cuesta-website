import ProjectCard from "@/components/work/ProjectCard";
import type { ProjectCard as ProjectCardData } from "@/types/sanity";

type Props = {
  projects: ProjectCardData[];
  // Shown inside the empty state so it reads "…match <query>." — the active
  // search term, or the active category when the search box is empty.
  emptyLabel?: string;
};

// Presentational grid: maps ProjectCard over a (pre-filtered) list, or shows a
// tasteful empty state. Grid steps 3-col → 2-col ≤980px → 1-col ≤680px.
export default function WorkGrid({ projects, emptyLabel }: Props) {
  if (projects.length === 0) {
    return (
      <p className="py-[60px] text-center text-sm text-ink-2">
        No projects match{" "}
        <b className="font-semibold text-ink">{emptyLabel}</b>. Try another
        search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[18px] max-[980px]:grid-cols-2 max-[680px]:grid-cols-1">
      {projects.map((project, i) => (
        <ProjectCard key={project._id} project={project} index={i} />
      ))}
    </div>
  );
}
