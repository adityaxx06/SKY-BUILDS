import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

/**
 * About / agency-positioning preview (PRD.md §9, §14). This is the
 * homepage preview, not the full /about page (Phase 7). Copy is
 * deliberately specific rather than generic agency filler — no
 * "passionate team dedicated to innovative solutions" language, and
 * no fabricated stats/numbers, per PRD's demo-content rule.
 */
const capabilities = [
  { label: "Design", detail: "Interfaces that hold up under real use, not just in a mockup." },
  { label: "Development", detail: "Clean, typed, maintainable code — built to be handed off or extended." },
  { label: "Communication", detail: "You talk to the person doing the work. No account-manager layer." },
];

export function About() {
  return (
    <Container as="section" id="about" className="py-24 scroll-mt-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <h2 className="mb-5 text-[0.8125rem] font-medium" style={{ color: "var(--text-muted)" }}>
            About
          </h2>
          <h2 className="font-display max-w-[16ch] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] font-medium">
            Good websites are <em className="grad-word not-italic">considered</em>, not assembled.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem]" style={{ color: "var(--text-muted)" }}>
            SKY BUILDS is a small studio focused on one thing: building fast,
            considered websites for businesses that care how they show up
            online. Design and development happen together here, so nothing
            gets lost in the handoff between the two.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            {capabilities.map((item, i) => (
              <div
                key={item.label}
                className={`p-6 ${i > 0 ? "border-t" : ""}`}
                style={{ borderColor: "var(--border)" }}
              >
                <p className="font-display mb-1.5 text-[1rem] font-semibold" style={{ color: "var(--primary)" }}>
                  {item.label}
                </p>
                <p className="text-[0.9375rem]" style={{ color: "var(--text-muted)" }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
