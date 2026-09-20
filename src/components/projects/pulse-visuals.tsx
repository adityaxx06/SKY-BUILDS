/**
 * PULSE-specific visual compositions — energetic e-commerce aesthetic
 */

export function PulseBrowserMockup() {
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
            PULSE Fitness
          </span>
          <span className="rounded-full px-3 py-1 text-[0.7rem] font-medium" style={{ background: "var(--accent)", color: "#120e1f" }}>
            New Collection
          </span>
        </div>
        <div className="aspect-[16/9] rounded-xl relative overflow-hidden mb-6" style={{ background: "linear-gradient(135deg, rgba(255,93,162,0.15), rgba(255,193,92,0.15))" }}>
          <div className="absolute inset-0" style={{ background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FFC15C\" fill-opacity=\"0.15\"%3E%3Cpath d=\"M30 28c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 50c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM55 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM55 55c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between p-4">
            <div>
              <p className="font-display text-xl font-bold" style={{ color: "var(--text)" }}>Pro Performance Leggings</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>High-waist · Compression · 4 colors</p>
            </div>
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>$89</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1" style={{ color: "var(--accent)" }}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg className="w-4 h-4" style={{ opacity: 0.3 }} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
          </div>
          <span className="text-sm ml-2" style={{ color: "var(--text-muted)" }}>(128 reviews)</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button className="h-10 w-10 rounded-full border flex items-center justify-center transition-all" style={{ borderColor: "var(--primary)", background: "var(--primary)", color: "var(--on-primary)" }}>S</button>
          <button className="h-10 w-10 rounded-full border flex items-center justify-center transition-all" style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}>M</button>
          <button className="h-10 w-10 rounded-full border flex items-center justify-center transition-all" style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}>L</button>
        </div>
        <button className="w-full py-3 rounded-xl font-medium" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
          Add to Bag
        </button>
      </div>
    </div>
  );
}

export function PulseDashboardMockup() {
  const stats = [
    { label: "Revenue", value: "$48.2k", trend: "+18.2%", color: "var(--accent)" },
    { label: "Orders", value: "1,234", trend: "+12.5%", color: "var(--secondary)" },
    { label: "Conversion", value: "3.4%", trend: "+0.3%", color: "var(--primary)" },
    { label: "AOV", value: "$92", trend: "+4.1%", color: "var(--accent)" },
  ];

  return (
    <div aria-hidden className="w-full overflow-hidden rounded-[14px] border shadow-2xl" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <div className="grid grid-cols-[200px_1fr]">
        <div className="p-4 border-r" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="space-y-3">
            {["Dashboard", "Orders", "Products", "Customers", "Analytics", "Settings"].map((item, i) => (
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
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-2 h-[160px] rounded-xl relative overflow-hidden" style={{ background: "var(--surface)" }}>
              <div className="absolute inset-0 p-4 flex items-end justify-around">
                {[42, 55, 48, 62, 58, 71, 65, 78, 72, 85, 80, 92].map((h, i) => (
                  <div key={i} className="w-8 rounded-t transition-all hover:scale-y-105" style={{ height: `${h}%`, background: i < 6 ? "rgba(255,93,162,0.3)" : "var(--secondary)" }} />
                ))}
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-center text-xs" style={{ color: "var(--text-muted)" }}>
                Last 12 weeks · Revenue
              </div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Top Product</p>
              <p className="font-display text-lg font-bold mt-1" style={{ color: "var(--text)" }}>Pro Leggings</p>
              <p className="text-sm mt-1" style={{ color: "var(--accent)" }}>$12.4k revenue</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Low Stock Alerts</p>
              <p className="font-display text-lg font-bold mt-1" style={{ color: "var(--secondary)" }}>3 items</p>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Reorder recommended</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PulsePanelMockup() {
  return (
    <div aria-hidden className="w-full overflow-hidden rounded-[14px] border shadow-2xl" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: "rgba(0,0,0,0.15)" }}>
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--secondary)", opacity: 0.7 }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--accent)", opacity: 0.7 }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--success)", opacity: 0.7 }} />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>Checkout Flow</h3>
          <span className="px-2 py-1 rounded text-xs font-medium" style={{ background: "var(--accent)", color: "#120e1f" }}>Step 2/4</span>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>1</div>
          <div className="flex-1 h-1" style={{ background: "var(--primary)" }} />
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>2</div>
          <div className="flex-1 h-1" style={{ background: "var(--border)" }} />
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--surface)", border: "2px solid var(--border)", color: "var(--text-muted)" }}>3</div>
          <div className="flex-1 h-1" style={{ background: "var(--border)" }} />
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--surface)", border: "2px solid var(--border)", color: "var(--text-muted)" }}>4</div>
        </div>
        <div className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Shipping Address</p>
          <div className="mt-2 space-y-2">
            <input className="w-full px-4 py-2 rounded-lg text-sm" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", color: "var(--text)" }} placeholder="Street address" />
            <div className="grid grid-cols-2 gap-2">
              <input className="px-4 py-2 rounded-lg text-sm" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", color: "var(--text)" }} placeholder="City" />
              <input className="px-4 py-2 rounded-lg text-sm" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", color: "var(--text)" }} placeholder="ZIP" />
            </div>
          </div>
        </div>
        <button className="w-full py-3 rounded-xl font-medium" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

export function PulseTypographyMockup() {
  return (
    <div aria-hidden className="w-full overflow-hidden rounded-[14px] border shadow-2xl p-8" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Brand Display — Bricolage Grotesque Bold</p>
          <div className="space-y-3">
            <p className="font-display text-4xl md:text-5xl font-bold leading-tight" style={{ color: "var(--text)" }}>PULSE</p>
            <p className="font-display text-2xl font-bold" style={{ color: "var(--secondary)" }}>Pro Performance Leggings</p>
            <p className="font-display text-4xl font-bold" style={{ color: "var(--accent)" }}>$89</p>
          </div>
        </div>
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm uppercase tracking-wider mb-3 pt-4" style={{ color: "var(--text-muted)" }}>Button States / Micro-interactions</p>
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button className="px-6 py-3 rounded-full font-medium transition-all" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>Primary</button>
            <button className="px-6 py-3 rounded-full font-medium border transition-all" style={{ borderColor: "var(--border)", background: "transparent", color: "var(--text)" }}>Secondary</button>
            <button className="px-6 py-3 rounded-full font-medium transition-all" style={{ background: "var(--accent)", color: "#120e1f" }}>Accent</button>
            <button className="px-6 py-3 rounded-full font-medium transition-all opacity-50 cursor-not-allowed" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>Disabled</button>
          </div>
        </div>
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm uppercase tracking-wider mb-3 pt-4" style={{ color: "var(--text-muted)" }}>Product Meta / Variants</p>
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Black</span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Navy</span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Sage</span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Sand</span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>XS</span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>S</span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>M</span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>L</span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>XL</span>
          </div>
        </div>
      </div>
    </div>
  );
}