import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { whyItems } from "@/lib/constants/why-data";

/**
 * "Why SKY BUILDS" — value-proposition module (PRD.md §9 homepage
 * structure). Server Component: hover behavior is pure CSS
 * (see .why-card in globals.css), no client JS needed at all.
 */
export function WhySkyBuilds() {
  return (
    <Container as="section" id="why" className="py-24">
      <Reveal>
        <h2 className="mb-5 text-[0.8125rem] font-medium" style={{ color: "var(--text-muted)" }}>
          Why SKY BUILDS
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {whyItems.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08}>
            <div
              className="why-card h-full rounded-2xl border p-6"
              style={
                {
                  borderColor: "var(--border)",
                  "--why-accent-a": item.swatch[0],
                  "--why-accent-b": item.swatch[1],
                } as React.CSSProperties
              }
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-[0.9375rem] font-semibold" style={{ color: "var(--text-muted)" }}>
                  {item.id}
                </span>
                <span aria-hidden className="why-swatch h-5 flex-shrink-0 rounded-md" />
              </div>
              <h3 className="font-display mb-2 text-[1.25rem] font-medium">{item.title}</h3>
              <p style={{ color: "var(--text-muted)" }}>{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
