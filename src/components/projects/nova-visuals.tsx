/**
 * NOVA-specific visual compositions — analytical SaaS dashboard aesthetic
 */

export function NovaBrowserMockup() {
  return (
    <div
      aria-hidden
      className="w-full overflow-hidden rounded-[14px] border shadow-2xl"
      style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: "rgba(0,0,0,0.2)" }}>
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--secondary)", opacity: 0.7 }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--accent)", opacity: 0.7 }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--success)", opacity: 0.7 }} />
        <div className="ml-3 h-4 flex-1 rounded-full max-w-[200px]" style={{ background: "var(--surface)" }} />
      </div>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-[0.875rem] font-semibold" style={{ color: "var(--text)" }}>
            NOVA Analytics
          </span>
          <span className="rounded-full px-3 py-1 text-[0.7rem] font-medium" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
            Live Demo
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {["+24%", "1.2k", "98%", "4.8"].map((val, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
              <p className="font-display text-xl font-bold" style={{ color: i === 0 ? "var(--accent)" : i === 1 ? "var(--secondary)" : i === 2 ? "var(--primary)" : "var(--accent)" }}>
                {val}
              </p>
              <p className="text-[0.7rem] uppercase tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>
                {["Revenue", "Users", "Uptime", "Rating"][i]}
              </p>
            </div>
          ))}
        </div>
        <div className="h-[120px] rounded-xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(91,120,255,0.15), rgba(255,93,162,0.1))" }}>
          <div className="absolute inset-0" style={{ background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%235B78FF\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
          <div className="absolute bottom-4 left-4 right-4 h-[60%] flex items-end justify-around p-2">
            {[45, 62, 38, 71, 55, 82, 48, 65, 52, 78, 58, 85].map((h, i) => (
              <div key={i} className="w-6 rounded-t" style={{ height: `${h}%`, background: i > 6 ? "var(--secondary)" : "var(--primary)" }} />
            ))}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="h-[38px] rounded-lg flex items-center justify-center" style={{ background: "rgba(91,120,255,0.15)" }}>
            <span className="text-[0.7rem] font-medium" style={{ color: "var(--primary)" }}>Revenue</span>
          </div>
          <div className="h-[38px] rounded-lg flex items-center justify-center" style={{ background: "rgba(255,93,162,0.15)" }}>
            <span className="text-[0.7rem] font-medium" style={{ color: "var(--secondary)" }}>Users</span>
          </div>
          <div className="h-[38px] rounded-lg flex items-center justify-center" style={{ background: "rgba(255,193,92,0.15)" }}>
            <span className="text-[0.7rem] font-medium" style={{ color: "var(--accent)" }}>Growth</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NovaDashboardMockup() {
  const stats = [
    { label: "MRR", value: "$24.5k", trend: "+12.3%", color: "var(--accent)" },
    { label: "Active Users", value: "1,234", trend: "+8.1%", color: "var(--secondary)" },
    { label: "Churn Rate", value: "2.1%", trend: "-0.4%", color: "var(--primary)" },
    { label: "Avg. Session", value: "14m 32s", trend: "+2.1%", color: "var(--accent)" },
  ];

  return (
    <div aria-hidden className="w-full overflow-hidden rounded-[14px] border shadow-2xl" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <div className="grid grid-cols-[200px_1fr]">
        <div className="p-4 border-r" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="space-y-3">
            {["Overview", "Analytics", "Reports", "Settings", "Team", "Billing"].map((item, i) => (
              <div key={item} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${i === 0 ? "text-[var(--primary)] bg-[rgba(91,120,255,0.1)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
                <p className="text-[0.75rem] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
                <p className="font-display text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-sm font-medium mt-1" style={{ color: stat.color }}>{stat.trend}</p>
              </div>
            ))}
          </div>
          <div className="h-[160px] rounded-xl relative overflow-hidden" style={{ background: "var(--surface)" }}>
            <div className="absolute inset-0 p-4 flex items-end justify-around">
              {[35, 48, 42, 58, 52, 71, 65, 78, 72, 85, 80, 92].map((h, i) => (
                <div key={i} className="w-8 rounded-t transition-all hover:scale-y-105" style={{ height: `${h}%`, background: i < 6 ? "rgba(91,120,255,0.3)" : "var(--primary)" }} />
              ))}
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center text-xs" style={{ color: "var(--text-muted)" }}>
              Last 12 months · Revenue trend
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NovaPanelMockup() {
  return (
    <div aria-hidden className="w-full overflow-hidden rounded-[14px] border shadow-2xl" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: "rgba(0,0,0,0.15)" }}>
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--secondary)", opacity: 0.7 }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--accent)", opacity: 0.7 }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--success)", opacity: 0.7 }} />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>Revenue Detail</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>+24.3%</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>vs last month</span>
          </div>
        </div>
        <div className="h-[200px] rounded-xl relative overflow-hidden" style={{ background: "var(--surface)" }}>
          <div className="absolute inset-0 p-6 flex items-end justify-around">
            {[
              { h: 25, c: "rgba(91,120,255,0.2)" },
              { h: 32, c: "rgba(91,120,255,0.25)" },
              { h: 28, c: "rgba(91,120,255,0.2)" },
              { h: 41, c: "rgba(91,120,255,0.3)" },
              { h: 38, c: "rgba(91,120,255,0.28)" },
              { h: 52, c: "rgba(91,120,255,0.35)" },
              { h: 48, c: "rgba(91,120,255,0.32)" },
              { h: 58, c: "rgba(91,120,255,0.4)" },
              { h: 55, c: "rgba(91,120,255,0.38)" },
              { h: 65, c: "rgba(91,120,255,0.45)" },
              { h: 62, c: "rgba(91,120,255,0.42)" },
              { h: 72, c: "var(--primary)" },
            ].map((d, i) => (
              <div key={i} className="w-10 rounded-t" style={{ height: `${d.h}%`, background: d.c }} />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-between px-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Avg. Order Value</p>
            <p className="font-display text-2xl font-bold mt-1" style={{ color: "var(--text)" }}>$127</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Conversion Rate</p>
            <p className="font-display text-2xl font-bold mt-1" style={{ color: "var(--primary)" }}>3.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NovaTypographyMockup() {
  return (
    <div aria-hidden className="w-full overflow-hidden rounded-[14px] border shadow-2xl p-8" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Monospace Figures / Data Display</p>
          <div className="space-y-4 font-mono">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold" style={{ color: "var(--text)" }}>$24,523</span>
              <span className="text-lg" style={{ color: "var(--accent)" }}>▲ +12.3%</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold" style={{ color: "var(--text)" }}>1,234</span>
              <span className="text-lg" style={{ color: "var(--secondary)" }}>▲ +8.1%</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold" style={{ color: "var(--text)" }}>98.7%</span>
              <span className="text-lg" style={{ color: "var(--primary)" }}>● Online</span>
            </div>
          </div>
        </div>
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm uppercase tracking-wider mb-3 pt-4" style={{ color: "var(--text-muted)" }}>Trend Indicators / Sparklines</p>
          <div className="flex flex-wrap items-center gap-6">
            {[
              { color: "var(--primary)", pts: [20, 35, 30, 45, 42, 58, 55, 65, 62, 72] },
              { color: "var(--secondary)", pts: [45, 42, 48, 44, 52, 50, 58, 55, 62, 60] },
              { color: "var(--accent)", pts: [30, 42, 38, 52, 48, 61, 58, 68, 65, 75] },
            ].map((s, i) => (
              <div key={i} className="w-32 h-16 relative">
                <svg viewBox="0 0 128 64" className="w-full h-full" style={{ color: s.color }}>
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={`M0,${64 - s.pts[0] * 0.5} ${s.pts.map((p, j) => `${j * 14.2},${64 - p * 0.5}`).join(" ")}`}
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}