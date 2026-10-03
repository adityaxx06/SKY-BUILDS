import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getPublishedProjects } from "@/lib/projects/get-projects";

export async function SelectedWork() {
  const { projects } = await getPublishedProjects();
  const sorted = [...projects].sort((a, b) => a.displayOrder - b.displayOrder);
  const [featured, ...rest] = sorted;

  if (!featured) return null;

  return (
    <Container as="section" id="work" className="py-24 scroll-mt-20">
      <Reveal>
        <h2 className="mb-5 text-[0.8125rem] font-medium" style={{ color: "var(--text-muted)" }}>
          Selected work
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 grid-rows-2 gap-6 md:grid-cols-[1.4fr_1fr]">
        <Reveal delay={0.05} className="md:row-span-2">
          <ProjectCard project={featured} large />
        </Reveal>
        {rest.map((project, i) => (
          <Reveal key={project.id} delay={0.1 + i * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
