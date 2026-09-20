import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { processSteps } from "@/lib/constants/process-data";

/**
 * The one section where the blueprint language (grid, dashed
 * connectors, technical tags) is fully applied — per the v5 design
 * direction, everywhere else it's a whisper, here it's earned.
 */
export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24">
      <div className="grid-bg" aria-hidden />
      <Container className="relative z-10">
        <Reveal>
          <p className="mb-5 text-[0.8125rem] font-medium" style={{ color: "var(--text-muted)" }}>
            Process
          </p>
        </Reveal>
        <ol>
          {processSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.05}>
              <li className="flex gap-8 py-[1.6rem]">
                <div className="relative flex w-16 flex-shrink-0 justify-center">
                  <span
                    className="font-display relative z-10 text-[1.8rem] font-bold"
                    style={{ background: "var(--bg)", color: "var(--primary)" }}
                  >
                    {step.num}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-0 left-1/2 z-0"
                      style={{
                        bottom: "-1.6rem",
                        borderLeft: "1.5px dashed var(--border)",
                      }}
                    />
                  )}
                </div>
                <div>
                  <div className="mb-1.5 flex items-center gap-3">
                    <span className="text-[0.6875rem] tracking-wide" style={{ color: "var(--text-muted)" }}>
                      {step.tag}
                    </span>
                    <span className="text-[0.6875rem] tracking-wide" style={{ color: "var(--text-muted)" }}>
                      {step.num} / {String(processSteps.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display mb-1 text-[1.5rem] font-medium">{step.title}</h3>
                  <p className="max-w-[50ch]" style={{ color: "var(--text-muted)" }}>
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
