"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Service } from "@/features/services/service-data";
import { ServiceVisual } from "./ServiceVisual";
import { Reveal } from "@/components/ui/Reveal";

const SERVICE_CAPABILITIES: Record<string, string[]> = {
  "01": [
    "Marketing & brochure sites",
    "Design systems & component libraries",
    "Performance-optimized builds",
    "CMS integration (Contentful, Sanity, etc.)",
    "Animation & motion design",
    "Accessibility (WCAG 2.1 AA)",
  ],
  "02": [
    "Dashboards & admin portals",
    "SaaS product development",
    "Real-time features (WebSockets, SSE)",
    "Authentication & authorization",
    "API design & integration",
    "Data visualization",
  ],
  "03": [
    "User research & journey mapping",
    "Wireframing & prototyping",
    "Design system creation",
    "Interaction & motion design",
    "Usability testing",
    "Handoff & developer collaboration",
  ],
  "04": [
    "Audit & strategy",
    "Design modernization",
    "Performance overhaul",
    "Migration & replatforming",
    "Content restructuring",
    "SEO preservation",
  ],
  "05": [
    "Headless commerce (Shopify, Medusa)",
    "Custom checkout flows",
    "Subscription & membership systems",
    "Inventory & order management",
    "Payment integration (Stripe, etc.)",
    "Analytics & conversion tracking",
  ],
};

const SERVICE_DELIVERABLES: Record<string, string[]> = {
  "01": ["Responsive website", "Component library", "CMS setup", "Animation specs"],
  "02": ["Application codebase", "API documentation", "Auth system", "Deploy pipeline"],
  "03": ["Figma design system", "Interactive prototype", "UX audit report", "Handoff docs"],
  "04": ["Redesigned website", "Performance report", "Migration plan", "QA checklist"],
  "05": ["Storefront", "Admin dashboard", "Payment setup", "Order workflow"],
};

interface ServiceCardProps {
  service: Service;
  expandedId: string | null;
  onToggle: (id: string) => void;
}

function ServiceCard({ service, expandedId, onToggle }: ServiceCardProps) {
  const isExpanded = expandedId === service.id;
  const capabilities = SERVICE_CAPABILITIES[service.id] || [];
  const deliverables = SERVICE_DELIVERABLES[service.id] || [];

  return (
    <motion.div
      layout
      className="relative group"
      style={{ zIndex: isExpanded ? 10 : undefined }}
    >
      <div className="relative overflow-hidden rounded-[24px] border transition-all duration-500" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" style={{ background: `linear-gradient(135deg, ${service.swatch[0]}10, ${service.swatch[1]}10)` }} aria-hidden />

        <div className="relative p-6 md:p-8 flex flex-col h-full">
          <div className="flex items-start gap-4 mb-6">
            <motion.div
              className="font-display text-[1.5rem] md:text-[2rem] font-semibold flex-shrink-0 transition-all duration-300"
              style={{ color: isExpanded ? service.swatch[0] : "var(--text-muted)" }}
              animate={{ rotate: isExpanded ? -8 : 0, scale: isExpanded ? 1.15 : 1 }}
            >
              {service.id}
            </motion.div>
            <div className="flex-1 min-w-0">
              <motion.h2
                className="font-display text-xl md:text-2xl font-semibold transition-colors duration-300"
                style={{ color: isExpanded ? "var(--text)" : "var(--text)" }}
                animate={{ color: isExpanded ? "var(--text)" : "var(--text)" }}
              >
                {service.title}
              </motion.h2>
            </div>
            <motion.button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(service.id); }}
              className="flex-shrink-0 p-2 rounded-xl transition-all duration-300"
              style={{
                background: isExpanded ? `linear-gradient(135deg, ${service.swatch[0]}, ${service.swatch[1]})` : "var(--surface-elevated)",
                border: "1px solid var(--border)",
                color: isExpanded ? "var(--on-primary)" : "var(--text-muted)",
              }}
              aria-expanded={isExpanded}
              aria-controls={`service-${service.id}-details`}
              aria-label={isExpanded ? `Collapse ${service.title}` : `Expand ${service.title}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M6 9l6 6 6-6" />
              </motion.svg>
            </motion.button>
          </div>

          <motion.p
            className="text-[1rem] leading-relaxed mb-6 transition-colors duration-300 flex-1"
            style={{ color: "var(--text-muted)" }}
            animate={{ opacity: isExpanded ? 0.8 : 1 }}
          >
            {service.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            animate={{ opacity: isExpanded ? 0 : 1, height: isExpanded ? 0 : "auto" }}
            transition={{ duration: 0.3 }}
          >
            {deliverables.map((deliverable) => (
              <motion.span
                key={deliverable}
                layout
                className="px-3 py-1.5 rounded-full text-[0.7rem] font-medium uppercase tracking-wider transition-all duration-300"
                style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                whileHover={{ borderColor: service.swatch[0], color: service.swatch[0] }}
              >
                {deliverable}
              </motion.span>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                id={`service-${service.id}-details`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                className="overflow-hidden pt-6 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                      Capabilities
                    </h3>
                    <ul className="space-y-3" role="list">
                      {capabilities.map((capability) => (
                        <motion.li
                          key={capability}
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-3 text-[0.9375rem] leading-relaxed"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2.5"
                            style={{ background: service.swatch[0] }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                          />
                          {capability}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ServiceVisual serviceId={service.id} animate={true} className="h-[300px] md:h-[360px]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${service.swatch[0]}, ${service.swatch[1]}, transparent)`,
            opacity: isExpanded ? 1 : 0,
          }}
          aria-hidden
        />
      </div>

      <motion.div
        className="absolute -top-3 -right-3 w-16 h-16 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${service.swatch[0]}20, ${service.swatch[1]}20)`,
          border: "1px solid var(--border)",
          opacity: isExpanded ? 1 : 0,
          scale: isExpanded ? 1 : 0.8,
        }}
        animate={{ rotate: isExpanded ? 3 : 0, scale: isExpanded ? 1 : 0.8 }}
        transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        aria-hidden
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full" style={{ background: service.swatch[0] }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ServiceExperience({ services: servicesList }: { services: Service[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section aria-labelledby="services-heading" className="py-16 md:py-24 lg:py-32 relative">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="grid-bg" style={{ opacity: 0.25 }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold mb-4">
            Our Capabilities
          </p>
          <p className="max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Each service is a complete end-to-end capability — not a line item.
            We handle strategy, design, development, and launch as one continuous process.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6" role="list">
          {servicesList.map((service) => (
            <Reveal key={service.id} delay={0.1} className="relative">
              <ServiceCard
                service={service}
                expandedId={expandedId}
                onToggle={setExpandedId}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}