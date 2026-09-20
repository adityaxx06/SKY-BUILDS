/**
 * The hero's main floating visual — a fictional demo website preview,
 * NOT a real SKY BUILDS product screen. Generic placeholder content
 * only, per PRD's demo-content rule (no fabricated client work).
 * Purely decorative; the whole hero visual stage is aria-hidden in
 * HeroVisual, so this text is never exposed to assistive tech.
 */
export function HeroBrowserMockup() {
  return (
    <div
      className="w-full overflow-hidden rounded-[16px] border shadow-2xl"
      style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: "rgba(0,0,0,0.2)" }}>
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--secondary)", opacity: 0.7 }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--accent)", opacity: 0.7 }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--success)", opacity: 0.7 }} />
        <div
          className="ml-3 h-4 flex-1 rounded-full"
          style={{ background: "var(--surface)", maxWidth: 180 }}
        />
      </div>
      <div className="p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-display text-[0.8rem] font-semibold" style={{ color: "var(--text)" }}>
            Digital Studio
          </span>
          <span
            className="rounded-full px-3 py-1 text-[0.65rem] font-medium"
            style={{ background: "var(--primary)", color: "var(--on-primary)" }}
          >
            Live Demo
          </span>
        </div>
        <p
          className="font-display mb-4 max-w-[22ch] text-[1.25rem] leading-tight font-semibold"
          style={{ color: "var(--text)" }}
        >
          Turn Ideas Into Digital Reality
        </p>
        <div
          className="mb-4 h-[80px] md:h-[90px] rounded-xl relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))" }}
        >
          <div className="absolute inset-0 opacity-10" style={{ background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-[38px] rounded-lg flex items-center justify-center" style={{ background: "rgba(91,120,255,0.15)" }}>
            <span className="text-[0.65rem] font-medium" style={{ color: "var(--primary)" }}>Performance</span>
          </div>
          <div className="h-[38px] rounded-lg flex items-center justify-center" style={{ background: "rgba(255,93,162,0.15)" }}>
            <span className="text-[0.65rem] font-medium" style={{ color: "var(--secondary)" }}>Accessibility</span>
          </div>
          <div className="h-[38px] rounded-lg flex items-center justify-center" style={{ background: "rgba(255,193,92,0.15)" }}>
            <span className="text-[0.65rem] font-medium" style={{ color: "var(--accent)" }}>SEO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
