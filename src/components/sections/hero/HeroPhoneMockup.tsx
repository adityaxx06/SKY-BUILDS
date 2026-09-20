/**
 * Floating mobile-website card — the secondary device in the hero
 * composition. Same demo-content rule as HeroBrowserMockup applies.
 */
export function HeroPhoneMockup() {
  return (
    <div
      className="w-[110px] overflow-hidden rounded-[20px] border shadow-2xl"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="flex justify-center pt-2">
        <div className="h-1 w-10 rounded-full" style={{ background: "var(--border)" }} />
      </div>
      <div className="p-3">
        <div
          className="mb-3 h-[55px] rounded-lg relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--secondary), var(--accent))" }}
        >
          <div className="absolute inset-0 opacity-10" style={{ background: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23fff\" fill-opacity=\"0.3\"%3E%3Cpath d=\"M24 22v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-12V0h-2v4h-4v2h4v4h2V6h4V4h-4zM4 22v-4H2v4H0v2h4v4h2v-4h4v-2H4zM4 4V0H2v4H0v2h4v4h2V6h4V4H4z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        </div>
        <div className="mb-2 h-1.5 w-4/5 rounded-full" style={{ background: "var(--surface-elevated)" }} />
        <div className="mb-3 h-1.5 w-3/5 rounded-full" style={{ background: "var(--surface-elevated)" }} />
        <div className="h-7 rounded-full flex items-center justify-center" style={{ background: "var(--primary)" }}>
          <svg className="h-4 w-4" style={{ color: "var(--on-primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
