import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-6xl md:text-8xl font-bold mb-4" style={{ color: "var(--text)" }}>
          404
        </h1>
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4" style={{ color: "var(--text)" }}>
          Project Not Found
        </h2>
        <p className="text-[1.125rem] leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          This project doesn&apos;t exist. It may have been removed or the URL might be incorrect.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[1rem] font-medium transition-all duration-300"
          style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--primary)"; e.currentTarget.style.color = "var(--on-primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--primary)"; }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>All Projects</span>
        </Link>
      </div>
    </div>
  );
}