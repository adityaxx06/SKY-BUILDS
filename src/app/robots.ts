import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";

/**
 * Public pages are crawlable; admin and internal routes are excluded.
 * The sitemap reference is only emitted when NEXT_PUBLIC_SITE_URL is
 * configured, so unconfigured builds never advertise a guessed URL.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
