"use client";

import { motion } from "framer-motion";
import { services } from "@/features/services/service-data";
import { ServiceVisualSmall } from "@/components/services/ServiceVisual";

export function ContactHero() {
  return (
    <header className="relative pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-28 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25" style={{ background: "var(--primary)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15" style={{ background: "var(--secondary)" }} />
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10" style={{ background: "var(--accent)" }} />
        <div className="grid-bg" style={{ opacity: 0.3 }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className="font-display text-[clamp(1rem,2vw,1.25rem)] font-medium mb-6 tracking-wide" style={{ color: "var(--accent)" }}>
            Let&rsquo;s build something
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] max-w-4xl mb-8">
            Have an idea
            <br />
            <span className="grad-word not-italic">worth building?</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className="max-w-2xl text-[1.125rem] md:text-[1.25rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Websites, web applications, redesigns, e-commerce, or something entirely new.
            Tell us what you&rsquo;re imagining and we&rsquo;ll help you shape it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="mt-12 flex flex-wrap items-center justify-start gap-3 md:gap-4" role="list" aria-label="Service overview">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
                className="group inline-flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                role="listitem"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = service.swatch[0];
                  e.currentTarget.style.color = service.swatch[0];
                  e.currentTarget.style.background = `rgba(var(--shadow-tint), 0.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
              >
                <ServiceVisualSmall serviceId={service.id} />
                <span className="text-[0.875rem] font-medium whitespace-nowrap">{service.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-16 flex items-center justify-start gap-4"
        >
          <span className="text-[0.75rem] font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            What are you building?
          </span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, var(--border), transparent)" }} />
        </motion.div>
      </div>
    </header>
  );
}