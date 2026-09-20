import { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatHappensNext } from "@/components/contact/WhatHappensNext";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Contact — SKY BUILDS",
  description: "Start a project inquiry. Websites, web applications, redesigns, e-commerce, and UI/UX design. Tell us about your idea and we&rsquo;ll help you shape it.",
  openGraph: {
    title: "Contact — SKY BUILDS",
    description: "Start a project inquiry. Websites, web applications, redesigns, e-commerce, and UI/UX design.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <main className="min-h-screen" style={{ background: "var(--bg)" }}>
        <section className="py-16 md:py-24 lg:py-32" aria-labelledby="inquiry-heading">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
              <div className="relative">
                <div className="sticky top-24 space-y-8">
                  <div>
                    <p id="inquiry-heading" className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold mb-4">
                      Project Inquiry
                    </p>
                    <p className="text-[1.125rem] leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
                      Fill in the details so we can prepare for a productive first conversation.
                      The more context you share, the better we can help.
                    </p>
                  </div>

                  <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                    <p className="font-display text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                      Prefer email?
                    </p>
                    <p className="mb-4" style={{ color: "var(--text-muted)" }}>
                      Skip the form and write to us directly.
                    </p>
                    <a
                      href="mailto:hello@skybuilds.studio"
                      className="inline-flex items-center gap-2 text-sm font-medium underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
                      style={{ color: "var(--primary)" }}
                    >
                      hello@skybuilds.studio
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <WhatHappensNext />

        <CTA />
      </main>
    </>
  );
}