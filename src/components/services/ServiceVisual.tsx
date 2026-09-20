"use client";

import { motion } from "framer-motion";

interface ServiceVisualProps {
  serviceId: string;
  className?: string;
  animate?: boolean;
}

export function ServiceVisual({ serviceId, className, animate = true }: ServiceVisualProps) {
  const visuals: Record<string, React.ReactElement> = {
    "01": (
      <div className="relative w-full h-full" style={{ background: "var(--surface-elevated)" }}>
        <div className="absolute inset-0 p-4 grid grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={animate ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-lg border"
              style={{
                borderColor: "var(--border)",
                background: i % 3 === 0 ? "rgba(91,120,255,0.15)" : i % 3 === 1 ? "rgba(255,93,162,0.1)" : "rgba(255,193,92,0.1)",
              }}
            >
              {i === 4 && (
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    animate={animate ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 rounded-full border-2 border-dashed"
                    style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--secondary)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
          </div>
          <div className="text-[0.6rem] font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Website Design & Development
          </div>
        </div>
      </div>
    ),
    "02": (
      <div className="relative w-full h-full" style={{ background: "var(--surface-elevated)" }}>
        <div className="absolute inset-0 p-4 flex items-center justify-center">
          <div className="w-full max-w-[280px] h-[180px] rounded-xl border relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
            <div className="absolute top-3 left-3 right-3 flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "var(--secondary)", opacity: 0.7 }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "var(--accent)", opacity: 0.7 }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "var(--success)", opacity: 0.7 }} />
            </div>
            <div className="absolute inset-0 p-6 flex flex-col items-center justify-center">
              <motion.div
                animate={animate ? { y: [0, -8, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                style={{ background: "linear-gradient(135deg, var(--secondary), var(--accent))" }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--on-primary)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 16l4-16M6 16l-4-8 2.5-5 7 14 7-14 2.5 5" />
                </svg>
              </motion.div>
              <div className="text-center">
                <p className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>Dashboard Analytics</p>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Real-time workflow metrics</p>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex gap-2">
              <motion.div
                animate={animate ? { width: ["40%", "60%", "40%"] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 rounded-full flex-1"
                style={{ background: "var(--primary)" }}
              />
              <motion.div
                animate={animate ? { width: ["60%", "40%", "60%"] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="h-1.5 rounded-full flex-1"
                style={{ background: "var(--secondary)" }}
              />
              <motion.div
                animate={animate ? { width: ["30%", "50%", "30%"] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="h-1.5 rounded-full flex-1"
                style={{ background: "var(--accent)" }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    "03": (
      <div className="relative w-full h-full" style={{ background: "var(--surface-elevated)" }}>
        <div className="absolute inset-0 p-4 flex items-center justify-center">
          <div className="relative w-full max-w-[320px]">
            <div className="aspect-[4/3] rounded-xl border relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,193,92,0.1), rgba(91,120,255,0.05))" }} />
              <motion.div
                animate={animate ? { x: [-10, 10, -10] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[120px] rounded-lg border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: "var(--accent)" }}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--accent)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </motion.div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="flex gap-1.5">
                  <motion.div
                    animate={animate ? { scaleX: [1, 0.6, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="h-6 w-16 rounded"
                    style={{ background: "var(--primary)" }}
                  />
                  <motion.div
                    animate={animate ? { scaleX: [1, 0.8, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    className="h-6 w-12 rounded"
                    style={{ background: "var(--secondary)" }}
                  />
                </div>
                <motion.div
                  animate={animate ? { rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: "var(--accent)" }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--accent)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </motion.div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[0.6rem] font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              <span>UI/UX Design</span>
              <span>Wireframe → Prototype</span>
            </div>
          </div>
        </div>
      </div>
    ),
    "04": (
      <div className="relative w-full h-full" style={{ background: "var(--surface-elevated)" }}>
        <div className="absolute inset-0 p-4 flex items-center justify-center">
          <div className="relative w-full max-w-[280px]">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <motion.div
                animate={animate ? { y: [0, -6, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-24 rounded-lg border flex items-center justify-center"
                style={{ borderColor: "var(--border)", background: "rgba(91,120,255,0.1)" }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--primary)", opacity: 0.5 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </motion.div>
              <motion.div
                animate={animate ? { y: [0, -6, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="h-24 rounded-lg border flex items-center justify-center"
                style={{ borderColor: "var(--border)", background: "rgba(255,93,162,0.1)" }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--secondary)", opacity: 0.5 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </motion.div>
            </div>
            <div className="h-32 rounded-lg border relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={animate ? { x: [-100, 100, -100] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-full"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,93,162,0.3), transparent)" }}
                />
              </div>
              <div className="absolute inset-0 grid grid-cols-4 gap-2 p-4">
                {[0,1,2,3,4,5,6,7].map((i) => (
                  <motion.div
                    key={i}
                    animate={animate ? { opacity: [0.3, 1, 0.3] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                    className="rounded border"
                    style={{ borderColor: "var(--border)", background: i % 2 === 0 ? "rgba(91,120,255,0.15)" : "rgba(255,93,162,0.1)" }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3 text-[0.6rem] font-medium uppercase tracking-wider text-center" style={{ color: "var(--text-muted)" }}>
              Website Redesign — Before → After
            </div>
          </div>
        </div>
      </div>
    ),
    "05": (
      <div className="relative w-full h-full" style={{ background: "var(--surface-elevated)" }}>
        <div className="absolute inset-0 p-4 flex items-center justify-center">
          <div className="relative w-full max-w-[280px]">
            <div className="aspect-[3/4] rounded-xl border relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,93,162,0.15), rgba(255,193,92,0.1))" }} />
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-between">
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--secondary)", opacity: 0.7 }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent)", opacity: 0.7 }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--success)", opacity: 0.7 }} />
                  </div>
                  <div className="w-20 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(30,24,54,0.6)", backdropFilter: "blur(10px)" }}>
                    <span className="text-[0.6rem] font-medium" style={{ color: "var(--accent)" }}>skybuilds.shop</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 w-full max-w-[180px]">
                  <motion.div
                    animate={animate ? { rotate: [0, 3, -3, 0], scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 rounded-2xl relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, rgba(255,93,162,0.2), rgba(255,193,92,0.2))", border: "1px solid var(--border)" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 50%)" }} />
                    <svg className="w-16 h-16 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--secondary)", opacity: 0.6 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m7-9h1.5a1.5 1.5 0 010 3H7.5a1.5 1.5 0 000 3H17" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <div className="text-center">
                    <p className="font-display text-xl font-bold" style={{ color: "var(--text)" }}>$89.00</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Performance Tee — 3 colors</p>
                  </div>
                </div>
                <div className="w-full flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors"
                    style={{ background: "var(--primary)", color: "var(--on-primary)" }}
                  >
                    Add to Cart
                  </motion.button>
                  <button className="w-12 py-2.5 rounded-lg border transition-colors" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.7 19.7l-5.7-5.7a1 1 0 010-1.414l5.7-5.7a1 1 0 011.414 0l2.1 2.1a1 1 0 010 1.414l-2.1 2.1a1 1 0 01-1.414 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3 text-[0.6rem] font-medium uppercase tracking-wider text-center" style={{ color: "var(--text-muted)" }}>
              E-commerce — Product Detail & Checkout
            </div>
          </div>
        </div>
      </div>
    ),
  };

  const Visual = visuals[serviceId] || visuals["01"];

  return (
    <div className={`relative overflow-hidden rounded-[18px] border ${className || ""}`} style={{ borderColor: "var(--border)" }}>
      {Visual}
    </div>
  );
}

export function ServiceVisualSmall({ serviceId }: { serviceId: string }) {
  const icons: Record<string, React.ReactElement> = {
    "01": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    "02": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 16l4-16M6 16l-4-8 2.5-5 7 14 7-14 2.5 5" />
      </svg>
    ),
    "03": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    "04": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    "05": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m7-9h1.5a1.5 1.5 0 010 3H7.5a1.5 1.5 0 000 3H17" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
      {icons[serviceId] || icons["01"]}
    </div>
  );
}