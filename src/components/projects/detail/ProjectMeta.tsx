import type { Project } from "@/features/projects/project-data";

interface ProjectMetaProps {
  project: Project;
}

export function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="p-5 rounded-[14px] border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <p className="text-[0.75rem] font-medium uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
          Project
        </p>
        <p className="font-display text-[1.25rem] font-semibold">{project.title}</p>
      </div>
      <div className="p-5 rounded-[14px] border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <p className="text-[0.75rem] font-medium uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
          Category
        </p>
        <p className="font-display text-[1.25rem] font-semibold">{project.category}</p>
      </div>
      <div className="p-5 rounded-[14px] border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <p className="text-[0.75rem] font-medium uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
          Year
        </p>
        <p className="font-display text-[1.25rem] font-semibold">{project.year}</p>
      </div>
      <div className="p-5 rounded-[14px] border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <p className="text-[0.75rem] font-medium uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
          Type
        </p>
        <p className="font-display text-[1.25rem] font-semibold">Concept / Demo</p>
      </div>
    </div>
  );
}