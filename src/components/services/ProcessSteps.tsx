"use client";

import { motion } from "framer-motion";

export function ProcessSteps() {
  const steps = [
    { num: "01", title: "Discover", desc: "Strategy, research & planning" },
    { num: "02", title: "Design", desc: "UI/UX, systems & prototypes" },
    { num: "03", title: "Develop", desc: "Clean code, tests & review" },
    { num: "04", title: "Launch", desc: "Deploy, monitor & iterate" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
      {steps.map((step, index) => (
        <motion.div
          key={step.num}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
          className="p-6 rounded-[18px] border transition-all duration-300 hover:-translate-y-1"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <span className="font-display text-[2.5rem] font-bold mb-3 block" style={{ color: "var(--text-muted)", opacity: 0.4 }}>
            {step.num}
          </span>
          <h3 className="font-display text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
            {step.title}
          </h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {step.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}