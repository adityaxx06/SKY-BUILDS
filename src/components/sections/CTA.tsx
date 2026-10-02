import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <Container as="section" id="cta" className="py-24 scroll-mt-20">
      <Reveal>
        <div
          className="corner-marks relative overflow-hidden rounded-3xl p-10 md:p-16"
          style={{ background: "linear-gradient(135deg, var(--surface), var(--surface-elevated))" }}
        >
          <span className="cm-tl" />
          <span className="cm-br" />
          <div
            aria-hidden
            className="absolute -top-[30%] -right-[10%] h-[340px] w-[340px] rounded-full blur-[10px]"
            style={{
              background: "radial-gradient(circle, rgba(var(--shadow-tint), 0.35), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <p className="mb-4 text-[0.8125rem] font-medium" style={{ color: "var(--text-muted)" }}>
              Let&rsquo;s talk
            </p>
            <h2 className="font-display max-w-[18ch] text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium">
              Have a project in mind? <em className="grad-word not-italic">Let&rsquo;s build it.</em>
            </h2>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href="mailto:hello@skybuilds.studio" showArrow>
                Start a project
              </Button>
              <Button href="/#services" variant="secondary">
                View services
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
