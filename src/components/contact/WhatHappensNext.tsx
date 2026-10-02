"use client";

import { motion } from "framer-motion";

export function WhatHappensNext() {
  const steps = [
    {
      num: "01",
      title: "Share the idea",
      desc: "You tell us what you&rsquo;re building. We listen, ask questions, and understand the goal.",
    },
    {
      num: "02",
      title: "Discuss the scope",
      desc: "We outline the approach, timeline, and investment. No vague estimates — clear parameters.",
    },
    {
      num: "03",
      title: "Define the direction",
      desc: "Strategy, wireframes, and design direction. You approve before any code is written.",
    },
    {
      num: "04",
      title: "Start building",
      desc: "Development, testing, and launch. Regular updates. No surprises.",
    },
  ];

  return (
    <section aria-labelledby="next-heading" className="py-24 relative">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="grid-bg" style={{ opacity: 0.2 }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p id="next-heading" className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold mb-4">
            What happens next
          </p>
          <p className="text-[1.125rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Four steps from inquiry to launch. No handoff gaps. No surprise scope creep.
          </p>
        </motion.div>

        <div className="relative">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
                className="relative flex gap-8 md:gap-12"
              >
                <div className="flex flex-col items-center w-20 flex-shrink-0 relative z-10">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3 relative"
                    style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)" }}
                  >
                    <span className="font-display text-lg font-bold" style={{ color: "var(--primary)" }}>
                      {step.num}
                    </span>
                  </div>
                  <div className="h-full w-px flex-1" style={{ background: "var(--border)" }} aria-hidden />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>
                    {step.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)" }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}