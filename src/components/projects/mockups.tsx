/**
 * Abstract, non-photographic mockup compositions used as project
 * preview art — see PRD.md's demo-content rule: no fabricated
 * screenshots or client work, just representative UI compositions.
 * Each is presentational only (no interactivity), so these stay
 * server-renderable.
 */

export function BrowserMockup() {
  return (
    <div
      aria-hidden
      className="w-full overflow-hidden rounded-[10px] border shadow-2xl"
      style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
    >
      <div className="flex gap-1.5 px-3 py-2.5" style={{ background: "rgba(0,0,0,0.15)" }}>
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--text-muted)", opacity: 0.5 }} />
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--text-muted)", opacity: 0.5 }} />
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--text-muted)", opacity: 0.5 }} />
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-5">
        <div
          className="col-span-2 h-[60px] rounded-md"
          style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))" }}
        />
        <div className="h-[38px] rounded-md" style={{ background: "rgba(91,120,255,0.25)" }} />
        <div className="h-[38px] rounded-md" style={{ background: "rgba(255,93,162,0.2)" }} />
        <div className="h-[38px] rounded-md" style={{ background: "rgba(91,120,255,0.25)" }} />
        <div className="h-[38px] rounded-md" style={{ background: "rgba(255,93,162,0.2)" }} />
      </div>
    </div>
  );
}

export function DevicesMockup() {
  return (
    <div aria-hidden className="relative h-[210px] w-full">
      <div
        className="absolute top-0 left-[8%] h-[130px] w-[78%] rounded-lg border p-3"
        style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
      >
        <div className="mb-2 h-2 rounded" style={{ background: "rgba(255,93,162,0.3)" }} />
        <div className="mb-2 h-2 w-2/5 rounded" style={{ background: "rgba(255,93,162,0.3)" }} />
        <div className="h-2 rounded" style={{ background: "rgba(255,93,162,0.3)" }} />
      </div>
      <div
        className="absolute right-[6%] bottom-0 h-[130px] w-[70px] rounded-[14px] border px-1.5 py-2 shadow-xl"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div
          className="mb-1.5 h-1.5 rounded-[3px]"
          style={{ background: "linear-gradient(135deg, var(--secondary), var(--accent))" }}
        />
        <div
          className="mb-1.5 h-1.5 rounded-[3px]"
          style={{ background: "linear-gradient(135deg, var(--secondary), var(--accent))" }}
        />
        <div
          className="h-1.5 rounded-[3px]"
          style={{ background: "linear-gradient(135deg, var(--secondary), var(--accent))" }}
        />
      </div>
    </div>
  );
}

export function DashboardMockup() {
  const stats = [
    { value: "+24%", color: "var(--accent)" },
    { value: "1.2k", color: "var(--secondary)" },
    { value: "98%", color: "var(--primary)" },
    { value: "4.8", color: "var(--accent)" },
  ];
  return (
    <div aria-hidden className="grid w-full grid-cols-[70px_1fr] gap-2.5">
      <div className="flex flex-col gap-2 rounded-lg p-2.5" style={{ background: "var(--surface-elevated)" }}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="h-1.5 rounded-[3px]"
            style={{ background: i === 0 ? "var(--accent)" : "var(--border)" }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex h-12 flex-col justify-between rounded-lg p-2.5"
            style={{ background: "var(--surface-elevated)" }}
          >
            <span className="font-display text-[0.9rem] font-bold" style={{ color: s.color }}>
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
