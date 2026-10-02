import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Global footer — the last missing piece of Phase 3 (Global
 * Experience). Reuses Container/Reveal and the existing v5 tokens;
 * introduces no new colors, gradients, or components.
 *
 * Routes that don't exist yet (Privacy, Terms) are rendered as plain,
 * non-focusable text rather than fake <a> links — PRD's sitemap (§8)
 * lists them, but building working links to pages that 404 would be
 * worse than naming them honestly as "soon". Section links (#services,
 * #about, #work, #process) point at homepage anchors and work from any
 * page via "/#..." hrefs.
 *
 * No social links: PRD/DATABASE.md don't define any real SKY BUILDS
 * social accounts, and inventing placeholder ones was explicitly
 * ruled out — so this section is omitted rather than faked.
 */

const BUILT_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/contact", label: "Contact" },
] as const;

const FUTURE_LINKS = [] as const;
const FUTURE_LEGAL = ["Privacy", "Terms"] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t" style={{ borderColor: "var(--border)" }}>
      <div className="grid-bg" style={{ opacity: 0.35 }} aria-hidden />
      <Container className="relative z-10 py-16">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="font-display text-[1.75rem] font-semibold">
                SKY <em className="grad-word not-italic">BUILDS</em>
              </p>
              <p className="mt-3 max-w-[42ch]" style={{ color: "var(--text-muted)" }}>
                A modern web development studio building high-quality digital
                experiences for ambitious businesses.
              </p>
              <a
                href="mailto:hello@skybuilds.studio"
                className="mt-6 inline-block text-[0.9375rem] font-medium underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
                style={{ color: "var(--primary)" }}
              >
                hello@skybuilds.studio
              </a>
            </div>

            <nav aria-label="Footer navigation" className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-[0.8125rem] font-medium" style={{ color: "var(--text-muted)" }}>
                  Sitemap
                </p>
                <ul className="flex flex-col gap-2">
                  {BUILT_LINKS.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-[0.9375rem] transition-colors hover:opacity-80">
                        {link.label}
                      </a>
                    </li>
                  ))}
                  {FUTURE_LINKS.map((label) => (
                    <li key={label} className="flex items-center gap-2">
                      <span className="text-[0.9375rem]" style={{ color: "var(--text-muted)" }}>
                        {label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="rounded-full border px-1.5 py-0.5 text-[0.625rem] tracking-wide"
                        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                      >
                        soon
                      </span>
                      <span className="sr-only">(coming soon)</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-3 text-[0.8125rem] font-medium" style={{ color: "var(--text-muted)" }}>
                  Legal
                </p>
                <ul className="flex flex-col gap-2">
                  {FUTURE_LEGAL.map((label) => (
                    <li key={label} className="flex items-center gap-2">
                      <span className="text-[0.9375rem]" style={{ color: "var(--text-muted)" }}>
                        {label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="rounded-full border px-1.5 py-0.5 text-[0.625rem] tracking-wide"
                        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                      >
                        soon
                      </span>
                      <span className="sr-only">(coming soon)</span>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div
            className="mt-14 flex flex-col gap-2 border-t pt-6 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            <p>© {year} SKY BUILDS. All rights reserved.</p>
            <p>Concept projects shown are demonstrations, not client work.</p>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
