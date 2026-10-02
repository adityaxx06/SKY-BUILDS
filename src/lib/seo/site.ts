/**
 * Single source of truth for SEO-relevant site identity (Phase 11).
 *
 * The production URL is intentionally env-based with NO hardcoded
 * fallback: canonical URLs, sitemap entries, and absolute OG URLs are
 * only emitted when NEXT_PUBLIC_SITE_URL is set at build time, so a
 * misconfigured build can never publish guessed production URLs.
 */
export const SITE_NAME = "SKY BUILDS";

export const SITE_DESCRIPTION =
  "SKY BUILDS is a modern web development studio designing and building premium websites, web applications, and digital experiences for ambitious businesses.";

export const SITE_KEYWORDS = [
  "web development",
  "website design",
  "web applications",
  "UI/UX design",
  "website redesign",
  "e-commerce development",
  "Next.js development",
];

/** Production origin, e.g. "https://skybuilds.studio". Empty when unset. */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
}

/** Absolute URL for a site path, or undefined when no origin is configured. */
export function absoluteUrl(path: string): string | undefined {
  const base = getSiteUrl();
  if (!base) return undefined;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Canonical alternates fragment — omitted entirely when unconfigured. */
export function canonicalAlternates(path: string): {
  alternates?: { canonical: string };
} {
  const url = absoluteUrl(path);
  return url ? { alternates: { canonical: url } } : {};
}

/**
 * Complete per-page Open Graph object. Next.js replaces (not merges)
 * a segment's `openGraph` wholesale, so every page must restate the
 * shared fields (type/siteName) — this helper keeps them consistent.
 */
export function openGraphPage(title: string, description: string) {
  return {
    openGraph: {
      type: "website" as const,
      siteName: SITE_NAME,
      title,
      description,
    },
  };
}
