/**
 * AURELIA-specific visual compositions — editorial real estate aesthetic
 */

export function AureliaBrowserMockup() {
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
            AURELIA Properties
          </span>
          <span className="rounded-full px-3 py-1 text-[0.7rem] font-medium" style={{ background: "var(--secondary)", color: "var(--on-primary)" }}>
            Featured Listing
          </span>
        </div>
        <div className="aspect-[16/9] rounded-xl relative overflow-hidden mb-6" style={{ background: "linear-gradient(135deg, rgba(255,93,162,0.1), rgba(255,193,92,0.1))" }}>
          <div className="absolute inset-0" style={{ background: "url('data:image/svg+xml,%3Csvg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FF5DA2\" fill-opacity=\"0.08\"%3E%3Cpath d=\"M40 38c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM10 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 60c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM70 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM70 70c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between p-4">
            <div>
              <p className="font-display text-2xl font-bold" style={{ color: "var(--text)" }}>Modern Hillside Villa</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Beverly Hills, CA · 5,200 sqft</p>
            </div>
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>$4.2M</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-4 rounded-xl text-center" style={{ background: "var(--surface)" }}>
            <p className="font-display text-2xl font-bold" style={{ color: "var(--primary)" }}>5</p>
            <p className="text-[0.7rem] uppercase tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>Bedrooms</p>
          </div>
          <div className="p-4 rounded-xl text-center" style={{ background: "var(--surface)" }}>
            <p className="font-display text-2xl font-bold" style={{ color: "var(--secondary)" }}>4.5</p>
            <p className="text-[0.7rem] uppercase tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>Bathrooms</p>
          </div>
          <div className="p-4 rounded-xl text-center" style={{ background: "var(--surface)" }}>
            <p className="font-display text-2xl font-bold" style={{ color: "var(--accent)" }}>3</p>
            <p className="text-[0.7rem] uppercase tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>Garages</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-[38px] rounded-lg flex items-center justify-center px-4" style={{ background: "rgba(91,120,255,0.15)" }}>
            <span className="text-[0.7rem] font-medium" style={{ color: "var(--primary)" }}>Schedule Tour</span>
          </div>
          <div className="h-[38px] rounded-lg flex items-center justify-center px-4" style={{ background: "rgba(255,93,162,0.15)" }}>
            <span className="text-[0.7rem] font-medium" style={{ color: "var(--secondary)" }}>Save Property</span>
          </div>
          <div className="h-[38px] rounded-lg flex items-center justify-center px-4" style={{ background: "rgba(255,193,92,0.15)" }}>
            <span className="text-[0.7rem] font-medium" style={{ color: "var(--accent)" }}>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AureliaDevicesMockup() {
  return (
    <div aria-hidden className="relative h-[280px] w-full">
      <div className="absolute top-0 left-[5%] h-[200px] w-[55%] rounded-xl border p-4 shadow-2xl" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
        <div className="aspect-[3/4] rounded-lg relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,93,162,0.1), rgba(255,193,92,0.05))" }}>
          <div className="absolute inset-0" style={{ background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FF5DA2\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M30 28c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 50c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM55 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM55 55c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        </div>
        <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg" style={{ background: "rgba(30,24,54,0.9)", backdropFilter: "blur(20px)" }}>
          <p className="font-display text-lg font-bold" style={{ color: "var(--text)" }}>Coastal Retreat</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Malibu, CA · Oceanfront · $8.5M</p>
        </div>
      </div>
      <div className="absolute right-[5%] bottom-0 h-[180px] w-[70px] rounded-[18px] border px-2 py-3 shadow-xl" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="mb-2 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, var(--secondary), var(--accent))" }} />
        <div className="mb-2 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, var(--secondary), var(--accent))" }} />
        <div className="mb-2 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, var(--secondary), var(--accent))" }} />
        <div className="h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, var(--secondary), var(--accent))" }} />
      </div>
    </div>
  );
}

export function AureliaPanelMockup() {
  return (
    <div aria-hidden className="w-full overflow-hidden rounded-[14px] border shadow-2xl" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: "rgba(0,0,0,0.15)" }}>
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--secondary)", opacity: 0.7 }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--accent)", opacity: 0.7 }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--success)", opacity: 0.7 }} />
      </div>
      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="col-span-2 aspect-[16/9] rounded-xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,93,162,0.08), rgba(255,193,92,0.05))" }}>
          <div className="absolute inset-0" style={{ background: "url('data:image/svg+xml,%3Csvg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FF5DA2\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M40 38c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM10 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 60c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM70 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM70 70c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        </div>
        <div className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Price</p>
          <p className="font-display text-xl font-bold mt-1" style={{ color: "var(--text)" }}>$4,200,000</p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Price/sqft</p>
          <p className="font-display text-xl font-bold mt-1" style={{ color: "var(--secondary)" }}>$808</p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>HOA/Month</p>
          <p className="font-display text-xl font-bold mt-1" style={{ color: "var(--text)" }}>$1,250</p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Property Tax (yr)</p>
          <p className="font-display text-xl font-bold mt-1" style={{ color: "var(--accent)" }}>$42,800</p>
        </div>
      </div>
    </div>
  );
}

export function AureliaTypographyMockup() {
  return (
    <div aria-hidden className="w-full overflow-hidden rounded-[14px] border shadow-2xl p-8" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Editorial Display — Playfair Display / Serif</p>
          <div className="space-y-3 font-serif">
            <p className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: "var(--text)" }}>Modern Hillside Villa</p>
            <p className="text-2xl font-light" style={{ color: "var(--text-muted)" }}>Beverly Hills, California</p>
            <p className="text-3xl font-medium" style={{ color: "var(--secondary)" }}>$4,200,000</p>
          </div>
        </div>
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm uppercase tracking-wider mb-3 pt-4" style={{ color: "var(--text-muted)" }}>UI Typography — General Sans</p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Labels / Meta</p>
              <p className="text-xs uppercase tracking-widest font-medium mt-1" style={{ color: "var(--text)" }}>BEDROOMS · BATHROOMS · SQFT</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "var(--surface)" }}>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Body Copy</p>
              <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--text-muted)" }}>Designed for readability at small sizes with generous x-height and open counters.</p>
            </div>
          </div>
        </div>
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm uppercase tracking-wider mb-3 pt-4" style={{ color: "var(--text-muted)" }}>Accent Weights</p>
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <span className="px-4 py-2 rounded-full text-sm font-light" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Light 300</span>
            <span className="px-4 py-2 rounded-full text-sm font-normal" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Regular 400</span>
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "var(--secondary)", color: "var(--on-primary)" }}>Medium 500</span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>Semi 600</span>
            <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ background: "var(--accent)", color: "#120e1f" }}>Bold 700</span>
          </div>
        </div>
      </div>
    </div>
  );
}