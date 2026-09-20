"use client";

import { motion } from "framer-motion";
import { services } from "@/features/services/service-data";
import { ServiceVisualSmall } from "./ServiceVisual";

export function ServicesHero() {
  return (
    <header className="relative pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-28 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25" style={{ background: "var(--primary)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15" style={{ background: "var(--secondary)" }} />
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10" style={{ background: "var(--accent)" }} />
        <div className="grid-bg" style={{ opacity: 0.3 }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className="font-display text-[clamp(1rem,2vw,1.25rem)] font-medium mb-6 tracking-wide" style={{ color: "var(--accent)" }}>
            WHAT WE BUILD
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] max-w-4xl mb-8">
            Digital experiences
            <br />
            <span className="grad-word not-italic">built to move ideas forward</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className="max-w-2xl text-[1.125rem] md:text-[1.25rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Six focused capabilities — from brand websites to complex web applications.
            Each delivered as a complete, production-ready system.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="mt-12 flex flex-wrap items-center gap-3 md:gap-4" role="list" aria-label="Service overview">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
                className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-300"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                role="listitem"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = service.swatch[0];
                  e.currentTarget.style.color = service.swatch[0];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <ServiceVisualSmall serviceId={service.id} />
                <span className="text-[0.8125rem] font-medium hidden sm:inline">{service.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl md:bottom-[-60px] pointer-events-none"
          aria-hidden
        >
          <div className="flex items-center justify-center gap-8 md:gap-16 px-4">
            {services.map((service) => (
              <div key={service.id} className="flex flex-col items-center gap-2 opacity-60">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${service.swatch[0]}20, ${service.swatch[1]}20)`, border: "1px solid var(--border)" }}>
                  <ServiceVisualSmall serviceId={service.id} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, ${service.swatch[0]}, ${service.swatch[1]})` }} />
                </div>
                <span className="text-[0.6875rem] font-medium uppercase tracking-wider text-center max-w-[80px]" style={{ color: "var(--text-muted)" }}>
                  {service.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
}